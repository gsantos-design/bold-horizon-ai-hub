import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Star, Moon } from "lucide-react";

interface CosmicBackgroundProps {
  intensity?: "low" | "medium" | "high";
  primaryColor?: string;
}

const CosmicBackground: React.FC<CosmicBackgroundProps> = ({ 
  intensity = "medium",
  primaryColor = "blue" 
}) => {
  const [randomSeed, setRandomSeed] = useState<number>(0);
  
  // Force a re-render to get new random positions on mount
  useEffect(() => {
    setRandomSeed(Math.random());
  }, []);

  // Define number of elements based on intensity
  const getCount = (baseCount: number) => {
    switch(intensity) {
      case "low": return Math.floor(baseCount * 0.6);
      case "high": return Math.floor(baseCount * 1.5);
      case "medium":
      default: return baseCount;
    }
  };

  // Configuration based on color
  const colorConfig = {
    blue: {
      moonColor: "text-blue-200/30",
      starColor: "bg-blue-50",
      starFillColor: "text-yellow-100 fill-yellow-100",
      orbColors: ["bg-blue-300/10", "bg-indigo-300/10", "bg-violet-300/10"],
      backdropColor: "bg-blue-900/5"
    },
    purple: {
      moonColor: "text-purple-200/30",
      starColor: "bg-purple-50",
      starFillColor: "text-yellow-100 fill-yellow-100",
      orbColors: ["bg-purple-300/10", "bg-fuchsia-300/10", "bg-pink-300/10"],
      backdropColor: "bg-purple-900/5"
    },
    // Add more color themes if needed
  }[primaryColor] || {
    moonColor: "text-blue-200/30",
    starColor: "bg-blue-50",
    starFillColor: "text-yellow-100 fill-yellow-100",
    orbColors: ["bg-blue-300/10", "bg-indigo-300/10", "bg-violet-300/10"],
    backdropColor: "bg-blue-900/5"
  };

  const getRandomOrbColor = () => {
    const index = Math.floor(Math.random() * colorConfig.orbColors.length);
    return colorConfig.orbColors[index];
  };

  // Number of elements
  const starCount = getCount(40);
  const largeStarCount = getCount(8);
  const orbCount = getCount(12);
  
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-[-1]">
      {/* Cosmic backdrop */}
      <div className={`absolute w-full h-full ${colorConfig.backdropColor} backdrop-blur-[100px]`}></div>
      
      {/* Small stars */}
      {Array.from({ length: starCount }).map((_, i) => (
        <motion.div
          key={`star-${i}-${randomSeed}`}
          className={`absolute rounded-full ${colorConfig.starColor}`}
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: Math.floor(Math.random() * 5),
          }}
          animate={{
            opacity: [0.2, 0.8, 0.2],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: Math.random() * 4 + 3,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 5,
          }}
        />
      ))}
      
      {/* Larger stars */}
      {Array.from({ length: largeStarCount }).map((_, i) => (
        <motion.div
          key={`large-star-${i}-${randomSeed}`}
          className={`absolute ${colorConfig.starFillColor}`}
          style={{
            top: `${Math.random() * 90 + 5}%`,
            left: `${Math.random() * 90 + 5}%`,
            zIndex: Math.floor(Math.random() * 5),
            filter: "drop-shadow(0 0 6px rgba(255, 255, 200, 0.3))"
          }}
          animate={{
            opacity: [0.5, 1, 0.5],
            scale: [1, 1.2, 1],
            rotate: [0, Math.random() > 0.5 ? 180 : -180, 0]
          }}
          transition={{
            duration: Math.random() * 5 + 5,
            repeat: Infinity,
            repeatType: "reverse",
            delay: Math.random() * 3,
          }}
        >
          <Star className="h-4 w-4" />
        </motion.div>
      ))}
      
      {/* Moon */}
      <motion.div 
        className={`absolute ${colorConfig.moonColor}`}
        style={{
          right: `${10 + Math.random() * 20}%`,
          top: `${10 + Math.random() * 20}%`,
          filter: "drop-shadow(0 0 15px rgba(180, 210, 255, 0.4))",
          zIndex: 2
        }}
        animate={{
          y: [0, 15, 0],
          x: [0, -10, 0],
          opacity: [0.7, 0.9, 0.7],
          scale: [1, 1.05, 1],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Moon className="h-20 w-20" />
      </motion.div>
      
      {/* Glowing orbs / nebulae */}
      {Array.from({ length: orbCount }).map((_, i) => (
        <motion.div
          key={`orb-${i}-${randomSeed}`}
          className={`absolute rounded-full ${getRandomOrbColor()} blur-xl`}
          style={{
            width: Math.random() * 200 + 100,
            height: Math.random() * 200 + 100,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            zIndex: 1,
          }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            scale: [1, 1.3, 1],
            x: [0, Math.random() * 70 - 35, 0],
            y: [0, Math.random() * 70 - 35, 0],
          }}
          transition={{
            duration: Math.random() * 30 + 20,
            repeat: Infinity,
            repeatType: "reverse",
          }}
        />
      ))}

      {/* 3D/4D time dimension effect - moving particles */}
      {Array.from({ length: getCount(15) }).map((_, i) => (
        <motion.div
          key={`particle-${i}-${randomSeed}`}
          className="absolute rounded-full bg-white/50"
          style={{
            width: Math.random() * 6 + 2,
            height: Math.random() * 6 + 2,
            filter: "blur(1px)",
            zIndex: 5
          }}
          initial={{
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
            scale: 0
          }}
          animate={{
            x: [
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth,
              Math.random() * window.innerWidth
            ],
            y: [
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight,
              Math.random() * window.innerHeight
            ],
            scale: [0, 1, 0],
            opacity: [0, 0.8, 0]
          }}
          transition={{
            duration: Math.random() * 20 + 10,
            repeat: Infinity,
            repeatType: "loop",
            times: [0, 0.5, 1],
            delay: i * 0.5
          }}
        />
      ))}

      {/* Distant galaxy clusters */}
      {Array.from({ length: getCount(3) }).map((_, i) => (
        <div 
          key={`galaxy-${i}-${randomSeed}`}
          className="absolute overflow-hidden"
          style={{
            width: Math.random() * 300 + 200,
            height: Math.random() * 300 + 200,
            top: `${Math.random() * 90}%`,
            left: `${Math.random() * 90}%`,
            transform: `rotate(${Math.random() * 360}deg)`,
            opacity: 0.2,
            zIndex: 0
          }}
        >
          <motion.div
            className="w-full h-full bg-gradient-radial from-blue-300/20 via-transparent to-transparent"
            animate={{
              rotate: 360,
              scale: [1, 1.1, 1]
            }}
            transition={{
              rotate: {
                duration: Math.random() * 200 + 100,
                repeat: Infinity,
                ease: "linear"
              },
              scale: {
                duration: Math.random() * 30 + 20,
                repeat: Infinity,
                repeatType: "reverse"
              }
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default CosmicBackground;