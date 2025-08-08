import { Shield, TrendingUp, Briefcase } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Shield,
      title: "Multi-Handed Income Education",
      description: "Learn about creating multiple streams of income through financial education and opportunity. Our educational approach helps you understand strategies to diversify income sources and build lasting financial security through comprehensive learning programs."
    },
    {
      icon: TrendingUp,
      title: "Financial Education & Literacy", 
      description: "Access financial education that covers fundamental money concepts and wealth-building strategies. We provide educational resources that help you understand financial principles and make informed decisions about your family's financial future."
    },
    {
      icon: Briefcase,
      title: "Personal Development & Leadership",
      description: "Focus on personal growth and leadership development through our educational system. Learn the skills needed to succeed in life and business while developing the ability to help others in your community through financial education opportunities."
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            Financial Education Philosophy
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Empowering families through financial education and opportunity awareness
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div 
                  key={index}
                  className="bg-gray-50 p-8 rounded-lg text-center hover:shadow-lg transition-shadow"
                >
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-6">
                    <IconComponent className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}