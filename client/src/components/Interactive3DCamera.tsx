import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Camera, Save, RefreshCw, Image as ImageIcon, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface Interactive3DCameraProps {
  onCapture?: (imageData: string) => void;
  onClose: () => void;
}

export default function Interactive3DCamera({ onCapture, onClose }: Interactive3DCameraProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [hasPermission, setHasPermission] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('none');
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isFrontCamera, setIsFrontCamera] = useState(true);
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  // Available filters
  const filters = [
    { id: 'none', name: 'Normal' },
    { id: 'sepia', name: 'Santiago Gold' },
    { id: 'grayscale', name: 'Professional' },
    { id: 'contrast', name: 'Bold' },
    { id: 'brightness', name: 'Bright Future' },
    { id: 'blur', name: 'Dream' }
  ];

  const startCamera = async () => {
    try {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
      
      const constraints = { 
        video: { 
          facingMode: isFrontCamera ? 'user' : 'environment',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      };
      
      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints);
      setStream(mediaStream);
      
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      
      setHasPermission(true);
    } catch (err) {
      console.error('Error accessing camera:', err);
      setHasPermission(false);
    }
  };

  const stopCamera = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const switchCamera = () => {
    setIsFrontCamera(!isFrontCamera);
  };

  const startCountdown = () => {
    setCountdown(3);
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      // Set canvas size to match video dimensions
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      // Draw the video frame on the canvas
      const context = canvas.getContext('2d');
      if (context) {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
        
        // Apply filter effects
        if (filter !== 'none') {
          context.filter = getFilterStyle(filter);
          context.drawImage(canvas, 0, 0);
          context.filter = 'none';
        }
        
        // Add WFG branding overlay
        context.font = 'bold 20px Arial';
        context.fillStyle = 'rgba(255, 255, 255, 0.8)';
        context.fillText('#SantiagoTeamWFG', 20, canvas.height - 20);
        
        // Convert to data URL and set as captured image
        const imageData = canvas.toDataURL('image/jpeg');
        setCapturedImage(imageData);
        
        // Call onCapture callback if provided
        if (onCapture) {
          onCapture(imageData);
        }
      }
    }
  };

  const getFilterStyle = (filterName: string): string => {
    switch (filterName) {
      case 'sepia':
        return 'sepia(0.7)';
      case 'grayscale':
        return 'grayscale(1)';
      case 'contrast':
        return 'contrast(1.5)';
      case 'brightness':
        return 'brightness(1.3)';
      case 'blur':
        return 'blur(2px)';
      default:
        return 'none';
    }
  };

  const resetCapture = () => {
    setCapturedImage(null);
  };

  const shareImage = () => {
    if (capturedImage) {
      // In a real implementation, you would add Web Share API or custom sharing logic
      alert('In a real implementation, this would open share options for social media');
    }
  };

  useEffect(() => {
    startCamera();
    
    return () => {
      stopCamera();
    };
  }, [isFrontCamera]);

  useEffect(() => {
    if (countdown !== null) {
      if (countdown > 0) {
        const timer = setTimeout(() => {
          setCountdown(countdown - 1);
        }, 1000);
        return () => clearTimeout(timer);
      } else {
        capturePhoto();
        setCountdown(null);
      }
    }
  }, [countdown]);

  const applyFilterStyle = (filterName: string): React.CSSProperties => {
    return {
      filter: getFilterStyle(filterName),
    };
  };

  return (
    <motion.div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div 
        className="bg-gradient-to-b from-primary to-primary-dark rounded-2xl overflow-hidden shadow-2xl max-w-md w-full"
        initial={{ scale: 0.9, y: 20 }}
        animate={{ scale: 1, y: 0 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <div className="p-4 bg-white/10 border-b border-white/20 flex justify-between items-center">
          <div className="flex items-center">
            <Camera className="h-5 w-5 mr-2 text-accent" />
            <h3 className="font-bold text-white">Santiago Team Social</h3>
          </div>
          <Button 
            variant="ghost" 
            className="h-8 w-8 p-0 rounded-full hover:bg-white/20" 
            onClick={onClose}
          >
            <span className="sr-only">Close</span>
            ✕
          </Button>
        </div>
        
        <div className="relative w-full aspect-[3/4] bg-black">
          {capturedImage ? (
            <img 
              src={capturedImage} 
              alt="Captured" 
              className="w-full h-full object-cover" 
            />
          ) : (
            <>
              <video 
                ref={videoRef}
                autoPlay 
                playsInline 
                muted 
                className="w-full h-full object-cover"
                style={applyFilterStyle(filter)}
              />
              
              {countdown !== null && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                  <span className="text-6xl font-bold text-white">{countdown}</span>
                </div>
              )}
              
              {/* Branding overlay */}
              <div className="absolute bottom-4 left-4 text-white text-sm bg-black/40 px-2 py-1 rounded">
                #SantiagoTeamWFG
              </div>
            </>
          )}
          
          {/* Hidden canvas for image processing */}
          <canvas ref={canvasRef} className="hidden" />
        </div>
        
        {/* Filter options */}
        {!capturedImage && (
          <div className="p-3 bg-black/30 overflow-x-auto">
            <div className="flex space-x-2">
              {filters.map((filterOption) => (
                <button
                  key={filterOption.id}
                  className={`px-3 py-1 text-xs rounded-full whitespace-nowrap ${
                    filter === filterOption.id 
                      ? 'bg-accent text-white' 
                      : 'bg-white/10 text-white'
                  }`}
                  onClick={() => setFilter(filterOption.id)}
                >
                  {filterOption.name}
                </button>
              ))}
            </div>
          </div>
        )}
        
        {/* Action buttons */}
        <div className="p-4 bg-black/20">
          {capturedImage ? (
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
                onClick={resetCapture}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Retake
              </Button>
              
              <Button 
                className="bg-accent hover:bg-accent-dark text-white"
                onClick={shareImage}
              >
                <Share2 className="h-4 w-4 mr-2" />
                Share
              </Button>
              
              <Button 
                variant="secondary"
                onClick={() => {
                  resetCapture();
                  onClose();
                }}
              >
                <Save className="h-4 w-4 mr-2" />
                Save
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-2">
              <Button 
                variant="outline" 
                className="border-white/30 text-white hover:bg-white/10"
                onClick={switchCamera}
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Switch
              </Button>
              
              <Button 
                className="bg-accent hover:bg-accent-dark text-white col-span-2"
                onClick={startCountdown}
              >
                <Camera className="h-4 w-4 mr-2" />
                Capture Photo
              </Button>
            </div>
          )}
        </div>
        
        <div className="p-3 bg-black/40 text-center text-xs text-white/70">
          <p>Share your journey with the Santiago Team! Use #SantiagoTeamWFG</p>
        </div>
      </motion.div>
    </motion.div>
  );
}