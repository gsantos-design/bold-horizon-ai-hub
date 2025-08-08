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
                Financial Independence<br />
                <span className="text-blue-600">For Everyone</span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                World Financial Group offers a leading financial services platform and experience to help pursue your specific life insurance goals. No matter your life story, our tailored approach to planning for retirement will meet you where you are and address your specific goals.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                And for entrepreneurial-minded individuals looking to grow wealth on their terms, our turnkey system and experienced leadership can help you build your own business through supporting the needs of others. We help make the dream of financial independence and financial resilience possible for all those in our communities across North America.
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