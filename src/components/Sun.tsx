import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export function Sun() {
  const sunRef = useRef<THREE.Mesh>(null);
  const coronaRef1 = useRef<THREE.Mesh>(null);
  const coronaRef2 = useRef<THREE.Mesh>(null);
  const coronaRef3 = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.001;
    }
    if (coronaRef1.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.03;
      coronaRef1.current.scale.set(scale, scale, scale);
    }
    if (coronaRef2.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.8 + 1) * 0.04;
      coronaRef2.current.scale.set(scale, scale, scale);
    }
    if (coronaRef3.current) {
      const scale = 1 + Math.sin(state.clock.elapsedTime * 0.5 + 2) * 0.05;
      coronaRef3.current.scale.set(scale, scale, scale);
    }
  });

  return (
    <group>
      {/* Sun core */}
      <mesh ref={sunRef}>
        <sphereGeometry args={[3.5, 64, 64]} />
        <meshStandardMaterial
          color="#FDB813"
          emissive="#FF6B00"
          emissiveIntensity={3}
          toneMapped={false}
          roughness={1}
        />
      </mesh>

      {/* Inner corona - hot white/yellow */}
      <mesh ref={coronaRef1}>
        <sphereGeometry args={[4.0, 32, 32]} />
        <meshBasicMaterial
          color="#FFF5E0"
          transparent
          opacity={0.2}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Middle corona - orange */}
      <mesh ref={coronaRef2}>
        <sphereGeometry args={[4.8, 32, 32]} />
        <meshBasicMaterial
          color="#FFA500"
          transparent
          opacity={0.1}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Outer corona - red/deep orange */}
      <mesh ref={coronaRef3}>
        <sphereGeometry args={[6.0, 32, 32]} />
        <meshBasicMaterial
          color="#FF4500"
          transparent
          opacity={0.04}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Solar flare particles */}
      <mesh>
        <sphereGeometry args={[7.5, 16, 16]} />
        <meshBasicMaterial
          color="#FF6600"
          transparent
          opacity={0.02}
          side={THREE.BackSide}
        />
      </mesh>

      {/* Point lights from sun */}
      <pointLight color="#FFF5E0" intensity={4} distance={120} decay={0.3} />
      <pointLight color="#FFA500" intensity={2} distance={80} decay={0.8} />
      <pointLight color="#FF6B00" intensity={1} distance={50} decay={1.2} />
    </group>
  );
}
