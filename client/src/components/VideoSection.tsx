import { useLanguage } from "@/lib/LanguageContext";

export default function VideoSection() {
  const { t } = useLanguage();

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            A Platform as Diverse as<br />
            <span className="text-blue-600">Those We Serve</span>
          </h2>
          <p className="text-lg text-gray-700 mb-8 leading-relaxed">
            No matter your life story, WFG has the technology and experience to make your financial dreams a reality. Watch the video below to learn more about our business platform and what makes us unique in an industry that is not known for its diversity.
          </p>
          
          {/* Video Placeholder */}
          <div className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-center">
                <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center mb-4 mx-auto">
                  <svg className="w-8 h-8" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.841A1.5 1.5 0 004 4.11V15.89a1.5 1.5 0 002.3 1.269l9.344-5.89a1.5 1.5 0 000-2.538L6.3 2.84z"/>
                  </svg>
                </div>
                <p className="text-sm">Click for sound</p>
                <p className="text-sm font-bold">3:01</p>
              </div>
            </div>
            <img 
              src="https://embed-ssl.wistia.com/deliveries/92ea60af2260ad7f93a015783c8efbeb7d29d677.webp?image_crop_resized=1920x1080" 
              alt="Video Thumbnail" 
              className="w-full h-full object-cover opacity-80"
            />
          </div>
        </div>
      </div>
    </section>
  );
}