'use client'

// Ported from the 2026 main page of the previous site (ywwebsite/next/src/app/2026/page.tsx).

import { useRef, Suspense, useMemo, useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber'
import { OrbitControls, Line, useGLTF, Billboard, Html, useTexture } from '@react-three/drei'
import { EffectComposer, Pixelation } from '@react-three/postprocessing'
import * as THREE from 'three'
import type { Project } from '@/app/works/projectlist'
import { heartProjects } from './heartProjects'
import { HeartProjectList, HeartProjectListMobile } from './HeartProjectList'

const MOBILE_SCENE_OFFSET_X = 150
const MOBILE_SCENE_OFFSET_Y = 80
const ZOOM_DISTANCE = 0.2
const MOBILE_ZOOM_DISTANCE = 0.25
const OVERVIEW_TARGET: [number, number, number] = [-3, 3, 0]
const OVERVIEW_POSITION: [number, number, number] = [-5, 4, 9]

interface SelectedProjectState {
  project: Project
  index: number
  targetPosition: THREE.Vector3
}

function HeartPoints({
  projectCount,
  onPositionsReady,
  hiddenPointIndex,
}: {
  projectCount: number
  onPositionsReady: (positions: THREE.Vector3[]) => void
  hiddenPointIndex: number | null
}) {
  const pointsRef = useRef<THREE.Points>(null)
  const { scene } = useGLTF('/models/heart.glb')
  const reportedRef = useRef(false)
  const hiddenVertexRef = useRef<number | null>(null)

  const { positions, selectedIndices, originalPositions } = useMemo(() => {
    let vertices: number[] = []
    scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        vertices = Array.from(child.geometry.attributes.position.array)
      }
    })

    const selected = new Set<number>()
    for (let i = 0; i < vertices.length / 3; i++) {
      if (Math.random() < 0.05) {
        selected.add(i)
      }
    }

    return {
      positions: new Float32Array(vertices),
      selectedIndices: selected,
      originalPositions: [...vertices],
    }
  }, [scene])

  // Reference: https://threejs.org/examples/webgl_postprocessing_pixel.html
  useEffect(() => {
    if (reportedRef.current || positions.length === 0) return
    reportedRef.current = true

    const totalVertices = positions.length / 3
    const sampledPositions: THREE.Vector3[] = []

    for (let i = 0; i < projectCount; i++) {
      const vertexIndex = Math.floor((i / projectCount) * totalVertices)
      const x = positions[vertexIndex * 3]
      const y = positions[vertexIndex * 3 + 1]
      const z = positions[vertexIndex * 3 + 2]
      sampledPositions.push(new THREE.Vector3(x, -z, y))
    }

    onPositionsReady(sampledPositions)
  }, [positions, projectCount, onPositionsReady])

  useEffect(() => {
    if (!pointsRef.current || positions.length === 0) return

    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array
    const totalVertices = positions.length / 3

    if (hiddenVertexRef.current !== null) {
      const prev = hiddenVertexRef.current
      posArray[prev * 3] = originalPositions[prev * 3]
      posArray[prev * 3 + 1] = originalPositions[prev * 3 + 1]
      posArray[prev * 3 + 2] = originalPositions[prev * 3 + 2]
    }

    hiddenVertexRef.current =
      hiddenPointIndex !== null ? Math.floor((hiddenPointIndex / projectCount) * totalVertices) : null

    pointsRef.current.geometry.attributes.position.needsUpdate = true
  }, [hiddenPointIndex, positions, originalPositions, projectCount])

  useFrame(({ clock }) => {
    if (!pointsRef.current || positions.length === 0) return

    const posArray = pointsRef.current.geometry.attributes.position.array as Float32Array
    selectedIndices.forEach((index) => {
      posArray[index * 3 + 1] = originalPositions[index * 3 + 1] + Math.sin(clock.elapsedTime * 2) * 0.1
    })

    if (hiddenVertexRef.current !== null) {
      const v = hiddenVertexRef.current
      posArray[v * 3] = 9999
      posArray[v * 3 + 1] = 9999
      posArray[v * 3 + 2] = 9999
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true

    const material = pointsRef.current.material as THREE.PointsMaterial
    material.size = 0.1 + Math.sin(clock.elapsedTime * 2) * 0.025
  })

  if (positions.length === 0) return null

  return (
    <points ref={pointsRef} rotation={[Math.PI / 2, 0, 0]}>
      <bufferGeometry>
        <bufferAttribute attach='attributes-position' args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial color={0xff0000} size={0.1} />
    </points>
  )
}

