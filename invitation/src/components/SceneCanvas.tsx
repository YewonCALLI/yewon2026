'use client'

import { useRef } from 'react'
import { Canvas, type CanvasProps } from '@react-three/fiber'
import CameraTiltRig, { type TiltState } from './CameraTiltRig'
import CylinderParticles from './CylinderParticles'
import TuningPanel from './TuningPanel'
import { PerspectiveCamera } from '@react-three/drei'
import { useSceneTuning } from '@/config/sceneTuning'

interface SceneCanvasProps extends Omit<CanvasProps, 'children'> {
  // children?: React.ReactNode
  className?: string
  onTiltStateChange?: (state: TiltState) => void
}

export default function SceneCanvas({
  // children,
  className = '',
  onTiltStateChange,
  ...canvasProps
}: SceneCanvasProps) {
  // raw (-1..1, unsmoothed) tilt target shared between CameraTiltRig and CylinderParticles,
  // so the particle flick reacts to the same input driving the camera orbit
  const tiltRef = useRef({ x: 0, y: 0 })
  const cameraFov = useSceneTuning((s) => s.cameraFov)

  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }} {...canvasProps}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={cameraFov} near={0.1} far={1000} />
        <CameraTiltRig onTiltStateChange={onTiltStateChange} targetRef={tiltRef} />
        <CylinderParticles tiltRef={tiltRef} />

        {/* {children} */}
      </Canvas>
    </div>
  )
}
