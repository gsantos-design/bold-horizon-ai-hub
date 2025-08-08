import { Shield, TrendingUp, Briefcase } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Shield,
      title: "Multi-Handed Income Strategies",
      description: "Learn how to create multiple streams of income that work together to build lasting wealth. We'll show you proven strategies to diversify your income sources and reduce financial risk while maximizing your earning potential through our comprehensive system."
    },
    {
      icon: TrendingUp,
      title: "Financial Education & Planning", 
      description: "Master the financial knowledge that schools don't teach. From understanding how money really works to building generational wealth strategies, we provide the education that empowers you to make informed decisions about your family's financial future."
    },
    {
      icon: Briefcase,
      title: "Personal Development & Business Building",
      description: "Transform yourself while building a business that serves others. Our system focuses on personal growth, leadership development, and building the skills needed to succeed in both life and business while making a positive impact on families in your community."
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4">
            The New Art of Living Philosophy
          </h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            Empowering families through our three core philosophies that create lasting transformation
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