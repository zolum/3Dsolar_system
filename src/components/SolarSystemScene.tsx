import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import { Sun } from './Sun';
import { Planet } from './Planet';
import { Starfield } from './Starfield';
import { PLANETS, PlanetData } from '../data/planets';

interface SolarSystemSceneProps {
  isPlaying: boolean;
  speed: number;
  selectedPlanet: PlanetData | null;
  onSelectPlanet: (planet: PlanetData | null) => void;
}

function TimeController({ isPlaying, speed, elapsedTime }: { isPlaying: boolean; speed: number; elapsedTime: React.MutableRefObject<number> }) {
  useFrame((_, delta) => {
    if (isPlaying) {
      elapsedTime.current += delta * speed;
    }
  });
  return null;
}

export function SolarSystemScene({ isPlaying, speed, selectedPlanet, onSelectPlanet }: SolarSystemSceneProps) {
  const elapsedTime = useRef(0);

  return (
    <Canvas
      camera={{ position: [0, 30, 45], fov: 60, near: 0.1, far: 500 }}
      style={{ background: '#000010' }}
      onPointerMissed={() => onSelectPlanet(null)}
    >
      <ambientLight intensity={0.08} />
      
      <TimeController isPlaying={isPlaying} speed={speed} elapsedTime={elapsedTime} />
      
      <Sun />
      
      {PLANETS.map((planet) => (
        <Planet
          key={planet.name}
          data={planet}
          isPlaying={isPlaying}
          speed={speed}
          onSelect={onSelectPlanet}
          isSelected={selectedPlanet?.name === planet.name}
          elapsedTime={elapsedTime}
        />
      ))}
      
      <Starfield />
      
      <OrbitControls
        enablePan={true}
        enableZoom={true}
        enableRotate={true}
        minDistance={5}
        maxDistance={100}
        autoRotate={false}
      />
    </Canvas>
  );
}
