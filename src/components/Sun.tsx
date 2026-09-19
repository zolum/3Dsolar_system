import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Sun() {
  const sunRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
    if (glowRef.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.05;
      glowRef.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      {/* Sun core */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[3, 64, 64]} />
        <meshStandardMaterial
          color="#FDB813"
          emissive="#FF8C00"
          emissiveIntensity={2}
          toneMapped={false}
        />
      </mesh>
      {/* Sun glow */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[3.5, 32, 32]} />
        <meshBasicMaterial
          color="#FFA500"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Outer glow */}
      <mesh>
        <sphereGeometry args={[4.2, 32, 32]} />
        <meshBasicMaterial
          color="#FF6600"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
      {/* Point light from sun */}
      <pointLight color="#FFF5E0" intensity={3} distance={100} decay={0.5} />
      <pointLight color="#FFA500" intensity={1.5} distance={60} decay={1} />
    </group>
  );
}
