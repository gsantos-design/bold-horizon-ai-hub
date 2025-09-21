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

// Sound effect IDs and their file paths
const SOUND_FILES = {
  // Celebration sounds
  'cheer-short': '/assets/audio/cheer-short.mp3',
  'fanfare-success': '/assets/audio/fanfare-success.mp3',
  'launch-whoosh': '/assets/audio/launch-whoosh.mp3',
  'announcement-ding': '/assets/audio/announcement-ding.mp3',
  'celebration-stinger': '/assets/audio/celebration-stinger.mp3',
  
  // Background music
  'intro-theme': '/assets/audio/intro-theme.mp3',
  'victory-theme': '/assets/audio/victory-theme.mp3',
} as const;

interface SoundProviderProps {
  children: React.ReactNode;
}

export function SoundProvider({ children }: SoundProviderProps) {
  const [enabled, setEnabled] = useState(() => {
    const saved = localStorage.getItem('santiago-sound-enabled');
    return saved === 'true';
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

  // Preload audio files
  const preloadSound = useCallback(async (soundId: string): Promise<AudioBuffer | null> => {
    if (!enabled || !audioContextRef.current) return null;
    
    if (audioBuffersRef.current.has(soundId)) {
      return audioBuffersRef.current.get(soundId)!;
    }

    try {
      const response = await fetch(SOUND_FILES[soundId as keyof typeof SOUND_FILES]);
      if (!response.ok) return null;
      
      const arrayBuffer = await response.arrayBuffer();
      const audioBuffer = await audioContextRef.current.decodeAudioData(arrayBuffer);
      audioBuffersRef.current.set(soundId, audioBuffer);
      return audioBuffer;
    } catch (error) {
      console.warn(`Failed to load sound ${soundId}:`, error);
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
    
    await initAudioContext();
    const buffer = await preloadSound(soundId);
    if (!buffer || !audioContextRef.current || !gainNodeRef.current) return;

    try {
      const source = audioContextRef.current.createBufferSource();
      const gainNode = audioContextRef.current.createGain();
      
      source.buffer = buffer;
      gainNode.gain.value = sfxVolume;
      
      source.connect(gainNode);
      gainNode.connect(gainNodeRef.current);
      source.start();
    } catch (error) {
      console.warn(`Failed to play sound ${soundId}:`, error);
    }
  }, [enabled, sfxVolume, initAudioContext, preloadSound]);

  const playMusic = useCallback(async (musicId: string, options: { loop?: boolean } = {}) => {
    if (!enabled || musicVolume === 0) return;
    
    stopMusic(); // Stop any currently playing music
    
    const filePath = SOUND_FILES[musicId as keyof typeof SOUND_FILES];
    if (!filePath) return;

    try {
      const audio = new Audio(filePath);
      audio.volume = musicVolume;
      audio.loop = options.loop || false;
      
      currentMusicRef.current = audio;
      await audio.play();
    } catch (error) {
      console.warn(`Failed to play music ${musicId}:`, error);
    }
  }, [enabled, musicVolume]);

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