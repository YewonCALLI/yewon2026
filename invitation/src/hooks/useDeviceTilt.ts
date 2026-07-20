'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

interface DeviceOrientationEventConstructor {
  requestPermission?: () => Promise<'granted' | 'denied'>
}

export interface DeviceTiltOrientation {
  beta: number
  gamma: number
}

function normalizeOrientation(betaRaw: number, gammaRaw: number) {
  const type = (screen.orientation && (screen.orientation as any).type) as
    | 'portrait-primary'
    | 'portrait-secondary'
    | 'landscape-primary'
    | 'landscape-secondary'
    | string
    | undefined

  if (type) {
    switch (true) {
      case /portrait-primary/.test(type):
        return { beta: betaRaw, gamma: gammaRaw }
      case /portrait-secondary/.test(type):
        return { beta: -betaRaw, gamma: -gammaRaw }
      case /landscape-primary/.test(type):
        return { beta: -gammaRaw, gamma: betaRaw }
      case /landscape-secondary/.test(type):
        return { beta: gammaRaw, gamma: -betaRaw }
    }
  }

  const rawAngle =
    typeof (window as any).orientation === 'number'
      ? ((window as any).orientation as number)
      : typeof screen.orientation?.angle === 'number'
        ? (screen.orientation!.angle as number)
        : 0

  const angle = ((rawAngle % 360) + 360) % 360

  if (angle === 0) return { beta: betaRaw, gamma: gammaRaw }
  if (angle === 180) return { beta: -betaRaw, gamma: -gammaRaw }
  if (angle === 90) return { beta: gammaRaw, gamma: -betaRaw }
  return { beta: -gammaRaw, gamma: betaRaw }
}

/**
 * Tracks device tilt via the DeviceOrientation API, gated behind an explicit
 * `requestPermission()` call (iOS requires a real user gesture; other platforms
 * are activated the same way for a consistent, deliberate opt-in flow).
 */
export function useDeviceTilt() {
  const [isSupported, setIsSupported] = useState(false)
  const [needsPermission, setNeedsPermission] = useState(false)
  const [isGyroActive, setIsGyroActive] = useState(false)
  const [permissionDenied, setPermissionDenied] = useState(false)
  const [orientation, setOrientation] = useState<DeviceTiltOrientation>({ beta: 0, gamma: 0 })

  const baselineRef = useRef<DeviceTiltOrientation | null>(null)
  const calibratingRef = useRef(false)

  const resetCalibration = useCallback(() => {
    calibratingRef.current = true
    baselineRef.current = null
    setOrientation({ beta: 0, gamma: 0 })
  }, [])

  useEffect(() => {
    if (typeof window === 'undefined' || typeof DeviceOrientationEvent === 'undefined') {
      setIsSupported(false)
      return
    }
    setIsSupported(true)
    const DOE = DeviceOrientationEvent as unknown as DeviceOrientationEventConstructor
    setNeedsPermission(typeof DOE.requestPermission === 'function')
  }, [])

  useEffect(() => {
    const onOrientChange = () => resetCalibration()
    window.addEventListener('orientationchange', onOrientChange)
    ;(screen.orientation as any)?.addEventListener?.('change', onOrientChange)
    return () => {
      window.removeEventListener('orientationchange', onOrientChange)
      ;(screen.orientation as any)?.removeEventListener?.('change', onOrientChange)
    }
  }, [resetCalibration])

  useEffect(() => {
    if (!isGyroActive) return

    const handleDeviceOrientation = (event: DeviceOrientationEvent) => {
      const { beta: b, gamma: g } = event
      if (b == null || g == null) return

      const { beta: nb, gamma: ng } = normalizeOrientation(b, g)

      if (calibratingRef.current) {
        baselineRef.current = { beta: nb, gamma: ng }
        calibratingRef.current = false
        setOrientation({ beta: 0, gamma: 0 })
        return
      }

      const base = baselineRef.current ?? { beta: 0, gamma: 0 }
      setOrientation({
        beta: Math.max(-45, Math.min(45, nb - base.beta)),
        gamma: Math.max(-45, Math.min(45, ng - base.gamma)),
      })
    }

    window.addEventListener('deviceorientation', handleDeviceOrientation)
    return () => window.removeEventListener('deviceorientation', handleDeviceOrientation)
  }, [isGyroActive])

  const requestPermission = useCallback(async () => {
    if (typeof DeviceOrientationEvent === 'undefined') {
      setPermissionDenied(true)
      return false
    }

    const DOE = DeviceOrientationEvent as unknown as DeviceOrientationEventConstructor

    if (typeof DOE.requestPermission === 'function') {
      try {
        const result = await DOE.requestPermission()
        if (result === 'granted') {
          resetCalibration()
          setIsGyroActive(true)
          setPermissionDenied(false)
          return true
        }
        setPermissionDenied(true)
        return false
      } catch {
        setPermissionDenied(true)
        return false
      }
    }

    resetCalibration()
    setIsGyroActive(true)
    return true
  }, [resetCalibration])

  return {
    isSupported,
    needsPermission,
    isGyroActive,
    permissionDenied,
    orientation,
    requestPermission,
  }
}
