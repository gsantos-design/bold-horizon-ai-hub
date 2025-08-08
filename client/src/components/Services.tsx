import { Shield, TrendingUp, Briefcase } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Services() {
  const { t } = useLanguage();

  const services = [
    {
      icon: Shield,
      title: "Insurance Protection",
      description: "The most important part of preparing for the future is protecting it. As a WFGIA insurance agent, I can help you prepare for uncertainty. Whether you outlive your retirement, pass away unexpectedly or become disabled, there are products that can help protect the life you've built for you and your loved ones."
    },
    {
      icon: TrendingUp,
      title: "Retirement Strategies", 
      description: "The key to a successful retirement is one that doesn't require you to compromise your lifestyle or wonder if and when your nest egg will run out. As a WFGIA Insurance Agent, I can provide a variety of options to help you prepare for your leisure years without having to sacrifice your quality of life."
    },
    {
      icon: Briefcase,
      title: "Business Strategies",
      description: "Small business owners need financial and insurance options for themselves and their employees, and they need to ensure the future safety of their businesses. I can help structure strategies for employees and owners to help ensure if- or when- something happens, those who own and run the business are protected."
    }
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            Services Offered by Nolly
          </h2>
          
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