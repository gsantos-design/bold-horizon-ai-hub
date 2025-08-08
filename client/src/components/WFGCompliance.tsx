import { AlertTriangle, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function WFGCompliance() {
  return (
    <div className="bg-gray-50 border-t border-gray-200 py-8">
      <div className="container mx-auto px-4">
        <Card className="bg-white border border-gray-300">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3 mb-4">
              <Shield className="h-5 w-5 text-blue-600 mt-1 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-gray-900 mb-2">Important Disclosure</h3>
                <div className="text-sm text-gray-700 space-y-2">
                  <p>
                    <strong>World Financial Group Insurance Agency, LLC</strong> (In California, doing business as World Financial Insurance Agency, LLC), 
                    World Financial Group Insurance Agency of Hawaii, Inc., World Financial Group Insurance Agency of Massachusetts, Inc., 
                    and/or WFG Insurance Agency of Puerto Rico, Inc. (collective WFGIA), offer insurance products.
                  </p>
                  <p>
                    <strong>WFGIA Headquarters:</strong> 6400 C Street SW, Cedar Rapids, IA 52499. Phone: 770.453.9300
                  </p>
                  <p>
                    World Financial Group and the WFG logo are registered trademarks of Transamerica Corporation.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="flex items-start space-x-3 border-t border-gray-200 pt-4">
              <AlertTriangle className="h-5 w-5 text-amber-600 mt-1 flex-shrink-0" />
              <div className="text-sm text-gray-700">
                <h4 className="font-semibold text-gray-900 mb-2">Professional Disclaimer</h4>
                <p>
                  The Santiago Team consists of independent contractors affiliated with WFGIA. 
                  This website provides educational information about financial concepts and WFG opportunities. 
                  All content is for informational purposes only and does not constitute financial advice. 
                  Individual results may vary and are not guaranteed. Please consult with a licensed professional 
                  for specific financial guidance.
                </p>
              </div>
            </div>
            
            <div className="text-xs text-gray-500 mt-4 text-center">
              ©2024-2025 Transamerica Corporation. All rights reserved. WFGUS10044R1/1.24
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}