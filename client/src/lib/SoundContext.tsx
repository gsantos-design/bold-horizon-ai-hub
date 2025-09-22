import React, { createContext, useContext, useState, useRef, useCallback } from 'react';
import { Howl, Howler } from 'howler';

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

// Professional audio tracks and sound effects
// Using royalty-free and public domain sources for high-quality audio
const AUDIO_REGISTRY = {
  // Triumphant themes - "Eye of the Tiger" style energetic music
  'intro-theme': {
    urls: [
      'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav', // Placeholder for now
      'https://cdn.pixabay.com/download/audio/2022/10/25/audio_0cdf8a8cc9.mp3' // Inspirational corporate
    ],
    volume: 0.7,
    loop: false,
    type: 'music'
  },
  'victory-theme': {
    urls: [
      'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' // Will replace with actual epic music
    ],
    volume: 0.8,
    loop: true,
    type: 'music'
  },
  
  // Crowd cheering and celebration sounds
  'crowd-cheer': {
    urls: [
      'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' // Placeholder - will use actual crowd
    ],
    volume: 0.8,
    loop: false,
    type: 'sfx'
  },
  'celebration-stinger': {
    urls: [
      'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' // Short celebration sound
    ],
    volume: 0.6,
    loop: false,
    type: 'sfx'
  },
  'fanfare-success': {
    urls: [
      'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' // Success fanfare
    ],
    volume: 0.7,
    loop: false,
    type: 'sfx'
  },
  'announcement-ding': {
    urls: [
      'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav' // Pleasant notification
    ],
    volume: 0.5,
    loop: false,
    type: 'sfx'
  }
} as const;

interface SoundProviderProps {
  children: React.ReactNode;
}

export function SoundProvider({ children }: SoundProviderProps) {
  const [enabled, setEnabled] = useState(() => {
    // Temporarily disable until we get proper audio
    return false;
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

  // Temporarily disable sound functionality until proper audio is implemented
  const preloadSound = useCallback(async (soundId: string): Promise<any> => {
    return null; // Disabled for now
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