'use client'

import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useIsPhone } from '@/hooks/useIsPhone'
import { useDeviceTilt } from '@/hooks/useDeviceTilt'

interface CameraTiltRigProps {
  maxTilt?: number // radians
  ease?: number
  /** Fired once gyro tilt needs an explicit permission grant (iOS/others). Wire this to a popup button that calls requestPermission(). */
  onNeedsPermission?: (requestPermission: () => Promise<boolean>) => void
  /** Fired when the user denies (or the device rejects) the gyro permission request. */
  onPermissionDenied?: () => void
}

export default function CameraTiltRig({ maxTilt = 0.2, ease = 0.06, onNeedsPermission, onPermissionDenied }: CameraTiltRigProps) {
  const { camera } = useThree()
  const isPhone = useIsPhone()
  const { needsPermission, isGyroActive, permissionDenied, orientation, requestPermission } = useDeviceTilt()
  const target = useRef({ x: 0, y: 0 })
  const baseRotation = useRef({ x: camera.rotation.x, y: camera.rotation.y })

  useEffect(() => {
    baseRotation.current = { x: camera.rotation.x, y: camera.rotation.y }
  }, [camera])

  useEffect(() => {
    if (isPhone && needsPermission && !isGyroActive) {
      onNeedsPermission?.(requestPermission)
    }
  }, [isPhone, needsPermission, isGyroActive, requestPermission, onNeedsPermission])

  useEffect(() => {
    if (permissionDenied) onPermissionDenied?.()
  }, [permissionDenied, onPermissionDenied])

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

  useFrame(() => {
    const targetRotationY = baseRotation.current.y + target.current.x * maxTilt
    const targetRotationX = baseRotation.current.x - target.current.y * maxTilt

    camera.rotation.x += (targetRotationX - camera.rotation.x) * ease
    camera.rotation.y += (targetRotationY - camera.rotation.y) * ease
  })

  return null
}
