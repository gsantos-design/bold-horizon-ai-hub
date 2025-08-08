import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";

export default function AgentProfile() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Leadership Team Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              THE SANTIAGO TEAM
            </h1>
            <p className="text-xl text-gray-600 mb-2">Nolly &amp; Paul Santiago</p>
            <p className="text-lg font-semibold text-blue-600 mb-8">Empowering Families Through The New Art of Living</p>
            
            {/* Leadership Photos */}
            <div className="flex flex-col md:flex-row justify-center items-center gap-8 mb-8">
              {/* Nolly Santiago */}
              <div className="text-center">
                <div className="relative mb-4">
                  <img 
                    src="/nolly-santiago.png" 
                    alt="Nolly Santiago" 
                    className="w-48 h-48 mx-auto rounded-full object-cover shadow-lg border-4 border-purple-200"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-purple-400/20 to-blue-400/20"></div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Nolly Santiago</h2>
                <p className="text-purple-600 font-semibold mb-2">Co-Founder &amp; Financial Strategist</p>
                <p className="text-gray-700 max-w-xs">
                  Specializing in systematic wealth building and multi-handed income strategies
                </p>
              </div>
              
              {/* Paul Santiago */}
              <div className="text-center">
                <div className="relative mb-4">
                  <img 
                    src="/paul-santiago.png" 
                    alt="Paul Santiago" 
                    className="w-48 h-48 mx-auto rounded-full object-cover shadow-lg border-4 border-blue-200"
                  />
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-400/20 to-cyan-400/20"></div>
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Paul Santiago</h2>
                <p className="text-blue-600 font-semibold mb-2">Co-Founder &amp; Business Development Leader</p>
                <p className="text-gray-700 max-w-xs">
                  Focused on building sustainable income systems and personal development
                </p>
              </div>
            </div>
          </div>

          {/* Contact Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Nolly Phone */}
            <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
              <Phone className="h-5 w-5 text-purple-600" />
              <div>
                <p className="text-sm text-purple-600 font-medium">Nolly Santiago</p>
                <p className="font-semibold text-gray-900">(407) 777-1087</p>
              </div>
            </div>

            {/* Paul Phone */}
            <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Phone className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-blue-600 font-medium">Paul Santiago</p>
                <p className="font-semibold text-gray-900">407-777-1087</p>
              </div>
            </div>

            {/* Email */}
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <Mail className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <Button variant="link" className="p-0 h-auto text-blue-600 font-semibold">
                  Email Me
                </Button>
              </div>
            </div>

            {/* Location */}
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg md:col-span-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Location</p>
                <p className="font-semibold text-gray-900">
                  235 N Westmonte Dr, Suite 107<br />
                  Altamonte Springs, FL 32714
                </p>
              </div>
            </div>

            {/* Office Hours */}
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <Clock className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Office Hours</p>
                <Button variant="link" className="p-0 h-auto text-blue-600 font-semibold">
                  Click to See Office Hours
                </Button>
              </div>
            </div>

            {/* Languages */}
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg md:col-span-3">
              <MessageCircle className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Languages</p>
                <p className="font-semibold text-gray-900">Spanish/English</p>
              </div>
            </div>
          </div>

          {/* Call to Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 text-lg"
              onClick={() => window.location.href = 'tel:407-777-1087'}
            >
              Call The Santiago Team
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-purple-600 text-purple-600 hover:bg-purple-50 px-8 py-3 text-lg"
            >
              Schedule Your Consultation
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}