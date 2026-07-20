import { create } from 'zustand'

/**
 * Single source of truth for every tunable number behind the CylinderParticles scene
 * (camera orbit, flick physics, particle field shape/visuals). TuningPanel.tsx is a live
 * designer-facing UI on top of this store; CameraTiltRig and CylinderParticles read from
 * it directly via useSceneTuning() instead of hardcoded constants.
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
  radiusMin: number // distance from origin to the nearest particles (hollow center)
  radiusSpread: number // extra radius added on top of radiusMin, out to the farthest particles
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
  cameraMaxTilt: 0.7,
  cameraEase: 1,
  cameraFov: 60,

  particleCount: 190,
  pillRadius: 0.28,
  pillLength: 1,
  radiusMin: 0.3877,
  radiusSpread: 3.2308,
  scaleMin: 0.3508,
  scaleSpread: 0,

  fresnelPower: 0.85,

  fogNear: 8.9462,
  fogFar: 30.5385,

  flickImpulseScale: 9.2,
  flickDamping: 6.9,
  flickSpeedThreshold: 5,
  flickCooldownMin: 0.52,
  flickCooldownMax: 0.73,
}

interface SceneTuningStore extends SceneTuning {
  set: (partial: Partial<SceneTuning>) => void
  reset: () => void
}

export const useSceneTuning = create<SceneTuningStore>((set) => ({
  ...DEFAULT_SCENE_TUNING,
  set: (partial) => set(partial),
  reset: () => set(DEFAULT_SCENE_TUNING),
}))

/** Non-hook accessor for reading current values from inside R3F callbacks (useFrame, effects). */
export function getSceneTuning(): SceneTuning {
  return useSceneTuning.getState()
}
