import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { 
  Star, 
  Rocket, 
  TrendingUp, 
  Award, 
  Users,
  Sparkles,
  ChevronsUp,
  Crown,
  Briefcase,
  Zap,
  Info
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useLanguage } from '@/lib/LanguageContext';
import { ranks } from '@/lib/constants';
import { cn, formatPercentage } from '@/lib/utils';

type ConstellationPoint = {
  id: string;
  label: string;
  subLabel: string;
  icon: React.ReactNode;
  description: string;
  requirements: string[];
  benefits: string[];
  commission: string;
  position: {
    x: number;
    y: number;
    z: number;
  };
  level: number;
};

const CareerConstellation: React.FC = () => {
  const { t, language } = useLanguage();
  const [activePoint, setActivePoint] = useState<string | null>(null);
  const [rotationAngle, setRotationAngle] = useState(0);
  const [cameraDistance, setCameraDistance] = useState(120);
  const [autoRotate, setAutoRotate] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);

  // Generate constellation data based on WFG ranks
  const constellationPoints: ConstellationPoint[] = [
    {
      id: 'associate',
      label: t('constellation.associate.title') || 'Associate',
      subLabel: t('constellation.associate.subtitle') || 'Beginning of your journey',
      icon: <Briefcase className="h-5 w-5" />,
      description: t('constellation.associate.description') || 'The entry point into the Bold Horizons with World Financial Group business, where you start learning the basics and building your foundation.',
      requirements: [
        t('constellation.associate.req1') || 'Join the team',
        t('constellation.associate.req2') || 'Complete basic training',
        t('constellation.associate.req3') || 'Obtain required licenses'
      ],
      benefits: [
        t('constellation.associate.benefit1') || 'Access to product training',
        t('constellation.associate.benefit2') || 'Mentorship from experienced leaders',
        t('constellation.associate.benefit3') || 'Foundation for building your business'
      ],
      commission: '25-35%',
      position: { x: -40, y: -60, z: -20 },
      level: 1
    },
    {
      id: 'marketing_director',
      label: t('constellation.md.title') || 'Marketing Director',
      subLabel: t('constellation.md.subtitle') || 'Building your team',
      icon: <Users className="h-5 w-5" />,
      description: t('constellation.md.description') || 'At this level, you begin to build your team while continuing to expand your client base and increasing your product knowledge.',
      requirements: [
        t('constellation.md.req1') || 'Recruit team members',
        t('constellation.md.req2') || 'Meet monthly production goals',
        t('constellation.md.req3') || 'Complete advanced training'
      ],
      benefits: [
        t('constellation.md.benefit1') || 'Increased commission rates',
        t('constellation.md.benefit2') || 'Leadership development',
        t('constellation.md.benefit3') || 'Team override commissions'
      ],
      commission: '40-50%',
      position: { x: -20, y: -30, z: 0 },
      level: 2
    },
    {
      id: 'senior_marketing_director',
      label: t('constellation.smd.title') || 'Senior Marketing Director',
      subLabel: t('constellation.smd.subtitle') || 'Expanding your influence',
      icon: <TrendingUp className="h-5 w-5" />,
      description: t('constellation.smd.description') || 'A key leadership position where you begin developing leaders within your organization and creating significant impact.',
      requirements: [
        t('constellation.smd.req1') || 'Develop multiple Marketing Directors',
        t('constellation.smd.req2') || 'Achieve consistent team production',
        t('constellation.smd.req3') || 'Demonstrate leadership excellence'
      ],
      benefits: [
        t('constellation.smd.benefit1') || 'Higher commission structure',
        t('constellation.smd.benefit2') || 'Multiple levels of overrides',
        t('constellation.smd.benefit3') || 'Leadership bonus pools'
      ],
      commission: '55-65%',
      position: { x: 10, y: 0, z: 20 },
      level: 3
    },
    {
      id: 'executive_marketing_director',
      label: t('constellation.emd.title') || 'Executive Marketing Director',
      subLabel: t('constellation.emd.subtitle') || 'Creating a powerful organization',
      icon: <Zap className="h-5 w-5" />,
      description: t('constellation.emd.description') || 'At this advanced level, you lead multiple teams and develop a strong organization structure with proven systems.',
      requirements: [
        t('constellation.emd.req1') || 'Develop multiple SMDs',
        t('constellation.emd.req2') || 'Build a sustainable organization',
        t('constellation.emd.req3') || 'Create effective business systems'
      ],
      benefits: [
        t('constellation.emd.benefit1') || 'Executive-level compensation',
        t('constellation.emd.benefit2') || 'Deep organization overrides',
        t('constellation.emd.benefit3') || 'Enhanced business support'
      ],
      commission: '70-75%',
      position: { x: 30, y: 30, z: -10 },
      level: 4
    },
    {
      id: 'senior_executive_marketing_director',
      label: t('constellation.semd.title') || 'Senior Executive Marketing Director',
      subLabel: t('constellation.semd.subtitle') || 'Leadership excellence',
      icon: <Award className="h-5 w-5" />,
      description: t('constellation.semd.description') || 'A rare achievement representing extraordinary leadership and business development success.',
      requirements: [
        t('constellation.semd.req1') || 'Develop multiple EMDs',
        t('constellation.semd.req2') || 'Achieve major organization milestones',
        t('constellation.semd.req3') || 'Demonstrate consistent excellence'
      ],
      benefits: [
        t('constellation.semd.benefit1') || 'Premier commission structure',
        t('constellation.semd.benefit2') || 'Executive leadership bonuses',
        t('constellation.semd.benefit3') || 'Legacy building opportunities'
      ],
      commission: '80-85%',
      position: { x: 60, y: 50, z: 0 },
      level: 5
    },
    {
      id: 'ceo_marketing_director',
      label: t('constellation.ceomd.title') || 'CEO Marketing Director',
      subLabel: t('constellation.ceomd.subtitle') || 'Pinnacle of success',
      icon: <Crown className="h-5 w-5" />,
      description: t('constellation.ceomd.description') || 'The pinnacle achievement in the Bold Horizons with World Financial Group business, representing extraordinary impact and organizational success.',
      requirements: [
        t('constellation.ceomd.req1') || 'Build a massive organization',
        t('constellation.ceomd.req2') || 'Develop multiple SEMDs',
        t('constellation.ceomd.req3') || 'Create a lasting business legacy'
      ],
      benefits: [
        t('constellation.ceomd.benefit1') || 'Maximum commission structure',
        t('constellation.ceomd.benefit2') || 'Multiple executive bonus pools',
        t('constellation.ceomd.benefit3') || 'Transformational impact potential'
      ],
      commission: '90-95%',
      position: { x: 90, y: 80, z: 10 },
      level: 6
    },
  ];

  // Init and refresh dimensions
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    return () => window.removeEventListener('resize', updateDimensions);
  }, []);

  // Auto-rotation effect
  useEffect(() => {
    let animationFrame: number;
    const rotateConstellation = () => {
      if (autoRotate && !isDragging) {
        setRotationAngle(prev => (prev + 0.1) % 360);
      }
      animationFrame = requestAnimationFrame(rotateConstellation);
    };

    animationFrame = requestAnimationFrame(rotateConstellation);
    return () => cancelAnimationFrame(animationFrame);
  }, [autoRotate, isDragging]);

  // Handle mouse move for interactive rotation
  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging) {
      const { clientX, clientY } = e;
      const deltaX = clientX - mousePosition.x;
      setRotationAngle(prev => prev + deltaX * 0.2);
      setMousePosition({ x: clientX, y: clientY });
    }
  };

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setMousePosition({ x: e.clientX, y: e.clientY });
    setAutoRotate(false);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseLeave = () => {
    setIsDragging(false);
  };

  // Transform coordinates for 3D perspective
  const getTransform = (position: { x: number; y: number; z: number }) => {
    const centerX = dimensions.width / 2;
    const centerY = dimensions.height / 2;
    
    // Apply rotation to x and z coordinates
    const radians = (rotationAngle * Math.PI) / 180;
    const rotatedX = position.x * Math.cos(radians) - position.z * Math.sin(radians);
    const rotatedZ = position.x * Math.sin(radians) + position.z * Math.cos(radians);
    
    // Apply 3D perspective
    const scale = cameraDistance / (cameraDistance - rotatedZ);
    const projectedX = centerX + rotatedX * scale;
    const projectedY = centerY + position.y * scale;
    
    return {
      x: projectedX,
      y: projectedY,
      scale,
    };
  };

  // Draw constellation lines
  const renderConstellationLines = () => {
    const lines: JSX.Element[] = [];
    
    // Sort by level to connect properly
    const sortedPoints = [...constellationPoints].sort((a, b) => a.level - b.level);
    
    for (let i = 0; i < sortedPoints.length - 1; i++) {
      const start = getTransform(sortedPoints[i].position);
      const end = getTransform(sortedPoints[i + 1].position);
      
      // Calculate line path
      const linePath = `M${start.x},${start.y} L${end.x},${end.y}`;
      
      lines.push(
        <motion.path
          key={`line-${i}`}
          d={linePath}
          stroke="url(#constellationGradient)"
          strokeWidth={1.5}
          strokeDasharray="5,5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ 
            pathLength: 1, 
            opacity: 0.7,
            transition: { duration: 2, delay: i * 0.3 } 
          }}
          className="cosmic-glow-line"
        />
      );
    }
    
    return (
      <svg className="absolute inset-0 w-full h-full overflow-visible pointer-events-none">
        <defs>
          <linearGradient id="constellationGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#4F46E5" />
            <stop offset="50%" stopColor="#7C3AED" />
            <stop offset="100%" stopColor="#2563EB" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="2.5" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        </defs>
        {lines}
      </svg>
    );
  };

  return (
    <section className="py-20 relative overflow-hidden" id="career-constellation">
      <div className="absolute inset-0 bg-blue-900/10 backdrop-blur-sm"></div>
      
      {/* Animated star background */}
      <div className="absolute inset-0 overflow-hidden">
        {Array.from({ length: 50 }).map((_, i) => (
          <motion.div
            key={`star-${i}`}
            className="absolute rounded-full bg-white"
            style={{
              width: Math.random() * 2 + 1,
              height: Math.random() * 2 + 1,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              filter: 'blur(1px)',
            }}
            animate={{
              opacity: [0.1, 0.8, 0.1],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: Math.random() * 3 + 2,
              repeat: Infinity,
              repeatType: "reverse",
              delay: Math.random() * 5,
            }}
          />
        ))}
      </div>

      <div className="container px-4 relative z-10">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 px-3 py-1 bg-primary/5 text-primary border-primary/20">
            {t('constellation.eyebrow') || 'Career Path Visualization'}
          </Badge>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight cosmic-text-title cosmic-glow-blue mb-4">
            {t('constellation.title') || 'Your Journey Through The Stars'}
          </h2>
          <p className="cosmic-text-subtitle max-w-2xl mx-auto">
            {t('constellation.subtitle') || 'Explore the Bold Horizons with World Financial Group career path represented as a cosmic constellation. Each point represents a professional milestone in your journey.'}
          </p>
        </div>

        <div className="flex items-center justify-center mb-6">
          <div className="flex space-x-4">
            <Button 
              size="sm" 
              variant="outline" 
              className={cn(
                "cosmic-glass-effect border border-blue-400/30",
                !autoRotate && "bg-blue-500/20"
              )}
              onClick={() => setAutoRotate(!autoRotate)}
            >
              {autoRotate ? t('constellation.stop_rotation') || 'Stop Rotation' : t('constellation.auto_rotate') || 'Auto Rotate'}
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="cosmic-glass-effect border border-blue-400/30"
              onClick={() => setCameraDistance(prev => Math.max(80, prev - 10))}
            >
              {t('constellation.zoom_in') || 'Zoom In'}
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              className="cosmic-glass-effect border border-blue-400/30"
              onClick={() => setCameraDistance(prev => Math.min(200, prev + 10))}
            >
              {t('constellation.zoom_out') || 'Zoom Out'}
            </Button>
          </div>
        </div>

        <div 
          ref={containerRef}
          className="relative h-[600px] cosmic-glass-effect rounded-xl p-4 border border-blue-400/20 shadow-2xl mb-10 cursor-grab"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseLeave}
          style={{ touchAction: 'none' }}
        >
          {dimensions.width > 0 && (
            <>
              {renderConstellationLines()}
              
              {/* Render all constellation points */}
              {constellationPoints.map((point) => {
                const { x, y, scale } = getTransform(point.position);
                const isActive = activePoint === point.id;
                const pointSize = 30 * (isActive ? 1.3 : 1) * scale;
                
                return (
                  <div key={point.id} style={{ position: 'absolute', left: 0, top: 0 }}>
                    <motion.div
                      className={cn(
                        "absolute rounded-full flex items-center justify-center cursor-pointer",
                        "backdrop-blur-sm border transition-all duration-300",
                        isActive 
                          ? "bg-blue-600/80 border-blue-300/80 z-20" 
                          : "bg-blue-900/60 border-blue-500/30 hover:bg-blue-800/70 hover:border-blue-400/50",
                      )}
                      style={{ 
                        width: pointSize, 
                        height: pointSize,
                        left: x - pointSize/2,
                        top: y - pointSize/2,
                        zIndex: isActive ? 50 : Math.round(scale * 10),
                      }}
                      onClick={() => setActivePoint(isActive ? null : point.id)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      animate={{
                        boxShadow: isActive
                          ? ['0 0 4px 2px rgba(79, 70, 229, 0.3)', '0 0 10px 5px rgba(79, 70, 229, 0.5)', '0 0 4px 2px rgba(79, 70, 229, 0.3)']
                          : ['0 0 2px 1px rgba(59, 130, 246, 0.2)', '0 0 4px 2px rgba(59, 130, 246, 0.3)', '0 0 2px 1px rgba(59, 130, 246, 0.2)'],
                      }}
                      transition={{
                        boxShadow: {
                          repeat: Infinity,
                          duration: 2,
                        },
                      }}
                    >
                      {point.icon}
                      
                      {/* Star decorations around active points */}
                      {isActive && (
                        <>
                          {[...Array(5)].map((_, i) => {
                            const angle = (i * 72) * (Math.PI / 180);
                            const distance = pointSize * 0.8;
                            const starX = Math.cos(angle) * distance;
                            const starY = Math.sin(angle) * distance;
                            
                            return (
                              <motion.div
                                key={`star-${point.id}-${i}`}
                                className="absolute w-1 h-1 bg-white rounded-full"
                                style={{
                                  left: pointSize/2 + starX,
                                  top: pointSize/2 + starY,
                                }}
                                initial={{ scale: 0, opacity: 0 }}
                                animate={{ 
                                  scale: [0, 1.5, 1],
                                  opacity: [0, 1, 0.8]
                                }}
                                transition={{ 
                                  delay: i * 0.1,
                                  duration: 1,
                                  repeat: Infinity,
                                  repeatDelay: 2
                                }}
                              />
                            );
                          })}
                        </>
                      )}
                      
                      {/* Label for the point */}
                      <motion.div
                        className={cn(
                          "absolute whitespace-nowrap cosmic-glass-effect rounded px-3 py-1.5",
                          "border transform transition-all duration-300",
                          isActive 
                            ? "bg-blue-900/90 border-blue-400/50 text-white font-semibold"
                            : "bg-blue-950/70 border-blue-500/30 text-blue-100/90"
                        )}
                        style={{
                          left: '50%',
                          top: -35,
                          transform: 'translateX(-50%)',
                          fontSize: 12 * scale,
                          opacity: scale > 0.6 ? scale : 0,
                          pointerEvents: scale > 0.6 ? 'auto' : 'none',
                        }}
                      >
                        {point.label}
                      </motion.div>
                    </motion.div>
                    
                    {/* Info card for active point */}
                    {isActive && (
                      <motion.div
                        className="absolute bg-blue-900/80 backdrop-blur-md rounded-xl p-4 border border-blue-400/30 shadow-lg z-50 w-72"
                        style={{
                          left: x + pointSize/2 + 20,
                          top: y - 140,
                          display: x + pointSize/2 + 20 + 280 > dimensions.width ? 'none' : 'block',
                        }}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                      >
                        <div className="flex items-center mb-3">
                          <div className="bg-blue-600/30 p-2 rounded-full mr-3">
                            {point.icon}
                          </div>
                          <div>
                            <h4 className="font-bold text-lg cosmic-text">{point.label}</h4>
                            <p className="text-xs text-blue-200/80">{point.subLabel}</p>
                          </div>
                        </div>
                        
                        <p className="text-sm text-blue-100/90 mb-3">
                          {point.description}
                        </p>
                        
                        <div className="bg-blue-800/40 rounded p-2 mb-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-blue-200/80">Commission:</span>
                            <Badge variant="outline" className="bg-blue-700/50 text-blue-100 border-blue-400/30">
                              {point.commission}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div>
                            <h5 className="text-xs font-semibold text-blue-200 mb-1 flex items-center">
                              <ChevronsUp className="h-3 w-3 mr-1" />
                              Requirements
                            </h5>
                            <ul className="text-xs text-blue-100/80 space-y-1 pl-1">
                              {point.requirements.map((req, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-blue-400 mr-1">•</span> {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="text-xs font-semibold text-blue-200 mb-1 flex items-center">
                              <Sparkles className="h-3 w-3 mr-1" />
                              Benefits
                            </h5>
                            <ul className="text-xs text-blue-100/80 space-y-1 pl-1">
                              {point.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-blue-400 mr-1">•</span> {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full text-xs bg-blue-700/40 border-blue-400/30 hover:bg-blue-600/50"
                          onClick={() => setActivePoint(null)}
                        >
                          Close
                        </Button>
                      </motion.div>
                    )}
                    
                    {/* Alternative position for info card when near right edge */}
                    {isActive && x + pointSize/2 + 20 + 280 > dimensions.width && (
                      <motion.div
                        className="absolute bg-blue-900/80 backdrop-blur-md rounded-xl p-4 border border-blue-400/30 shadow-lg z-50 w-72"
                        style={{
                          right: dimensions.width - x + pointSize/2 + 20,
                          top: y - 140,
                        }}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                      >
                        <div className="flex items-center mb-3">
                          <div className="bg-blue-600/30 p-2 rounded-full mr-3">
                            {point.icon}
                          </div>
                          <div>
                            <h4 className="font-bold text-lg cosmic-text">{point.label}</h4>
                            <p className="text-xs text-blue-200/80">{point.subLabel}</p>
                          </div>
                        </div>
                        
                        <p className="text-sm text-blue-100/90 mb-3">
                          {point.description}
                        </p>
                        
                        <div className="bg-blue-800/40 rounded p-2 mb-3">
                          <div className="flex justify-between items-center">
                            <span className="text-xs text-blue-200/80">Commission:</span>
                            <Badge variant="outline" className="bg-blue-700/50 text-blue-100 border-blue-400/30">
                              {point.commission}
                            </Badge>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 mb-3">
                          <div>
                            <h5 className="text-xs font-semibold text-blue-200 mb-1 flex items-center">
                              <ChevronsUp className="h-3 w-3 mr-1" />
                              Requirements
                            </h5>
                            <ul className="text-xs text-blue-100/80 space-y-1 pl-1">
                              {point.requirements.map((req, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-blue-400 mr-1">•</span> {req}
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <h5 className="text-xs font-semibold text-blue-200 mb-1 flex items-center">
                              <Sparkles className="h-3 w-3 mr-1" />
                              Benefits
                            </h5>
                            <ul className="text-xs text-blue-100/80 space-y-1 pl-1">
                              {point.benefits.map((benefit, index) => (
                                <li key={index} className="flex items-start">
                                  <span className="text-blue-400 mr-1">•</span> {benefit}
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        
                        <Button 
                          size="sm" 
                          variant="outline" 
                          className="w-full text-xs bg-blue-700/40 border-blue-400/30 hover:bg-blue-600/50"
                          onClick={() => setActivePoint(null)}
                        >
                          Close
                        </Button>
                      </motion.div>
                    )}
                  </div>
                );
              })}
            </>
          )}
          
          {/* Help text overlay */}
          <div className="absolute bottom-4 right-4 bg-blue-900/70 backdrop-blur-sm rounded-lg px-3 py-1.5 flex items-center text-xs text-blue-100/90 border border-blue-500/30">
            <Info className="h-4 w-4 mr-1.5 text-blue-300" />
            {t('constellation.help_text') || 'Click and drag to rotate • Click a point to explore'}
          </div>
        </div>
        
        {/* Legend/Key */}
        <div className="max-w-3xl mx-auto">
          <Card className="cosmic-glass-effect border-blue-400/20">
            <div className="p-4">
              <h3 className="cosmic-text-subtitle mb-4 font-semibold text-center">
                {t('constellation.progression_path') || 'Progression Path'}
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                {constellationPoints.map((point, index) => (
                  <motion.div
                    key={point.id}
                    className="flex items-center bg-blue-900/40 rounded-lg px-3 py-2 border border-blue-500/20 cursor-pointer"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setActivePoint(point.id)}
                  >
                    <div className="w-7 h-7 rounded-full bg-blue-800/50 border border-blue-500/30 flex items-center justify-center mr-2">
                      {point.icon}
                    </div>
                    <div className="text-sm">{index + 1}. {point.label}</div>
                    {index < constellationPoints.length - 1 && (
                      <div className="w-5 flex justify-center">
                        <svg width="10" height="10" viewBox="0 0 10 10" className="ml-1">
                          <path d="M0 5H8M8 5L4 1M8 5L4 9" stroke="currentColor" strokeWidth="1" />
                        </svg>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </Card>
        </div>

        {/* Call to action */}
        <div className="text-center mt-12">
          <Button 
            size="lg" 
            className="bg-primary hover:bg-primary/90 text-secondary px-8"
            onClick={() => document.getElementById('career-quiz')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t('constellation.cta') || 'Find Your Place In The Constellation'} <Rocket className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CareerConstellation;