// ──────────────────────────────────────────────
// Camera Animator
// ──────────────────────────────────────────────
function CameraAnimator({
  target,
  controlsRef,
  zoomDistance,
  lookOffsetX,
}: {
  target: THREE.Vector3 | null
  controlsRef: React.RefObject<any>
  zoomDistance: number
  lookOffsetX: number
}) {
  const { camera } = useThree()
  const animating = useRef(false)
  const startPos = useRef(new THREE.Vector3())
  const startTarget = useRef(new THREE.Vector3())
  const endPos = useRef(new THREE.Vector3())
  const endTarget = useRef(new THREE.Vector3())
  const progress = useRef(0)
  const prevTarget = useRef<THREE.Vector3 | null>(null)

  useEffect(() => {
    if (target === prevTarget.current) return
    prevTarget.current = target

    startPos.current.copy(camera.position)
    if (controlsRef.current) {
      startTarget.current.copy(controlsRef.current.target)
    }

    if (target) {
      endTarget.current.set(target.x + lookOffsetX, target.y, target.z)
      endPos.current.set(target.x, target.y, target.z + zoomDistance)
    } else {
      // 선택 해제 → 원래 카메라 지점으로 복귀
      endTarget.current.set(...OVERVIEW_TARGET)
      endPos.current.set(...OVERVIEW_POSITION)
    }

    progress.current = 0
    animating.current = true
  }, [target, camera, controlsRef, zoomDistance, lookOffsetX])

  useFrame((_, delta) => {
    if (!animating.current) return

    progress.current = Math.min(progress.current + delta * 1.2, 1)
    const t = 1 - Math.pow(1 - progress.current, 3)

    camera.position.lerpVectors(startPos.current, endPos.current, t)

    if (controlsRef.current) {
      const newTarget = new THREE.Vector3().lerpVectors(startTarget.current, endTarget.current, t)
      controlsRef.current.target.copy(newTarget)
      controlsRef.current.update()
    }

    if (progress.current >= 1) {
      animating.current = false
    }
  })

  return null
}

