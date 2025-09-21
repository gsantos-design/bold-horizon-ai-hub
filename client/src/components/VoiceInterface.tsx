import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, Play, Square, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { apiRequest } from '@/lib/queryClient';

interface VoiceResponse {
  text: string;
  action?: string;
  data?: any;
  voiceEnabled?: boolean;
}

export default function VoiceInterface() {
  const [isListening, setIsListening] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState<VoiceResponse | null>(null);
  const [audioEnabled, setAudioEnabled] = useState(true);
  
  const recognitionRef = useRef<any>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const { toast } = useToast();

  // Initialize speech recognition
  useEffect(() => {
    if (typeof window !== 'undefined' && ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window)) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      
      recognitionRef.current.continuous = false;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'en-US';
      
      recognitionRef.current.onstart = () => {
        setIsListening(true);
        setTranscript('');
      };
      
      recognitionRef.current.onresult = (event: any) => {
        let interimTranscript = '';
        let finalTranscript = '';
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript;
          if (event.results[i].isFinal) {
            finalTranscript += transcript;
          } else {
            interimTranscript += transcript;
          }
        }
        
        setTranscript(finalTranscript || interimTranscript);
        
        if (finalTranscript) {
          processVoiceCommand(finalTranscript);
        }
      };
      
      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: "Please check your microphone permissions and try again.",
          variant: "destructive"
        });
      };
      
      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    } else {
      toast({
        title: "Voice Recognition Not Supported",
        description: "Your browser doesn't support voice recognition. Please use a modern browser.",
        variant: "destructive"
      });
    }
    
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const startListening = useCallback(() => {
    if (recognitionRef.current && !isListening) {
      try {
        recognitionRef.current.start();
        toast({
          title: "Listening...",
          description: "Speak your command now. I can help with lead generation, automation, and demos!"
        });
      } catch (error) {
        console.error('Error starting speech recognition:', error);
        toast({
          title: "Microphone Error",
          description: "Please allow microphone access and try again.",
          variant: "destructive"
        });
      }
    }
  }, [isListening, toast]);

  const stopListening = useCallback(() => {
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop();
    }
  }, [isListening]);

  const processVoiceCommand = async (speechText: string) => {
    setIsProcessing(true);
    try {
      const result = await apiRequest({ method: 'POST', url: '/api/voice-command', body: { text: speechText } });
      setResponse(result);
      
      // If voice synthesis is available and enabled, play the response
      if (result.voiceEnabled && audioEnabled && result.text) {
        await playVoiceResponse(result.text);
      }
      
      toast({
        title: "Command Processed",
        description: `Action: ${result.action || 'Response generated'}`
      });
    } catch (error) {
      console.error('Error processing voice command:', error);
      toast({
        title: "Processing Error",
        description: "Failed to process your command. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const playVoiceResponse = async (text: string) => {
    try {
      setIsPlaying(true);
      const response = await fetch('/api/voice-synthesis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text })
      });
      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
      }
    } catch (error) {
      console.error('Error playing voice response:', error);
      toast({
        title: "Voice Synthesis Error",
        description: "Could not generate voice response, but text response is available.",
        variant: "destructive"
      });
    } finally {
      setIsPlaying(false);
    }
  };

  const runDemoShowcase = async () => {
    setIsProcessing(true);
    try {
      const demoResponse = await processVoiceCommand("Run the Google startup program demo showcase");
      toast({
        title: "Demo Showcase",
        description: "Running Google startup program demonstration!"
      });
    } catch (error) {
      console.error('Demo error:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto bg-white border-primary/20">
      <CardHeader className="text-center">
        <CardTitle className="flex items-center justify-center gap-3">
          <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
            <Mic className="w-6 h-6 text-white" />
          </div>
          Santiago Team AI Assistant
        </CardTitle>
        <CardDescription>
          Voice-powered automation system built with Google Gemini and ElevenLabs
        </CardDescription>
        <div className="flex justify-center gap-2 mt-4">
          <Badge className="bg-green-100 text-green-700">Google Startup Program</Badge>
          <Badge className="bg-blue-100 text-blue-700">Cost-Effective AI</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Voice Controls */}
        <div className="flex justify-center gap-4">
          <Button
            onClick={isListening ? stopListening : startListening}
            disabled={isProcessing}
            size="lg"
            className={`relative ${isListening ? 'bg-red-500 hover:bg-red-600' : 'bg-primary hover:bg-primary/90'}`}
          >
            {isListening ? (
              <>
                <MicOff className="w-5 h-5 mr-2" />
                Stop Listening
                <motion.div
                  className="absolute inset-0 bg-red-400 rounded-md opacity-30"
                  animate={{ scale: [1, 1.05, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              </>
            ) : (
              <>
                <Mic className="w-5 h-5 mr-2" />
                Start Listening
              </>
            )}
          </Button>

          <Button
            onClick={() => setAudioEnabled(!audioEnabled)}
            variant="outline"
            size="lg"
          >
            {audioEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
          </Button>
        </div>

        {/* Demo Showcase Button */}
        <div className="text-center">
          <Button
            onClick={runDemoShowcase}
            variant="outline"
            className="bg-gradient-to-r from-blue-50 to-green-50 border-blue-200"
            disabled={isProcessing}
          >
            {isProcessing ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <Play className="w-4 h-4 mr-2" />
            )}
            Run Google Startup Demo
          </Button>
        </div>

        {/* Status Indicators */}
        <div className="grid grid-cols-3 gap-4 text-center">
          <div className={`p-3 rounded-lg ${isListening ? 'bg-red-50 text-red-700' : 'bg-gray-50 text-gray-600'}`}>
            <Mic className="w-5 h-5 mx-auto mb-1" />
            <div className="text-xs font-medium">
              {isListening ? 'Listening' : 'Ready'}
            </div>
          </div>
          
          <div className={`p-3 rounded-lg ${isProcessing ? 'bg-blue-50 text-blue-700' : 'bg-gray-50 text-gray-600'}`}>
            <Loader2 className={`w-5 h-5 mx-auto mb-1 ${isProcessing ? 'animate-spin' : ''}`} />
            <div className="text-xs font-medium">
              {isProcessing ? 'Processing' : 'AI Ready'}
            </div>
          </div>
          
          <div className={`p-3 rounded-lg ${isPlaying ? 'bg-green-50 text-green-700' : 'bg-gray-50 text-gray-600'}`}>
            <Volume2 className="w-5 h-5 mx-auto mb-1" />
            <div className="text-xs font-medium">
              {isPlaying ? 'Speaking' : 'Audio Ready'}
            </div>
          </div>
        </div>

        {/* Transcript Display */}
        {transcript && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-gray-50 p-4 rounded-lg"
          >
            <h4 className="font-semibold text-gray-900 mb-2">You said:</h4>
            <p className="text-gray-700 italic">"{transcript}"</p>
          </motion.div>
        )}

        {/* AI Response Display */}
        {response && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-primary/5 p-4 rounded-lg border border-primary/20"
          >
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900">AI Response:</h4>
              {response.action && (
                <Badge className="bg-primary/10 text-primary">
                  {response.action.replace('_', ' ').toUpperCase()}
                </Badge>
              )}
            </div>
            <p className="text-gray-700 mb-3">{response.text}</p>
            
            {response.data && (
              <div className="bg-white p-3 rounded border border-gray-200">
                <h5 className="font-medium text-gray-900 mb-2">Additional Data:</h5>
                <pre className="text-xs text-gray-600 overflow-x-auto">
                  {JSON.stringify(response.data, null, 2)}
                </pre>
              </div>
            )}
          </motion.div>
        )}

        {/* Example Commands */}
        <div className="text-center text-sm text-gray-600">
          <p className="mb-2 font-medium">Try saying:</p>
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              "Generate a lead script",
              "Run the demo showcase",
              "Analyze this lead",
              "Create a follow-up sequence",
              "Show me cost savings"
            ].map((command, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                "{command}"
              </Badge>
            ))}
          </div>
        </div>

        {/* Audio element for voice synthesis playback */}
        <audio
          ref={audioRef}
          onEnded={() => setIsPlaying(false)}
          onError={() => setIsPlaying(false)}
          controls={false}
          style={{ display: 'none' }}
        />
      </CardContent>
    </Card>
  );
}