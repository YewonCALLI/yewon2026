'use client'

import { Canvas, type CanvasProps } from '@react-three/fiber'
import CameraTiltRig from './CameraTiltRig'

interface SceneCanvasProps extends Omit<CanvasProps, 'children'> {
  children?: React.ReactNode
  className?: string
  tilt?: boolean
  tiltMax?: number
}

export default function SceneCanvas({
  children,
  className = '',
  tilt = true,
  tiltMax = 0.2,
  ...canvasProps
}: SceneCanvasProps) {
  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }} {...canvasProps}>
        {tilt && <CameraTiltRig maxTilt={tiltMax} />}
        {children}
      </Canvas>
    </div>
  )
}
