import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, MapPin, Users, Wine, Gift, CheckCircle, Phone, ExternalLink } from 'lucide-react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

// Import the event flyer image - using the latest correct image provided by user
// Note: Converting .jpeg to .png due to build system limitations with capitalized extensions
import wealthWorkshopFlyer from '@assets/IMG_0412_1754924705272.jpeg';

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

  const upcomingEvents = [
    {
      id: 'team-training',
      title: 'Advanced Team Training Seminar',
      date: 'September 15th, 2025',
      time: '10:00 AM - 4:00 PM',
      location: 'Orlando Convention Center',
      type: 'Professional Development',
      status: 'Registration Open',
      description: 'Comprehensive training for Santiago Team members on advanced financial strategies and client relationship management.',
      capacity: '50 attendees'
    },
    {
      id: 'client-appreciation',
      title: 'Client Appreciation Gala',
      date: 'October 12th, 2025',
      time: '6:00 PM - 10:00 PM',
      location: 'The Ritz-Carlton Orlando',
      type: 'Networking Event',
      status: 'Save the Date',
      description: 'Annual celebration honoring our valued clients and their financial achievements with the Santiago Team.',
      capacity: 'Invitation Only'
    },
    {
      id: 'financial-literacy',
      title: 'Financial Literacy for Young Professionals',
      date: 'November 8th, 2025',
      time: '7:00 PM - 9:00 PM',
      location: 'Virtual Event',
      type: 'Educational Webinar',
      status: 'Coming Soon',
      description: 'Interactive webinar focused on building wealth and financial independence for professionals under 35.',
      capacity: 'Unlimited'
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50">
      <Header />
      
      <main className="pt-20 pb-16">
        {/* Hero Section */}
        <motion.section 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="py-16 bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h1 
              {...fadeInUp}
              className="text-4xl md:text-6xl font-bold text-white mb-6"
            >
              WFG Events & Workshops
            </motion.h1>
            <motion.p 
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="text-xl text-purple-100 max-w-3xl mx-auto mb-8"
            >
              Join the Santiago Team for exclusive financial education events, networking opportunities, 
              and professional development workshops designed to accelerate your wealth-building journey.
            </motion.p>
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.4 }}
            >
              <Button 
                size="lg" 
                className="bg-white text-purple-600 hover:bg-purple-50 text-lg px-8 py-4"
                onClick={() => setSelectedEvent('i-wealth-workshop')}
              >
                View Featured Event
              </Button>
            </motion.div>
          </div>
        </motion.section>

        {/* Featured Event - I WEALTH Workshop */}
        <motion.section 
          {...fadeInUp}
          className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8"
        >
          <div className="text-center mb-12">
            <Badge className="bg-purple-100 text-purple-800 text-lg px-4 py-2 mb-4">
              {featuredEvent.status}
            </Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {featuredEvent.title}
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              {featuredEvent.subtitle}
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Event Image */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.2 }}
              className="relative"
            >
              <img 
                src={featuredEvent.image} 
                alt="I WEALTH Workshop Flyer"
                className="w-full rounded-2xl shadow-2xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-2xl" />
            </motion.div>

            {/* Event Details */}
            <motion.div
              {...fadeInUp}
              transition={{ delay: 0.4 }}
              className="space-y-6"
            >
              <Card className="border-none shadow-lg">
                <CardHeader className="bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-t-lg">
                  <CardTitle className="text-2xl">Event Details</CardTitle>
                </CardHeader>
                <CardContent className="p-6 space-y-4">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-5 w-5 text-purple-600" />
                    <span className="text-lg font-semibold">{featuredEvent.date}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="h-5 w-5 text-purple-600" />
                    <span>{featuredEvent.time}</span>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-purple-600 mt-1" />
                    <span>{featuredEvent.location}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-purple-600" />
                    <span>{featuredEvent.type}</span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg">
                <CardHeader>
                  <CardTitle className="text-xl flex items-center gap-2">
                    <Wine className="h-5 w-5 text-purple-600" />
                    What to Expect
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {featuredEvent.highlights.map((highlight, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500 mt-0.5" />
                      <span>{highlight}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="border-none shadow-lg bg-gradient-to-r from-purple-50 to-pink-50">
                <CardContent className="p-6 text-center">
                  <div className="flex items-center justify-center gap-2 mb-4">
                    <Phone className="h-5 w-5 text-purple-600" />
                    <span className="text-lg font-semibold">{featuredEvent.rsvp}</span>
                  </div>
                  <p className="text-purple-700 font-medium mb-4">
                    {featuredEvent.additionalInfo}
                  </p>
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    <Phone className="h-4 w-4 mr-2" />
                    RSVP Now
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </motion.section>

        {/* Upcoming Events */}
        <motion.section 
          {...fadeInUp}
          className="py-16 bg-gray-50"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Upcoming Events
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                Stay connected with the Santiago Team through our regular educational workshops, 
                networking events, and professional development opportunities.
              </p>
            </div>

            <motion.div 
              variants={staggerChildren}
              initial="initial"
              animate="animate"
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {upcomingEvents.map((event, index) => (
                <motion.div
                  key={event.id}
                  variants={fadeInUp}
                  whileHover={{ y: -5 }}
                  className="group"
                >
                  <Card className="h-full border-none shadow-lg hover:shadow-xl transition-all duration-300">
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <Badge 
                          variant={event.status === 'Registration Open' ? 'default' : 'secondary'}
                          className="text-xs"
                        >
                          {event.status}
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          {event.type}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl group-hover:text-purple-600 transition-colors">
                        {event.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <CardDescription className="text-gray-600">
                        {event.description}
                      </CardDescription>
                      
                      <div className="space-y-2">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-purple-600" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-purple-600" />
                          <span>{event.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <MapPin className="h-4 w-4 text-purple-600" />
                          <span>{event.location}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Users className="h-4 w-4 text-purple-600" />
                          <span>{event.capacity}</span>
                        </div>
                      </div>

                      <Button 
                        variant="outline" 
                        className="w-full group-hover:bg-purple-600 group-hover:text-white transition-colors"
                        disabled={event.status === 'Save the Date' || event.status === 'Coming Soon'}
                      >
                        {event.status === 'Registration Open' ? 'Register Now' : 
                         event.status === 'Save the Date' ? 'Save the Date' : 
                         'Coming Soon'}
                        <ExternalLink className="h-4 w-4 ml-2" />
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        {/* Call to Action */}
        <motion.section 
          {...fadeInUp}
          className="py-16 bg-gradient-to-r from-purple-600 via-purple-700 to-pink-600"
        >
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
              Ready to Transform Your Financial Future?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Join the Santiago Team at our next event and discover proven strategies 
              for building lasting wealth and financial independence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg"
                className="bg-white text-purple-600 hover:bg-purple-50 text-lg px-8 py-4"
              >
                <Phone className="h-5 w-5 mr-2" />
                Contact Us Today
              </Button>
              <Button 
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 text-lg px-8 py-4"
              >
                View All Events
              </Button>
            </div>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}