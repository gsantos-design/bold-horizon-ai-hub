import { useLanguage } from "@/lib/LanguageContext";

export default function VideoSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-slate-50 py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 mb-8">
            {t('video.platform_diverse')}
          </h2>
          <p className="text-xl text-slate-700 mb-12 leading-relaxed max-w-4xl mx-auto">
            {t('video.diversity_description')}
          </p>
          
          {/* Featured Video Embed */}
          <div className="max-w-5xl mx-auto">
            <div className="relative bg-slate-900 rounded-2xl overflow-hidden aspect-video shadow-2xl border border-slate-200">
              <iframe
                className="w-full h-full"
                src="https://www.youtube.com/embed/PvKrpb5XWHQ?controls=1&modestbranding=1&rel=0"
                title="WFG Business Platform Video"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
            <div className="mt-6 text-center">
              <p className="text-slate-600 font-medium">
                Discover how Bold Horizons Financial empowers families nationwide through innovative financial strategies
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}