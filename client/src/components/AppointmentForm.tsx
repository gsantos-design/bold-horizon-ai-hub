import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function AppointmentForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Appointment form submitted:', formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Schedule a Complimentary, No-Obligation Appointment with Nolly
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Form */}
            <div className="bg-gray-50 p-8 rounded-lg">
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName2" className="text-sm font-medium text-gray-700">
                      First Name*
                    </Label>
                    <Input
                      id="firstName2"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName2" className="text-sm font-medium text-gray-700">
                      Last Name*
                    </Label>
                    <Input
                      id="lastName2"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email2" className="text-sm font-medium text-gray-700">
                    Email Address*
                  </Label>
                  <Input
                    id="email2"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="mobile2" className="text-sm font-medium text-gray-700">
                    Mobile
                  </Label>
                  <Input
                    id="mobile2"
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 text-lg"
                >
                  Schedule Appointment
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  <a href="https://www.worldfinancialgroup.com/legal/privacy-policy" className="text-blue-600 hover:underline">
                    Online Privacy Statement
                  </a>
                </p>
              </form>
            </div>

            {/* Image */}
            <div className="space-y-8">
              <img 
                src="https://cdn.bfldr.com/801X31N1/at/x82fx46k3q5mhr8njqpxtgh/Calendar_1900x1900.jpg?auto=webp&format=jpg&width=1900&height=1900" 
                alt="Schedule Appointment" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}