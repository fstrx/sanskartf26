'use client'

import type { MutableRefObject } from 'react'
import { useEffect, useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'
import * as THREE from 'three'
import SceneCanvas from '@/components/three/core/SceneCanvas'

type Theme = 'light' | 'dark'

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

function createOrbGradientTexture() {
  const size = 128
  const canvas = document.createElement('canvas')
  canvas.width = size
  canvas.height = size

  const context = canvas.getContext('2d')
  if (!context) {
    return null
  }

  const gradient = context.createRadialGradient(
    size * 0.5,
    size * 0.5,
    size * 0.08,
    size * 0.5,
    size * 0.5,
    size * 0.5,
  )
  gradient.addColorStop(0, 'rgba(255, 255, 255, 1)')
  gradient.addColorStop(0.35, 'rgba(190, 235, 255, 0.7)')
  gradient.addColorStop(0.7, 'rgba(125, 211, 252, 0.2)')
  gradient.addColorStop(1, 'rgba(125, 211, 252, 0)')

  context.fillStyle = gradient
  context.fillRect(0, 0, size, size)

  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace

  return texture
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

function UnityCore({
  convergenceRef,
  scrollProgressRef,
}: {
  convergenceRef: MutableRefObject<number>
  scrollProgressRef: MutableRefObject<number>
}) {
  const meshRef = useRef<THREE.Mesh>(null)
  const materialRef = useRef<THREE.MeshBasicMaterial>(null)
  const glowRef = useRef<THREE.Sprite>(null)
  const glowMaterialRef = useRef<THREE.SpriteMaterial>(null)
  const glowTexture = useMemo(() => createOrbGradientTexture(), [])

  useEffect(() => {
    return () => {
      glowTexture?.dispose()
    }
  }, [glowTexture])

  useFrame(({ clock }) => {
    if (!meshRef.current || !materialRef.current || !glowRef.current || !glowMaterialRef.current) {
      return
    }

    const pulse = 0.92 + Math.sin(clock.getElapsedTime() * 1.8) * 0.03
    const converge = convergenceRef.current
    const fracture = THREE.MathUtils.smoothstep(scrollProgressRef.current, 0.42, 0.88)
    const coreScale = pulse + converge * 0.35
    const glowScale = 1.5 + Math.sin(clock.getElapsedTime() * 1.2) * 0.04 + converge * 0.55
    const corePresence = 1 - fracture * 0.64

    meshRef.current.scale.setScalar(coreScale)
    materialRef.current.opacity = (0.14 + converge * 0.16) * corePresence
    glowRef.current.scale.set(glowScale, glowScale, 1)
    glowMaterialRef.current.opacity = (0.32 + converge * 0.18) * corePresence
  })

  return (
    <group>
      {glowTexture ? (
        <sprite ref={glowRef} scale={[1.5, 1.5, 1]}>
          <spriteMaterial
            ref={glowMaterialRef}
            map={glowTexture}
            color="#7dd3fc"
            transparent
            opacity={0.32}
            blending={THREE.AdditiveBlending}
            depthWrite={false}
          />
        </sprite>
      ) : null}
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.28, 24, 24]} />
        <meshBasicMaterial
          ref={materialRef}
          color="#bfefff"
          transparent
          opacity={0.14}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </group>
  )
}

function HeroParticles({
  pointerRef,
  pulseRef,
  convergenceRef,
  scrollProgressRef,
  theme,
}: {
  pointerRef: MutableRefObject<PointerState>
  pulseRef: MutableRefObject<PulseState>
  convergenceRef: MutableRefObject<number>
  scrollProgressRef: MutableRefObject<number>
  theme: Theme
}) {
  const pointsRef = useRef<THREE.Points>(null)
  const materialRef = useRef<THREE.PointsMaterial>(null)

  const { basePositions, baseColors, phases, chaosSeeds } = useMemo(() => {
    const count = theme === 'dark' ? 1200 : 1800
    const positions = new Float32Array(count * 3)
    const palette = new Float32Array(count * 3)
    const phaseOffsets = new Float32Array(count)
    const seeds = new Float32Array(count)

    for (let i = 0; i < count; i += 1) {
      const radius = 0.7 + seedNoise(i + 1) * 2.2
      const theta = seedNoise(i + 17) * Math.PI * 2
      const phi = Math.acos(1 - 2 * seedNoise(i + 31))

      positions[i * 3] = Math.sin(phi) * Math.cos(theta) * radius * 1.2
      positions[i * 3 + 1] = Math.cos(phi) * radius * 0.75
      positions[i * 3 + 2] = Math.sin(phi) * Math.sin(theta) * radius * 1.5 - 0.3
      phaseOffsets[i] = seedNoise(i + 73) * Math.PI * 2
      seeds[i] = seedNoise(i + 113)

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

    return { basePositions: positions, baseColors: palette, phases: phaseOffsets, chaosSeeds: seeds }
  }, [theme])

  useFrame(({ clock }, delta) => {
    const points = pointsRef.current
    const material = materialRef.current
    if (!points || !material) {
      return
    }

    const time = clock.getElapsedTime()
    const positions = points.geometry.attributes.position.array as Float32Array
    const colors = points.geometry.attributes.color.array as Float32Array
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
    const scrollProgress = THREE.MathUtils.clamp(scrollProgressRef.current, 0, 1)
    const unrest = THREE.MathUtils.smoothstep(scrollProgress, 0.28, 0.68)
    const fracture = THREE.MathUtils.smootherstep(scrollProgress, 0.42, 0.88)
    const fall = THREE.MathUtils.smootherstep(scrollProgress, 0.66, 1)
    const colorShift = THREE.MathUtils.smootherstep(scrollProgress, 0.34, 0.94)

    for (let i = 0; i < positions.length; i += 3) {
      const baseX = basePositions[i]
      const baseY = basePositions[i + 1]
      const baseZ = basePositions[i + 2]
      const particleIndex = i / 3
      const chaosSeed = chaosSeeds[particleIndex]
      const baseDistance = Math.hypot(baseX, baseY)
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
      const outwardX = baseDistance > 0.001 ? baseX / baseDistance : 0
      const outwardY = baseDistance > 0.001 ? baseY / baseDistance : 0
      const edgeBias = THREE.MathUtils.clamp(baseDistance / 3.2, 0, 1)
      const edgeLift = 0.12 + edgeBias * 0.72
      const chaosWave = Math.sin(time * (1.8 + chaosSeed * 2.2) + phases[particleIndex] * 1.7)
      const chaosTear = Math.cos(time * (1.35 + chaosSeed) + baseX * 2.1 - baseY * 1.3)
      const fallSpeed = 1.25 + chaosSeed * 2.05 + edgeBias * 0.72
      const spreadX = outwardX * fracture * edgeLift * 0.86
      const spreadY = outwardY * fracture * edgeLift * 0.18
      const spreadZ = fracture * (0.04 + edgeBias * 0.12)
      const breakX = (chaosWave * 0.14 + chaosTear * 0.08) * unrest * (0.32 + edgeBias * 0.72)
      const breakY = Math.sin(time * 1.8 + phases[particleIndex]) * unrest * 0.1
      const breakZ = chaosTear * unrest * 0.16
      const fallY = fall * fallSpeed + fall * fall * 0.72
      const fallX = (chaosSeed - 0.5) * fall * 0.82
      const fallZ = Math.sin(phases[particleIndex] + time * 0.56) * fall * 0.24

      const targetX = baseX
        + directionX * wake
        + tangentX * swirl
        - pulseDirectionX * pulseFocus * 0.26
        - baseX * centerPull
        + spreadX
        + breakX
        + fallX
        + drift
      const targetY = baseY
        + directionY * wake
        + tangentY * swirl
        - pulseDirectionY * pulseFocus * 0.26
        - baseY * centerPull
        + spreadY
        + breakY
        - fallY
        + shimmer * 0.75
      const targetZ = baseZ
        - baseZ * centerPull
        - spreadZ
        + breakZ
        + fallZ
        + focus * (0.06 + pointer.motion * 0.18)
        + pulseFocus * 0.36
        + shimmer

      const particleDamp = 5.8 + fracture * 1.1
      positions[i] = THREE.MathUtils.damp(positions[i], targetX, particleDamp, delta)
      positions[i + 1] = THREE.MathUtils.damp(positions[i + 1], targetY, particleDamp, delta)
      positions[i + 2] = THREE.MathUtils.damp(positions[i + 2], targetZ, particleDamp, delta)

      const redTone = particleIndex % 3
      const targetRed = redTone === 0 ? 0.996 : redTone === 1 ? 0.988 : 0.984
      const targetGreen = redTone === 0 ? 0.792 : redTone === 1 ? 0.647 : 0.444
      const targetBlue = redTone === 0 ? 0.792 : redTone === 1 ? 0.647 : 0.522

      colors[i] = THREE.MathUtils.lerp(baseColors[i], targetRed, colorShift)
      colors[i + 1] = THREE.MathUtils.lerp(baseColors[i + 1], targetGreen, colorShift)
      colors[i + 2] = THREE.MathUtils.lerp(baseColors[i + 2], targetBlue, colorShift)
    }

    convergenceRef.current = Math.max(0, convergenceRef.current - delta * 0.6)
    pulse.strength = Math.max(0, pulse.strength - delta * 1.75)
    points.geometry.attributes.position.needsUpdate = true
    points.geometry.attributes.color.needsUpdate = true
    points.rotation.y = time * (0.042 + fracture * 0.012) + pointer.x * 0.045
    points.rotation.x = Math.sin(time * 0.18) * 0.06 + pointer.y * 0.03 - fall * 0.04
    material.size = 0.041 + unrest * 0.003 - fall * 0.002 + pointer.motion * 0.008 + pulse.strength * 0.012
    material.opacity = 0.88 - fall * 0.24 + pulse.strength * 0.08
  })

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[basePositions.slice(), 3]} />
        <bufferAttribute attach="attributes-color" args={[baseColors.slice(), 3]} />
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

export default function HeroScene({
  pointerRef,
  pulseRef,
  convergenceRef,
  scrollProgressRef,
  theme,
}: {
  pointerRef: MutableRefObject<PointerState>
  pulseRef: MutableRefObject<PulseState>
  convergenceRef: MutableRefObject<number>
  scrollProgressRef: MutableRefObject<number>
  theme: Theme
}) {
  return (
    <SceneCanvas
      className="absolute inset-0 pointer-events-none"
      camera={{ position: [0, 0, 5.4], fov: 45, near: 0.1, far: 100 }}
    >
      <fog attach="fog" args={['#050611', 4.5, 10]} />
      <CameraRig pointerRef={pointerRef} convergenceRef={convergenceRef} />
      <UnityCore convergenceRef={convergenceRef} scrollProgressRef={scrollProgressRef} />
      <HeroParticles
        pointerRef={pointerRef}
        pulseRef={pulseRef}
        convergenceRef={convergenceRef}
        scrollProgressRef={scrollProgressRef}
        theme={theme}
      />
    </SceneCanvas>
  )
}
