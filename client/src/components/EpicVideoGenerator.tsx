import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { 
  Video, 
  PlayCircle, 
  Download, 
  Loader2, 
  Star, 
  Crown, 
  Trophy,
  Volume2,
  Users,
  Sparkles
} from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";
import { useSound } from "@/lib/SoundContext";
import { useToast } from "@/hooks/use-toast";

interface VideoGenerationRequest {
  avatarType: 'nolly' | 'pablo' | 'both';
  scene: 'entrance' | 'presentation' | 'celebration';
  music: 'zarathustra' | 'william_tell' | 'pomp_circumstance' | 'custom_fanfare';
  script: string;
  crowdLevel: 'moderate' | 'loud' | 'thunderous';
}

export default function EpicVideoGenerator() {
  const { t } = useLanguage();
  const { playSfx, playMusic } = useSound();
  const { toast } = useToast();
  
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedVideoUrl, setGeneratedVideoUrl] = useState<string | null>(null);
  const [request, setRequest] = useState<VideoGenerationRequest>({
    avatarType: 'both',
    scene: 'entrance',
    music: 'zarathustra',
    script: 'Welcome to the future of financial services. The Santiago Team is proud to introduce the FIRST AI agents built specifically for the Latino community.',
    crowdLevel: 'thunderous'
  });

  const musicOptions = [
    { value: 'zarathustra', label: '🎵 Also sprach Zarathustra (2001 Theme)', description: 'Epic, cosmic, absolutely iconic' },
    { value: 'william_tell', label: '🎵 William Tell Overture (Lone Ranger)', description: 'Building excitement, classic triumph' },
    { value: 'pomp_circumstance', label: '🎵 Pomp and Circumstance', description: 'Graduation ceremony, achievement' },
    { value: 'custom_fanfare', label: '🎵 Santiago Team Victory Fanfare', description: 'Custom orchestral celebration' }
  ];

  const sceneOptions = [
    { value: 'entrance', label: '🚪 Grand Entrance', description: 'Walking into cheering room' },
    { value: 'presentation', label: '🎤 Stage Presentation', description: 'Speaking to excited audience' },
    { value: 'celebration', label: '🎉 Victory Celebration', description: 'Celebrating success with crowd' }
  ];

  const generateEpicVideo = async () => {
    setIsGenerating(true);
    
    try {
      // Play launch sound
      await playSfx('launch-whoosh');
      
      const response = await fetch('/api/generate-epic-video', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(request)
      });

      if (!response.ok) {
        throw new Error('Failed to generate video');
      }

      const result = await response.json();
      setGeneratedVideoUrl(result.videoUrl);
      
      // Play success fanfare
      await playSfx('fanfare-success');
      
      toast({
        title: "🎬 Epic Video Generated!",
        description: "Your Santiago Team triumph video is ready to conquer the market!",
        duration: 5000,
      });

    } catch (error) {
      console.error('Video generation failed:', error);
      toast({
        title: "Video Generation Error",
        description: "Unable to create video. Please try again.",
        variant: "destructive",
        duration: 5000,
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const playPreviewMusic = async (musicType: string) => {
    await playSfx('celebration-stinger');
    // In a real implementation, we'd have actual audio files
    toast({
      title: `🎵 Playing Preview: ${musicOptions.find(m => m.value === musicType)?.label}`,
      description: "This will be the background music for your epic video!",
      duration: 3000,
    });
  };

  return (
    <Card className="w-full max-w-4xl mx-auto border-2 border-primary/20 shadow-2xl">
      <CardHeader className="bg-primary text-white">
        <div className="flex items-center gap-3">
          <Crown className="h-8 w-8" />
          <div>
            <CardTitle className="text-2xl font-bold">🎬 Epic Video Generator</CardTitle>
            <p className="text-primary-foreground/90">Create triumphant entrance videos for billion-dollar deals</p>
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-6 space-y-6">
        {/* First AI Agents Banner */}
        <div className="text-center p-4 bg-primary/5 border-2 border-primary/20 rounded-lg">
          <Badge className="bg-primary text-white px-4 py-2 text-lg font-bold mb-2">
            ✨ {t('hero.first_ai_badge')} ✨
          </Badge>
          <p className="text-primary font-semibold">
            {t('hero.first_ai_subtitle')}
          </p>
        </div>

        {/* Avatar Selection */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            Who should star in your epic video?
          </Label>
          <Select value={request.avatarType} onValueChange={(value: any) => setRequest({...request, avatarType: value})}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="nolly">👩‍💼 Nolly Santiago (Family Legacy)</SelectItem>
              <SelectItem value="pablo">👨‍💼 Pablo Santiago (Law Enforcement Veteran)</SelectItem>
              <SelectItem value="both">👥 Both Nolly & Pablo (Power Team)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Scene Selection */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold flex items-center gap-2">
            <Video className="h-5 w-5 text-primary" />
            Choose Your Epic Scene
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            {sceneOptions.map((scene) => (
              <Card 
                key={scene.value}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  request.scene === scene.value 
                    ? 'border-2 border-primary bg-primary/5' 
                    : 'border border-gray-200'
                }`}
                onClick={() => setRequest({...request, scene: scene.value as any})}
              >
                <CardContent className="p-4 text-center">
                  <h4 className="font-bold text-primary">{scene.label}</h4>
                  <p className="text-sm text-gray-600">{scene.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Music Selection */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold flex items-center gap-2">
            <Volume2 className="h-5 w-5 text-primary" />
            Choose Your Triumphant Music
          </Label>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {musicOptions.map((music) => (
              <Card 
                key={music.value}
                className={`cursor-pointer transition-all hover:shadow-lg ${
                  request.music === music.value 
                    ? 'border-2 border-amber-500 bg-amber-50' 
                    : 'border border-gray-200'
                }`}
                onClick={() => setRequest({...request, music: music.value as any})}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h4 className="font-bold text-primary">{music.label}</h4>
                      <p className="text-sm text-gray-600">{music.description}</p>
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={(e) => {
                        e.stopPropagation();
                        playPreviewMusic(music.value);
                      }}
                      className="ml-2"
                    >
                      <PlayCircle className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Script Input */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-primary" />
            Victory Speech Script
          </Label>
          <Textarea
            value={request.script}
            onChange={(e) => setRequest({...request, script: e.target.value})}
            className="min-h-[100px]"
            placeholder="Enter the powerful message that will accompany your epic entrance..."
          />
        </div>

        {/* Crowd Level */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold flex items-center gap-2">
            <Trophy className="h-5 w-5 text-primary" />
            Crowd Enthusiasm Level
          </Label>
          <Select value={request.crowdLevel} onValueChange={(value: any) => setRequest({...request, crowdLevel: value})}>
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="moderate">👏 Moderate Applause (Professional)</SelectItem>
              <SelectItem value="loud">🎉 Loud Cheering (Exciting)</SelectItem>
              <SelectItem value="thunderous">⚡ Thunderous Ovation (Stadium-Level)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Generate Button */}
        <div className="text-center space-y-4">
          <Button
            onClick={generateEpicVideo}
            disabled={isGenerating}
            size="lg"
            className="bg-primary hover:bg-primary/90 text-white px-12 py-4 text-xl font-bold shadow-2xl hover:shadow-3xl transform hover:scale-105 transition-all"
          >
            {isGenerating ? (
              <>
                <Loader2 className="h-6 w-6 mr-3 animate-spin" />
                Creating Your Epic Video...
              </>
            ) : (
              <>
                <Crown className="h-6 w-6 mr-3" />
                Generate Epic Video
              </>
            )}
          </Button>
          
          <p className="text-sm text-gray-600 max-w-md mx-auto">
            Professional AI-generated video featuring the Santiago Team's triumphant entrance with classic orchestral music and cheering crowds.
          </p>
        </div>

        {/* Generated Video Display */}
        {generatedVideoUrl && (
          <Card className="border-2 border-green-500 bg-green-50">
            <CardContent className="p-6 text-center">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Trophy className="h-8 w-8 text-amber-500" />
                <h3 className="text-2xl font-bold text-primary">🎬 Your Epic Video is Ready!</h3>
              </div>
              
              <video 
                controls 
                className="w-full max-w-2xl mx-auto rounded-lg shadow-lg mb-4"
                poster="/api/placeholder/800/450"
              >
                <source src={generatedVideoUrl} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              
              <div className="flex gap-3 justify-center">
                <Button
                  onClick={() => window.open(generatedVideoUrl)}
                  className="bg-primary text-white"
                >
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Full Screen
                </Button>
                <Button
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = generatedVideoUrl;
                    link.download = 'santiago-team-epic-entrance.mp4';
                    link.click();
                  }}
                  variant="outline"
                >
                  <Download className="h-4 w-4 mr-2" />
                  Download
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </CardContent>
    </Card>
  );
}