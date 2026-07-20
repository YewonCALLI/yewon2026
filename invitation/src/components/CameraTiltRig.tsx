'use client'

import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import { useIsPhone } from '@/hooks/useIsPhone'
import { useDeviceTilt, type DeviceTiltOrientation } from '@/hooks/useDeviceTilt'
import { useSceneTuning } from '@/config/sceneTuning'

export interface TiltState {
  needsPermission: boolean
  isGyroActive: boolean
  permissionDenied: boolean
  orientation: DeviceTiltOrientation
  requestPermission: () => Promise<boolean>
}

interface CameraTiltRigProps {
  /** Fired whenever the internal gyro-permission state changes, so a parent can drive a permission popup off of it. */
  onTiltStateChange?: (state: TiltState) => void
  /** Optional external ref to publish the raw (-1..1, unsmoothed) tilt target into, so other scene elements can react to the same input. */
  targetRef?: React.MutableRefObject<{ x: number; y: number }>
}

export default function CameraTiltRig({ onTiltStateChange, targetRef }: CameraTiltRigProps) {
  const { camera } = useThree()
  const isPhone = useIsPhone()
  const { needsPermission, isGyroActive, permissionDenied, orientation, requestPermission } = useDeviceTilt()
  const internalTarget = useRef({ x: 0, y: 0 })
  const target = targetRef ?? internalTarget

  useEffect(() => {
    onTiltStateChange?.({ needsPermission, isGyroActive, permissionDenied, orientation, requestPermission })
  }, [needsPermission, isGyroActive, permissionDenied, orientation, requestPermission, onTiltStateChange])

  // orbits the camera around the origin (like OrbitControls, but driven by mouse/gyro instead of
  // drag) — baseSpherical captures whatever position the camera was mounted with, so tilting swings
  // azimuth/elevation around that starting view instead of resetting it. Position changes, never
  // a plain X/Y translation — the camera always looks at the origin.
  const baseSpherical = useRef(new THREE.Spherical())
  const spherical = useRef(new THREE.Spherical())

  useEffect(() => {
    baseSpherical.current.setFromVector3(camera.position)
    spherical.current.copy(baseSpherical.current)
  }, [camera])

  useEffect(() => {
    if (isPhone) {
      target.current.x = Math.max(-1, Math.min(1, orientation.gamma / 45))
      target.current.y = Math.max(-1, Math.min(1, orientation.beta / 45))
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isPhone, orientation])

  useFrame((_, delta) => {
    // read imperatively (not the reactive hook) so tuning-panel changes apply instantly
    // without subscribing this component to re-render on every store update
    const { cameraMaxTilt: maxTilt, cameraEase: ease } = useSceneTuning.getState()
    const dt = Math.min(delta, 0.05)
    const k = 1 - Math.exp(-ease * dt)

    const targetTheta = baseSpherical.current.theta + target.current.x * maxTilt
    const targetPhi = THREE.MathUtils.clamp(baseSpherical.current.phi - target.current.y * maxTilt, 0.05, Math.PI - 0.05)

    spherical.current.theta += (targetTheta - spherical.current.theta) * k
    spherical.current.phi += (targetPhi - spherical.current.phi) * k

    camera.position.setFromSpherical(spherical.current)
    camera.lookAt(0, 0, 0)
  })

  return null
}
