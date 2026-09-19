import { useState } from 'react';
import { SolarSystemScene } from './components/SolarSystemScene';
import { ControlPanel, InfoPanel } from './components/ControlPanel';
import { PlanetData, PLANETS } from './data/planets';

function App() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [speed, setSpeed] = useState(1);
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);

  return (
    <div className="w-full h-screen relative overflow-hidden bg-black">
      {/* 3D Scene */}
      <SolarSystemScene
        isPlaying={isPlaying}
        speed={speed}
        selectedPlanet={selectedPlanet}
        onSelectPlanet={setSelectedPlanet}
      />

      {/* Title */}
      <div className="absolute top-6 left-6 pointer-events-none">
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Solar System
        </h1>
        <p className="text-white/50 text-sm mt-1">
          Click on a planet to learn more • Drag to rotate • Scroll to zoom
        </p>
      </div>

      {/* Planet Info Panel */}
      <InfoPanel
        planet={selectedPlanet}
        onClose={() => setSelectedPlanet(null)}
      />

      {/* Controls */}
      <ControlPanel
        isPlaying={isPlaying}
        speed={speed}
        onTogglePlay={() => setIsPlaying(!isPlaying)}
        onSpeedChange={setSpeed}
      />

      {/* Planet quick-select bar */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-black/40 backdrop-blur-md rounded-full px-4 py-2 border border-white/10">
        {[{ name: 'Sun', color: '#FDB813' }, ...PLANETS.map(p => ({ name: p.name, color: p.color }))].map((item, i) => (
          <button
            key={item.name}
            onClick={() => {
              if (item.name === 'Sun') {
                setSelectedPlanet(null);
              } else {
                setSelectedPlanet(PLANETS[i - 1]);
              }
            }}
            className={`group relative w-7 h-7 rounded-full flex items-center justify-center transition-all hover:scale-125 ${
              selectedPlanet?.name === item.name ? 'ring-2 ring-white/50 bg-white/20 scale-110' : 'hover:bg-white/10'
            }`}
            title={item.name}
          >
            <div
              className="w-4 h-4 rounded-full shadow-sm"
              style={{ backgroundColor: item.color }}
            />
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-white/60 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap">
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
