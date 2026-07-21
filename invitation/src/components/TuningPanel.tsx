'use client'

import { useEffect, useState } from 'react'
import { useControls, folder, button, LevaPanel, useCreateStore } from 'leva'
import { resolveSceneTuning, useSceneTuning } from '@/config/sceneTuning'
import { useIsPhone } from '@/hooks/useIsPhone'

/**
 * Designer-facing live tuning panel for the CylinderParticles scene. Hidden by default —
 * visit the page with `?tuning` in the URL to show it. Every control writes straight into
 * the shared sceneTuning store, so CameraTiltRig/CylinderParticles react immediately.
 * The panel seeds/resets from the resolved defaults for whichever device it's opened on
 * (see resolveSceneTuning), so tuning on a phone edits the mobile branch and tuning on
 * desktop edits the desktop branch. The "Copy values" button serializes the current store
 * as JSON to the clipboard so a designer can hand their tuned numbers back to the developer,
 * who pastes them into DEFAULT_SCENE_TUNING or MOBILE_SCENE_TUNING_OVERRIDES in
 * src/config/sceneTuning.ts to make them the new baseline.
 *
 * isPhone starts false and flips to true after mount (see useIsPhone) — useControls only
 * treats a schema's `value` as the control's *initial* value, so a plain re-render with a
 * different value doesn't update an already-created control. TuningPanel is keyed by isPhone
 * below so the whole inner panel (and its leva store) is freshly created once the device
 * resolves, instead of trying to patch an already-initialized desktop panel over to mobile.
 */
export default function TuningPanel() {
  const isPhone = useIsPhone()
  return <TuningPanelInner key={isPhone ? 'mobile' : 'desktop'} isPhone={isPhone} />
}

function TuningPanelInner({ isPhone }: { isPhone: boolean }) {
  // hidden unless the URL has `?tuning` — the doc comment above has always promised this,
  // but visible previously defaulted to true with nothing ever flipping it off
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    setVisible(new URLSearchParams(window.location.search).has('tuning'))
  }, [])
  const levaStore = useCreateStore()
  const set = useSceneTuning((s) => s.set)
  const applyDevicePreset = useSceneTuning((s) => s.applyDevicePreset)
  const DEFAULT_SCENE_TUNING = resolveSceneTuning(isPhone)

  useControls(
    {
      Camera: folder({
        cameraMaxTilt: {
          value: DEFAULT_SCENE_TUNING.cameraMaxTilt,
          min: 0,
          max: 2,
          step: 0.05,
          onChange: (v: number) => set({ cameraMaxTilt: v }),
        },
        cameraEase: {
          value: DEFAULT_SCENE_TUNING.cameraEase,
          min: 1,
          max: 40,
          step: 1,
          onChange: (v: number) => set({ cameraEase: v }),
        },
        cameraFov: {
          value: DEFAULT_SCENE_TUNING.cameraFov,
          min: 10,
          max: 140,
          step: 1,
          onChange: (v: number) => set({ cameraFov: v }),
        },
      }),
      'Particle field': folder({
        particleCount: {
          value: DEFAULT_SCENE_TUNING.particleCount,
          min: 20,
          max: 800,
          step: 10,
          onChange: (v: number) => set({ particleCount: v }),
        },
        pillRadius: {
          value: DEFAULT_SCENE_TUNING.pillRadius,
          min: 0.05,
          max: 1.5,
          step: 0.01,
          onChange: (v: number) => set({ pillRadius: v }),
        },
        pillLength: {
          value: DEFAULT_SCENE_TUNING.pillLength,
          min: 0.05,
          max: 3,
          step: 0.01,
          onChange: (v: number) => set({ pillLength: v }),
        },
        radiusMin: {
          value: DEFAULT_SCENE_TUNING.radiusMin,
          min: 0,
          max: 5,
          step: 0.01,
          onChange: (v: number) => set({ radiusMin: v }),
        },
        radiusSpread: {
          value: DEFAULT_SCENE_TUNING.radiusSpread,
          min: 0,
          max: 10,
          step: 0.01,
          onChange: (v: number) => set({ radiusSpread: v }),
        },
        cylinderHeight: {
          value: DEFAULT_SCENE_TUNING.cylinderHeight,
          min: 0,
          max: 10,
          step: 0.01,
          onChange: (v: number) => set({ cylinderHeight: v }),
        },
        scaleMin: {
          value: DEFAULT_SCENE_TUNING.scaleMin,
          min: 0.01,
          max: 1,
          step: 0.01,
          onChange: (v: number) => set({ scaleMin: v }),
        },
        scaleSpread: {
          value: DEFAULT_SCENE_TUNING.scaleSpread,
          min: 0,
          max: 1,
          step: 0.01,
          onChange: (v: number) => set({ scaleSpread: v }),
        },
      }),
      Visuals: folder({
        fresnelPower: {
          value: DEFAULT_SCENE_TUNING.fresnelPower,
          min: 0.1,
          max: 6,
          step: 0.05,
          onChange: (v: number) => set({ fresnelPower: v }),
        },
        fogNear: {
          value: DEFAULT_SCENE_TUNING.fogNear,
          min: 0,
          max: 20,
          step: 0.1,
          onChange: (v: number) => set({ fogNear: v }),
        },
        fogFar: {
          value: DEFAULT_SCENE_TUNING.fogFar,
          min: 0,
          max: 40,
          step: 0.1,
          onChange: (v: number) => set({ fogFar: v }),
        },
      }),
      Flick: folder({
        flickImpulseScale: {
          value: DEFAULT_SCENE_TUNING.flickImpulseScale,
          min: 0,
          max: 10,
          step: 0.1,
          onChange: (v: number) => set({ flickImpulseScale: v }),
        },
        flickDamping: {
          value: DEFAULT_SCENE_TUNING.flickDamping,
          min: 0.1,
          max: 8,
          step: 0.1,
          onChange: (v: number) => set({ flickDamping: v }),
        },
        flickSpeedThreshold: {
          value: DEFAULT_SCENE_TUNING.flickSpeedThreshold,
          min: 0,
          max: 5,
          step: 0.05,
          onChange: (v: number) => set({ flickSpeedThreshold: v }),
        },
        flickCooldownMin: {
          value: DEFAULT_SCENE_TUNING.flickCooldownMin,
          min: 0,
          max: 1,
          step: 0.01,
          onChange: (v: number) => set({ flickCooldownMin: v }),
        },
        flickCooldownMax: {
          value: DEFAULT_SCENE_TUNING.flickCooldownMax,
          min: 0,
          max: 1,
          step: 0.01,
          onChange: (v: number) => set({ flickCooldownMax: v }),
        },
      }),
      'Copy values': button(() => {
        const { set: _set, reset: _reset, ...values } = useSceneTuning.getState()
        const text = JSON.stringify(values, null, 2)
        navigator.clipboard
          .writeText(text)
          .then(() => console.log('[TuningPanel] Copied scene tuning to clipboard:\n' + text))
          .catch(() => console.log('[TuningPanel] Clipboard write failed — values:\n' + text))
      }),
      Reset: button(() => {
        applyDevicePreset(isPhone)
        // leva keeps its own displayed values separately from the zustand store — push the
        // defaults back into the panel too, or the sliders would look stale after a reset
        levaStore.set(DEFAULT_SCENE_TUNING, false)
      }),
    },
    { store: levaStore },
  )

  if (!visible) return null

  return (
    <LevaPanel
      store={levaStore}
      titleBar={{ title: `Scene Tuning (${isPhone ? 'Mobile' : 'Desktop'})` }}
      collapsed={true}
    />
  )
}
