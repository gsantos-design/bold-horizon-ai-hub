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
                Building<br />
                <span className="text-blue-600">Entrepreneurs</span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Our innovative business model enables entrepreneurs to succeed together through a turnkey system and a commission structure that encourages mentorship and teamwork. Join WFG today and be part of the thousands of independent professionals across the United States helping individuals and families protect what matters most to them.
              </p>
              
              <Button 
                size="lg" 
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 text-lg"
                onClick={() => window.open('https://registration.wfglaunch.com/?recruitercode=C8V5D', '_blank')}
              >
                Join WFG
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}