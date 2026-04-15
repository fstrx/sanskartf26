'use client'

import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import SceneCanvas from '@/components/three/core/SceneCanvas'

type PointerState = {
  x: number
  y: number
  active: boolean
}

type Ripple = {
  x: number
  y: number
  start: number
}

type PointerController = {
  x: number
  y: number
  active: boolean
}

type CenterpieceSceneProps = {
  harmonyProgress: number
  onModeChange?: (mode: 'repel' | 'attract') => void
}

function seedNoise(seed: number) {
  const value = Math.sin(seed * 127.1) * 43758.5453123
  return value - Math.floor(value)
}

function createPeaceSymbolPositions(count: number) {
  const positions = new Float32Array(count * 3)

  for (let index = 0; index < count; index += 1) {
    const t = index / count
    const jitterX = (seedNoise(index + 1) - 0.5) * 0.16
    const jitterY = (seedNoise(index + 7) - 0.5) * 0.16
    const jitterZ = (seedNoise(index + 11) - 0.5) * 0.26
    let x = 0
    let y = 0

    if (t < 0.58) {
      const angle = (t / 0.58) * Math.PI * 2
      const radius = 2.35 + (seedNoise(index + 17) - 0.5) * 0.12
      x = Math.cos(angle) * radius
      y = Math.sin(angle) * radius
    } else if (t < 0.78) {
      const local = (t - 0.58) / 0.2
      x = 0
      y = 2.2 - local * 4.4
    } else if (t < 0.89) {
      const local = (t - 0.78) / 0.11
      x = -local * 1.65
      y = -local * 1.75
    } else {
      const local = (t - 0.89) / 0.11
      x = local * 1.65
      y = -local * 1.75
    }

    positions[index * 3] = x + jitterX
    positions[index * 3 + 1] = y + jitterY
    positions[index * 3 + 2] = jitterZ
  }

  return positions
}

function CenterpieceRig({
  pointerRef,
  harmonyRef,
}: {
  pointerRef: React.RefObject<PointerState>
  harmonyRef: React.RefObject<number>
}) {
  useFrame(({ camera }, delta) => {
    const pointer = pointerRef.current
    const harmony = harmonyRef.current
    const finalReveal = THREE.MathUtils.smoothstep(harmony, 0.82, 0.995)
    const pointerWeight = 1 - finalReveal * 0.82
    const targetFov = THREE.MathUtils.lerp(35, 41, finalReveal)
    const perspectiveCamera = camera as THREE.PerspectiveCamera

    camera.position.x = THREE.MathUtils.damp(camera.position.x, pointer.x * 0.42 * pointerWeight, 5.5, delta)
    camera.position.y = THREE.MathUtils.damp(
      camera.position.y,
      pointer.y * 0.26 * pointerWeight + finalReveal * 0.14,
      5.5,
      delta,
    )
    camera.position.z = THREE.MathUtils.damp(
      camera.position.z,
      8.4 - harmony * 0.5 + finalReveal * 2.9,
      4.2,
      delta,
    )
    perspectiveCamera.fov = THREE.MathUtils.damp(perspectiveCamera.fov, targetFov, 4.2, delta)
    perspectiveCamera.updateProjectionMatrix()
    camera.lookAt(0, finalReveal * 0.08, 0)
  })

  return null
}

