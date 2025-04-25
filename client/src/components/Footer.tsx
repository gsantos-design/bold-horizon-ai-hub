import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-neutral-800 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-heading font-bold text-xl mb-4">WFG Financial</h3>
            <p className="text-neutral-400">Building futures through financial opportunity and team success since 1991.</p>
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
          <p className="text-neutral-400 mb-4 md:mb-0">© 2025 WFG Financial. All rights reserved.</p>
          <div className="flex space-x-4">
            <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Privacy Policy</a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Terms of Service</a>
            <a href="#" className="text-neutral-400 hover:text-white transition-colors duration-300">Accessibility</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