// ──────────────────────────────────────────────
// Billboard Thumbnail (3D scene 내부 렌더링 → Pixelation 적용됨)
// ──────────────────────────────────────────────
function ProjectThumbnailBillboard({
  project,
  position,
  onNavigate,
}: {
  project: Project
  position: THREE.Vector3
  onNavigate: (project: Project) => void
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const hintRef = useRef<THREE.Group>(null)
  const [hovered, setHovered] = useState(false)
  const [showHint, setShowHint] = useState(false)

  const texture = useTexture(project.cover)

  const cardWidth = 0.1
  const imageHeight = 0.1

  // crop the image around its center to the card's aspect (object-fit: cover) instead of squashing it
  useEffect(() => {
    const { width, height } = texture.image as { width: number; height: number }
    const ratio = width / height / (cardWidth / imageHeight)
    if (ratio > 1) {
      texture.repeat.set(1 / ratio, 1)
      texture.offset.set((1 - 1 / ratio) / 2, 0)
    } else {
      texture.repeat.set(1, ratio)
      texture.offset.set(0, (1 - ratio) / 2)
    }
  }, [texture])

  useEffect(() => {
    document.body.style.cursor = hovered ? 'pointer' : 'auto'
    return () => {
      document.body.style.cursor = 'auto'
    }
  }, [hovered])

  // 카메라가 썸네일 위치로 이동하는 애니메이션이 끝난 뒤에 안내 문구를 노출
  useEffect(() => {
    setShowHint(false)
    const timer = setTimeout(() => setShowHint(true), 900)
    return () => clearTimeout(timer)
  }, [project])

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const s = 1 + Math.sin(clock.elapsedTime * 2) * 0.2
      meshRef.current.scale.set(s, s, 1)
    }
    if (hintRef.current) {
      hintRef.current.position.y = -imageHeight / 2 - 0.018 + Math.sin(clock.elapsedTime * 2.5) * 0.003
    }
  })

  return (
    <group position={[position.x, position.y, position.z]}>
      <Billboard follow lockX={false} lockY={false} lockZ={false}>
        <group
          onClick={(e) => {
            e.stopPropagation()
            onNavigate(project)
          }}
          onPointerOver={(e) => {
            e.stopPropagation()
            setHovered(true)
          }}
          onPointerOut={() => setHovered(false)}
        >
          <mesh ref={meshRef} position={[0, 0, 0.01]}>
            <planeGeometry args={[cardWidth, imageHeight]} />
            <meshBasicMaterial map={texture} toneMapped={false} />
          </mesh>
        </group>

        {showHint && (
          <group ref={hintRef} position={[0, -imageHeight / 2 - 0.38, 0.02]}>
            <Html center style={{ pointerEvents: 'none' }}>
              <div className='whitespace-nowrap border-b bg-white px-2 py-1 text-[16px] text-black'>
                Click thumbnail to view project
              </div>
            </Html>
          </group>
        )}
      </Billboard>
    </group>
  )
}

// ──────────────────────────────────────────────
// 그리드 라인
// ──────────────────────────────────────────────
function GridLines() {
  const size = 20
  const divisions = 20
  const step = size / divisions
  const halfSize = size / 2
  const gridColor = '#2eff2e'
  const axisColor = '#000000'
  const floorY = -size / 5
  const wallBaseY = -size / 5
  const backZ = -halfSize
  const sideX = halfSize

  const lines = useMemo(() => {
    const result: { points: [number, number, number][]; color: string; lineWidth: number }[] = []

    for (let i = 0; i <= divisions; i++) {
      const pos = -halfSize + i * step
      result.push({
        points: [
          [-halfSize, floorY, pos],
          [halfSize, floorY, pos],
        ],
        color: gridColor,
        lineWidth: 1.5,
      })
      result.push({
        points: [
          [pos, floorY, -halfSize],
          [pos, floorY, halfSize],
        ],
        color: gridColor,
        lineWidth: 1.5,
      })
    }
    for (let i = 0; i <= divisions; i++) {
      const posX = -halfSize + i * step
      const posY = i * step
      result.push({
        points: [
          [-halfSize, wallBaseY + posY, backZ],
          [halfSize, wallBaseY + posY, backZ],
        ],
        color: gridColor,
        lineWidth: 1.5,
      })
      result.push({
        points: [
          [posX, wallBaseY, backZ],
          [posX, wallBaseY + size, backZ],
        ],
        color: gridColor,
        lineWidth: 1.5,
      })
    }
    for (let i = 0; i <= divisions; i++) {
      const posZ = -halfSize + i * step
      const posY = i * step
      result.push({
        points: [
          [sideX, wallBaseY + posY, -halfSize],
          [sideX, wallBaseY + posY, halfSize],
        ],
        color: gridColor,
        lineWidth: 1.5,
      })
      result.push({
        points: [
          [sideX, wallBaseY, posZ],
          [sideX, wallBaseY + size, posZ],
        ],
        color: gridColor,
        lineWidth: 1.5,
      })
    }

    result.push({
      points: [
        [-10, -4, -10],
        [-10, 16, -10],
      ],
      color: axisColor,
      lineWidth: 3,
    })
    result.push({
      points: [
        [-10, -4, -10],
        [-10, -4, 10],
      ],
      color: axisColor,
      lineWidth: 3,
    })
    for (let i = 0; i <= 20; i++) {
      result.push({
        points: [
          [-9.5, -4 + i, -10],
          [-10.5, -4 + i, -10],
        ],
        color: axisColor,
        lineWidth: 2,
      })
    }
    for (let i = 0; i <= 20; i++) {
      result.push({
        points: [
          [-10.5, -4, -10 + i],
          [-9.5, -4, -10 + i],
        ],
        color: axisColor,
        lineWidth: 2,
      })
    }

    return result
  }, [backZ, floorY, halfSize, sideX, step, wallBaseY])

  return (
    <>
      {lines.map((line, i) => (
        <Line key={i} points={line.points} color={line.color} lineWidth={line.lineWidth} />
      ))}
    </>
  )
}

