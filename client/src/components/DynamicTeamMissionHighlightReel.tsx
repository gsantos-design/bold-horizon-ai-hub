import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  Heart, 
  Users, 
  Target, 
  TrendingUp, 
  Award,
  Star,
  Clock,
  ChevronLeft,
  ChevronRight,
  Play,
  Pause,
  Building,
  GraduationCap,
  DollarSign
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface MissionHighlight {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  gradient: string;
  stats: { label: string; value: string }[];
  teamMember?: string;
  image?: string;
}

export default function DynamicTeamMissionHighlightReel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [direction, setDirection] = useState(1);

  const highlights: MissionHighlight[] = [
    {
      id: 'protect-protectors',
      title: 'Protecting the Protectors',
      subtitle: 'Pablo\'s Mission',
      description: '30+ years of law enforcement experience drives our commitment to protecting first responders and their families through financial education and tax-free wealth strategies.',
      icon: <Shield className="h-8 w-8" />,
      color: 'blue',
      gradient: 'from-blue-600 to-indigo-600',
      stats: [
        { label: 'Years in Law Enforcement', value: '30+' },
        { label: 'First Responders Helped', value: '500+' },
        { label: 'Financial Protection Plans', value: '1,200+' }
      ],
      teamMember: 'Pablo Santiago',
      image: '@assets/image_1754703082911.png'
    },
    {
      id: 'family-legacy',
      title: 'Building Family Legacies',
      subtitle: 'Nolly\'s Vision',
      description: 'With 20+ years in telecommunications and a personal mission born from loss, we ensure every family has the financial education to secure their future before it\'s too late.',
      icon: <Heart className="h-8 w-8" />,
      color: 'purple',
      gradient: 'from-purple-600 to-pink-600',
      stats: [
        { label: 'Families Educated', value: '2,500+' },
        { label: 'Legacy Plans Created', value: '800+' },
        { label: 'Multiple Income Streams', value: '1,500+' }
      ],
      teamMember: 'Nolly Santiago',
      image: '@assets/image_1754703666032.png'
    },
    {
      id: 'entrepreneurial-wealth',
      title: 'Entrepreneurial Wealth Building',
      subtitle: 'Joseph\'s Focus',
      description: 'Investment licensed since high school with a Finance degree, Joseph empowers entrepreneurs to build real wealth and create lasting legacies through compound interest mastery.',
      icon: <TrendingUp className="h-8 w-8" />,
      color: 'green',
      gradient: 'from-green-600 to-emerald-600',
      stats: [
        { label: 'Entrepreneurs Coached', value: '350+' },
        { label: 'Investment Strategies', value: '75+' },
        { label: 'Wealth Building Plans', value: '650+' }
      ],
      teamMember: 'Joseph Santiago',
      image: '@assets/IMG_9689_1754855787976.jpeg'
    },
    {
      id: 'youth-education',
      title: 'Youth Financial Education',
      subtitle: 'Christian\'s Passion',
      description: 'Mathematics expert and compound interest advocate, Christian empowers young people to dream again and take control of their financial future through the new art of living.',
      icon: <GraduationCap className="h-8 w-8" />,
      color: 'orange',
      gradient: 'from-orange-600 to-red-600',
      stats: [
        { label: 'Young Adults Educated', value: '1,000+' },
        { label: 'Compound Interest Workshops', value: '150+' },
        { label: 'Financial Futures Secured', value: '2,200+' }
      ],
      teamMember: 'Christian Santiago',
      image: '/christian-santiago.png'
    },
    {
      id: 'team-impact',
      title: 'Combined Team Impact',
      subtitle: 'Santiago Family Legacy',
      description: 'Four generations united in transforming lives through financial education, building generational wealth, and creating lasting legacies across Florida and New York markets.',
      icon: <Users className="h-8 w-8" />,
      color: 'indigo',
      gradient: 'from-indigo-600 to-purple-600',
      stats: [
        { label: 'Total Families Served', value: '5,000+' },
        { label: 'Combined Experience', value: '75+ Years' },
        { label: 'Financial Freedom Plans', value: '3,800+' }
      ],
      teamMember: 'Team Santiago'
    }
  ];

  useEffect(() => {
    if (!isPlaying) return;

    const timer = setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % highlights.length);
    }, 6000); // 6 seconds per highlight

    return () => clearInterval(timer);
  }, [isPlaying, highlights.length]);

  const nextHighlight = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % highlights.length);
  };

  const prevHighlight = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev - 1 + highlights.length) % highlights.length);
  };

  const currentHighlight = highlights[currentIndex];

  const slideVariants = {
    enter: (direction: number) => ({
      x: direction > 0 ? 1000 : -1000,
      opacity: 0
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1
    },
    exit: (direction: number) => ({
      zIndex: 0,
      x: direction < 0 ? 1000 : -1000,
      opacity: 0
    })
  };

  const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring", 
        stiffness: 260, 
        damping: 20,
        delay: 0.3
      }
    }
  };

  const statsVariants = {
    initial: { opacity: 0, y: 20 },
    animate: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.5 + (i * 0.1),
        duration: 0.6
      }
    })
  };

  return (
    <section className="py-16 bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <motion.div 
            className="text-center mb-12"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2">
              🎯 Team Mission Highlights
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Dynamic Team Mission
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Highlight Reel</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover the powerful missions driving each Santiago family member and their collective impact 
              on transforming lives through financial education.
            </p>
          </motion.div>

          {/* Main Highlight Display */}
          <div className="relative">
            <Card className="border-none shadow-2xl overflow-hidden">
              <AnimatePresence initial={false} custom={direction}>
                <motion.div
                  key={currentIndex}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{
                    x: { type: "spring", stiffness: 300, damping: 30 },
                    opacity: { duration: 0.2 }
                  }}
                >
                  <CardContent className={`bg-gradient-to-r ${currentHighlight.gradient} text-white p-0`}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[500px]">
                      {/* Content Side */}
                      <div className="p-8 lg:p-12 flex flex-col justify-center">
                        <motion.div
                          variants={iconVariants}
                          initial="initial"
                          animate="animate"
                          className={`inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-6`}
                        >
                          {currentHighlight.icon}
                        </motion.div>

                        <motion.div
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2, duration: 0.6 }}
                        >
                          <p className="text-lg opacity-90 mb-2">{currentHighlight.subtitle}</p>
                          <h3 className="text-3xl md:text-4xl font-bold mb-6">{currentHighlight.title}</h3>
                          <p className="text-lg opacity-90 leading-relaxed mb-8">
                            {currentHighlight.description}
                          </p>
                        </motion.div>

                        {/* Stats Grid */}
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                          {currentHighlight.stats.map((stat, index) => (
                            <motion.div
                              key={stat.label}
                              custom={index}
                              variants={statsVariants}
                              initial="initial"
                              animate="animate"
                              className="text-center"
                            >
                              <div className="bg-white/20 rounded-lg p-4">
                                <div className="text-2xl font-bold mb-1">{stat.value}</div>
                                <div className="text-sm opacity-90">{stat.label}</div>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Image/Visual Side */}
                      <div className="relative bg-white/10 flex items-center justify-center p-8">
                        {currentHighlight.image ? (
                          <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="relative"
                          >
                            <div className="w-64 h-64 rounded-full overflow-hidden border-8 border-white/30 shadow-2xl">
                              <img 
                                src={currentHighlight.image} 
                                alt={currentHighlight.teamMember} 
                                className="w-full h-full object-cover"
                              />
                            </div>
                            {currentHighlight.teamMember && (
                              <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2">
                                <Badge className="bg-white text-gray-900 px-4 py-2 text-lg font-semibold">
                                  {currentHighlight.teamMember}
                                </Badge>
                              </div>
                            )}
                          </motion.div>
                        ) : (
                          <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.8 }}
                            className="text-center"
                          >
                            <div className="w-48 h-48 bg-white/20 rounded-full flex items-center justify-center mb-4">
                              <Users className="h-24 w-24" />
                            </div>
                            <Badge className="bg-white text-gray-900 px-4 py-2 text-lg font-semibold">
                              {currentHighlight.teamMember}
                            </Badge>
                          </motion.div>
                        )}
                      </div>
                    </div>
                  </CardContent>
                </motion.div>
              </AnimatePresence>
            </Card>

            {/* Navigation Controls */}
            <div className="absolute top-1/2 left-4 transform -translate-y-1/2">
              <Button
                variant="outline"
                size="icon"
                onClick={prevHighlight}
                className="bg-white/90 hover:bg-white border-gray-200 shadow-lg"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>
            </div>
            <div className="absolute top-1/2 right-4 transform -translate-y-1/2">
              <Button
                variant="outline"
                size="icon"
                onClick={nextHighlight}
                className="bg-white/90 hover:bg-white border-gray-200 shadow-lg"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Controls Panel */}
          <div className="flex items-center justify-center mt-8 space-x-6">
            {/* Play/Pause */}
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsPlaying(!isPlaying)}
              className="bg-white/90 hover:bg-white border-gray-200"
            >
              {isPlaying ? <Pause className="h-4 w-4 mr-2" /> : <Play className="h-4 w-4 mr-2" />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>

            {/* Indicators */}
            <div className="flex space-x-2">
              {highlights.map((_, index) => (
                <button
                  key={index}
                  onClick={() => {
                    setDirection(index > currentIndex ? 1 : -1);
                    setCurrentIndex(index);
                  }}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex 
                      ? 'bg-blue-600 scale-125' 
                      : 'bg-gray-300 hover:bg-gray-400'
                  }`}
                />
              ))}
            </div>

            {/* Timer Display */}
            <div className="flex items-center text-sm text-gray-600">
              <Clock className="h-4 w-4 mr-1" />
              <span>{currentIndex + 1} / {highlights.length}</span>
            </div>
          </div>

          {/* Quick Stats Banner */}
          <motion.div 
            className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-2xl font-bold text-blue-600 mb-2">5,000+</div>
              <div className="text-sm text-gray-600">Families Served</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-2xl font-bold text-purple-600 mb-2">75+</div>
              <div className="text-sm text-gray-600">Years Combined Experience</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-2xl font-bold text-green-600 mb-2">3,800+</div>
              <div className="text-sm text-gray-600">Financial Plans Created</div>
            </div>
            <div className="text-center p-6 bg-white rounded-xl shadow-lg">
              <div className="text-2xl font-bold text-orange-600 mb-2">100%</div>
              <div className="text-sm text-gray-600">Family Commitment</div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}