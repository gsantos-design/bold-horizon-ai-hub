import Header from "@/components/Header";
import Footer from "@/components/Footer";
import SpanishRegistrationForm from "@/components/SpanishRegistrationForm";
import { useLanguage } from "@/lib/LanguageContext";
import { useEffect } from "react";

export default function SpanishRegistration() {
  const { setLanguage } = useLanguage();
  
  // Automatically set language to Spanish when accessing this page
  useEffect(() => {
    setLanguage('es');
  }, [setLanguage]);

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50">
      <Header />
      <main className="flex-1">
        <SpanishRegistrationForm />
      </main>
      <Footer />
    </div>
  );
}