// ──────────────────────────────────────────────
// 좌표 이미지
// ──────────────────────────────────────────────
function CoordinateImages() {
  const texture1 = useLoader(THREE.TextureLoader, '/models/coordinate2.png')
  const texture2 = useLoader(THREE.TextureLoader, '/models/coordinate1.png')

  return (
    <>
      <mesh position={[2, -3, -10.5]}>
        <planeGeometry args={[8, 4]} />
        <meshBasicMaterial map={texture1} transparent opacity={0.9} />
      </mesh>
      <mesh position={[-11.5, -3, -4]} rotation={[-Math.PI / 2, 0, Math.PI / 2]}>
        <planeGeometry args={[8, 4]} />
        <meshBasicMaterial map={texture2} transparent opacity={0.9} side={THREE.DoubleSide} />
      </mesh>
    </>
  )
}

function MobileViewOffset({ offsetX, offsetY }: { offsetX: number; offsetY: number }) {
  const { camera, size } = useThree()
  const current = useRef({ x: offsetX, y: offsetY })

  useFrame((_, delta) => {
    const cam = camera as THREE.PerspectiveCamera
    const k = 1 - Math.exp(-delta * 4)
    current.current.x += (offsetX - current.current.x) * k
    current.current.y += (offsetY - current.current.y) * k
    const { x, y } = current.current
    if (Math.abs(x) > 0.01 || Math.abs(y) > 0.01) {
      cam.setViewOffset(size.width, size.height, x, y, size.width, size.height)
    } else if (cam.view?.enabled) {
      cam.clearViewOffset()
    }
  })

  useEffect(() => {
    const cam = camera as THREE.PerspectiveCamera
    return () => cam.clearViewOffset()
  }, [camera])

  return null
}

// ──────────────────────────────────────────────
// 메인 씬
// ──────────────────────────────────────────────
function Scene({
  selectedProject,
  particlePositions,
  onPositionsReady,
  controlsRef,
  onNavigate,
  sceneOffsetX,
  sceneOffsetY,
  zoomDistance,
  lookOffsetX,
}: {
  selectedProject: SelectedProjectState | null
  particlePositions: THREE.Vector3[]
  onPositionsReady: (positions: THREE.Vector3[]) => void
  controlsRef: React.RefObject<any>
  onNavigate: (project: Project) => void
  sceneOffsetX: number
  sceneOffsetY: number
  zoomDistance: number
  lookOffsetX: number
}) {
  const cameraTarget = selectedProject?.targetPosition ?? null

  const hiddenPointIndex = useMemo(() => {
    if (!selectedProject || particlePositions.length === 0) return null
    return selectedProject.index % particlePositions.length
  }, [selectedProject, particlePositions])

  return (
    <>
      <ambientLight intensity={1} />
      <OrbitControls
        ref={controlsRef}
        target={OVERVIEW_TARGET}
        enableDamping
        dampingFactor={0.05}
        minDistance={0.2}
        maxDistance={15}
      />

      <GridLines />

      <Suspense fallback={null}>
        <HeartPoints
          projectCount={heartProjects.length}
          onPositionsReady={onPositionsReady}
          hiddenPointIndex={hiddenPointIndex}
        />
        <CoordinateImages />
      </Suspense>

      <CameraAnimator
        target={cameraTarget}
        controlsRef={controlsRef}
        zoomDistance={zoomDistance}
        lookOffsetX={lookOffsetX}
      />

      {selectedProject && (
        <Suspense fallback={null}>
          <ProjectThumbnailBillboard
            project={selectedProject.project}
            position={selectedProject.targetPosition}
            onNavigate={onNavigate}
          />
        </Suspense>
      )}

      <MobileViewOffset offsetX={sceneOffsetX} offsetY={sceneOffsetY} />

      <EffectComposer>
        <Pixelation granularity={selectedProject ? 6.0 : 2.8} />
      </EffectComposer>
    </>
  )
}

