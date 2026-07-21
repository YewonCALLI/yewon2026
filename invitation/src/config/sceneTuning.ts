import { create } from 'zustand'

/**
 * Single source of truth for every tunable number behind the CylinderParticles scene
 * (camera orbit, flick physics, particle field shape/visuals). TuningPanel.tsx is a live
 * designer-facing UI on top of this store; CameraTiltRig and CylinderParticles read from
 * it directly via useSceneTuning() instead of hardcoded constants.
 *
 * Mobile vs desktop: DEFAULT_SCENE_TUNING is the desktop baseline; MOBILE_SCENE_TUNING_OVERRIDES
 * holds only the fields that should differ on phones. SceneCanvas calls applyDevicePreset(isPhone)
 * (via useIsPhone) once on mount to resolve the store to the right branch.
 */
export interface SceneTuning {
  // camera orbit (CameraTiltRig) + lens (SceneCanvas)
  cameraMaxTilt: number // radians — max orbit swing away from the camera's starting view
  cameraEase: number // exponential follow rate per second; higher = snappier, lower = smoother
  cameraFov: number // degrees — PerspectiveCamera field of view

  // particle field shape (CylinderParticles)
  particleCount: number
  pillRadius: number // capsule cap/tube radius
  pillLength: number // capsule torso length
  radiusMin: number // distance from the tube axis to the nearest particles (hollow center)
  radiusSpread: number // extra radius added on top of radiusMin, out to the farthest particles
  cylinderHeight: number // full depth along the tube axis (Z) that particles are scattered across
  scaleMin: number // smallest overall per-particle scale
  scaleSpread: number // extra scale on top of scaleMin, up to the largest particles

  // particle visuals
  fresnelPower: number // soft-edge falloff exponent — higher = thinner/softer rim

  // fog (depth fade toward the background)
  fogNear: number
  fogFar: number

  // flick (tilt-driven particle "energy" that gates the color flicker)
  flickImpulseScale: number // how hard a fast tilt change pushes the energy value
  flickDamping: number // how quickly that energy value decays back down
  flickSpeedThreshold: number // energy must exceed this to trigger a color flicker
  flickCooldownMin: number // seconds
  flickCooldownMax: number // seconds
}

export const DEFAULT_SCENE_TUNING: SceneTuning = {
  cameraMaxTilt: 0.3,
  cameraEase: 1,
  cameraFov: 39,

  particleCount: 310,
  pillRadius: 0.25,
  pillLength: 3,
  radiusMin: 0.48,
  radiusSpread: 3.7108,
  cylinderHeight: 4.62,
  scaleMin: 0.1908,
  scaleSpread: 0.68,

  fresnelPower: 1.15,

  fogNear: 13.9462,
  fogFar: 40,

  flickImpulseScale: 9.2,
  flickDamping: 3,
  flickSpeedThreshold: 2.9,
  flickCooldownMin: 0.52,
  flickCooldownMax: 0.73,
}

/**
 * Mobile-only overrides layered on top of DEFAULT_SCENE_TUNING (see resolveSceneTuning).
 * Empty until a designer tunes the mobile branch in TuningPanel (open `?tuning` on a phone,
 * adjust, "Copy values", paste the fields that should differ from desktop in here.
 */
export const MOBILE_SCENE_TUNING_OVERRIDES: Partial<SceneTuning> = {
  cameraMaxTilt: 0.4,
  cameraEase: 1,
  cameraFov: 39,

  particleCount: 380,
  pillRadius: 0.2,
  pillLength: 3,
  radiusMin: 0.48,
  radiusSpread: 2.53,
  cylinderHeight: 4.62,
  scaleMin: 0.19,
  scaleSpread: 0.68,

  fresnelPower: 1.15,

  fogNear: 13.9,
  fogFar: 40,

  flickImpulseScale: 9.2,
  flickDamping: 3.2,
  flickSpeedThreshold: 2.9,
  flickCooldownMin: 0.52,
  flickCooldownMax: 0.73,
}

/** Desktop defaults, with MOBILE_SCENE_TUNING_OVERRIDES layered on top when isMobile is true. */
export function resolveSceneTuning(isMobile: boolean): SceneTuning {
  return isMobile ? { ...DEFAULT_SCENE_TUNING, ...MOBILE_SCENE_TUNING_OVERRIDES } : DEFAULT_SCENE_TUNING
}

interface SceneTuningStore extends SceneTuning {
  set: (partial: Partial<SceneTuning>) => void
  reset: () => void
  /** Re-resolves the whole store to the given device's defaults (desktop or desktop+mobile overrides). */
  applyDevicePreset: (isMobile: boolean) => void
}

export const useSceneTuning = create<SceneTuningStore>((set) => ({
  ...DEFAULT_SCENE_TUNING,
  set: (partial) => set(partial),
  reset: () => set(DEFAULT_SCENE_TUNING),
  applyDevicePreset: (isMobile) => set(resolveSceneTuning(isMobile)),
}))

/** Non-hook accessor for reading current values from inside R3F callbacks (useFrame, effects). */
export function getSceneTuning(): SceneTuning {
  return useSceneTuning.getState()
}
