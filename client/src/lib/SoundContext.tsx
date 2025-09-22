import React, { createContext, useContext, useState, useRef, useCallback } from 'react';

interface SoundContextType {
  enabled: boolean;
  musicVolume: number;
  sfxVolume: number;
  toggleSound: () => void;
  setMusicVolume: (volume: number) => void;
  setSfxVolume: (volume: number) => void;
  playSfx: (soundId: string) => Promise<void>;
  playMusic: (musicId: string, options?: { loop?: boolean }) => Promise<void>;
  stopMusic: () => void;
  duckWhile: (asyncFn: () => Promise<void>) => Promise<void>;
}

const SoundContext = createContext<SoundContextType>({
  enabled: false,
  musicVolume: 0.7,
  sfxVolume: 0.8,
  toggleSound: () => {},
  setMusicVolume: () => {},
  setSfxVolume: () => {},
  playSfx: async () => {},
  playMusic: async () => {},
  stopMusic: () => {},
  duckWhile: async () => {},
});

// Generate sounds using Web Audio API instead of loading files
const generateSound = (audioContext: AudioContext, type: string): AudioBuffer => {
  const sampleRate = audioContext.sampleRate;
  let duration = 0.5;
  let buffer: AudioBuffer;

  switch(type) {
    case 'celebration-stinger':
      duration = 0.8;
      buffer = audioContext.createBuffer(1, duration * sampleRate, sampleRate);
      const celebrationData = buffer.getChannelData(0);
      // Upward sweep with harmonics - celebration sound
      for (let i = 0; i < celebrationData.length; i++) {
        const t = i / sampleRate;
        const freq = 440 + (t * 800); // Rising frequency
        const env = Math.exp(-t * 3); // Decay envelope
        celebrationData[i] = env * (
          Math.sin(2 * Math.PI * freq * t) * 0.3 +
          Math.sin(2 * Math.PI * freq * 2 * t) * 0.2 +
          Math.sin(2 * Math.PI * freq * 3 * t) * 0.1
        );
      }
      return buffer;

    case 'intro-theme':
      duration = 3.0;
      buffer = audioContext.createBuffer(1, duration * sampleRate, sampleRate);
      const themeData = buffer.getChannelData(0);
      // Triumphant theme inspired by classical fanfare
      const notes = [440, 554, 659, 880]; // A, C#, E, A - triumphant chord
      for (let i = 0; i < themeData.length; i++) {
        const t = i / sampleRate;
        let sample = 0;
        notes.forEach((freq, idx) => {
          const env = Math.max(0, 1 - t * 0.5); // Slow decay
          const vibrato = 1 + 0.02 * Math.sin(2 * Math.PI * 5 * t); // Slight vibrato
          sample += env * Math.sin(2 * Math.PI * freq * vibrato * t) * (0.25 / notes.length);
        });
        themeData[i] = sample;
      }
      return buffer;

    case 'fanfare-success':
    case 'cheer-short':
      duration = 0.6;
      buffer = audioContext.createBuffer(1, duration * sampleRate, sampleRate);
      const successData = buffer.getChannelData(0);
      // Success fanfare with multiple harmonics
      for (let i = 0; i < successData.length; i++) {
        const t = i / sampleRate;
        const env = Math.exp(-t * 2);
        successData[i] = env * (
          Math.sin(2 * Math.PI * 523 * t) * 0.3 + // C
          Math.sin(2 * Math.PI * 659 * t) * 0.25 + // E
          Math.sin(2 * Math.PI * 784 * t) * 0.2 // G
        );
      }
      return buffer;

    case 'launch-whoosh':
      duration = 1.0;
      buffer = audioContext.createBuffer(1, duration * sampleRate, sampleRate);
      const whooshData = buffer.getChannelData(0);
      // Whoosh effect with filtered noise
      for (let i = 0; i < whooshData.length; i++) {
        const t = i / sampleRate;
        const noise = (Math.random() - 0.5) * 2;
        const env = Math.exp(-t * 4);
        const freq = 200 - t * 180; // Descending frequency
        whooshData[i] = env * (noise * 0.3 + Math.sin(2 * Math.PI * freq * t) * 0.1);
      }
      return buffer;

    default:
      // Default ding sound
      duration = 0.3;
      buffer = audioContext.createBuffer(1, duration * sampleRate, sampleRate);
      const defaultData = buffer.getChannelData(0);
      for (let i = 0; i < defaultData.length; i++) {
        const t = i / sampleRate;
        const env = Math.exp(-t * 5);
        defaultData[i] = env * Math.sin(2 * Math.PI * 800 * t) * 0.3;
      }
      return buffer;
  }
};

// Sound effect IDs - now generated dynamically
const SOUND_TYPES = [
  'cheer-short',
  'fanfare-success', 
  'launch-whoosh',
  'announcement-ding',
  'celebration-stinger',
  'intro-theme',
  'victory-theme'
] as const;

interface SoundProviderProps {
  children: React.ReactNode;
}

