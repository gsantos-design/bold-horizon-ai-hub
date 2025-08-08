import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";

export default function FinancialIndependence() {
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
    console.log('Form submitted:', formData);
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                The New Art of Living:<br />
                <span className="text-blue-600">Empowering Families</span>
              </h2>
              
              {/* Core Philosophy */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-bold text-blue-600 mb-2">Multi-Handed Income</h3>
                  <p className="text-sm text-gray-600">Create multiple streams of income to build lasting wealth</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-bold text-blue-600 mb-2">Financial Education</h3>
                  <p className="text-sm text-gray-600">Learn the strategies that truly build generational wealth</p>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <h3 className="font-bold text-blue-600 mb-2">Self Improvement</h3>
                  <p className="text-sm text-gray-600">Develop the mindset and skills for lasting success</p>
                </div>
              </div>
              
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Our approach goes beyond traditional financial planning. We empower families through comprehensive financial education, multiple income strategies, and personal development that creates lasting transformation.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Join the Santiago team and discover how the New Art of Living can transform your family's financial future through our proven system of building wealth, gaining knowledge, and developing yourself into the person you were meant to be.
              </p>
            </div>

            {/* Money Matters Download Form */}
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="mb-6">
                <img 
                  src="https://assets.worldfinancialgroup.com/assets/Brochures/WFG%20US/Brochures11.png" 
                  alt="Money Matters Brochure" 
                  className="w-32 h-40 object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-900 mb-2">Download Money Matters</h3>
                <p className="text-gray-600 text-sm">
                  An introduction to WFGIA and the key concepts that can help you build a solid financial foundation. Learn how WFG can help you and anticipate and overcome the challenges in saving for your future.
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                      First Name*
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      Last Name*
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="mt-1"
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    Email Address*
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-1"
                  />
                </div>
                
                <div>
                  <Label htmlFor="mobile" className="text-sm font-medium text-gray-700">
                    Mobile
                  </Label>
                  <Input
                    id="mobile"
                    type="tel"
                    value={formData.mobile}
                    onChange={(e) => handleInputChange('mobile', e.target.value)}
                    className="mt-1"
                  />
                </div>

                <Button 
                  type="submit" 
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3"
                >
                  Download Now
                </Button>
                
                <p className="text-xs text-gray-500 text-center">
                  <a href="https://www.worldfinancialgroup.com/legal/privacy-policy" className="text-blue-600 hover:underline">
                    Online Privacy Statement
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}