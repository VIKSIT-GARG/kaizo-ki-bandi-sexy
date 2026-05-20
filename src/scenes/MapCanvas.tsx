"use client";

import React, { useRef, useMemo, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, Line, Html } from "@react-three/drei";
import * as THREE from "three";

interface PinData {
  id: string;
  location: string;
  title: string;
  description: string;
  date: string;
}

interface MapCanvasProps {
  pins: PinData[];
  onPinSelect: (pin: PinData | null) => void;
  selectedPinId: string | null;
}

// Dreamy Terrain
const SoftTerrain: React.FC = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(20, 20, 64, 64);
    geo.rotateX(-Math.PI / 2);
    const pos = geo.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const z = pos.getZ(i);
      const y = Math.sin(x * 0.5) * Math.cos(z * 0.5) * 0.5 + Math.sin(x * 0.2 + z * 0.2) * 1.0;
      pos.setY(i, y);
    }
    geo.computeVertexNormals();
    return geo;
  }, []);

  return (
    <mesh ref={meshRef} geometry={geometry} receiveShadow position={[0, -1, 0]}>
      <meshStandardMaterial
        color="#d1e8e2"
        flatShading={true}
        roughness={0.8}
        metalness={0.1}
      />
    </mesh>
  );
};

// Map Pin Component
const MapPin: React.FC<{
  position: [number, number, number];
  pin: PinData;
  isSelected: boolean;
  onClick: (pin: PinData) => void;
}> = ({ position, pin, isSelected, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (!meshRef.current) return;
    const t = state.clock.getElapsedTime();
    meshRef.current.position.y = position[1] + Math.sin(t * 2 + position[0]) * 0.1;
  });

  return (
    <group position={position}>
      <mesh
        ref={meshRef}
        onClick={(e) => {
          e.stopPropagation();
          onClick(pin);
        }}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.15, 16, 16]} />
        <meshBasicMaterial color={isSelected || hovered ? "#ff4d6d" : "#ffb7c5"} />
      </mesh>

      {/* HTML Label */}
      <Html position={[0, 0.4, 0]} center className="pointer-events-none">
        <div className={`transition-opacity duration-300 ${hovered || isSelected ? "opacity-100" : "opacity-0"}`}>
          <div className="bg-white/80 backdrop-blur-sm px-2 py-1 rounded-sm shadow-sm border border-[#ffb7c5] text-[#2d3436] font-sans text-[10px] tracking-widest uppercase whitespace-nowrap">
            {pin.location}
          </div>
        </div>
      </Html>
    </group>
  );
};

// Inner scene component - R3F hooks are valid here because this renders INSIDE <Canvas>
const MapScene: React.FC<{
  pins: PinData[];
  onPinSelect: (pin: PinData | null) => void;
  selectedPinId: string | null;
}> = ({ pins, onPinSelect, selectedPinId }) => {
  const controlsRef = useRef<any>(null);

  const delhiPos: [number, number, number] = [-3, 0.5, 2];
  const jammuPos: [number, number, number] = [3, 1.2, -2];
  const connectionPos: [number, number, number] = [0, 0.8, 0];
  const positions = [delhiPos, jammuPos, connectionPos];

  return (
    <>
      <ambientLight intensity={1.5} color="#fff" />
      <directionalLight position={[5, 10, 5]} intensity={1.0} color="#ffdab9" castShadow />
      <directionalLight position={[-5, 5, -5]} intensity={0.5} color="#c4e0e5" />

      <SoftTerrain />

      {/* The Connection Line */}
      <Line
        points={[delhiPos, jammuPos]}
        color="#ffb7c5"
        lineWidth={2}
        dashed={true}
        dashScale={10}
        dashSize={2}
        dashOffset={0}
      />

      {/* Render Pins */}
      {pins.map((pin, index) => (
        <MapPin
          key={pin.id}
          pin={pin}
          position={positions[index % positions.length]}
          isSelected={selectedPinId === pin.id}
          onClick={onPinSelect}
        />
      ))}

      <OrbitControls
        ref={controlsRef}
        enablePan={false}
        enableZoom={true}
        minDistance={3}
        maxDistance={12}
        maxPolarAngle={Math.PI / 2.2}
        minPolarAngle={Math.PI / 4}
        autoRotate={!selectedPinId}
        autoRotateSpeed={0.5}
      />
    </>
  );
};

export const MapCanvas: React.FC<MapCanvasProps> = ({ pins, onPinSelect, selectedPinId }) => {
  return (
    <div className="absolute inset-0 z-0 w-full h-full cursor-grab active:cursor-grabbing">
      <Canvas
        camera={{ position: [0, 6, 8], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
      >
        <MapScene pins={pins} onPinSelect={onPinSelect} selectedPinId={selectedPinId} />
      </Canvas>
    </div>
  );
};

export default MapCanvas;
