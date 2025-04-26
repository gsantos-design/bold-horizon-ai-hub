import { FC, useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface ShootingStarsProps {
  count?: number;
  interval?: number;
}

const ShootingStars: FC<ShootingStarsProps> = ({
  count = 8,
  interval = 4000
}) => {
  const [stars, setStars] = useState<JSX.Element[]>([]);

  useEffect(() => {
    // Create initial set of shooting stars
    generateShootingStars();
    
    // Set interval to periodically generate new shooting stars
    const intervalId = setInterval(() => {
      generateShootingStars();
    }, interval);
    
    return () => clearInterval(intervalId);
  }, [count, interval]);
  
  const generateShootingStars = () => {
    const newStars = Array.from({ length: count }).map((_, i) => {
      // Generate random properties for each shooting star
      const startX = Math.random() * 100 - 50; // Starting X position (%)
      const startY = Math.random() * 50 - 50;  // Starting Y position (%)
      const length = Math.random() * 100 + 50; // Length of trail
      const angle = Math.random() * 60 + 30;   // Angle of travel (30-90 degrees)
      const speed = Math.random() * 3 + 1;     // Animation speed
      const size = Math.random() * 1.5 + 0.5;  // Size of star
      const delay = Math.random() * 10;        // Delay before animation starts
      const opacity = Math.random() * 0.7 + 0.3; // Opacity
      
      // Calculate end positions based on angle and length
      const distance = length;
      const radians = angle * (Math.PI / 180);
      const endX = startX + distance * Math.cos(radians);
      const endY = startY + distance * Math.sin(radians);
      
      return (
        <motion.div
          key={`shooting-star-${i}-${Date.now()}`}
          className="absolute"
          style={{
            top: `${startY}%`,
            left: `${startX}%`,
            opacity: 0,
            zIndex: 5
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0, opacity, 0],
            x: [0, `${distance}px`],
            y: [0, `${distance}px`],
          }}
          transition={{
            duration: speed,
            delay: delay,
            ease: "easeOut"
          }}
          onAnimationComplete={() => {
            // Remove this star after animation completes
            setStars(prevStars => prevStars.filter(star => star.key !== `shooting-star-${i}-${Date.now()}`));
          }}
        >
          {/* Star head */}
          <div 
            className="rounded-full bg-white"
            style={{
              width: `${size}px`,
              height: `${size}px`,
              boxShadow: `0 0 ${size * 4}px ${size}px rgba(255, 255, 255, 0.8)`,
            }}
          />
          
          {/* Star trail */}
          <div 
            className="absolute top-1/2 left-0 -translate-y-1/2 bg-gradient-to-r from-white to-transparent"
            style={{
              height: `${size / 2}px`,
              width: `${size * 15}px`,
              transform: `translateY(-50%) rotate(${angle}deg) translateX(-100%)`,
              opacity: 0.6,
            }}
          />
        </motion.div>
      );
    });
    
    setStars(prev => [...prev, ...newStars]);
  };

  return <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">{stars}</div>;
};

export default ShootingStars;