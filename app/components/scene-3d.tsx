"use client"

import { useRef } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { Sphere, MeshDistortMaterial, Float, Environment } from "@react-three/drei"
import type { Mesh } from "three"

function FloatingOrb({
  position,
  color,
  speed = 1,
}: { position: [number, number, number]; color: string; speed?: number }) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * speed) * 0.2
      meshRef.current.rotation.y = Math.cos(state.clock.elapsedTime * speed) * 0.2
    }
  })

  return (
    <Float speed={speed} rotationIntensity={0.5} floatIntensity={0.5}>
      <Sphere ref={meshRef} args={[1, 64, 64]} position={position}>
        <MeshDistortMaterial
          color={color}
          attach="material"
          distort={0.4}
          speed={2}
          roughness={0.1}
          metalness={0.1}
          transparent
          opacity={0.6}
        />
      </Sphere>
    </Float>
  )
}

function Scene() {
  return (
    <>
      <Environment preset="dawn" />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      <FloatingOrb position={[-4, 2, -5]} color="#B08968" speed={0.8} />
      <FloatingOrb position={[4, -1, -3]} color="#A8834A" speed={1.2} />
      <FloatingOrb position={[0, 3, -8]} color="#965D37" speed={0.6} />
      <FloatingOrb position={[-2, -2, -6]} color="#C19A7E" speed={1.4} />
    </>
  )
}

export default function Scene3D() {
  return (
    <Canvas camera={{ position: [0, 0, 10], fov: 60 }} style={{ background: "transparent" }}>
      <Scene />
    </Canvas>
  )
}
