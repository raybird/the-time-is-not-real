import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Html, Float } from '@react-three/drei';
import * as THREE from 'three';

interface TimeReelProps {
  timeProgress: number; // 0 to 100
  state: 'physical' | 'information' | 'consciousness';
  color: string;
}

// Sub-component: A single 3D spacetime slice
interface TimeSliceProps {
  index: number;
  timeProgress: number;
  state: 'physical' | 'information' | 'consciousness';
  color: string;
}

const SpacetimeSlice: React.FC<TimeSliceProps> = ({ index, timeProgress, state, color }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);

  // Position offset based on current progress
  // We want the slice corresponding to current progress to be at the center (X = 0, Z = 0)
  // Index ranges from -2 (Past) to 2 (Future)
  const targetX = (index * 3) - ((timeProgress - 50) / 100) * 8;
  const distanceToCenter = Math.abs(targetX);
  const scale = Math.max(0.4, 1.2 - distanceToCenter * 0.25);
  const targetZ = -Math.pow(distanceToCenter, 1.5) * 0.6;
  const opacity = Math.max(0.1, 1 - distanceToCenter * 0.35);

  useFrame((stateFrame) => {
    if (meshRef.current) {
      // Smooth interpolation for position
      meshRef.current.position.x = THREE.MathUtils.lerp(meshRef.current.position.x, targetX, 0.1);
      meshRef.current.position.z = THREE.MathUtils.lerp(meshRef.current.position.z, targetZ, 0.1);
      meshRef.current.scale.setScalar(THREE.MathUtils.lerp(meshRef.current.scale.x, scale, 0.1));
    }

    if (innerRef.current) {
      // Dynamic rotation based on time progress and index
      const speed = 0.01 + (index + 3) * 0.005;
      innerRef.current.rotation.y += speed;
      innerRef.current.rotation.x += speed * 0.5;

      // Add a breathing effect for Consciousness state
      if (state === 'consciousness') {
        const time = stateFrame.clock.getElapsedTime();
        const breathe = 1 + Math.sin(time * 2 + index) * 0.1;
        innerRef.current.scale.setScalar(breathe);
      } else {
        innerRef.current.scale.setScalar(1);
      }
    }
  });

  // Label names for slices
  const sliceLabels = ["太初 (Genesis)", "記憶 (Memory)", "當下 (Presence)", "潛能 (Potential)", "終點 (Omega)"];
  const label = sliceLabels[index + 2] || "時空切片";

  // Geometry selector based on Index (Past to Future)
  const renderGeometry = () => {
    if (index === -2) {
      // Past Genesis - Tetrahedron
      return <tetrahedronGeometry args={[0.8, 0]} />;
    } else if (index === -1) {
      // Memory - Octahedron
      return <octahedronGeometry args={[0.8, 0]} />;
    } else if (index === 0) {
      // Present - Torus Knot
      return <torusKnotGeometry args={[0.5, 0.15, 64, 8]} />;
    } else if (index === 1) {
      // Potential - Icosahedron
      return <icosahedronGeometry args={[0.8, 0]} />;
    } else {
      // Future Omega - Dodecahedron
      return <dodecahedronGeometry args={[0.8, 0]} />;
    }
  };

  // Material settings based on consciousness state
  const renderMaterial = () => {
    const mainColor = new THREE.Color(color);
    
    if (state === 'physical') {
      // Physical: Glossy, reflective metal
      return (
        <meshStandardMaterial
          color={mainColor}
          roughness={0.15}
          metalness={0.8}
          emissive={mainColor}
          emissiveIntensity={0.15}
          transparent
          opacity={opacity}
        />
      );
    } else if (state === 'information') {
      // Information: Digital neon wireframe
      return (
        <meshBasicMaterial
          color={mainColor}
          wireframe
          transparent
          opacity={opacity * 0.8}
        />
      );
    } else {
      // Consciousness: Glowing glass transmission
      return (
        <meshPhysicalMaterial
          color={mainColor}
          emissive={mainColor}
          emissiveIntensity={0.65}
          roughness={0.1}
          transmission={0.6}
          thickness={1.5}
          transparent
          opacity={opacity * 0.9}
        />
      );
    }
  };

  return (
    <group ref={meshRef}>
      {/* Outer Hologram Frame */}
      <mesh>
        <boxGeometry args={[1.8, 2.4, 0.05]} />
        <meshBasicMaterial
          color={color}
          wireframe
          transparent
          opacity={opacity * 0.15}
        />
      </mesh>

      {/* Frame Border highlight */}
      <mesh position={[0, 0, 0.01]}>
        <boxGeometry args={[1.81, 2.41, 0.051]} />
        <meshBasicMaterial color={color} wireframe transparent opacity={opacity * 0.4} />
      </mesh>

      {/* Inner evolving object */}
      <mesh ref={innerRef} position={[0, 0.1, 0.1]}>
        {renderGeometry()}
        {renderMaterial()}
      </mesh>

      {/* Slice Label & Mini Epoch Info using HTML (extremely stable, prevents font loading crash) */}
      <Html position={[0, -1.0, 0.1]} center style={{ opacity: opacity, pointerEvents: 'none' }}>
        <div style={{
          color: color,
          fontSize: '11px',
          fontWeight: '600',
          fontFamily: 'Outfit, Noto Sans TC, sans-serif',
          whiteSpace: 'nowrap',
          textAlign: 'center',
          textShadow: `0 0 8px ${color}50`
        }}>
          {label}
          <div style={{ color: '#8ba2b9', fontSize: '8px', marginTop: '2px', fontWeight: '400' }}>
            {`EPOCH: ${index + 3} | T-${((index + 2) * 25).toFixed(0)}%`}
          </div>
        </div>
      </Html>
    </group>
  );
};

