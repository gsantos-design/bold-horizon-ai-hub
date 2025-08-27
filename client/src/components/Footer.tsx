import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";
import { useLanguage } from "@/lib/LanguageContext";

export default function Footer() {
  const { t } = useLanguage();
  
  return (
    <footer className="bg-primary text-secondary py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-heading font-bold text-xl mb-4">{t('footer.santiago_team')}</h3>
            <p className="text-secondary/80 mb-2">{t('footer.independent_associates')}</p>
            <p className="text-secondary/80 text-sm">{t('footer.empowering_families')}</p>
            <p className="text-secondary/60 text-xs mt-2">
              {t('footer.disclaimer')}
            </p>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">{t('footer.quick_links')}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-secondary/80 hover:text-secondary transition-colors duration-300">{t('footer.about_wfg')}</a></li>
              <li><a href="#" className="text-secondary/80 hover:text-secondary transition-colors duration-300">{t('footer.careers')}</a></li>
              <li><a href="#" className="text-secondary/80 hover:text-secondary transition-colors duration-300">{t('footer.products')}</a></li>
              <li><a href="#" className="text-secondary/80 hover:text-secondary transition-colors duration-300">{t('footer.leadership')}</a></li>
              <li><a href="#" className="text-secondary/80 hover:text-secondary transition-colors duration-300">{t('footer.success_stories')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">{t('footer.resources')}</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-secondary/80 hover:text-secondary transition-colors duration-300">{t('footer.agent_portal')}</a></li>
              <li><a href="#" className="text-secondary/80 hover:text-secondary transition-colors duration-300">{t('footer.training_calendar')}</a></li>
              <li><a href="#" className="text-secondary/80 hover:text-secondary transition-colors duration-300">{t('footer.compliance')}</a></li>
              <li><a href="#" className="text-secondary/80 hover:text-secondary transition-colors duration-300">{t('footer.marketing_materials')}</a></li>
              <li><a href="#" className="text-secondary/80 hover:text-secondary transition-colors duration-300">{t('footer.support_center')}</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">{t('footer.stay_updated')}</h4>
            <p className="text-secondary/80 mb-4">{t('footer.subscribe_newsletter')}</p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder={t('form.email_address')} 
                className="p-2 flex-grow text-primary focus:outline-none rounded-l-md rounded-r-none"
              />
              <Button className="bg-secondary hover:bg-secondary/90 text-primary p-2 rounded-l-none rounded-r-md transition-colors duration-300">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-secondary/30 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-secondary/80 mb-4 md:mb-0 text-sm">
            <p>{t('footer.copyright')}</p>
            <p className="text-xs mt-1">{t('footer.trademark')}</p>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 text-sm">
            <a href="#" className="text-secondary/80 hover:text-secondary transition-colors duration-300">{t('footer.privacy_policy')}</a>
            <a href="#" className="text-secondary/80 hover:text-secondary transition-colors duration-300">{t('footer.terms_service')}</a>
            <a href="https://www.worldfinancialgroup.com/compliance" className="text-secondary/80 hover:text-secondary transition-colors duration-300">{t('footer.compliance')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
