import { Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ComplianceDisclaimer() {
  return (
    <Alert className="bg-blue-50 border-blue-200 mb-6">
      <Info className="h-4 w-4 text-blue-600" />
      <AlertDescription className="text-blue-800 text-sm">
        <strong>Educational Information Only:</strong> This website provides educational information about financial concepts and career opportunities with World Financial Group. Content is for informational purposes only and does not constitute financial advice. Individual results may vary and are not guaranteed. Please consult with a licensed professional for specific financial guidance. 
        The Santiago Team consists of independent contractors affiliated with World Financial Group Insurance Agency, LLC.
      </AlertDescription>
    </Alert>
  );
}