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
          
          {/* Live Video */}
          <div className="max-w-4xl mx-auto">
            <div className="relative bg-gray-800 rounded-lg overflow-hidden aspect-video mb-4 shadow-xl">
              <video 
                className="w-full h-full object-cover"
                autoPlay
                muted
                loop
                playsInline
                poster="https://embed-ssl.wistia.com/deliveries/92ea60af2260ad7f93a015783c8efbeb7d29d677.webp?image_crop_resized=1920x1080"
              >
                <source src="https://embed-ssl.wistia.com/deliveries/92ea60af2260ad7f93a015783c8efbeb7d29d677.bin" type="video/mp4" />
                <source src="https://embed-ssl.wistia.com/deliveries/92ea60af2260ad7f93a015783c8efbeb7d29d677.webm" type="video/webm" />
                Your browser does not support the video tag.
              </video>
              {/* Video Controls Overlay */}
              <div className="absolute top-4 right-4 flex space-x-2">
                <button 
                  className="w-10 h-10 bg-black bg-opacity-50 rounded-full flex items-center justify-center text-white hover:bg-opacity-70 transition-opacity"
                  onClick={(e) => {
                    const video = e.currentTarget.parentNode?.parentNode?.querySelector('video');
                    if (video) {
                      video.muted = !video.muted;
                      e.currentTarget.innerHTML = video.muted ? 
                        '<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.617 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.617l3.766-2.816a1 1 0 011.617.816zM14 5a1 1 0 011.414 0A9.05 9.05 0 0119.5 10a9.05 9.05 0 01-4.086 5A1 1 0 1114 13.585a7.05 7.05 0 000-7.17A1 1 0 0114 5z"/></svg>' :
                        '<svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.617 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.617l3.766-2.816a1 1 0 011.617.816zM12.828 11.828a4 4 0 000-5.656l1.414-1.414a6 6 0 010 8.484l-1.414-1.414z" clipRule="evenodd"/></svg>';
                    }
                  }}
                  title="Toggle Sound"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.816L4.617 14H2a1 1 0 01-1-1V7a1 1 0 011-1h2.617l3.766-2.816a1 1 0 011.617.816zM15.657 6.343a1 1 0 00-1.414 1.414l1.414 1.414-1.414 1.414a1 1 0 001.414 1.414l1.414-1.414 1.414 1.414a1 1 0 001.414-1.414l-1.414-1.414 1.414-1.414a1 1 0 00-1.414-1.414l-1.414 1.414-1.414-1.414z" clipRule="evenodd"/>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}