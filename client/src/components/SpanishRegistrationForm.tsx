import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useState } from "react";
import { useLanguage } from "@/lib/LanguageContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function SpanishRegistrationForm() {
  const { t } = useLanguage();
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    city: '',
    state: '',
    phone: '',
    whoInvited: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to actual Zoom registration with pre-filled data if possible
    window.open(t('meeting.spanish_zoom_link'), '_blank');
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const states = [
    'Florida', 'New York', 'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California',
    'Colorado', 'Connecticut', 'Delaware', 'Georgia', 'Hawaii', 'Idaho', 'Illinois',
    'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland',
    'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi', 'Missouri', 'Montana',
    'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey', 'New Mexico', 'North Carolina',
    'North Dakota', 'Ohio', 'Oklahoma', 'Oregon', 'Pennsylvania', 'Rhode Island',
    'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah', 'Vermont',
    'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming'
  ];

  return (
    <section className="bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">
          {/* Meeting Logo and Title */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl mb-8">
            <CardHeader className="text-center pb-6">
              <div className="w-32 h-32 mx-auto mb-6 bg-secondary/10 rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-2 bg-primary rounded-full flex items-center justify-center">
                    <svg className="h-8 w-8 text-white" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2L3 7l9 5 9-5-9-5zM3 17l9 5 9-5M3 12l9 5 9-5"/>
                    </svg>
                  </div>
                  <h1 className="text-lg font-bold text-gray-800">
                    {t('registration.meeting_title')}
                  </h1>
                </div>
              </div>
              <div className="bg-primary/5 p-4 rounded-lg border border-primary/20">
                <h2 className="text-xl font-bold text-gray-900 mb-2">
                  {t('meeting.spanish_title')}
                </h2>
                <p className="text-gray-700 mb-2">
                  {t('meeting.spanish_description')}
                </p>
                <div className="flex items-center justify-center text-blue-700 font-semibold">
                  <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  {t('meeting.schedule')}
                </div>
              </div>
            </CardHeader>
          </Card>

          {/* Registration Form */}
          <Card className="bg-white/95 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                {t('registration.meeting_registration')}
              </h3>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Fields */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                      {t('registration.first_name_required')}
                    </Label>
                    <Input
                      id="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      className="mt-1"
                      placeholder={t('form.first_name')}
                    />
                  </div>
                  <div>
                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                      {t('registration.last_name_required')}
                    </Label>
                    <Input
                      id="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      className="mt-1"
                      placeholder={t('form.last_name')}
                    />
                  </div>
                </div>

                {/* Email */}
                <div>
                  <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                    {t('registration.email_required')}
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => handleInputChange('email', e.target.value)}
                    className="mt-1"
                    placeholder={t('registration.email_placeholder')}
                  />
                </div>

                {/* City */}
                <div>
                  <Label htmlFor="city" className="text-sm font-medium text-gray-700">
                    {t('registration.city')}
                  </Label>
                  <Input
                    id="city"
                    type="text"
                    value={formData.city}
                    onChange={(e) => handleInputChange('city', e.target.value)}
                    className="mt-1"
                    placeholder={t('registration.city')}
                  />
                </div>

                {/* State/Province */}
                <div>
                  <Label htmlFor="state" className="text-sm font-medium text-gray-700">
                    {t('registration.state_province')}
                  </Label>
                  <Select value={formData.state} onValueChange={(value) => handleInputChange('state', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={t('registration.select_state')} />
                    </SelectTrigger>
                    <SelectContent>
                      {states.map((state) => (
                        <SelectItem key={state} value={state}>
                          {state}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Phone */}
                <div>
                  <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                    {t('registration.phone_required')}
                  </Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.phone}
                    onChange={(e) => handleInputChange('phone', e.target.value)}
                    className="mt-1"
                    placeholder={t('registration.phone_placeholder')}
                  />
                </div>

                {/* Who Invited You */}
                <div>
                  <Label htmlFor="whoInvited" className="text-sm font-medium text-gray-700">
                    {t('registration.who_invited')}
                  </Label>
                  <Input
                    id="whoInvited"
                    type="text"
                    required
                    value={formData.whoInvited}
                    onChange={(e) => handleInputChange('whoInvited', e.target.value)}
                    className="mt-1"
                    placeholder={t('registration.who_invited_placeholder')}
                  />
                </div>

                {/* Privacy Notice */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <p className="text-xs text-gray-600">
                    {t('registration.privacy_notice')}
                  </p>
                </div>

                {/* Submit Button */}
                <Button 
                  type="submit" 
                  className="w-full bg-primary hover:bg-primary/90 text-white py-3 text-lg font-semibold"
                >
                  {t('registration.register_button')}
                </Button>
              </form>

              {/* Direct Link Option */}
              <div className="mt-6 text-center">
                <p className="text-gray-600 mb-2">{t('registration.or_register_directly')}</p>
                <a 
                  href={t('meeting.spanish_zoom_link')}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:text-blue-800 underline"
                >
                  {t('registration.zoom_direct_link')}
                </a>
              </div>
            </CardContent>
          </Card>

          {/* Meeting Info Footer */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              {t('meeting.eastern_time')} | {t('meeting.presented_by')}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}