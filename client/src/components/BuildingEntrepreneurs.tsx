import { Button } from "@/components/ui/button";
import { useLanguage } from "@/lib/LanguageContext";

export default function BuildingEntrepreneurs() {
  const { t } = useLanguage();

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div>
              <img 
                src="https://cdn.bfldr.com/801X31N1/at/fc9p3rv7f8q7wzrn8mk4ns6j/Meeting_1.jpg?auto=webp&format=jpg&width=1900&height=1900" 
                alt="Building Entrepreneurs" 
                className="w-full rounded-lg shadow-lg"
              />
            </div>

            {/* Content */}
            <div>
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Master The New Art of Living<br />
                <span className="text-blue-600">Join the Santiago Team</span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Ready to transform your life and help others do the same? Our proven system combines multi-handed income strategies, comprehensive financial education, and personal development to create extraordinary results.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Join the Santiago team and become part of a community dedicated to empowering families across Florida and New York. Learn the new art of living while building a business that makes a real difference.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  size="lg" 
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                  onClick={() => window.open('https://registration.wfglaunch.com/?recruitercode=C8V5D', '_blank')}
                >
                  Start Your Journey
                </Button>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 text-lg"
                  onClick={() => window.location.href = 'tel:407-777-1087'}
                >
                  Call Pablo & Nolly
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}