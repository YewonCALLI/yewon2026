'use client'

import { Canvas, type CanvasProps } from '@react-three/fiber'
import CameraTiltRig from './CameraTiltRig'
import { Box, PerspectiveCamera } from '@react-three/drei'

interface SceneCanvasProps extends Omit<CanvasProps, 'children'> {
  // children?: React.ReactNode
  className?: string
  tilt?: boolean
  tiltMax?: number
  onTiltNeedsPermission?: (requestPermission: () => Promise<boolean>) => void
  onTiltPermissionDenied?: () => void
}

export default function SceneCanvas({
  // children,
  className = '',
  tilt = true,
  tiltMax = 0.2,
  onTiltNeedsPermission,
  onTiltPermissionDenied,
  ...canvasProps
}: SceneCanvasProps) {
  return (
    <div className={`absolute inset-0 z-0 ${className}`}>
      <Canvas dpr={[1, 2]} gl={{ antialias: true, alpha: true }} {...canvasProps}>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} fov={120} near={0.1} far={1000} />
        {tilt && (
          <CameraTiltRig
            maxTilt={tiltMax}
            onNeedsPermission={onTiltNeedsPermission}
            onPermissionDenied={onTiltPermissionDenied}
          />
        )}
        <axesHelper args={[5]} />
        <Box position={[0, 0, 0]} rotation={[0, 0, 0]} scale={1} />

        {/* {children} */}
      </Canvas>
    </div>
  )
}
