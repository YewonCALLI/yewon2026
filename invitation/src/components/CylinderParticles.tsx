'use client'

import { useEffect, useMemo, useRef, type MutableRefObject } from 'react'
import * as THREE from 'three'
import { useFrame } from '@react-three/fiber'
import { useSceneTuning } from '@/config/sceneTuning'

/* brand palette — same colors/visual feel as the reference pill-particle prototype */
const PALETTE = [
  0xffcee8, 0xff98ed, 0xce88ff, 0x76a6ff, 0x0ed7ff, 0x4cfff6, 0xff9276, 0xffb473, 0xfcffa6, 0xb7fd7e, 0x00f18e,
  0x89ffdb,
].map((c) => new THREE.Color(c))

function randomPaletteColor() {
  return PALETTE[(Math.random() * PALETTE.length) | 0]
}

/* soft-edge shader (fresnel fade ≈ blur) — the aLenScale trick stretches only the cylindrical
   torso and leaves the hemispherical caps untouched, so cap radius stays constant regardless of length.
   uH0/uFresnelPower are uniforms (not baked constants) so the tuning panel can drive them live
   without forcing a shader recompile on every slider tick. */
const VERTEX_SHADER = /* glsl */ `
  attribute float aLenScale; // per-instance torso length ÷ pillLength — stretches only the cylindrical body
  uniform float uH0; // half the base torso length (pillLength / 2)
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vColor;
  void main() {
    vColor = instanceColor;
    // decompose the lathe profile: axialBase is the torso-only offset (0 on the caps' curved surface),
    // radialY is the cap's local curvature (0 on the torso) — stretching axialBase alone leaves cap radius untouched
    float axialBase = clamp(position.y, -uH0, uH0);
    float radialY = position.y - axialBase;
    vec3 localPos = vec3(position.x, radialY + axialBase * aLenScale, position.z);
    vec4 mvPos = modelViewMatrix * instanceMatrix * vec4(localPos, 1.0);
    vNormal = normalize((modelViewMatrix * instanceMatrix * vec4(normal, 0.0)).xyz);
    vViewDir = normalize(-mvPos.xyz);
    gl_Position = projectionMatrix * mvPos;
  }
`

const FRAGMENT_SHADER = /* glsl */ `
  uniform float uFresnelPower;
  varying vec3 vNormal;
  varying vec3 vViewDir;
  varying vec3 vColor;
  // instanceColor arrives linear (THREE.Color converts sRGB hex -> linear on construction);
  // re-encode here since this raw ShaderMaterial has no output colorspace pass
  vec3 linearToSRGB(vec3 c) {
    return mix(c * 12.92, 1.055 * pow(c, vec3(1.0 / 2.4)) - 0.055, step(0.0031308, c));
  }
  void main() {
    float facing = clamp(dot(normalize(vNormal), normalize(vViewDir)), 0.0, 1.0);
    float alpha = pow(facing, uFresnelPower); // soft edge falloff
    vec3 col = linearToSRGB(vColor);
    gl_FragColor = vec4(col, alpha);
  }
`

interface Particle {
  home: THREE.Vector3
  dir: THREE.Vector3 // needle orientation — always the +Z tube axis, shared across all particles
  vel: THREE.Vector3 // no longer drives position; decays as a "flick energy" signal that gates the color flicker
  scale: number
  lenScale: number
  depth: number
  flickerT: number
}

interface CylinderParticlesProps {
  /** Raw (-1..1, unsmoothed) tilt target shared with CameraTiltRig — flick impulse is derived from its frame-to-frame delta. */
  tiltRef: MutableRefObject<{ x: number; y: number }>
}

