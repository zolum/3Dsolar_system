import { PlanetData, SUN_DATA } from '../data/planets';

interface ControlPanelProps {
  isPlaying: boolean;
  speed: number;
  onTogglePlay: () => void;
  onSpeedChange: (speed: number) => void;
}

export function ControlPanel({ isPlaying, speed, onTogglePlay, onSpeedChange }: ControlPanelProps) {
  const speeds = [0.25, 0.5, 1, 2, 5, 10];

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/60 backdrop-blur-md rounded-2xl px-6 py-3 border border-white/10">
      {/* Play/Pause */}
      <button
        onClick={onTogglePlay}
        className="w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white"
        title={isPlaying ? 'Pause' : 'Play'}
      >
        {isPlaying ? (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <rect x="3" y="2" width="4" height="12" rx="1" />
            <rect x="9" y="2" width="4" height="12" rx="1" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M4 2l10 6-10 6V2z" />
          </svg>
        )}
      </button>

      {/* Speed control */}
      <div className="flex items-center gap-2">
        <span className="text-white/60 text-xs font-medium">Speed:</span>
        <div className="flex gap-1">
          {speeds.map((s) => (
            <button
              key={s}
              onClick={() => onSpeedChange(s)}
              className={`px-2 py-1 rounded text-xs font-medium transition-all ${
                speed === s
                  ? 'bg-blue-500 text-white'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

interface InfoPanelProps {
  planet: PlanetData | null;
  onClose: () => void;
}

export function InfoPanel({ planet, onClose }: InfoPanelProps) {
  if (!planet) return null;

  return (
    <div className="absolute top-6 right-6 w-80 bg-black/70 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
      {/* Header */}
      <div className="relative p-5 pb-4">
        <button
          onClick={onClose}
          className="absolute top-3 right-3 w-7 h-7 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 transition-colors text-white/70 hover:text-white"
        >
          <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 2l8 8M10 2l-8 8" />
          </svg>
        </button>
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full shadow-lg"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${planet.color}, ${planet.color}88)`,
              boxShadow: `0 0 20px ${planet.color}44`,
            }}
          />
          <h2 className="text-xl font-bold text-white">{planet.name}</h2>
        </div>
      </div>

      {/* Info grid */}
      <div className="px-5 pb-4 grid grid-cols-2 gap-3">
        <InfoCard label="Radius" value={planet.realRadius} />
        <InfoCard label="Distance" value={planet.realDistance} />
        <InfoCard label="Orbital Period" value={planet.realOrbitalPeriod} />
        <InfoCard label="Order" value={`${['Mercury','Venus','Earth','Mars','Jupiter','Saturn','Uranus','Neptune'].indexOf(planet.name) + 1} from Sun`} />
      </div>

      {/* Description */}
      <div className="px-5 pb-5">
        <p className="text-white/70 text-sm leading-relaxed">
          {planet.description}
        </p>
      </div>
    </div>
  );
}

function InfoCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="bg-white/5 rounded-lg p-2.5">
      <p className="text-white/50 text-[10px] uppercase tracking-wider font-medium">{label}</p>
      <p className="text-white text-sm font-semibold mt-0.5">{value}</p>
    </div>
  );
}
