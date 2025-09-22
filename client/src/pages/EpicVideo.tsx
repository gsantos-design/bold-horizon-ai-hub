import { useState } from "react";
import { ArrowLeft, Video, Crown } from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/Header";
import { SafeLink } from "@/components/SafeLink";
import EpicVideoGenerator from "@/components/EpicVideoGenerator";
import { useLanguage } from "@/lib/LanguageContext";

export default function EpicVideo() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <div className="mb-6">
          <SafeLink href="/ai-automation">
            <Button variant="outline" className="gap-2">
              <ArrowLeft className="h-4 w-4" />
              {t('common.back_to_ai_automation')}
            </Button>
          </SafeLink>
        </div>

        {/* Page Header */}
        <div className="text-center mb-8">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Video className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold text-primary">Epic Video Generator</h1>
            <Crown className="h-8 w-8 text-primary" />
          </div>
          <p className="text-lg text-gray-600 max-w-3xl mx-auto">
            Create epic entrance videos for your billion-dollar WFG presentation. Upload your own Veo-generated videos or create new ones with authentic Spanish community themes and triumphant music.
          </p>
        </div>

        {/* Epic Video Generator Component */}
        <EpicVideoGenerator />
      </div>
    </div>
  );
}