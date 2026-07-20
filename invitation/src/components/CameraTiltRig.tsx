'use client'

import { useEffect, useRef } from 'react'
import { useFrame, useThree } from '@react-three/fiber'
import { useIsPhone } from '@/hooks/useIsPhone'

interface DeviceOrientationEventConstructor {
  requestPermission?: () => Promise<'granted' | 'denied'>
}

interface CameraTiltRigProps {
  maxTilt?: number // radians
  ease?: number
}

export default function CameraTiltRig({ maxTilt = 0.2, ease = 0.06 }: CameraTiltRigProps) {
  const { camera } = useThree()
  const isPhone = useIsPhone()
  const target = useRef({ x: 0, y: 0 })
  const baseOrientation = useRef<{ beta: number; gamma: number } | null>(null)
  const baseRotation = useRef({ x: camera.rotation.x, y: camera.rotation.y })

  useEffect(() => {
    baseRotation.current = { x: camera.rotation.x, y: camera.rotation.y }
  }, [camera])

  useEffect(() => {
    if (isPhone) {
      const handleOrientation = (e: DeviceOrientationEvent) => {
        const { beta, gamma } = e
        if (beta == null || gamma == null) return

        if (!baseOrientation.current) {
          baseOrientation.current = { beta, gamma }
        }

        const deltaBeta = beta - baseOrientation.current.beta
        const deltaGamma = gamma - baseOrientation.current.gamma

        target.current.x = Math.max(-1, Math.min(1, deltaGamma / 45))
        target.current.y = Math.max(-1, Math.min(1, deltaBeta / 45))
      }

      const DOE = DeviceOrientationEvent as unknown as DeviceOrientationEventConstructor
      const needsPermission = typeof DOE?.requestPermission === 'function'

      if (!needsPermission) {
        window.addEventListener('deviceorientation', handleOrientation)
        return () => window.removeEventListener('deviceorientation', handleOrientation)
      }

      const requestOnGesture = () => {
        DOE.requestPermission?.()
          .then((result) => {
            if (result === 'granted') {
              window.addEventListener('deviceorientation', handleOrientation)
            }
          })
          .catch(() => {})
      }
      window.addEventListener('touchend', requestOnGesture, { once: true })

      return () => {
        window.removeEventListener('touchend', requestOnGesture)
        window.removeEventListener('deviceorientation', handleOrientation)
      }
    }

    const handleMouseMove = (e: MouseEvent) => {
      target.current.x = (e.clientX / window.innerWidth) * 2 - 1
      target.current.y = (e.clientY / window.innerHeight) * 2 - 1
    }
    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [isPhone])

  useFrame(() => {
    const targetRotationY = baseRotation.current.y + target.current.x * maxTilt
    const targetRotationX = baseRotation.current.x - target.current.y * maxTilt

    camera.rotation.x += (targetRotationX - camera.rotation.x) * ease
    camera.rotation.y += (targetRotationY - camera.rotation.y) * ease
  })

  return null
}
