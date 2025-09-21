import { useState, useRef, useCallback, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Mic, MicOff, Volume2, VolumeX, Play, Square, Loader2, TrendingDown } from 'lucide-react';
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
    <Card className="w-full max-w-3xl mx-auto border-0 shadow-2xl backdrop-blur-xl" 
          style={{ 
            background: "linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(30,58,138,0.05) 50%, rgba(217,119,6,0.05) 100%)"
          }}>
      {/* Enhanced Header with Glassmorphism */}
      <CardHeader className="text-center relative overflow-hidden">
        {/* Animated background pattern - Navy & Gold */}
        <div className="absolute inset-0" style={{ background: "linear-gradient(135deg, rgba(30,58,138,0.05) 0%, rgba(217,119,6,0.03) 100%)" }}></div>
        <div className="absolute top-0 left-0 w-full h-1" style={{ background: "linear-gradient(90deg, #1e3a8a 0%, #D97706 50%, #1e40af 100%)" }}></div>
        
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="relative z-10"
        >
          <CardTitle className="flex items-center justify-center gap-4 text-2xl mb-4">
            <motion.div 
              className="relative w-16 h-16 rounded-2xl flex items-center justify-center"
              style={{ 
                background: "linear-gradient(45deg, #1e3a8a, #D97706)"
              }}
              whileHover={{ scale: 1.1, rotate: 5 }}
            >
              <Mic className="w-8 h-8 text-white" />
              <motion.div
                className="absolute inset-0 rounded-2xl backdrop-blur-sm"
                style={{ backgroundColor: 'rgba(217, 119, 6, 0.2)' }}
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </motion.div>
            <span className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent font-bold">
              Santiago Team AI Assistant
            </span>
          </CardTitle>
        </motion.div>
        
        <CardDescription className="text-lg text-gray-600 mb-6 relative z-10">
          Voice-powered automation system built with advanced AI technology and professional voice synthesis
        </CardDescription>
        
        <div className="flex justify-center gap-3 relative z-10">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge className="text-white text-sm px-4 py-2 shadow-lg border-0"
                   style={{ background: "linear-gradient(45deg, #D97706, #B45309)" }}>
              <motion.div 
                className="w-2 h-2 bg-white rounded-full mr-2"
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
              Santiago Team Excellence
            </Badge>
          </motion.div>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Badge className="text-white text-sm px-4 py-2 shadow-lg border-0"
                   style={{ background: "linear-gradient(45deg, #1e3a8a, #1e40af)" }}>
              <TrendingDown className="w-3 h-3 mr-2" />
              Cost-Effective Innovation
            </Badge>
          </motion.div>
        </div>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Voice Controls - Enhanced */}
        <div className="flex justify-center gap-6">
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={isListening ? stopListening : startListening}
              disabled={isProcessing}
              size="lg"
              className="relative px-8 py-4 text-lg font-semibold rounded-2xl shadow-2xl border-0 text-white"
              style={{
                background: isListening 
                  ? "linear-gradient(45deg, #1e3a8a, #1e40af)"
                  : "linear-gradient(45deg, #D97706, #B45309)"
              }}
            >
              {isListening ? (
                <>
                  <MicOff className="w-6 h-6 mr-3" />
                  Stop Listening
                  <motion.div
                    className="absolute inset-0 bg-white/20 rounded-2xl"
                    animate={{ 
                      scale: [1, 1.05, 1],
                      opacity: [0.2, 0.4, 0.2]
                    }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  {/* Pulse rings */}
                  <motion.div
                    className="absolute inset-0 border-2 rounded-2xl"
                    style={{ borderColor: '#D97706' }}
                    animate={{ 
                      scale: [1, 1.2, 1.4],
                      opacity: [0.8, 0.4, 0]
                    }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </>
              ) : (
                <>
                  <motion.div
                    animate={{ rotate: isProcessing ? 360 : 0 }}
                    transition={{ duration: 1, repeat: isProcessing ? Infinity : 0 }}
                  >
                    <Mic className="w-6 h-6 mr-3" />
                  </motion.div>
                  Start Listening
                  <motion.div
                    className="absolute -inset-1 rounded-2xl opacity-30 blur"
                    style={{ background: "linear-gradient(45deg, #1e3a8a, #D97706)" }}
                    animate={{ opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                </>
              )}
            </Button>
          </motion.div>

          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              onClick={() => setAudioEnabled(!audioEnabled)}
              variant="outline"
              size="lg"
              className="px-6 py-4 rounded-2xl border-2 border-gray-200 bg-white/70 backdrop-blur-sm hover:bg-white/90 shadow-lg"
            >
              <motion.div
                animate={{ 
                  scale: audioEnabled ? [1, 1.1, 1] : 1,
                  rotate: audioEnabled ? 0 : [0, -10, 10, 0]
                }}
                transition={{ duration: audioEnabled ? 1.5 : 0.5, repeat: audioEnabled ? Infinity : 0 }}
              >
                {audioEnabled ? (
                  <Volume2 className="w-6 h-6 text-green-600" />
                ) : (
                  <VolumeX className="w-6 h-6 text-red-500" />
                )}
              </motion.div>
            </Button>
          </motion.div>
        </div>

        {/* WFG Demo Showcase Button */}
        <div className="text-center">
          <Button
            onClick={runDemoShowcase}
            variant="outline"
            className="border-2 rounded-2xl px-8 py-4 text-lg font-semibold shadow-xl"
            style={{ 
              borderColor: '#D97706', 
              color: '#D97706',
              backgroundColor: 'rgba(217, 119, 6, 0.08)',
              background: 'linear-gradient(135deg, rgba(217, 119, 6, 0.08), rgba(30, 58, 138, 0.05))'
            }}
            disabled={isProcessing}
          >
            {isProcessing ? (
              <Loader2 className="w-5 h-5 mr-3 animate-spin" />
            ) : (
              <Play className="w-5 h-5 mr-3" />
            )}
            Santiago Team Demo
          </Button>
        </div>

        {/* Status Indicators - Enhanced */}
        <div className="grid grid-cols-3 gap-6 text-center">
          <motion.div 
            className={`relative p-6 rounded-2xl backdrop-blur-lg border shadow-lg transition-all duration-300 ${
              isListening 
                ? 'bg-gradient-to-br from-red-50 to-pink-50 text-red-700 border-red-200/50 shadow-red-200/50' 
                : 'bg-white/60 text-gray-600 border-gray-200/50'
            }`}
            whileHover={{ y: -2, scale: 1.02 }}
            animate={isListening ? { scale: [1, 1.02, 1] } : {}}
            transition={{ duration: 1, repeat: isListening ? Infinity : 0 }}
          >
            <motion.div
              animate={isListening ? { 
                scale: [1, 1.2, 1],
                rotateY: [0, 180, 360] 
              } : {}}
              transition={{ duration: 2, repeat: isListening ? Infinity : 0 }}
            >
              <Mic className="w-6 h-6 mx-auto mb-2" />
            </motion.div>
            <div className="text-sm font-semibold">
              {isListening ? 'Listening' : 'Ready'}
            </div>
            {isListening && (
              <motion.div
                className="absolute inset-0 border-2 border-red-300 rounded-2xl"
                animate={{ scale: [1, 1.1], opacity: [0.5, 0] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.div>
          
          <motion.div 
            className={`relative p-6 rounded-2xl backdrop-blur-lg border shadow-lg transition-all duration-300 ${
              isProcessing 
                ? 'bg-gradient-to-br from-blue-50 to-cyan-50 text-blue-700 border-blue-200/50 shadow-blue-200/50' 
                : 'bg-white/60 text-gray-600 border-gray-200/50'
            }`}
            whileHover={{ y: -2, scale: 1.02 }}
          >
            <motion.div
              animate={isProcessing ? { rotate: 360 } : {}}
              transition={{ duration: 1.5, repeat: isProcessing ? Infinity : 0, ease: "linear" }}
            >
              <Loader2 className="w-6 h-6 mx-auto mb-2" />
            </motion.div>
            <div className="text-sm font-semibold">
              {isProcessing ? 'Processing' : 'AI Ready'}
            </div>
            {isProcessing && (
              <motion.div
                className="absolute inset-0 bg-blue-400/20 rounded-2xl"
                animate={{ opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            )}
          </motion.div>
          
          <motion.div 
            className={`relative p-6 rounded-2xl backdrop-blur-lg border shadow-lg transition-all duration-300 ${
              isPlaying 
                ? 'bg-gradient-to-br from-green-50 to-emerald-50 text-green-700 border-green-200/50 shadow-green-200/50' 
                : 'bg-white/60 text-gray-600 border-gray-200/50'
            }`}
            whileHover={{ y: -2, scale: 1.02 }}
          >
            <motion.div
              animate={isPlaying ? { 
                scale: [1, 1.1, 1],
                rotate: [0, 5, -5, 0]
              } : {}}
              transition={{ duration: 0.5, repeat: isPlaying ? Infinity : 0 }}
            >
              <Volume2 className="w-6 h-6 mx-auto mb-2" />
            </motion.div>
            <div className="text-sm font-semibold">
              {isPlaying ? 'Speaking' : 'Audio Ready'}
            </div>
            {isPlaying && (
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-1 h-4 bg-green-500 rounded-full"
                    animate={{ 
                      scaleY: [0.3, 1, 0.3],
                      opacity: [0.5, 1, 0.5]
                    }}
                    transition={{ 
                      duration: 0.5, 
                      repeat: Infinity,
                      delay: i * 0.1
                    }}
                  />
                ))}
              </div>
            )}
          </motion.div>
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