function HarmonyParticleField({
  pointerRef,
  ripplesRef,
  forceModeRef,
  forceValueRef,
  harmonyRef,
  timeRef,
}: {
  pointerRef: React.RefObject<PointerState>
  ripplesRef: React.RefObject<Ripple[]>
  forceModeRef: React.RefObject<'repel' | 'attract'>
  forceValueRef: React.RefObject<number>
  harmonyRef: React.RefObject<number>
  timeRef: React.RefObject<number>
}) {
  const pointsRef = useRef<THREE.Points>(null)

  const { chaosPositions, harmonyPositions, colors } = useMemo(() => {
    const count = 2600
    const chaotic = new Float32Array(count * 3)
    const harmony = createPeaceSymbolPositions(count)
    const palette = new Float32Array(count * 3)

    for (let index = 0; index < count; index += 1) {
      chaotic[index * 3] = (seedNoise(index + 31) - 0.5) * 7.2
      chaotic[index * 3 + 1] = (seedNoise(index + 43) - 0.5) * 4.8
      chaotic[index * 3 + 2] = (seedNoise(index + 59) - 0.5) * 2.4

      const tone = index % 4
      if (tone === 0) {
        palette[index * 3] = 0.59
        palette[index * 3 + 1] = 0.74
        palette[index * 3 + 2] = 1
      } else if (tone === 1) {
        palette[index * 3] = 0.39
        palette[index * 3 + 1] = 0.89
        palette[index * 3 + 2] = 0.84
      } else if (tone === 2) {
        palette[index * 3] = 0.74
        palette[index * 3 + 1] = 0.63
        palette[index * 3 + 2] = 0.98
      } else {
        palette[index * 3] = 0.82
        palette[index * 3 + 1] = 0.96
        palette[index * 3 + 2] = 0.8
      }
    }

    return { chaosPositions: chaotic, harmonyPositions: harmony, colors: palette }
  }, [])

  useFrame(({ clock }, delta) => {
    const points = pointsRef.current
    if (!points) {
      return
    }

    const positions = points.geometry.attributes.position.array as Float32Array
    const pointer = pointerRef.current
    const cursorX = pointer.x * 3.2
    const cursorY = pointer.y * 2.2
    const targetMode = forceModeRef.current === 'repel' ? 1 : -1
    forceValueRef.current = THREE.MathUtils.damp(forceValueRef.current, targetMode, 6, delta)
    const harmony = THREE.MathUtils.smoothstep(harmonyRef.current, 0.08, 0.92)
    const ripples = ripplesRef.current
    const time = clock.getElapsedTime()
    timeRef.current = time

    for (let i = 0; i < positions.length; i += 3) {
      const chaosX = chaosPositions[i]
      const chaosY = chaosPositions[i + 1]
      const chaosZ = chaosPositions[i + 2]
      const harmonyX = harmonyPositions[i]
      const harmonyY = harmonyPositions[i + 1]
      const harmonyZ = harmonyPositions[i + 2]

      let targetX = THREE.MathUtils.lerp(chaosX, harmonyX, harmony)
      let targetY = THREE.MathUtils.lerp(chaosY, harmonyY, harmony)
      let targetZ = THREE.MathUtils.lerp(chaosZ, harmonyZ, harmony)

      const dx = targetX - cursorX
      const dy = targetY - cursorY
      const distance = Math.hypot(dx, dy) || 0.0001
      const influence = pointer.active ? Math.max(0, 1 - distance / 1.85) : 0
      const pointerWeight = 1 - harmony * 0.36
      const force = influence * influence * 0.3 * forceValueRef.current * pointerWeight

      targetX += (dx / distance) * force
      targetY += (dy / distance) * force
      targetZ += influence * 0.18 * forceValueRef.current * pointerWeight

      for (const ripple of ripples) {
        const rippleDistance = Math.hypot(targetX - ripple.x, targetY - ripple.y)
        const age = time - ripple.start
        if (age > 0 && age < 2.4) {
          const waveRadius = age * 2.35
          const band = Math.max(0, 1 - Math.abs(rippleDistance - waveRadius) / 0.38)
          const rippleStrength = pointer.active ? 0.42 : 0.55
          targetZ += Math.sin(band * Math.PI) * rippleStrength * (1 - age / 2.4)
        }
      }

      const particleIndex = i / 3
      const drift = Math.sin(time * 0.5 + particleIndex * 0.11) * 0.05 * (1 - harmony)
      positions[i] = THREE.MathUtils.damp(positions[i], targetX + drift, 6.5, delta)
      positions[i + 1] = THREE.MathUtils.damp(positions[i + 1], targetY + drift * 0.6, 6.5, delta)
      positions[i + 2] = THREE.MathUtils.damp(positions[i + 2], targetZ, 6.8, delta)
    }

    ripplesRef.current = ripples.filter((ripple) => time - ripple.start < 2.4)
    points.geometry.attributes.position.needsUpdate = true
    points.rotation.y = time * 0.03 * (1 - harmony * 0.7)
    points.rotation.x = Math.sin(time * 0.22) * 0.05
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[chaosPositions.slice(), 3]} />
        <bufferAttribute attach="attributes-color" args={[colors, 3]} />
      </bufferGeometry>
      <pointsMaterial
        size={0.047}
        vertexColors
        transparent
        opacity={0.9}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  )
}

