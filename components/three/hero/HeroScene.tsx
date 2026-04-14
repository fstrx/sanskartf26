'use client'

import type { MutableRefObject } from 'react'
import { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import SceneCanvas from '@/components/three/core/SceneCanvas'

type PointerState = {
  x: number
  y: number
  targetX: number
  targetY: number
  vx: number
  vy: number
  motion: number
  active: boolean
}

type PulseState = {
  x: number
  y: number
  strength: number
}

function seedNoise(seed: number) {
  const value = Math.sin(seed * 127.1) * 43758.5453123
  return value - Math.floor(value)
}

function CameraRig({ pointerRef, convergenceRef }: {
  pointerRef: MutableRefObject<PointerState>
  convergenceRef: MutableRefObject<number>
}) {
  useFrame(({ camera }) => {
    const pointer = pointerRef.current
    const pull = convergenceRef.current

    camera.position.x = THREE.MathUtils.lerp(camera.position.x, pointer.x * 0.4, 0.06)
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, pointer.y * 0.32, 0.06)
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, 5.4 - pull * 0.15, 0.03)
    camera.lookAt(0, 0, 0)
  })

  return null
}

function UnityCore({ convergenceRef }: { convergenceRef: MutableRefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshBasicMaterial>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current || !materialRef.current) {
      return
    }

    const pulse = 0.92 + Math.sin(clock.getElapsedTime() * 1.8) * 0.03
    const converge = convergenceRef.current

    meshRef.current.scale.setScalar(pulse + converge * 0.35)
    materialRef.current.opacity = 0.1 + converge * 0.22
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.38, 32, 32]} />
      <meshBasicMaterial
        ref={materialRef}
        color="#7dd3fc"
        transparent
        opacity={0.12}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

