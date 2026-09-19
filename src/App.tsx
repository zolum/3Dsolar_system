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
        <h1 className="text-3xl font-bold text-white tracking-tight flex items-center gap-2">
          <span className="text-4xl">🌌</span> Solar System
        </h1>
        <p className="text-white/50 text-sm mt-1.5 max-w-xs">
          Click a planet to explore • Drag to orbit • Scroll to zoom
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
      <div className="absolute top-20 left-1/2 -translate-x-1/2 flex items-center gap-2 bg-black/50 backdrop-blur-xl rounded-full px-5 py-2.5 border border-white/10 shadow-xl">
        {[{ name: 'Sun', color: '#FDB813', size: 'w-5 h-5' }, ...PLANETS.map(p => ({ name: p.name, color: p.color, size: 'w-4 h-4' }))].map((item, i) => (
          <button
            key={item.name}
            onClick={() => {
              if (item.name === 'Sun') {
                setSelectedPlanet(null);
              } else {
                setSelectedPlanet(PLANETS[i - 1]);
              }
            }}
            className={`group relative flex items-center justify-center transition-all duration-200 hover:scale-125 ${
              selectedPlanet?.name === item.name ? 'scale-110' : ''
            }`}
            title={item.name}
          >
            <div
              className={`${item.size} rounded-full shadow-md transition-all ${
                selectedPlanet?.name === item.name 
                  ? 'ring-2 ring-white/60 ring-offset-1 ring-offset-black/50' 
                  : 'hover:ring-1 hover:ring-white/30'
              }`}
              style={{ 
                backgroundColor: item.color,
                boxShadow: selectedPlanet?.name === item.name 
                  ? `0 0 12px ${item.color}88` 
                  : `0 0 4px ${item.color}44`,
              }}
            />
            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[9px] text-white/80 opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap font-medium bg-black/60 px-1.5 py-0.5 rounded">
              {item.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

export default App;
