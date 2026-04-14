'use client'

import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import SceneCanvas from '@/components/three/core/SceneCanvas'

type PointerState = {
  x: number
  y: number
  active: boolean
}

function ChaosRig({ pointerRef }: { pointerRef: React.RefObject<PointerState> }) {
  useFrame(({ camera }) => {
    const pointer = pointerRef.current

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.45, 0.03)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, 1.75 + pointer.y * 0.15, 0.03)
    camera.lookAt(0, -0.45, 0)
  })

  return null
}

function DistortedGrid({ pointerRef }: { pointerRef: React.RefObject<PointerState> }) {
  const meshRef = useRef<THREE.Mesh>(null)

  const basePositions = useMemo(() => {
    const geometry = new THREE.PlaneGeometry(18, 10, 68, 42)
    return (geometry.attributes.position.array as Float32Array).slice()
  }, [])

  useFrame(({ clock }, delta) => {
    const mesh = meshRef.current
    if (!mesh) {
      return
    }

    const positions = mesh.geometry.attributes.position.array as Float32Array
    const time = clock.getElapsedTime()
    const pointer = pointerRef.current
    const cursorX = pointer.x * 4.2
    const cursorY = pointer.y * 2.5

    for (let i = 0; i < positions.length; i += 3) {
      const x = basePositions[i]
      const y = basePositions[i + 1]
      const distance = Math.hypot(x - cursorX, y - cursorY)
      const falloff = pointer.active ? THREE.MathUtils.smoothstep(Math.max(0, 1 - distance / 3.6), 0, 1) : 0
      const radialWave = Math.sin(distance * 3.2 - time * 4.2) * falloff * 0.78
      const pullX = pointer.active ? (cursorX - x) * falloff * 0.08 : 0
      const pullY = pointer.active ? (cursorY - y) * falloff * 0.05 : 0
      const targetX = x + pullX + Math.sin(y * 0.6 + time * 0.35) * 0.05
      const targetY = y + pullY + Math.cos(x * 0.4 - time * 0.28) * 0.04
      const targetZ =
        Math.sin(x * 0.95 + time * 0.95) * 0.34 +
        Math.cos(y * 1.15 - time * 0.82) * 0.23 +
        Math.sin((x + y) * 0.55 - time * 1.2) * 0.13 +
        radialWave

      positions[i] = THREE.MathUtils.damp(positions[i], targetX, 7, delta)
      positions[i + 1] = THREE.MathUtils.damp(positions[i + 1], targetY, 7, delta)
      positions[i + 2] = THREE.MathUtils.damp(positions[i + 2], targetZ, 7.5, delta)
    }

    mesh.geometry.attributes.position.needsUpdate = true
    mesh.rotation.z = Math.sin(time * 0.14) * 0.04
  })

  return (
    <mesh ref={meshRef} rotation={[-1.18, 0, 0]} position={[0, -1.3, -1.4]}>
      <planeGeometry args={[18, 10, 68, 42]} />
      <meshBasicMaterial
        color="#fb7185"
        wireframe
        transparent
        opacity={0.22}
        depthWrite={false}
      />
    </mesh>
  )
}

export default function ChaosScene() {
  const pointerRef = useRef<PointerState>({ x: 0, y: 0, active: false })

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1)

    pointerRef.current = { x, y, active: true }
  }

  function handlePointerLeave() {
    pointerRef.current = { x: 0, y: 0, active: false }
  }

  return (
    <div
      className="absolute inset-0"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
    >
      <SceneCanvas
        className="absolute inset-0 pointer-events-none"
        camera={{ position: [0, 1.75, 7.5], fov: 46, near: 0.1, far: 100 }}
      >
        <fog attach="fog" args={['#120508', 6.5, 15]} />
        <ChaosRig pointerRef={pointerRef} />
        <DistortedGrid pointerRef={pointerRef} />
      </SceneCanvas>
    </div>
  )
}
