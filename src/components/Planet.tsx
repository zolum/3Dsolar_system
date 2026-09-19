import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { PlanetData } from '../data/planets';

interface PlanetProps {
  data: PlanetData;
  isPlaying: boolean;
  speed: number;
  onSelect: (planet: PlanetData | null) => void;
  isSelected: boolean;
  elapsedTime: React.MutableRefObject<number>;
}

function OrbitRing({ distance }: { distance: number }) {
  const points = useMemo(() => {
    const pts: [number, number, number][] = [];
    const segments = 128;
    for (let i = 0; i <= segments; i++) {
      const angle = (i / segments) * Math.PI * 2;
      pts.push([
        Math.cos(angle) * distance,
        0,
        Math.sin(angle) * distance
      ]);
    }
    return pts;
  }, [distance]);

  return (
    <Line
      points={points}
      color="#ffffff"
      transparent
      opacity={0.15}
      lineWidth={1}
    />
  );
}

function SaturnRings({ radius }: { radius: number }) {
  return (
    <mesh rotation={[Math.PI / 2.5, 0, 0]}>
      <ringGeometry args={[radius * 1.4, radius * 2.2, 64]} />
      <meshStandardMaterial
        color="#C4A45A"
        side={THREE.DoubleSide}
        transparent
        opacity={0.7}
      />
    </mesh>
  );
}

export function Planet({ data, isPlaying, speed, onSelect, isSelected, elapsedTime }: PlanetProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame(() => {
    if (groupRef.current) {
      const angle = (elapsedTime.current * speed * 0.5) / data.orbitalPeriod;
      groupRef.current.position.x = Math.cos(angle) * data.distance;
      groupRef.current.position.z = Math.sin(angle) * data.distance;
    }
    if (meshRef.current) {
      meshRef.current.rotation.y += data.rotationSpeed * (isPlaying ? speed : 0);
    }
  });

  const handleClick = (e: any) => {
    e.stopPropagation();
    onSelect(isSelected ? null : data);
  };

  return (
    <>
      <OrbitRing distance={data.distance} />
      <group ref={groupRef}>
        <mesh
          ref={meshRef}
          onClick={handleClick}
          onPointerOver={(e) => { e.stopPropagation(); setHovered(true); document.body.style.cursor = 'pointer'; }}
          onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
        >
          <sphereGeometry args={[data.radius, 32, 32]} />
          <meshStandardMaterial
            color={data.color}
            roughness={0.7}
            metalness={0.1}
            emissive={hovered || isSelected ? data.color : "#000000"}
            emissiveIntensity={hovered || isSelected ? 0.3 : 0}
          />
        </mesh>
        {/* Selection indicator */}
        {isSelected && (
          <mesh>
            <sphereGeometry args={[data.radius * 1.3, 16, 16]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.1}
              wireframe
            />
          </mesh>
        )}
        {/* Saturn rings */}
        {data.name === "Saturn" && <SaturnRings radius={data.radius} />}
        {/* Planet label on hover */}
        {hovered && (
          <sprite position={[0, data.radius + 0.8, 0]} scale={[3, 0.8, 1]}>
            <spriteMaterial transparent opacity={0} />
          </sprite>
        )}
      </group>
    </>
  );
}
