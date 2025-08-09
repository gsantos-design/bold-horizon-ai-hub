import { useLanguage } from "@/lib/LanguageContext";

export default function VideoSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            A Platform as Diverse as<br />
            <span className="text-blue-600">Those We Serve</span>
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed max-w-4xl mx-auto">
            No matter your life story, WFG has the technology and experience to make your financial dreams a reality. Our video showcases our business platform and what makes us unique in an industry that is not known for its diversity.
          </p>
          
          {/* YouTube Video Embed */}
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video mb-4 shadow-xl">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/PvKrpb5XWHQ?autoplay=1&mute=1&loop=1&playlist=PvKrpb5XWHQ&controls=1&modestbranding=1&rel=0"
                title="WFG Business Platform Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}