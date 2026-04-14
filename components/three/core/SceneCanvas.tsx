'use client'

import { Suspense, type ReactNode } from 'react'
import { Canvas, type CanvasProps } from '@react-three/fiber'

type SceneCanvasProps = {
  children: ReactNode
  className?: string
} & Omit<CanvasProps, 'children'>

export default function SceneCanvas({
  children,
  className,
  camera = { position: [0, 0, 5.5], fov: 45, near: 0.1, far: 100 },
  dpr = [1, 1.5],
  gl = { antialias: true, alpha: true, powerPreference: 'high-performance' },
  ...canvasProps
}: SceneCanvasProps) {
  return (
    <Canvas
      className={className}
      camera={camera}
      dpr={dpr}
      gl={gl}
      {...canvasProps}
    >
      <Suspense fallback={null}>{children}</Suspense>
    </Canvas>
  )
}