function HeroParticles({
  pointerRef,
  pulseRef,
  convergenceRef,
}: {
  pointerRef: MutableRefObject<PointerState>
  pulseRef: MutableRefObject<PulseState>
  convergenceRef: MutableRefObject<number>
}) {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.PointsMaterial>(null)

  const { basePositions, colors, phases } = useMemo(() => {
    const count = 1800
    const positions = new Float32Array(count * 3)
    const palette = new Float32Array(count * 3)
    const phaseOffsets = new Float32Array(count)

    for (let i = 0; i < count; i += 1) {
      const radius = 0.7 + seedNoise(i + 1) * 2.2
      const theta = seedNoise(i + 17) * Math.PI * 2
      const phi = Math.acos(1 - 2 * seedNoise(i + 31))

      positions[i * 3] = Math.sin(phi) * Math.cos(theta) * radius * 1.2
      positions[i * 3 + 1] = Math.cos(phi) * radius * 0.75
      positions[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * radius * 1.5 - 0.3
      phaseOffsets[i] = seedNoise(i + 73) * Math.PI * 2

      const tone = i % 3
      if (tone === 0) {
        palette[i * 3] = 0.43
        palette[i * 3 + 1] = 0.72
        palette[i * 3 + 2] = 0.98
      } else if (tone === 1) {
        palette[i * 3] = 0.57
        palette[i * 3 + 1] = 0.45
        palette[i * 3 + 2] = 0.96
      } else {
        palette[i * 3] = 0.35
        palette[i * 3 + 1] = 0.96
        palette[i * 3 + 2] = 0.8
      }
    }

    return { basePositions: positions, colors: palette, phases: phaseOffsets }
  }, [])

  useFrame(({ clock }, delta) => {
    const points = pointsRef.current
    const material = materialRef.current
    if (!points || !material) {
      return
    }

    const time = clock.getElapsedTime()
    const positions = points.geometry.attributes.position.array as Float32Array
    const pointer = pointerRef.current
    pointer.x = THREE.MathUtils.damp(pointer.x, pointer.active ? pointer.targetX : 0, 7.5, delta)
    pointer.y = THREE.MathUtils.damp(pointer.y, pointer.active ? pointer.targetY : 0, 7.5, delta)
    pointer.vx = THREE.MathUtils.damp(pointer.vx, 0, 9, delta)
    pointer.vy = THREE.MathUtils.damp(pointer.vy, 0, 9, delta)
    pointer.motion = THREE.MathUtils.damp(pointer.motion, pointer.active ? 0.22 : 0, 5.5, delta)

    const cursorX = pointer.x * 2.6
    const cursorY = pointer.y * 1.45
    const tangentX = -pointer.vy
    const tangentY = pointer.vx
    const pulse = pulseRef.current
    const convergence = convergenceRef.current

    for (let i = 0; i < positions.length; i += 3) {
      const baseX = basePositions[i]
      const baseY = basePositions[i + 1]
      const baseZ = basePositions[i + 2]
      const particleIndex = i / 3
      const dx = baseX - cursorX
      const dy = baseY - cursorY
      const distance = Math.hypot(dx, dy)
      const influence = pointer.active ? Math.max(0, 1 - distance / 1.7) : 0
      const focus = influence * influence
      const directionX = distance > 0.001 ? dx / distance : 0
      const directionY = distance > 0.001 ? dy / distance : 0
      const wake = focus * (0.12 + pointer.motion * 0.32)
      const swirl = focus * pointer.motion * 0.18
      const drift = Math.sin(time * 0.55 + phases[particleIndex]) * 0.06
      const shimmer = Math.cos(time * 0.42 + phases[particleIndex] * 0.7) * 0.045

      const pulseDx = baseX - pulse.x
      const pulseDy = baseY - pulse.y
      const pulseDistance = Math.hypot(pulseDx, pulseDy)
      const pulseInfluence = Math.max(0, 1 - pulseDistance / 2.1)
      const pulseFocus = pulse.strength * pulseInfluence * pulseInfluence
      const pulseDirectionX = pulseDistance > 0.001 ? pulseDx / pulseDistance : 0
      const pulseDirectionY = pulseDistance > 0.001 ? pulseDy / pulseDistance : 0
      const centerPull = convergence * 0.22

      const targetX = baseX
        + directionX * wake
        + tangentX * swirl
        - pulseDirectionX * pulseFocus * 0.26
        - baseX * centerPull
        + drift
      const targetY = baseY
        + directionY * wake
        + tangentY * swirl
        - pulseDirectionY * pulseFocus * 0.26
        - baseY * centerPull
        + shimmer * 0.75
      const targetZ = baseZ
        - baseZ * centerPull
        + focus * (0.06 + pointer.motion * 0.18)
        + pulseFocus * 0.36
        + shimmer

      positions[i] = THREE.MathUtils.damp(positions[i], targetX, 5.8, delta)
      positions[i + 1] = THREE.MathUtils.damp(positions[i + 1], targetY, 5.8, delta)
      positions[i + 2] = THREE.MathUtils.damp(positions[i + 2], targetZ, 5.8, delta)
    }

    convergenceRef.current = Math.max(0, convergenceRef.current - delta * 0.6)
    pulse.strength = Math.max(0, pulse.strength - delta * 1.75)
    points.geometry.attributes.position.needsUpdate = true
    points.rotation.y = time * 0.042 + pointer.x * 0.045
    points.rotation.x = Math.sin(time * 0.18) * 0.06 + pointer.y * 0.03
    material.size = 0.041 + pointer.motion * 0.008 + pulse.strength * 0.012
    material.opacity = 0.88 + pulse.strength * 0.08
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[basePositions.slice(), 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
        size={0.042}
        vertexColors
        transparent
        opacity={0.92}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

export default function HeroScene() {
  const pointerRef = useRef<PointerState>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
    vx: 0,
    vy: 0,
    motion: 0,
    active: false,
  })
  const pulseRef = useRef<PulseState>({ x: 0, y: 0, strength: 0 })
  const convergenceRef = useRef(0)

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1)
    const pointer = pointerRef.current
    const deltaX = x - pointer.targetX
    const deltaY = y - pointer.targetY
    const motion = Math.min(1, Math.hypot(deltaX, deltaY) * 3.2)

    pointer.targetX = x
    pointer.targetY = y
    pointer.vx = THREE.MathUtils.clamp(deltaX * 2.4, -1, 1)
    pointer.vy = THREE.MathUtils.clamp(deltaY * 2.4, -1, 1)
    pointer.motion = Math.max(pointer.motion, motion)
    pointer.active = true
  }

  function handlePointerLeave() {
    const pointer = pointerRef.current
    pointer.targetX = 0
    pointer.targetY = 0
    pointer.motion = Math.min(pointer.motion, 0.18)
    pointer.active = false
  }

  function handleClick() {
    const pointer = pointerRef.current
    pulseRef.current.x = pointer.x * 2.6
    pulseRef.current.y = pointer.y * 1.45
    pulseRef.current.strength = 1
    convergenceRef.current = 1
  }

  return (
    <div
      className="absolute inset-0"
      onPointerMove={handlePointerMove}
      onPointerLeave={handlePointerLeave}
      onClick={handleClick}
    >
      <SceneCanvas
        className="absolute inset-0 pointer-events-none"
        camera={{ position: [0, 0, 5.4], fov: 45, near: 0.1, far: 100 }}
      >
        <fog attach="fog" args={['#050611', 4.5, 10]} />
        <CameraRig pointerRef={pointerRef} convergenceRef={convergenceRef} />
        <UnityCore convergenceRef={convergenceRef} />
        <HeroParticles pointerRef={pointerRef} pulseRef={pulseRef} convergenceRef={convergenceRef} />
      </SceneCanvas>
    </div>
  )
}