export default function CylinderParticles({ tiltRef }: CylinderParticlesProps) {
  const meshRef = useRef<THREE.InstancedMesh>(null)
  const dummy = useMemo(() => new THREE.Object3D(), [])
  const needleUp = useMemo(() => new THREE.Vector3(0, 1, 0), []) // the capsule's local "head" axis, before orienting it outward
  const impulse = useRef(new THREE.Vector3())
  const lastTilt = useRef({ x: 0, y: 0 })

  // shape-affecting tuning values — subscribed reactively so geometry/particles/fog rebuild
  // when a designer changes them. Purely per-frame physics values (flick, idle float, fresnel)
  // are read imperatively inside useFrame instead, so dragging those sliders never re-renders
  // this component or recompiles the shader.
  const particleCount = useSceneTuning((s) => s.particleCount)
  const pillRadius = useSceneTuning((s) => s.pillRadius)
  const pillLength = useSceneTuning((s) => s.pillLength)
  const radiusMin = useSceneTuning((s) => s.radiusMin)
  const radiusSpread = useSceneTuning((s) => s.radiusSpread)
  const scaleMin = useSceneTuning((s) => s.scaleMin)
  const scaleSpread = useSceneTuning((s) => s.scaleSpread)
  const fogNear = useSceneTuning((s) => s.fogNear)
  const fogFar = useSceneTuning((s) => s.fogFar)

  const material = useMemo(
    () =>
      new THREE.ShaderMaterial({
        transparent: true,
        depthWrite: false,
        vertexShader: VERTEX_SHADER,
        fragmentShader: FRAGMENT_SHADER,
        uniforms: {
          uH0: { value: pillLength / 2 },
          uFresnelPower: { value: useSceneTuning.getState().fresnelPower },
        },
      }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )

  // geometry + particles are built together so the aLenScale buffer attribute is attached to the
  // geometry synchronously, before the mesh's first render — same pattern instanceColor needs
  const { geometry, particles } = useMemo(() => {
    const list: Particle[] = []
    const lenScaleArray = new Float32Array(particleCount)
    const maxRadius = radiusMin + radiusSpread
    // how far a stick's tip can poke forward/back along the tube axis — kept shallow (relative
    // to the disc radius) so the arrangement reads as a filled circular cross-section facing the
    // camera, not a full sphere, while still giving fog/tilt-parallax some depth to work with
    const depthRange = maxRadius * 0.3
    // every stick stands perfectly parallel to the tube axis (camera-facing Z) — shared, never
    // mutated, so all particles can safely reference the same Vector3
    const axisDir = new THREE.Vector3(0, 0, 1)
    for (let i = 0; i < particleCount; i++) {
      // uniform position inside the disc/annulus (XY) that forms the tube's circular cross-section
      const rr = Math.sqrt(radiusMin * radiusMin + Math.random() * (maxRadius * maxRadius - radiusMin * radiusMin))
      const theta = 2 * Math.PI * Math.random()
      const home = new THREE.Vector3(rr * Math.cos(theta), rr * Math.sin(theta), (Math.random() * 2 - 1) * depthRange)
      const dir = axisDir
      const lenScale = (1 + Math.random() * 1.2) * 0.2 // torso length ÷ pillLength, ×0.2 length scale — cap radius unaffected
      list.push({
        home,
        dir,
        vel: new THREE.Vector3(),
        scale: scaleMin + Math.random() * scaleSpread,
        lenScale,
        depth: depthRange > 0 ? THREE.MathUtils.clamp((home.z + depthRange) / (2 * depthRange), 0, 1) : 0.5, // 0 far -> 1 near
        flickerT: 0,
      })
      lenScaleArray[i] = lenScale
    }
    const geo = new THREE.CapsuleGeometry(pillRadius, pillLength, 6, 14)
    geo.setAttribute('aLenScale', new THREE.InstancedBufferAttribute(lenScaleArray, 1))
    return { geometry: geo, particles: list }
  }, [particleCount, pillRadius, pillLength, radiusMin, radiusSpread, scaleMin, scaleSpread])

  useEffect(() => () => geometry.dispose(), [geometry])
  useEffect(() => () => material.dispose(), [material])

  // attached declaratively so `instanceColor` exists on the mesh before the first WebGLProgram
  // compile — setting it imperatively in an effect is too late, three.js already compiled the
  // shader without the USE_INSTANCING_COLOR attribute by then
  const initialColorArray = useMemo(() => {
    const arr = new Float32Array(particleCount * 3)
    for (let i = 0; i < particleCount; i++) randomPaletteColor().toArray(arr, i * 3)
    return arr
  }, [particleCount])

  useFrame((_state, delta) => {
    const mesh = meshRef.current
    if (!mesh) return
    const dt = Math.min(delta, 0.05)
    const tuning = useSceneTuning.getState()

    material.uniforms.uH0.value = tuning.pillLength / 2
    material.uniforms.uFresnelPower.value = tuning.fresnelPower

    // flick — quick tilts (mouse on desktop, device orientation on mobile) push a per-particle
    // "energy" value that only drives the color flicker below; positions don't move, needles
    // stay pinned to their home spot on the sphere
    const dtx = tiltRef.current.x - lastTilt.current.x
    const dty = tiltRef.current.y - lastTilt.current.y
    impulse.current.x += dtx * tuning.flickImpulseScale
    impulse.current.y += -dty * tuning.flickImpulseScale
    lastTilt.current.x = tiltRef.current.x
    lastTilt.current.y = tiltRef.current.y

    let colorTouched = false

    for (let i = 0; i < particles.length; i++) {
      const p = particles[i]

      // flick energy: nearer particles react harder (depth-scaled impulse), decays on its own
      const f = 0.4 + p.depth * 1.2
      p.vel.x += impulse.current.x * f
      p.vel.y += impulse.current.y * f
      p.vel.multiplyScalar(Math.exp(-tuning.flickDamping * dt))

      // fast-moving pieces randomly flash to another palette color
      const speed = p.vel.length()
      p.flickerT -= dt
      if (speed > tuning.flickSpeedThreshold && p.flickerT <= 0) {
        mesh.setColorAt(i, randomPaletteColor())
        colorTouched = true
        p.flickerT = THREE.MathUtils.randFloat(tuning.flickCooldownMin, tuning.flickCooldownMax)
      }

      dummy.position.copy(p.home)
      dummy.quaternion.setFromUnitVectors(needleUp, p.dir) // needle points away from the origin — fixed per particle
      dummy.scale.set(p.scale, p.scale, p.scale) // uniform — torso length is stretched in the vertex shader instead
      dummy.updateMatrix()
      mesh.setMatrixAt(i, dummy.matrix)
    }
    impulse.current.multiplyScalar(0.6) // impulse decays fast
    mesh.instanceMatrix.needsUpdate = true
    if (colorTouched && mesh.instanceColor) mesh.instanceColor.needsUpdate = true
  })

  return (
    <>
      <fog attach="fog" args={[0xffffff, fogNear, fogFar]} />
      <instancedMesh ref={meshRef} args={[geometry, material, particleCount]}>
        <instancedBufferAttribute attach="instanceColor" args={[initialColorArray, 3]} />
      </instancedMesh>
    </>
  )
}
