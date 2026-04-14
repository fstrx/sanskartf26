'use client'

import { useMemo, useState } from 'react'
import { Html, Line } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from 'three'
import SceneCanvas from '@/components/three/core/SceneCanvas'
import type { Step } from '@/lib/content'

type UnderstandingSceneProps = {
  steps: Step[]
  activeIndex: number
  onSelect: (index: number) => void
}

function CameraRig() {
  useFrame(({ camera, pointer }) => {
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.4, 0.04)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.2, 0.04)
    camera.lookAt(0, 0, 0)
  })

  return null
}

function ConceptNetwork({
  steps,
  activeIndex,
  onSelect,
}: UnderstandingSceneProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)
  const viewport = useThree((state) => state.viewport)
  const spreadX = THREE.MathUtils.clamp(viewport.width * 0.32, 1.4, 2.55)
  const spreadY = THREE.MathUtils.clamp(viewport.height * 0.24, 0.9, 1.45)

  const basePositions = useMemo(
    () => [
      new THREE.Vector3(-spreadX, spreadY, -0.25),
      new THREE.Vector3(-spreadX * 0.5, -spreadY * 0.56, 0.65),
      new THREE.Vector3(0.06, spreadY * 0.72, -0.45),
      new THREE.Vector3(spreadX * 0.65, -spreadY * 0.2, 0.55),
      new THREE.Vector3(spreadX, spreadY * 0.54, -0.15),
    ],
    [spreadX, spreadY]
  )

  const positions = useMemo(() => basePositions.map((position) => position.clone()), [basePositions])

  const connections = [
    [0, 1],
    [1, 2],
    [2, 3],
    [3, 4],
    [0, 2],
    [1, 3],
    [2, 4],
  ] as const

  useFrame(({ clock }) => {
    const time = clock.getElapsedTime()

    positions.forEach((position, index) => {
      position.x = basePositions[index].x
      position.y = basePositions[index].y + Math.sin(time * 0.6 + index * 0.8) * 0.08
      position.z = basePositions[index].z + Math.sin(time * 0.65 + index * 0.9) * 0.24
    })
  })

  return (
    <group>
      {connections.map(([start, end]) => {
        const isConnected = start === activeIndex || end === activeIndex

        return (
          <Line
            key={`${start}-${end}`}
            points={[positions[start], positions[end]]}
            color={isConnected ? '#7dd3fc' : '#4f46e5'}
            transparent
            opacity={isConnected ? 0.72 : 0.24}
            lineWidth={1.2}
          />
        )
      })}

      {steps.map((step, index) => {
        const position = positions[index]
        const isActive = activeIndex === index
        const isHovered = hoveredIndex === index
        const color = isActive ? '#7dd3fc' : isHovered ? '#c4b5fd' : '#6366f1'
        const scale = isActive ? 1.35 : isHovered ? 1.18 : 1

        return (
          <group key={step.step} position={position}>
            <mesh
              scale={scale}
              onPointerOver={(event) => {
                event.stopPropagation()
                setHoveredIndex(index)
              }}
              onPointerOut={() => setHoveredIndex(null)}
              onClick={(event) => {
                event.stopPropagation()
                onSelect(index)
              }}
              onPointerDown={(event) => {
                event.stopPropagation()
                onSelect(index)
              }}
            >
              <sphereGeometry args={[0.18, 24, 24]} />
              <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.8} />
            </mesh>

            <mesh
              scale={scale * 2.9}
              onPointerOver={(event) => {
                event.stopPropagation()
                setHoveredIndex(index)
              }}
              onPointerOut={() => setHoveredIndex(null)}
              onClick={(event) => {
                event.stopPropagation()
                onSelect(index)
              }}
              onPointerDown={(event) => {
                event.stopPropagation()
                onSelect(index)
              }}
            >
              <sphereGeometry args={[0.18, 18, 18]} />
              <meshBasicMaterial transparent opacity={0} depthWrite={false} />
            </mesh>

            <mesh scale={scale * 1.85}>
              <sphereGeometry args={[0.18, 24, 24]} />
              <meshBasicMaterial
                color={color}
                transparent
                opacity={isActive ? 0.16 : 0.06}
                blending={THREE.AdditiveBlending}
                depthWrite={false}
              />
            </mesh>

            {(isActive || isHovered) && (
              <Html center distanceFactor={8.5} position={[0, 0.42, 0]}>
                <div className="max-w-[11rem] rounded-2xl border border-white/15 bg-slate-950/80 px-3 py-2 text-center text-[10px] font-semibold uppercase tracking-[0.24em] text-white shadow-[0_0_30px_rgba(79,70,229,0.25)] backdrop-blur-md whitespace-normal text-pretty">
                  {step.title}
                </div>
              </Html>
            )}
          </group>
        )
      })}
    </group>
  )
}

export default function UnderstandingScene(props: UnderstandingSceneProps) {
  return (
    <SceneCanvas
      className="absolute inset-0"
      camera={{ position: [0, 0, 6.1], fov: 42, near: 0.1, far: 100 }}
    >
      <fog attach="fog" args={['#060812', 5.5, 10]} />
      <ambientLight intensity={0.35} />
      <pointLight position={[0, 1.5, 3]} color="#7dd3fc" intensity={7} distance={10} />
      <pointLight position={[2.8, -1.5, 2.5]} color="#8b5cf6" intensity={5} distance={9} />
      <CameraRig />
      <ConceptNetwork {...props} />
    </SceneCanvas>
  )
}
