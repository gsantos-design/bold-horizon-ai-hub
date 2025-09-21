import { Volume2, VolumeX, Music, Volume1 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { useSound } from '@/lib/SoundContext';
import { useLanguage } from '@/lib/LanguageContext';

export default function SoundControls() {
  const { enabled, musicVolume, sfxVolume, toggleSound, setMusicVolume, setSfxVolume } = useSound();
  const { t } = useLanguage();

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="text-primary hover:text-accent hover:bg-secondary/10"
          title={enabled ? t('sound.enabled') : t('sound.disabled')}
        >
          {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-64" align="end">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold">{t('sound.title')}</span>
            <Button
              variant="outline"
              size="sm"
              onClick={toggleSound}
              className={enabled ? 'bg-primary text-white' : ''}
            >
              {enabled ? <Volume2 className="h-4 w-4" /> : <VolumeX className="h-4 w-4" />}
            </Button>
          </div>
          
          {enabled && (
            <>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Music className="h-4 w-4 text-primary" />
                  <span className="text-sm">{t('sound.music')}</span>
                </div>
                <Slider
                  value={[musicVolume * 100]}
                  onValueChange={(value) => setMusicVolume(value[0] / 100)}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Volume1 className="h-4 w-4 text-primary" />
                  <span className="text-sm">{t('sound.effects')}</span>
                </div>
                <Slider
                  value={[sfxVolume * 100]}
                  onValueChange={(value) => setSfxVolume(value[0] / 100)}
                  max={100}
                  step={5}
                  className="w-full"
                />
              </div>
            </>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
}