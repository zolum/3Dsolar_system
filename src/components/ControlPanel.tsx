import { useState, useEffect } from 'react';
import { PlanetData } from '../data/planets';
import { soundManager } from '../utils/soundManager';

interface ControlPanelProps {
  isPlaying: boolean;
  speed: number;
  onTogglePlay: () => void;
  onSpeedChange: (speed: number) => void;
}

export function ControlPanel({ isPlaying, speed, onTogglePlay, onSpeedChange }: ControlPanelProps) {
  const speeds = [0.25, 0.5, 1, 2, 5, 10];
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [volume, setVolume] = useState(0.3);

  useEffect(() => {
    if (soundEnabled) {
      soundManager.init();
      soundManager.startAmbient();
    } else {
      soundManager.stopAmbient();
    }
  }, [soundEnabled]);

  useEffect(() => {
    soundManager.setVolume(volume);
  }, [volume]);

  const toggleSound = () => {
    if (!soundEnabled) {
      soundManager.init();
    }
    setSoundEnabled(!soundEnabled);
  };

  return (
    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-black/70 backdrop-blur-xl rounded-2xl px-6 py-3 border border-white/10 shadow-2xl">
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

      {/* Divider */}
      <div className="w-px h-8 bg-white/10" />

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
                  ? 'bg-blue-500 text-white shadow-lg shadow-blue-500/30'
                  : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
              }`}
            >
              {s}x
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="w-px h-8 bg-white/10" />

      {/* Sound controls */}
      <div className="flex items-center gap-2">
        <button
          onClick={toggleSound}
          className={`w-8 h-8 flex items-center justify-center rounded-full transition-colors ${
            soundEnabled ? 'bg-purple-500/30 text-purple-300' : 'bg-white/10 text-white/60 hover:bg-white/20'
          }`}
          title={soundEnabled ? 'Mute' : 'Enable Sound'}
        >
          {soundEnabled ? (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          ) : (
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M11 5L6 9H2v6h4l5 4V5z" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          )}
        </button>
        {soundEnabled && (
          <input
            type="range"
            min="0"
            max="1"
            step="0.05"
            value={volume}
            onChange={(e) => setVolume(parseFloat(e.target.value))}
            className="w-16 h-1 bg-white/20 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-purple-400"
            title="Volume"
          />
        )}
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
    <div className="absolute top-6 right-6 w-80 bg-black/80 backdrop-blur-xl rounded-2xl border border-white/10 overflow-hidden shadow-2xl animate-in">
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
            className="w-12 h-12 rounded-full shadow-lg relative overflow-hidden"
            style={{
              background: `radial-gradient(circle at 30% 30%, ${planet.color}ee, ${planet.color}88, ${planet.color}44)`,
              boxShadow: `0 0 25px ${planet.color}44, inset -3px -3px 8px rgba(0,0,0,0.3)`,
            }}
          >
            {planet.atmosphereColor && (
              <div
                className="absolute inset-0 rounded-full"
                style={{
                  background: `radial-gradient(circle at 70% 30%, ${planet.atmosphereColor}33, transparent 60%)`,
                }}
              />
            )}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">{planet.name}</h2>
            <p className="text-white/40 text-xs">
              {['Mercury','Venus','Earth','Mars','Jupiter','Saturn','Uranus','Neptune'].indexOf(planet.name) + 1}
              {['st','nd','rd','th','th','th','th','th'][['Mercury','Venus','Earth','Mars','Jupiter','Saturn','Uranus','Neptune'].indexOf(planet.name)]} planet from the Sun
            </p>
          </div>
        </div>
      </div>

      {/* Info grid */}
      <div className="px-5 pb-4 grid grid-cols-2 gap-2">
        <InfoCard label="Radius" value={planet.realRadius} icon="📏" />
        <InfoCard label="Distance" value={planet.realDistance} icon="🌍" />
        <InfoCard label="Orbital Period" value={planet.realOrbitalPeriod} icon="⏱️" />
        <InfoCard label="Type" value={getPlanetType(planet.name)} icon="🪐" />
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

function getPlanetType(name: string): string {
  if (['Mercury', 'Venus', 'Earth', 'Mars'].includes(name)) return 'Rocky';
  if (['Jupiter', 'Saturn'].includes(name)) return 'Gas Giant';
  return 'Ice Giant';
}

function InfoCard({ label, value, icon }: { label: string; value: string; icon: string }) {
  return (
    <div className="bg-white/5 rounded-lg p-2.5 border border-white/5">
      <div className="flex items-center gap-1.5">
        <span className="text-xs">{icon}</span>
        <p className="text-white/50 text-[10px] uppercase tracking-wider font-medium">{label}</p>
      </div>
      <p className="text-white text-sm font-semibold mt-0.5">{value}</p>
    </div>
  );
}