export const TimeReel: React.FC<TimeReelProps> = ({ timeProgress, state, color }) => {
  // Create 5 slices: -2 (Genesis), -1 (Memory), 0 (Present), 1 (Potential), 2 (Omega)
  const sliceIndices = [-2, -1, 0, 1, 2];

  return (
    <div className="w-full h-full relative rounded-2xl border border-[hsla(225,30%,60%,0.1)] bg-gradient-to-b from-[hsla(230,35%,6%,0.7)] to-[hsla(230,35%,2%,0.9)] overflow-hidden">
      {/* HUD Info Overlay */}
      <div className="absolute top-4 left-4 z-10 font-mono text-[10px] tracking-widest text-text-muted select-none pointer-events-none">
        <p className="text-xs font-semibold text-gradient-blue mb-1">📽️ 塊狀宇宙 3D 切片膠卷</p>
        <p>過去、現在、未來同時並存於此時空結構中</p>
      </div>

      <div className="absolute top-4 right-4 z-10 font-mono text-[9px] tracking-wider text-right select-none pointer-events-none">
        <span className="inline-block px-1.5 py-0.5 rounded bg-[hsla(230,30%,20%,0.5)] border border-[hsla(225,20%,40%,0.2)] animate-pulse" style={{ color: color }}>
          ● LIVE PROJECTION
        </span>
      </div>

      {/* Three.js Canvas */}
      <Canvas
        camera={{ position: [0, 0, 4.2], fov: 45 }}
        gl={{ antialias: true }}
        className="w-full h-full"
      >
        <ambientLight intensity={0.4} />
        <pointLight position={[10, 10, 10]} intensity={1.5} color="#ffffff" />
        <pointLight position={[-10, -10, -10]} intensity={0.5} color={color} />
        
        {/* Floating background particles */}
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
          <group>
            {sliceIndices.map((idx) => (
              <SpacetimeSlice
                key={idx}
                index={idx}
                timeProgress={timeProgress}
                state={state}
                color={color}
              />
            ))}
          </group>
        </Float>

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 2.2}
          maxAzimuthAngle={Math.PI / 8}
          minAzimuthAngle={-Math.PI / 8}
        />
      </Canvas>

      {/* Timeline track overlay (visual representation of slice alignment) */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center gap-12 pointer-events-none select-none z-10 w-4/5">
        <div className="h-[1px] bg-gradient-to-r from-transparent via-[hsla(225,20%,40%,0.3)] to-transparent absolute w-full" />
        {sliceIndices.map((idx) => {
          // Highlight the node representing current active progress
          const nodeProgress = (idx + 2) * 25;
          const isActive = Math.abs(timeProgress - nodeProgress) < 12.5;
          return (
            <div
              key={idx}
              className="w-2 h-2 rounded-full relative z-20 transition-all duration-300"
              style={{
                backgroundColor: isActive ? color : '#64748b',
                boxShadow: isActive ? `0 0 10px ${color}` : 'none',
                transform: isActive ? 'scale(1.5)' : 'scale(1)'
              }}
            >
              <span 
                className="absolute top-3 left-1/2 -translate-x-1/2 font-mono text-[7px] tracking-normal"
                style={{ color: isActive ? color : '#64748b' }}
              >
                T{(idx + 2) * 25}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
