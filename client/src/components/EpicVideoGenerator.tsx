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
  Sparkles,
  Languages
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
  videoUrl?: string; // User-created Veo video URL
}

export default function EpicVideoGenerator() {
  const { t, language, setLanguage } = useLanguage();
  
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
    { value: 'zarathustra', label: `🎵 ${t('epic.music_zarathustra')}`, description: t('epic.music_zarathustra_desc') },
    { value: 'william_tell', label: `🎵 ${t('epic.music_william_tell')}`, description: t('epic.music_william_tell_desc') },
    { value: 'pomp_circumstance', label: `🎵 ${t('epic.music_pomp')}`, description: t('epic.music_pomp_desc') },
    { value: 'custom_fanfare', label: `🎵 ${t('epic.music_fanfare')}`, description: t('epic.music_fanfare_desc') }
  ];

  const sceneOptions = [
    { value: 'entrance', label: `🚪 ${t('epic.scene_entrance')}`, description: t('epic.scene_entrance_desc') },
    { value: 'presentation', label: `🎤 ${t('epic.scene_presentation')}`, description: t('epic.scene_presentation_desc') },
    { value: 'celebration', label: `🎉 ${t('epic.scene_celebration')}`, description: t('epic.scene_celebration_desc') }
  ];

  const generateEpicVideo = async () => {
    // If user has uploaded video, just use that instead of generating
    if (request.videoUrl) {
      setGeneratedVideoUrl(request.videoUrl);
      await playSfx('fanfare-success');
      toast({
        title: t('epic.video_ready'),
        description: t('epic.video_ready_desc')
      });
      return;
    }

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
        title: `🎬 ${t('epic.video_generated')}`,
        description: t('epic.video_generated_desc'),
        duration: 5000,
      });

    } catch (error) {
      console.error('Video generation failed:', error);
      toast({
        title: t('epic.video_error'),
        description: t('epic.video_error_desc'),
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
      title: `🎵 ${t('epic.music_preview')}: ${musicOptions.find(m => m.value === musicType)?.label}`,
      description: t('epic.music_preview_desc'),
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
        {/* Language Debug Panel */}
        <div className="bg-yellow-100 border-2 border-yellow-400 p-4 rounded-lg">
          <h3 className="font-bold text-black mb-2">🔧 Language Debug Panel</h3>
          <div className="text-sm text-black space-y-1">
            <p><strong>Current Language:</strong> {language}</p>
            <p><strong>Sample Translation (epic.generate_video):</strong> {t('epic.generate_video')}</p>
            <p><strong>Expected Spanish:</strong> Generar Video Épico</p>
            <p><strong>LocalStorage:</strong> {typeof window !== 'undefined' ? localStorage.getItem('language') : 'Not available'}</p>
          </div>
          <button 
            onClick={() => {
              console.log('🔧 Direct language test - Current:', language);
              const newLang = language === 'en' ? 'es' : 'en';
              console.log('🔧 Switching from', language, 'to', newLang);
              setLanguage(newLang);
            }}
            className="mt-2 bg-blue-600 text-white px-4 py-2 rounded text-sm hover:bg-blue-700"
          >
            Test Direct Language Switch ({language === 'en' ? 'Switch to ES' : 'Switch to EN'})
          </button>
        </div>
        
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

        {/* Cost-Effective Dynamic Content Generation */}
        <div className="space-y-4 p-4 bg-green-50 rounded-lg border-2 border-green-200">
          <div className="flex items-center gap-2 mb-3">
            <div className="h-8 w-8 bg-green-500 rounded-full flex items-center justify-center text-white font-bold text-sm">💰</div>
            <h3 className="font-bold text-green-800">Budget-Friendly Dynamic Content</h3>
            <Badge className="bg-green-500 text-white text-xs">~$0.005 per variation</Badge>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Team Chapter Info */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-green-800">Chapter/Team Name</Label>
              <Input 
                placeholder="Santiago Team Orlando"
                className="border-green-300"
              />
            </div>
            
            {/* Achievement Numbers */}
            <div className="space-y-2">
              <Label className="text-sm font-medium text-green-800">Key Achievement</Label>
              <Input 
                placeholder="$2.3M in Sales This Quarter"
                className="border-green-300"
              />
            </div>
          </div>

          {/* AI Script Variations */}
          <div className="space-y-3">
            <Label className="text-lg font-semibold flex items-center gap-2 text-green-800">
              <Sparkles className="h-5 w-5 text-green-600" />
              AI-Generated Victory Scripts
            </Label>
            <div className="flex gap-2 mb-2 flex-wrap">
              <Button size="sm" variant="outline" className="text-xs border-green-300 text-green-700">
                🎯 Professional
              </Button>
              <Button size="sm" variant="outline" className="text-xs border-green-300 text-green-700">
                🔥 Motivational  
              </Button>
              <Button size="sm" variant="outline" className="text-xs border-green-300 text-green-700">
                🏆 Victory
              </Button>
              <Button size="sm" variant="outline" className="text-xs border-green-300 text-green-700">
                🌟 Spanish/Latino
              </Button>
            </div>
            <Textarea
              value={request.script}
              onChange={(e) => setRequest({...request, script: e.target.value})}
              className="min-h-[80px] border-green-300"
              placeholder="AI will generate different powerful scripts for each chapter..."
            />
            <div className="flex gap-2">
              <Button size="sm" className="bg-green-600 hover:bg-green-700 text-white">
                <Sparkles className="h-4 w-4 mr-1" />
                Generate Script (~$0.003)
              </Button>
              <Button size="sm" variant="outline" className="border-green-600 text-green-700">
                <Languages className="h-4 w-4 mr-1" />
                Spanish Version
              </Button>
            </div>
          </div>

          <div className="bg-white p-3 rounded border border-green-300">
            <h4 className="font-semibold text-green-800 mb-2">💡 Revolutionary Cost-Effective Approach:</h4>
            <ul className="text-sm text-green-700 space-y-1">
              <li>• <strong>Uses your uploaded video as template</strong> (no expensive video generation)</li>
              <li>• <strong>Generates dynamic text overlays</strong> with team-specific information</li>
              <li>• <strong>Creates different script variations</strong> using low-cost AI text generation</li>
              <li>• <strong>Adds multilingual support</strong> for Spanish-speaking communities</li>
              <li>• <strong>Cost: ~$0.005 per variation</strong> instead of $5-50 per video (Google AI pricing)</li>
              <li>• <strong>Enterprise-ready automation</strong> - aligned with corporate compliance mandates</li>
            </ul>
            <div className="mt-2 p-2 bg-green-100 rounded text-xs">
              <strong>🎯 Business Impact:</strong> Enterprise teams can create unlimited video variations at 99.9% lower cost with Google AI vs traditional video APIs!
            </div>
          </div>
        </div>

        {/* Video URL Input - For User-Created Epic Videos */}
        <div className="space-y-3">
          <Label className="text-lg font-semibold flex items-center gap-2">
            <Video className="h-5 w-5 text-primary" />
            Your Epic Veo Video URL
          </Label>
          <Input
            placeholder="Paste your epic video URL here, or use your uploaded video..."
            className="w-full text-lg py-3"
            value={request.videoUrl || ''}
            onChange={(e) => setRequest({...request, videoUrl: e.target.value})}
          />
          <div className="flex gap-3 items-center">
            <Button 
              type="button"
              variant="outline"
              onClick={() => setRequest({...request, videoUrl: '/assets/video/epic-video.mp4'})}
              className="text-sm"
            >
              🎬 Use Your Uploaded Video
            </Button>
            <p className="text-sm text-primary font-semibold">
              Or paste your Veo-generated video URL above!
            </p>
          </div>
        </div>

        {/* Video Preview */}
        {request.videoUrl && (
          <div className="space-y-3">
            <Label className="text-lg font-semibold text-primary flex items-center gap-2">
              🎬 <span>Epic Video Preview</span>
            </Label>
            <div className="bg-black rounded-lg overflow-hidden shadow-2xl">
              <video 
                src={request.videoUrl} 
                controls 
                className="w-full max-h-96"
                onError={() => {
                  toast({
                    title: "Video Codec Issue",
                    description: "Demo video format not compatible. In production, chapters would use standard H.264 MP4 files that work across all browsers.",
                    variant: "destructive"
                  });
                }}
              >
                Your epic video will appear here
              </video>
            </div>
            <p className="text-sm text-center text-primary font-semibold">
              ⚡ Your epic entrance video is ready for the billion-dollar presentation!
            </p>
          </div>
        )}

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
            ) : request.videoUrl ? (
              <>
                <Crown className="h-6 w-6 mr-3" />
                🚀 Use This Epic Video
              </>
            ) : (
              <>
                <Crown className="h-6 w-6 mr-3" />
                {t('epic.generate_video')}
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