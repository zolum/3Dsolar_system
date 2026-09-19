import { useRef, useState, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Line } from '@react-three/drei';
import * as THREE from 'three';
import { PlanetData } from '../data/planets';
import { soundManager } from '../utils/soundManager';

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
      opacity={0.12}
      lineWidth={0.5}
    />
  );
}

function Atmosphere({ radius, color, opacity }: { radius: number; color: string; opacity: number }) {
  return (
    <mesh>
      <sphereGeometry args={[radius * 1.08, 32, 32]} />
      <meshBasicMaterial
        color={color}
        transparent
        opacity={opacity}
        side={THREE.BackSide}
      />
    </mesh>
  );
}

function SaturnRings({ radius }: { radius: number }) {
  return (
    <group rotation={[Math.PI / 2.5, 0, 0.1]}>
      {/* Inner ring */}
      <mesh>
        <ringGeometry args={[radius * 1.3, radius * 1.6, 64]} />
        <meshStandardMaterial
          color="#B8860B"
          side={THREE.DoubleSide}
          transparent
          opacity={0.6}
          roughness={0.8}
        />
      </mesh>
      {/* Middle ring */}
      <mesh>
        <ringGeometry args={[radius * 1.65, radius * 2.0, 64]} />
        <meshStandardMaterial
          color="#DAA520"
          side={THREE.DoubleSide}
          transparent
          opacity={0.8}
          roughness={0.7}
        />
      </mesh>
      {/* Outer ring */}
      <mesh>
        <ringGeometry args={[radius * 2.05, radius * 2.5, 64]} />
        <meshStandardMaterial
          color="#C4A45A"
          side={THREE.DoubleSide}
          transparent
          opacity={0.5}
          roughness={0.9}
        />
      </mesh>
      {/* Gap in rings (Cassini division) */}
      <mesh>
        <ringGeometry args={[radius * 1.58, radius * 1.65, 64]} />
        <meshBasicMaterial
          color="#000000"
          side={THREE.DoubleSide}
          transparent
          opacity={0.3}
        />
      </mesh>
    </group>
  );
}

// Procedural planet surface material
function PlanetMaterial({ color, name }: { color: string; name: string }) {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  const config = useMemo(() => {
    switch (name) {
      case 'Mercury':
        return { roughness: 0.95, metalness: 0.1, color: '#8B7355' };
      case 'Venus':
        return { roughness: 0.6, metalness: 0.0, color: '#E8C87A' };
      case 'Earth':
        return { roughness: 0.5, metalness: 0.1, color: '#4A90D9' };
      case 'Mars':
        return { roughness: 0.9, metalness: 0.05, color: '#C1440E' };
      case 'Jupiter':
        return { roughness: 0.4, metalness: 0.0, color: '#C88B3A' };
      case 'Saturn':
        return { roughness: 0.4, metalness: 0.0, color: '#E8C87A' };
      case 'Uranus':
        return { roughness: 0.3, metalness: 0.0, color: '#7EC8E3' };
      case 'Neptune':
        return { roughness: 0.3, metalness: 0.0, color: '#3B5FC0' };
      default:
        return { roughness: 0.7, metalness: 0.1, color };
    }
  }, [name, color]);

  return (
    <meshStandardMaterial
      ref={materialRef}
      color={config.color}
      roughness={config.roughness}
      metalness={config.metalness}
    />
  );
}

// Earth-specific details (continents approximation)
function EarthDetails({ radius }: { radius: number }) {
  return (
    <>
      {/* Cloud layer */}
      <mesh>
        <sphereGeometry args={[radius * 1.02, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          transparent
          opacity={0.15}
          roughness={1}
        />
      </mesh>
    </>
  );
}

// Jupiter bands
function JupiterBands({ radius }: { radius: number }) {
  return (
    <>
      {/* Great Red Spot approximation */}
      <mesh position={[radius * 0.7, -radius * 0.2, radius * 0.7]} rotation={[0, -Math.PI / 4, 0]}>
        <sphereGeometry args={[radius * 0.2, 16, 16]} />
        <meshStandardMaterial
          color="#8B3A3A"
          roughness={0.6}
          transparent
          opacity={0.6}
        />
      </mesh>
    </>
  );
}

export function Planet({ data, isPlaying, speed, onSelect, isSelected, elapsedTime }: PlanetProps) {
  const groupRef = useRef<THREE.Group>(null);
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const wasHovered = useRef(false);

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
    soundManager.playSelectSound();
    onSelect(isSelected ? null : data);
  };

  const handlePointerOver = (e: any) => {
    e.stopPropagation();
    setHovered(true);
    document.body.style.cursor = 'pointer';
    if (!wasHovered.current) {
      soundManager.playHoverSound();
    }
    wasHovered.current = true;
  };

  const handlePointerOut = () => {
    setHovered(false);
    document.body.style.cursor = 'default';
    wasHovered.current = false;
  };

  return (
    <>
      <OrbitRing distance={data.distance} />
      <group ref={groupRef}>
        {/* Main planet body */}
        <mesh
          ref={meshRef}
          onClick={handleClick}
          onPointerOver={handlePointerOver}
          onPointerOut={handlePointerOut}
        >
          <sphereGeometry args={[data.radius, 64, 64]} />
          <PlanetMaterial color={data.color} name={data.name} />
        </mesh>

        {/* Atmosphere glow */}
        {data.atmosphereColor && (
          <Atmosphere
            radius={data.radius}
            color={data.atmosphereColor}
            opacity={data.atmosphereOpacity || 0.15}
          />
        )}

        {/* Earth details */}
        {data.name === 'Earth' && <EarthDetails radius={data.radius} />}

        {/* Jupiter details */}
        {data.name === 'Jupiter' && <JupiterBands radius={data.radius} />}

        {/* Saturn rings */}
        {data.name === 'Saturn' && <SaturnRings radius={data.radius} />}

        {/* Selection indicator */}
        {isSelected && (
          <mesh>
            <sphereGeometry args={[data.radius * 1.4, 16, 16]} />
            <meshBasicMaterial
              color="#ffffff"
              transparent
              opacity={0.08}
              wireframe
            />
          </mesh>
        )}

        {/* Hover glow */}
        {hovered && !isSelected && (
          <mesh>
            <sphereGeometry args={[data.radius * 1.2, 16, 16]} />
            <meshBasicMaterial
              color={data.color}
              transparent
              opacity={0.1}
              side={THREE.BackSide}
            />
          </mesh>
        )}
      </group>
    </>
  );
}
