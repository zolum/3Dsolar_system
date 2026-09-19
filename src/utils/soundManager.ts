class SpaceSoundManager {
  private audioContext: AudioContext | null = null;
  private masterGain: GainNode | null = null;
  private ambientOsc: OscillatorNode | null = null;
  private ambientGain: GainNode | null = null;
  private isPlaying = false;
  private volume = 0.3;

  init() {
    if (this.audioContext) return;
    
    this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    this.masterGain = this.audioContext.createGain();
    this.masterGain.gain.value = this.volume;
    this.masterGain.connect(this.audioContext.destination);
  }

  startAmbient() {
    if (!this.audioContext || !this.masterGain || this.isPlaying) return;
    this.isPlaying = true;

    // Deep space drone - layered oscillators
    this.ambientGain = this.audioContext.createGain();
    this.ambientGain.gain.value = 0;
    this.ambientGain.connect(this.masterGain);

    // Base drone
    const osc1 = this.audioContext.createOscillator();
    osc1.type = 'sine';
    osc1.frequency.value = 55; // A1
    const gain1 = this.audioContext.createGain();
    gain1.gain.value = 0.08;
    osc1.connect(gain1);
    gain1.connect(this.ambientGain);
    osc1.start();

    // Harmonic
    const osc2 = this.audioContext.createOscillator();
    osc2.type = 'sine';
    osc2.frequency.value = 82.5; // E2
    const gain2 = this.audioContext.createGain();
    gain2.gain.value = 0.04;
    osc2.connect(gain2);
    gain2.connect(this.ambientGain);
    osc2.start();

    // Sub bass
    const osc3 = this.audioContext.createOscillator();
    osc3.type = 'sine';
    osc3.frequency.value = 30;
    const gain3 = this.audioContext.createGain();
    gain3.gain.value = 0.06;
    osc3.connect(gain3);
    gain3.connect(this.ambientGain);
    osc3.start();

    // Ethereal high tone
    const osc4 = this.audioContext.createOscillator();
    osc4.type = 'sine';
    osc4.frequency.value = 440;
    const gain4 = this.audioContext.createGain();
    gain4.gain.value = 0.01;
    osc4.connect(gain4);
    gain4.connect(this.ambientGain);
    osc4.start();

    // Slow LFO for movement
    const lfo = this.audioContext.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.1;
    const lfoGain = this.audioContext.createGain();
    lfoGain.gain.value = 5;
    lfo.connect(lfoGain);
    lfoGain.connect(osc1.frequency);
    lfo.start();

    this.ambientOsc = osc1;

    // Fade in
    this.ambientGain.gain.linearRampToValueAtTime(1, this.audioContext.currentTime + 2);
  }

  stopAmbient() {
    if (!this.audioContext || !this.ambientGain) return;
    this.isPlaying = false;
    
    // Fade out
    this.ambientGain.gain.linearRampToValueAtTime(0, this.audioContext.currentTime + 1);
    
    setTimeout(() => {
      if (this.ambientGain) {
        this.ambientGain.disconnect();
        this.ambientGain = null;
      }
    }, 1100);
  }

  playSelectSound() {
    if (!this.audioContext || !this.masterGain) return;

    const osc = this.audioContext.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 600;
    
    const gain = this.audioContext.createGain();
    gain.gain.value = 0.15;
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.3);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.frequency.exponentialRampToValueAtTime(300, this.audioContext.currentTime + 0.3);
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.3);
  }

  playHoverSound() {
    if (!this.audioContext || !this.masterGain) return;

    const osc = this.audioContext.createOscillator();
    osc.type = 'sine';
    osc.frequency.value = 800;
    
    const gain = this.audioContext.createGain();
    gain.gain.value = 0.05;
    gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(this.masterGain);
    
    osc.start();
    osc.stop(this.audioContext.currentTime + 0.1);
  }

  setVolume(vol: number) {
    this.volume = vol;
    if (this.masterGain) {
      this.masterGain.gain.value = vol;
    }
  }

  getVolume() {
    return this.volume;
  }

  isAmbientPlaying() {
    return this.isPlaying;
  }
}

export const soundManager = new SpaceSoundManager();
