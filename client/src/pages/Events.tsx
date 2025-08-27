import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Wine, Gift, CheckCircle, Phone, ExternalLink, Star, Sparkles, TrendingUp, Award, Heart, Globe } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Import the event flyer images
import wealthWorkshopFlyer from '@assets/IMG_0412_1754924705272.jpeg';
import grandOpeningFlyer from '@assets/grand-opening-2025.png';

export default function Events() {
  const [selectedEvent, setSelectedEvent] = useState<string | null>(null);

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  };

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Featured Event - I WEALTH Workshop
  const featuredEvent = {
    id: 'i-wealth-workshop',
    title: 'I WEALTH Workshop',
    subtitle: "That's right – we're mixing money talk with a class wine selection",
    date: 'Saturday, August 23rd, 2025',
    time: '1:00 PM',
    location: '235 N Westmonte Drive, Altamonte Springs, FL 32714',
    type: 'Financial Education Workshop',
    status: 'Featured Event',
    description: 'Join us for a fun and empowering financial workshop designed to help you take control of your financial future – while enjoying great wine and even better company.',
    highlights: [
      'Hear from one of our top Financial Strategists',
      'Why 401ks are powerful instruments to create wealth',
      'Free 1-on-1 Financial Plan',
      'Free consultation & advice',
      'Door prizes & good vibes'
    ],
    rsvp: 'RSVP NOW (407) 777-1087',
    additionalInfo: 'Come Wine with us and Stay for the Transformation.',
    image: wealthWorkshopFlyer
  };

  // Past Events
  const pastEvents = [
    {
      id: 'bold-horizons-grand-opening',
      title: 'Bold Horizons Financial Grand Opening',
      date: 'Saturday, June 28, 2025',
      time: '4:30 PM',
      location: '235 N Westmonte Dr, Altamonte Springs, FL 32714',
      type: 'Grand Opening Celebration',
      status: 'Past Event',
      description: 'The official grand opening celebration of Bold Horizons Financial - marking a new chapter in financial empowerment for families nationwide.',
      rsvpDeadline: 'June 20, 2025',
      phone: '407-777-1087',
      image: grandOpeningFlyer,
      success: true,
      attendees: '100+ financial professionals and community leaders'
    }
  ];

  // Only show real events - upcoming events will be added when they are actually scheduled

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      <main className="pt-20 pb-16">
        {/* Hero Section - Enhanced with cosmic theme */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative py-24 overflow-hidden bg-primary"
        >
          {/* Animated background elements */}
          <div className="absolute inset-0">
            <div className="absolute top-20 left-10 w-4 h-4 bg-white/20 rounded-full animate-pulse"></div>
            <div className="absolute top-40 right-20 w-2 h-2 bg-white/30 rounded-full animate-bounce delay-1000"></div>
            <div className="absolute bottom-20 left-20 w-3 h-3 bg-white/25 rounded-full animate-pulse delay-500"></div>
            <div className="absolute top-60 left-1/2 w-1 h-1 bg-white/40 rounded-full animate-ping"></div>
          </div>

          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.div
              {...fadeInUp}
              className="mb-6"
            >
              <Badge className="bg-white/20 text-white border-white/30 text-lg px-6 py-2 backdrop-blur-sm">
                <Sparkles className="w-4 h-4 mr-2" />
                Premium Events
              </Badge>
            </motion.div>
            
            <motion.h1 
              {...fadeInUp}
              className="text-5xl md:text-7xl font-bold text-white mb-8 leading-tight"
            >
              Transform Your
              <span className="block text-white">
                Financial Future
              </span>
            </motion.h1>
            
            <motion.p 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-white/90 max-w-4xl mx-auto mb-12 leading-relaxed"
            >
              Join the Santiago Team for exclusive financial education events, networking opportunities, 
              and professional development workshops designed to accelerate your wealth-building journey.
            </motion.p>
            
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100 text-lg px-8 py-4 rounded-full shadow-2xl transform hover:scale-105 transition-all duration-300"
                onClick={() => setSelectedEvent('i-wealth-workshop')}
              >
                <Star className="w-5 h-5 mr-2" />
                View Featured Event
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-4 rounded-full backdrop-blur-sm"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                <Calendar className="w-5 h-5 mr-2" />
                Get Event Updates
              </Button>
            </motion.div>

            {/* Stats Section */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.6 }}
              className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8"
            >
              {[
                { number: "2,500+", label: "Families Educated", icon: Users },
                { number: "800+", label: "Legacy Plans Created", icon: Award },
                { number: "1,500+", label: "Income Streams Built", icon: TrendingUp }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-white/20 rounded-full mb-4 backdrop-blur-sm">
                    <stat.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-white mb-2">{stat.number}</div>
                  <div className="text-white/80">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Event - I WEALTH Workshop */}
        <motion.section 
          {...fadeInUp}
          className="py-20 bg-white"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <Badge className="bg-primary text-white text-lg px-6 py-3 mb-6 shadow-lg">
                  <Wine className="w-4 h-4 mr-2" />
                  {featuredEvent.status}
                </Badge>
              </motion.div>
              
              <motion.h2 
                {...fadeInUp}
                className="text-4xl md:text-6xl font-bold text-primary mb-6"
              >
                {featuredEvent.title}
              </motion.h2>
              
              <motion.p 
                {...fadeInUp}
                transition={{ delay: 0.2 }}
                className="text-2xl text-gray-600 max-w-4xl mx-auto leading-relaxed"
              >
                {featuredEvent.subtitle}
              </motion.p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center">
              {/* Event Image */}
              <motion.div
                {...fadeInUp}
                transition={{ delay: 0.3 }}
                className="relative group"
              >
                <div className="absolute -inset-4 bg-primary/20 rounded-3xl blur opacity-20 group-hover:opacity-30 transition duration-1000"></div>
                <div className="relative">
                  <img 
                    src={wealthWorkshopFlyer} 
                    alt="I WEALTH Workshop Flyer featuring Nolly Santiago"
                    className="w-full rounded-2xl shadow-2xl transform group-hover:scale-[1.02] transition duration-500"
                  />
                  <div className="absolute inset-0 bg-black/5 rounded-2xl" />
                  
                  {/* Floating elements */}
                  <div className="absolute -top-4 -right-4 bg-primary rounded-full p-3 shadow-lg animate-bounce">
                    <Star className="w-6 h-6 text-white" />
                  </div>
                  <div className="absolute -bottom-4 -left-4 bg-primary rounded-full p-3 shadow-lg animate-pulse">
                    <Heart className="w-6 h-6 text-white" />
                  </div>
                </div>
              </motion.div>

              {/* Event Details */}
              <motion.div
                {...fadeInUp}
                transition={{ delay: 0.4 }}
                className="space-y-8"
              >
                {/* Event Info Cards */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    { icon: Calendar, label: "Date", value: featuredEvent.date, color: "purple" },
                    { icon: Clock, label: "Time", value: featuredEvent.time, color: "blue" },
                    { icon: MapPin, label: "Location", value: featuredEvent.location, color: "pink" },
                    { icon: Users, label: "Type", value: featuredEvent.type, color: "green" }
                  ].map((item, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 + index * 0.1 }}
                      className="bg-primary/5 p-6 rounded-2xl border border-primary/20 hover:shadow-lg transition-all duration-300 group"
                    >
                      <div className="flex items-center mb-3">
                        <div className="p-3 bg-primary rounded-xl mr-4 group-hover:scale-110 transition-transform duration-300">
                          <item.icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-primary uppercase tracking-wide">{item.label}</p>
                          <p className="text-lg font-bold text-gray-900">{item.value}</p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* What to Expect Section */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.7 }}
                  className="bg-gray-50 p-8 rounded-3xl border border-gray-200 shadow-lg"
                >
                  <div className="flex items-center mb-6">
                    <div className="p-3 bg-primary rounded-xl mr-4">
                      <Gift className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-primary">
                      What to Expect
                    </h3>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {featuredEvent.highlights.map((highlight, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.8 + index * 0.1 }}
                        className="flex items-start p-4 bg-white/80 backdrop-blur-sm rounded-xl hover:bg-white transition-all duration-300 group"
                      >
                        <div className="p-2 bg-primary/10 rounded-lg mr-4 group-hover:bg-primary/20 transition-colors duration-300">
                          <CheckCircle className="h-5 w-5 text-primary" />
                        </div>
                        <span className="text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                          {highlight}
                        </span>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.9 }}
                  className="flex flex-col sm:flex-row gap-4"
                >
                  <Button 
                    size="lg" 
                    className="bg-primary hover:bg-primary/90 text-white font-bold py-6 px-10 rounded-2xl shadow-2xl transform hover:scale-105 transition-all duration-300 group"
                  >
                    <Phone className="w-6 h-6 mr-3 group-hover:animate-pulse" />
                    RSVP Now - (407) 777-1087
                    <Sparkles className="w-5 h-5 ml-2 opacity-75" />
                  </Button>
                  
                  <Button 
                    variant="outline" 
                    size="lg"
                    className="border-2 border-primary text-primary hover:bg-primary/5 hover:border-primary py-6 px-10 rounded-2xl font-bold group transition-all duration-300"
                  >
                    <ExternalLink className="w-5 h-5 mr-3 group-hover:rotate-12 transition-transform duration-300" />
                    Event Details
                  </Button>
                </motion.div>

                {/* Additional Info */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 1.0 }}
                  className="text-center p-6 bg-gray-50 rounded-2xl border border-gray-200"
                >
                  <Wine className="w-8 h-8 text-primary mx-auto mb-3" />
                  <p className="text-lg font-semibold text-gray-800 mb-2">
                    "Come Wine with us and Stay for the Transformation"
                  </p>
                  <p className="text-gray-600">
                    Limited seating available. Reserve your spot today!
                  </p>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </motion.section>

        {/* Past Events Section */}
        <motion.section 
          {...fadeInUp}
          className="py-20 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              {...fadeInUp}
              className="text-center mb-16"
            >
              <Badge className="bg-primary/10 text-primary text-lg px-4 py-2 mb-6">
                <Award className="w-4 h-4 mr-2" />
                Past Events
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Our Successful Events
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Take a look at some of our previous events where we brought together
                financial professionals and community members for education and growth.
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {pastEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.2 }}
                  className="bg-white rounded-3xl shadow-xl overflow-hidden hover:shadow-2xl transition-all duration-500 group"
                >
                  <div className="relative">
                    <img 
                      src={event.image} 
                      alt={`${event.title} event flyer`}
                      className="w-full h-80 object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute top-4 right-4">
                      <Badge className="bg-green-500 text-white">
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {event.status}
                      </Badge>
                    </div>
                  </div>
                  
                  <div className="p-8">
                    <h3 className="text-2xl font-bold text-gray-900 mb-4">
                      {event.title}
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">
                      {event.description}
                    </p>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                      <div className="flex items-center text-gray-700">
                        <Calendar className="w-5 h-5 mr-3 text-primary" />
                        <span className="font-medium">{event.date}</span>
                      </div>
                      <div className="flex items-center text-gray-700">
                        <Clock className="w-5 h-5 mr-3 text-primary" />
                        <span className="font-medium">{event.time}</span>
                      </div>
                      <div className="flex items-center text-gray-700 sm:col-span-2">
                        <MapPin className="w-5 h-5 mr-3 text-primary" />
                        <span className="font-medium">{event.location}</span>
                      </div>
                      <div className="flex items-center text-gray-700 sm:col-span-2">
                        <Users className="w-5 h-5 mr-3 text-primary" />
                        <span className="font-medium">{event.attendees}</span>
                      </div>
                    </div>
                    
                    <div className="bg-green-50 p-4 rounded-xl border border-green-200">
                      <div className="flex items-center">
                        <div className="p-2 bg-green-500 rounded-lg mr-3">
                          <CheckCircle className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-green-800 font-semibold">Event Completed Successfully!</p>
                          <p className="text-green-600 text-sm">Thank you to everyone who attended.</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>

        {/* More Events Coming Soon Section */}
        <motion.section 
          id="upcoming-events"
          {...fadeInUp}
          className="py-20 bg-white"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <Badge className="bg-primary/10 text-primary text-lg px-4 py-2 mb-6">
              Stay Tuned
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              More Events Coming Soon
            </h2>
            <p className="text-xl text-gray-600 mb-8">
              The Santiago Team regularly hosts exclusive financial education workshops, 
              team training sessions, and networking events. Follow us for announcements 
              about upcoming opportunities to grow your financial knowledge and connect 
              with like-minded professionals.
            </p>
            <Button 
              size="lg"
              className="bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-2xl"
              onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Phone className="w-5 h-5 mr-2" />
              Get Notified About Future Events
            </Button>
          </div>
        </motion.section>

        {/* Call to Action Section */}
        <motion.section 
          {...fadeInUp}
          className="py-20 bg-primary"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2 
              {...fadeInUp}
              className="text-3xl md:text-4xl font-bold text-white mb-6"
            >
              Ready to Transform Your Financial Future?
            </motion.h2>
            <motion.p 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-xl text-white mb-8"
            >
              Join the Santiago Team community and discover the power of financial education, 
              professional development, and meaningful connections.
            </motion.p>
            <motion.div 
              {...fadeInUp}
              transition={{ delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Button 
                size="lg" 
                className="bg-white text-primary hover:bg-gray-100 px-8 py-3"
                onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}
              >
                Get Started Today
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-white text-white hover:bg-white/10 px-8 py-3"
              >
                <Phone className="w-5 h-5 mr-2" />
                Contact Us
              </Button>
            </motion.div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}