export function SoundProvider({ children }: SoundProviderProps) {
  const [enabled, setEnabled] = useState(() => {
    const saved = localStorage.getItem('santiago-sound-enabled');
    return saved !== null ? saved === 'true' : true; // Default to enabled, respect user choice
  });
  
  const [musicVolume, setMusicVolumeState] = useState(() => {
    const saved = localStorage.getItem('santiago-music-volume');
    return saved ? parseFloat(saved) : 0.7;
  });
  
  const [sfxVolume, setSfxVolumeState] = useState(() => {
    const saved = localStorage.getItem('santiago-sfx-volume');
    return saved ? parseFloat(saved) : 0.8;
  });

  const audioContextRef = useRef<AudioContext | null>(null);
  const audioBuffersRef = useRef<Map<string, AudioBuffer>>(new Map());
  const currentMusicRef = useRef<HTMLAudioElement | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);

  // Initialize Audio Context
  const initAudioContext = useCallback(async () => {
    if (!audioContextRef.current && enabled) {
      try {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
        gainNodeRef.current = audioContextRef.current.createGain();
        gainNodeRef.current.connect(audioContextRef.current.destination);
      } catch (error) {
        console.warn('Failed to initialize AudioContext:', error);
      }
    }
  }, [enabled]);

  // Generate audio buffers dynamically
  const preloadSound = useCallback(async (soundId: string): Promise<AudioBuffer | null> => {
    if (!enabled || !audioContextRef.current) return null;
    
    if (audioBuffersRef.current.has(soundId)) {
      return audioBuffersRef.current.get(soundId)!;
    }

    try {
      const audioBuffer = generateSound(audioContextRef.current, soundId);
      audioBuffersRef.current.set(soundId, audioBuffer);
      return audioBuffer;
    } catch (error) {
      console.warn(`Failed to generate sound ${soundId}:`, error);
      return null;
    }
  }, [enabled]);

  const toggleSound = useCallback(() => {
    const newEnabled = !enabled;
    setEnabled(newEnabled);
    localStorage.setItem('santiago-sound-enabled', newEnabled.toString());
    
    if (newEnabled) {
      initAudioContext();
    } else {
      stopMusic();
    }
  }, [enabled, initAudioContext]);

  const setMusicVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    setMusicVolumeState(clampedVolume);
    localStorage.setItem('santiago-music-volume', clampedVolume.toString());
    
    if (currentMusicRef.current) {
      currentMusicRef.current.volume = clampedVolume;
    }
  }, []);

  const setSfxVolume = useCallback((volume: number) => {
    const clampedVolume = Math.max(0, Math.min(1, volume));
    setSfxVolumeState(clampedVolume);
    localStorage.setItem('santiago-sfx-volume', clampedVolume.toString());
  }, []);

  const playSfx = useCallback(async (soundId: string) => {
    if (!enabled || sfxVolume === 0) return;
    
    try {
      await initAudioContext();
      const buffer = await preloadSound(soundId);
      if (!buffer || !audioContextRef.current || !gainNodeRef.current) return;

      const source = audioContextRef.current.createBufferSource();
      const gainNode = audioContextRef.current.createGain();
      
      source.buffer = buffer;
      gainNode.gain.value = sfxVolume;
      
      source.connect(gainNode);
      gainNode.connect(gainNodeRef.current);
      source.start();
    } catch (error) {
      console.warn(`Failed to play sound ${soundId}:`, error);
      // Auto-enable sound on first user interaction
      if (!enabled) {
        setEnabled(true);
        localStorage.setItem('santiago-sound-enabled', 'true');
      }
    }
  }, [enabled, sfxVolume, initAudioContext, preloadSound]);

  const playMusic = useCallback(async (musicId: string, options: { loop?: boolean } = {}) => {
    if (!enabled || musicVolume === 0) return;
    
    await initAudioContext();
    if (!audioContextRef.current) return;

    try {
      stopMusic(); // Stop any current music
      
      const audioBuffer = await preloadSound(musicId);
      if (!audioBuffer) return;

      const source = audioContextRef.current.createBufferSource();
      source.buffer = audioBuffer;
      source.loop = options.loop || false;
      
      const gainNode = audioContextRef.current.createGain();
      gainNode.gain.value = musicVolume;
      
      source.connect(gainNode);
      gainNode.connect(audioContextRef.current.destination);
      
      source.start(0);
      
      // Store reference for stopping  
      (source as any).gainNode = gainNode;
      currentMusicRef.current = source as any;
      
    } catch (error) {
      console.warn(`Failed to play music ${musicId}:`, error);
    }
  }, [enabled, musicVolume, initAudioContext, preloadSound]);

  const stopMusic = useCallback(() => {
    if (currentMusicRef.current) {
      currentMusicRef.current.pause();
      currentMusicRef.current.currentTime = 0;
      currentMusicRef.current = null;
    }
  }, []);

  const duckWhile = useCallback(async (asyncFn: () => Promise<void>) => {
    const originalGain = gainNodeRef.current?.gain.value || 1;
    
    // Duck the audio to 20% volume
    if (gainNodeRef.current) {
      gainNodeRef.current.gain.value = originalGain * 0.2;
    }
    
    try {
      await asyncFn();
    } finally {
      // Restore original volume
      if (gainNodeRef.current) {
        gainNodeRef.current.gain.value = originalGain;
      }
    }
  }, []);

  const value: SoundContextType = {
    enabled,
    musicVolume,
    sfxVolume,
    toggleSound,
    setMusicVolume,
    setSfxVolume,
    playSfx,
    playMusic,
    stopMusic,
    duckWhile,
  };

  return (
    <SoundContext.Provider value={value}>
      {children}
    </SoundContext.Provider>
  );
}

export const useSound = () => {
  const context = useContext(SoundContext);
  if (!context) {
    throw new Error('useSound must be used within a SoundProvider');
  }
  return context;
};