import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-heading font-bold text-xl mb-4">The Santiago Team</h3>
            <p className="text-neutral-400 mb-2">Independent WFG Associates</p>
            <p className="text-neutral-400 text-sm">Empowering families through financial education and opportunity.</p>
            <p className="text-neutral-400 text-xs mt-2">Licensed agents affiliated with World Financial Group Insurance Agency, LLC</p>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">About WFG</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Careers</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Products</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Leadership</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Success Stories</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Resources</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Agent Portal</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Training Calendar</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Compliance</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Marketing Materials</a></li>
              <li><a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Support Center</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-heading font-semibold text-lg mb-4">Stay Updated</h4>
            <p className="text-neutral-400 mb-4">Subscribe to our newsletter for the latest updates and opportunities.</p>
            <div className="flex">
              <Input 
                type="email" 
                placeholder="Your email address" 
                className="p-2 flex-grow text-neutral-800 focus:outline-none rounded-l-md rounded-r-none"
              />
              <Button className="bg-accent hover:bg-accent-dark text-white p-2 rounded-l-none rounded-r-md transition-colors duration-300">
                <Send className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-neutral-700 pt-8 flex flex-col md:flex-row justify-between items-center">
          <div className="text-neutral-400 mb-4 md:mb-0 text-sm">
            <p>© 2024-2025 Transamerica Corporation. All rights reserved.</p>
            <p className="text-xs mt-1">World Financial Group and the WFG logo are registered trademarks of Transamerica Corporation.</p>
          </div>
          <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4 text-sm">
            <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Terms of Service</a>
            <a href="https://www.worldfinancialgroup.com/compliance" className="text-neutral-400 hover:text-white transition-colors duration-300">Compliance</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