export default function HeartMain() {
  const router = useRouter()
  const [selectedProject, setSelectedProject] = useState<SelectedProjectState | null>(null)
  const [particlePositions, setParticlePositions] = useState<THREE.Vector3[]>([])
  const controlsRef = useRef<any>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  const handlePositionsReady = useCallback((positions: THREE.Vector3[]) => {
    setParticlePositions(positions)
  }, [])

  const handleProjectClick = useCallback(
    (index: number) => {
      if (particlePositions.length === 0) return
      const targetPosition = particlePositions[index % particlePositions.length]
      // 이미 선택된 작업을 다시 클릭하면 선택 해제 → 원래 카메라 지점으로 복귀
      setSelectedProject((prev) =>
        prev?.index === index ? null : { project: heartProjects[index], index, targetPosition },
      )
    },
    [particlePositions],
  )

  const handleNavigate = useCallback(
    (project: Project) => {
      if (project.externalUrl) {
        window.open(project.externalUrl, '_blank', 'noopener,noreferrer')
      } else {
        router.push(`/works/${project.slug}`)
      }
    },
    [router],
  )

  return (
    <div className='absolute h-full min-h-dvh w-full bg-white'>
      <div className='absolute bottom-0 z-10 w-full p-4 md:left-2 md:top-[72px] md:w-[clamp(200px,33vw,50vw)]'>
        <div className='hidden md:block'>
          <HeartProjectList onProjectClick={handleProjectClick} selectedIndex={selectedProject?.index ?? null} />
        </div>
        <div className='block md:hidden'>
          <HeartProjectListMobile onProjectClick={handleProjectClick} selectedIndex={selectedProject?.index ?? null} />
        </div>
      </div>
      <div className='hidden md:block absolute bottom-0 left-0 right-0 z-[50] px-[30px] py-[12px] text-end text-label font-medium text-black'>
        I referenced this{' '}
        <a
          href='https://threejs.org/examples/webgl_postprocessing_pixel.html'
          target='_blank'
          rel='noopener noreferrer'
          className='text-blue-500 hover:underline'
        >
          code
        </a>
        .
      </div>

      <div className='h-full w-full'>
        <Canvas
          camera={{ position: OVERVIEW_POSITION, fov: 75, near: 0.1, far: 1000 }}
          gl={{ antialias: true }}
          onCreated={({ gl }) => {
            gl.setClearColor(0xffffff, 1)
          }}
        >
          <Suspense fallback={null}>
            <Scene
              selectedProject={selectedProject}
              particlePositions={particlePositions}
              onPositionsReady={handlePositionsReady}
              controlsRef={controlsRef}
              onNavigate={handleNavigate}
              sceneOffsetX={isMobile && !selectedProject ? MOBILE_SCENE_OFFSET_X : 0}
              sceneOffsetY={isMobile ? MOBILE_SCENE_OFFSET_Y : 0}
              zoomDistance={isMobile ? MOBILE_ZOOM_DISTANCE : ZOOM_DISTANCE}
              lookOffsetX={isMobile ? 0 : -0.1}
            />
          </Suspense>
        </Canvas>
      </div>
    </div>
  )
}

useGLTF.preload('/models/heart.glb')