function HarmonyCore({ harmonyRef }: { harmonyRef: React.RefObject<number> }) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshBasicMaterial>(null)

  useFrame(({ clock }) => {
    if (!meshRef.current || !materialRef.current) {
      return
    }

    const harmony = harmonyRef.current
    const pulse = 0.85 + Math.sin(clock.getElapsedTime() * 1.6) * 0.04

    meshRef.current.scale.setScalar(pulse + harmony * 0.45)
    materialRef.current.opacity = 0.05 + harmony * 0.12
  })

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[0.55, 24, 24]} />
      <meshBasicMaterial
        ref={materialRef}
        color="#5eead4"
        transparent
        opacity={0.08}
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </mesh>
  )
}

export default function CenterpieceScene({ harmonyProgress, onModeChange }: CenterpieceSceneProps) {
  const pointerTargetRef = useRef<PointerController>({ x: 0, y: 0, active: false })
  const pointerRef = useRef<PointerState>({ x: 0, y: 0, active: false })
  const ripplesRef = useRef<Ripple[]>([])
  const forceModeRef = useRef<'repel' | 'attract'>('repel')
  const forceValueRef = useRef(1)
  const harmonyRef = useRef(harmonyProgress)
  const timeRef = useRef(0)

  useEffect(() => {
    harmonyRef.current = harmonyProgress
  }, [harmonyProgress])

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect()
    const x = ((event.clientX - rect.left) / rect.width) * 2 - 1
    const y = -(((event.clientY - rect.top) / rect.height) * 2 - 1)

    pointerTargetRef.current = { x, y, active: true }
  }

  function handlePointerLeave() {
    pointerTargetRef.current = { x: 0, y: 0, active: false }
  }

  function handleClick() {
    const mode = forceModeRef.current === 'repel' ? 'attract' : 'repel'
    forceModeRef.current = mode
    onModeChange?.(mode)
    ripplesRef.current = [
      ...ripplesRef.current.slice(-2),
      { x: pointerRef.current.x * 3.2, y: pointerRef.current.y * 2.2, start: timeRef.current },
    ]
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
        camera={{ position: [0, 0, 8.4], fov: 35, near: 0.1, far: 100 }}
      >
        <fog attach="fog" args={['#020913', 7.5, 13]} />
        <PointerSmoother sourceRef={pointerTargetRef} pointerRef={pointerRef} />
        <CenterpieceRig pointerRef={pointerRef} harmonyRef={harmonyRef} />
        <HarmonyCore harmonyRef={harmonyRef} />
        <HarmonyParticleField
          pointerRef={pointerRef}
          ripplesRef={ripplesRef}
          forceModeRef={forceModeRef}
          forceValueRef={forceValueRef}
          harmonyRef={harmonyRef}
          timeRef={timeRef}
        />
      </SceneCanvas>
    </div>
  )
}

function PointerSmoother({
  sourceRef,
  pointerRef,
}: {
  sourceRef: React.RefObject<PointerController>
  pointerRef: React.RefObject<PointerState>
}) {
  useFrame((_, delta) => {
    const source = sourceRef.current
    const pointer = pointerRef.current

    pointer.x = THREE.MathUtils.damp(pointer.x, source.x, 6, delta)
    pointer.y = THREE.MathUtils.damp(pointer.y, source.y, 6, delta)
    pointer.active = source.active
  })

  return null
}
