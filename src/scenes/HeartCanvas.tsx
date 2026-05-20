"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float } from "@react-three/drei";
import * as THREE from "three";

// Soft Frosted Glass Heart Mesh
const HeartMesh: React.FC<{ mousePos: { x: number; y: number } }> = ({ mousePos }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  const heartShape = useMemo(() => {
    const shape = new THREE.Shape();
    const x = 0, y = 0;
    shape.moveTo(x + 0.25, y + 0.25);
    shape.bezierCurveTo(x + 0.25, y + 0.25, x + 0.2, y, x, y);
    shape.bezierCurveTo(x - 0.3, y, x - 0.3, y + 0.35, x - 0.3, y + 0.35);
    shape.bezierCurveTo(x - 0.3, y + 0.55, x - 0.1, y + 0.77, x + 0.25, y + 0.95);
    shape.bezierCurveTo(x + 0.6, y + 0.77, x + 0.8, y + 0.55, x + 0.8, y + 0.35);
    shape.bezierCurveTo(x + 0.8, y + 0.35, x + 0.8, y, x + 0.5, y);
    shape.bezierCurveTo(x + 0.35, y, x + 0.25, y + 0.25, x + 0.25, y + 0.25);
    return shape;
  }, []);

  const extrudeSettings = useMemo(() => ({
    depth: 0.2,
    bevelEnabled: true,
    bevelSegments: 8,
    steps: 2,
    bevelSize: 0.1,
    bevelThickness: 0.1,
  }), []);

  // Pre-create centered geometry
  const geometry = useMemo(() => {
    const geom = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
    geom.center();
    return geom;
  }, [heartShape, extrudeSettings]);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();

    // Very gentle drift
    meshRef.current.rotation.y = Math.sin(time * 0.2) * 0.1;
    meshRef.current.rotation.x = Math.cos(time * 0.15) * 0.05;

    // Soft mouse parallax response
    const targetX = (mousePos.y * Math.PI) * 0.05;
    const targetY = (mousePos.x * Math.PI) * 0.05;

    meshRef.current.rotation.x += (targetX - meshRef.current.rotation.x) * 0.02;
    meshRef.current.rotation.y += (targetY - meshRef.current.rotation.y) * 0.02;
  });

  return (
    <mesh ref={meshRef} geometry={geometry} castShadow receiveShadow>
      <meshPhysicalMaterial
        color="#fff"
        emissive="#ffd6e0"
        emissiveIntensity={0.1}
        roughness={0.4}
        metalness={0.1}
        transmission={0.9}
        thickness={1.2}
        ior={1.4}
        clearcoat={0.3}
      />
    </mesh>
  );
};

// Drifting Sakura Petal Field
const SakuraParticles: React.FC = () => {
  const pointsRef = useRef<THREE.Points>(null);

  const particlePositions = useMemo(() => {
    const count = 150;
    const pos = new Float32Array(count * 3);

    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5 - 2;
    }

    return pos;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const positions = pointsRef.current.geometry.attributes.position.array as Float32Array;

    for (let i = 0; i < 150; i++) {
      // Gentle wind falling motion
      positions[i * 3 + 1] -= 0.01 + (Math.sin(time + i) * 0.005);
      positions[i * 3] += Math.sin(time * 0.5 + i) * 0.005;

      // Reset if too low
      if (positions[i * 3 + 1] < -5) {
        positions[i * 3 + 1] = 5;
        positions[i * 3] = (Math.random() - 0.5) * 10;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[particlePositions, 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        color="#ffb7c5"
        size={0.1}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  );
};

export const HeartCanvas: React.FC<{ mousePos: { x: number; y: number } }> = ({ mousePos }) => {
  return (
    <div className="absolute inset-0 z-0 w-full h-full pointer-events-none">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 50 }}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={2.5} color="#fff" />
        <directionalLight position={[2, 5, 3]} intensity={1.5} color="#ffd6e0" />
        <directionalLight position={[-2, -5, -3]} intensity={0.5} color="#c4e0e5" />

        <Float speed={1} rotationIntensity={0.1} floatIntensity={0.2}>
          <HeartMesh mousePos={mousePos} />
        </Float>

        <SakuraParticles />
      </Canvas>
    </div>
  );
};

export default HeartCanvas;
