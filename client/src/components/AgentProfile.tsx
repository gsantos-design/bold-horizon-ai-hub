import { Phone, Mail, MapPin, Clock, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";

export default function AgentProfile() {
  const { t } = useLanguage();

  return (
    <section className="bg-white py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Agent Name and Title */}
          <div className="text-center mb-8">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-2">
              NOLLY SANTIAGO
            </h1>
            <p className="text-xl text-gray-600 mb-2">Financial Professional</p>
            <p className="text-lg font-semibold text-blue-600 mb-6">Empowering Families Through The New Art of Living</p>
          </div>

          {/* Contact Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {/* Phone */}
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <Phone className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="font-semibold text-gray-900">(407) 777-1087</p>
              </div>
            </div>

            {/* Mobile */}
            <div className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
              <Phone className="h-5 w-5 text-blue-600" />
              <div>
                <p className="text-sm text-gray-600">Mobile</p>
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
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
              onClick={() => window.location.href = 'tel:407-777-1087'}
            >
              Call Now
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
            >
              Schedule an Appointment
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}