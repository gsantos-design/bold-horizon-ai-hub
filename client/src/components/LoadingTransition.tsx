import { FC, useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface LoadingTransitionProps {
  isLoading?: boolean;
  onAnimationComplete?: () => void;
  duration?: number;
  stars?: number;
}

const LoadingTransition: FC<LoadingTransitionProps> = ({
  isLoading = false,
  onAnimationComplete,
  duration = 2000,
  stars = 50
}) => {
  const [internalLoading, setInternalLoading] = useState(isLoading);
  const [starElements, setStarElements] = useState<JSX.Element[]>([]);

  // Generate random stars when component mounts
  useEffect(() => {
    const newStars = Array.from({ length: stars }).map((_, i) => {
      const size = Math.random() * 3 + 1;
      const left = Math.random() * 100;
      const top = Math.random() * 100;
      const animationDelay = Math.random() * 2;
      const animationDuration = Math.random() * 4 + 2;
      
      return (
        <motion.div
          key={`star-${i}`}
          className="absolute rounded-full bg-white"
          style={{
            width: `${size}px`,
            height: `${size}px`,
            left: `${left}%`,
            top: `${top}%`,
            boxShadow: `0 0 ${size * 2}px ${size}px rgba(255, 255, 255, 0.7)`,
            opacity: 0
          }}
          animate={{
            opacity: [0, 1, 0.5, 1, 0],
            scale: [1, 1.2, 1, 1.5, 1],
          }}
          transition={{
            duration: animationDuration,
            delay: animationDelay,
            repeat: Infinity,
            repeatType: "loop"
          }}
        />
      );
    });
    
    setStarElements(newStars);
  }, [stars]);

  // Handle the loading state change from props
  useEffect(() => {
    if (isLoading) {
      setInternalLoading(true);
    } else if (internalLoading) {
      const timer = setTimeout(() => {
        setInternalLoading(false);
        if (onAnimationComplete) onAnimationComplete();
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isLoading, duration, onAnimationComplete, internalLoading]);

  return (
    <AnimatePresence>
      {internalLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="fixed inset-0 z-50 flex items-center justify-center"
        >
          <div className="absolute inset-0 bg-gradient-to-b from-primary/90 via-secondary/80 to-black overflow-hidden">
            {/* Stars Background */}
            {starElements}
            
            {/* Cosmic Nebula Effect */}
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(100,90,255,0.2)_0%,_rgba(0,0,20,0)_70%)]"></div>
            
            {/* Cosmic Loading Indicator */}
            <motion.div 
              className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 1.2, opacity: 0 }}
              transition={{ duration: 0.8 }}
            >
              {/* Pulsing cosmic orb */}
              <div className="relative w-20 h-20 mb-6">
                <motion.div 
                  className="absolute inset-0 rounded-full bg-gradient-to-br from-primary to-secondary"
                  animate={{ 
                    boxShadow: [
                      "0 0 20px 5px rgba(30, 64, 175, 0.7), 0 0 40px 15px rgba(217, 119, 6, 0.5)", 
                      "0 0 30px 10px rgba(30, 64, 175, 0.8), 0 0 60px 25px rgba(217, 119, 6, 0.6)",
                      "0 0 20px 5px rgba(30, 64, 175, 0.7), 0 0 40px 15px rgba(217, 119, 6, 0.5)"
                    ],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 3, 
                    repeat: Infinity,
                    repeatType: "loop" 
                  }}
                />
                
                {/* Inner glow */}
                <motion.div 
                  className="absolute inset-2 rounded-full bg-gradient-to-br from-primary/50 to-secondary/50 backdrop-blur-sm"
                  animate={{ 
                    opacity: [0.5, 0.8, 0.5] 
                  }}
                  transition={{ 
                    duration: 2, 
                    repeat: Infinity,
                    repeatType: "loop" 
                  }}
                />
                
                {/* Rotating cosmic ring */}
                <motion.div
                  className="absolute -inset-3 border-2 border-primary/30 rounded-full"
                  style={{ borderRadius: "100%" }}
                  animate={{ rotate: 360 }}
                  transition={{ 
                    duration: 8, 
                    repeat: Infinity,
                    ease: "linear" 
                  }}
                />
                
                <motion.div
                  className="absolute -inset-6 border border-secondary/20 rounded-full"
                  style={{ borderRadius: "100%" }}
                  animate={{ rotate: -360 }}
                  transition={{ 
                    duration: 12, 
                    repeat: Infinity,
                    ease: "linear" 
                  }}
                />
              </div>
              
              {/* Loading text with cosmic glow */}
              <motion.div 
                className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-200"
                animate={{ 
                  textShadow: [
                    "0 0 8px rgba(30, 64, 175, 0.7), 0 0 12px rgba(217, 119, 6, 0.5)",
                    "0 0 12px rgba(30, 64, 175, 0.8), 0 0 20px rgba(217, 119, 6, 0.6)",
                    "0 0 8px rgba(30, 64, 175, 0.7), 0 0 12px rgba(217, 119, 6, 0.5)"
                  ]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity,
                  repeatType: "loop" 
                }}
              >
                Exploring the Cosmos
              </motion.div>
              
              {/* Animated loading dots */}
              <div className="flex space-x-2 mt-2">
                {[1, 2, 3].map((dot) => (
                  <motion.div
                    key={`loading-dot-${dot}`}
                    className="w-2 h-2 rounded-full bg-secondary"
                    animate={{ 
                      opacity: [0.3, 1, 0.3],
                      y: [0, -6, 0],
                      scale: [1, 1.2, 1],
                    }}
                    transition={{ 
                      duration: 1.5, 
                      repeat: Infinity,
                      repeatType: "loop",
                      delay: dot * 0.2,
                    }}
                  />
                ))}
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoadingTransition;