"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { 
  Sphere, 
  MeshDistortMaterial, 
  Float, 
  Line, 
  Text, 
  OrbitControls, 
  PerspectiveCamera,
  Stars,
  Torus
} from '@react-three/drei';
import * as THREE from 'three';
import { motion, AnimatePresence } from 'framer-motion';

// --- Superposition Animation ---
function SuperpositionScene() {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    meshRef.current.rotation.x = time * 0.5;
    meshRef.current.rotation.y = time * 0.2;
  });

  return (
    <group>
      <Float speed={5} rotationIntensity={2} floatIntensity={2}>
        <mesh ref={meshRef}>
          <Sphere args={[1, 64, 64]}>
            <MeshDistortMaterial
              color="#9933ff"
              attach="material"
              distort={0.6}
              speed={4}
              roughness={0}
              metalness={1}
              emissive="#4b0082"
              emissiveIntensity={0.5}
            />
          </Sphere>
        </mesh>
      </Float>
      {/* Wave interference rings */}
      {[1, 1.5, 2].map((radius, i) => (
        <Torus key={i} args={[radius, 0.01, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshBasicMaterial color="#33d6ff" transparent opacity={0.2 - i * 0.05} />
        </Torus>
      ))}
    </group>
  );
}

// --- Entanglement Animation ---
function EntanglementScene() {
  const p1 = useRef<THREE.Group>(null!);
  const p2 = useRef<THREE.Group>(null!);
  const lineRef = useRef<THREE.Line>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const x = Math.sin(time) * 3;
    const y = Math.cos(time * 0.5) * 1;
    
    p1.current.position.set(x, y, 0);
    p2.current.position.set(-x, -y, 0);

    const positions = new Float32Array([x, y, 0, -x, -y, 0]);
    lineRef.current.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  });

  return (
    <group>
      <group ref={p1}>
        <Sphere args={[0.4, 32, 32]}>
          <meshStandardMaterial color="#9933ff" emissive="#9933ff" emissiveIntensity={2} />
        </Sphere>
      </group>
      <group ref={p2}>
        <Sphere args={[0.4, 32, 32]}>
          <meshStandardMaterial color="#33d6ff" emissive="#33d6ff" emissiveIntensity={2} />
        </Sphere>
      </group>
      <Line 
        ref={lineRef}
        points={[[0,0,0], [0,0,0]]} 
        color="#ffffff" 
        lineWidth={2} 
        transparent 
        opacity={0.5} 
      />
    </group>
  );
}

// --- Teleportation Animation ---
function TeleportationScene() {
  const p1 = useRef<THREE.Mesh>(null!);
  const p2 = useRef<THREE.Mesh>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    const cycle = (time % 4) / 4; // 0 to 1 every 4 seconds
    
    // Pulse and fade
    if (cycle < 0.4) {
      p1.current.scale.setScalar(1 - cycle * 2.5);
      p1.current.material.opacity = 1 - cycle * 2.5;
      p2.current.scale.setScalar(0);
      p2.current.material.opacity = 0;
    } else if (cycle > 0.6) {
      const reappear = (cycle - 0.6) * 2.5;
      p1.current.scale.setScalar(0);
      p1.current.material.opacity = 0;
      p2.current.scale.setScalar(reappear);
      p2.current.material.opacity = reappear;
    } else {
      p1.current.scale.setScalar(0);
      p2.current.scale.setScalar(0);
    }
  });

  return (
    <group>
      <mesh ref={p1} position={[-3, 0, 0]}>
        <Sphere args={[0.5, 32, 32]}>
          <meshStandardMaterial color="#9933ff" transparent emissive="#9933ff" emissiveIntensity={1} />
        </Sphere>
      </mesh>
      <mesh ref={p2} position={[3, 0, 0]}>
        <Sphere args={[0.5, 32, 32]}>
          <meshStandardMaterial color="#33d6ff" transparent emissive="#33d6ff" emissiveIntensity={1} />
        </Sphere>
      </mesh>
      {/* Comm line */}
      <Line points={[[-3,0,0], [3,0,0]]} color="#ffffff" lineWidth={1} dashed dashSize={0.2} gapSize={0.1} />
    </group>
  );
}

// --- Qubit Transform (Bloch Sphere) ---
function QubitScene() {
  const arrowRef = useRef<THREE.Group>(null!);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    arrowRef.current.rotation.x = Math.sin(time) * Math.PI;
    arrowRef.current.rotation.z = Math.cos(time * 0.7) * Math.PI;
  });

  return (
    <group>
      {/* The Sphere */}
      <mesh>
        <Sphere args={[2, 32, 32]}>
          <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.1} />
        </Sphere>
      </mesh>
      {/* The Axes */}
      <Line points={[[-2.5, 0, 0], [2.5, 0, 0]]} color="#ff3333" lineWidth={1} />
      <Line points={[[0, -2.5, 0], [0, 2.5, 0]]} color="#33ff33" lineWidth={1} />
      <Line points={[[0, 0, -2.5], [0, 0, 2.5]]} color="#3333ff" lineWidth={1} />
      
      {/* The State Arrow */}
      <group ref={arrowRef}>
        <Line points={[[0, 0, 0], [0, 2, 0]]} color="#9933ff" lineWidth={4} />
        <mesh position={[0, 2, 0]}>
          <Sphere args={[0.1, 16, 16]}>
            <meshStandardMaterial color="#9933ff" emissive="#9933ff" emissiveIntensity={2} />
          </Sphere>
        </mesh>
      </group>
    </group>
  );
}

type ConceptType = 'superposition' | 'entanglement' | 'teleportation' | 'qubit' | 'default';

export default function ConceptAnimator({ conceptId }: { conceptId: string }) {
  const concept = useMemo(() => {
    const id = conceptId.toLowerCase();
    if (id.includes('superposition')) return 'superposition';
    if (id.includes('entanglement')) return 'entanglement';
    if (id.includes('teleportation')) return 'teleportation';
    if (id.includes('qubit') || id.includes('bit')) return 'qubit';
    return 'default';
  }, [conceptId]);

  return (
    <div className="w-full h-full min-h-[400px] relative rounded-3xl overflow-hidden glass border border-white/10">
      <div className="absolute top-4 left-6 z-10">
        <h4 className="text-xs font-headline font-bold text-white uppercase tracking-[0.2em] flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          Quantum Matrix Visualization: <span className="text-primary">{concept}</span>
        </h4>
      </div>
      
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 8]} />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1} color="#9933ff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color="#33d6ff" />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <AnimatePresence mode="wait">
          {concept === 'superposition' && <SuperpositionScene key="super" />}
          {concept === 'entanglement' && <EntanglementScene key="entang" />}
          {concept === 'teleportation' && <TeleportationScene key="tele" />}
          {concept === 'qubit' && <QubitScene key="qubit" />}
          {concept === 'default' && <SuperpositionScene key="def" />}
        </AnimatePresence>
      </Canvas>

      <div className="absolute bottom-4 right-6 text-[10px] text-muted-foreground uppercase tracking-widest pointer-events-none">
        Simulated Environment v4.0
      </div>
    </div>
  );
}
