import { MapPin, Clock } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function OfficeInfo() {
  const { t } = useLanguage();

  const hours = [
    { day: t('office.monday'), time: "9:00 AM-6:00 PM" },
    { day: t('office.tuesday'), time: "9:00 AM-6:00 PM" },
    { day: t('office.wednesday'), time: "9:00 AM-6:00 PM" },
    { day: t('office.thursday'), time: "9:00 AM-6:00 PM" },
    { day: t('office.friday'), time: "9:00 AM-6:00 PM" },
    { day: t('office.saturday'), time: "12:00 PM-3:00 PM" },
    { day: t('office.sunday'), time: t('office.closed') }
  ];

  return (
    <section className="bg-gray-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
            {t('office.about_office')}
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-4xl mx-auto">
            {/* Location */}
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <MapPin className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">{t('office.office_location')}</h3>
              </div>
              <div className="space-y-2 text-gray-700">
                <p className="font-semibold">235 N Westmonte Dr</p>
                <p>Suite 107</p>
                <p>Altamonte Springs, FL 32714</p>
              </div>
            </div>

            {/* Office Hours */}
            <div className="bg-white p-8 rounded-lg shadow-lg border border-gray-100">
              <div className="flex items-center mb-6">
                <Clock className="h-6 w-6 text-blue-600 mr-3" />
                <h3 className="text-xl font-bold text-gray-900">{t('office.office_hours')}</h3>
              </div>
              <div className="space-y-3">
                {hours.map((schedule, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <span className="font-medium text-gray-700">{schedule.day}</span>
                    <span className="text-gray-600">{schedule.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}