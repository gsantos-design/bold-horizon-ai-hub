import { Info } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function ComplianceDisclaimer() {
  return (
    <Alert className="bg-primary/5 border-primary/20 mb-6">
      <Info className="h-4 w-4 text-primary" />
      <AlertDescription className="text-primary text-sm">
        <strong>Professional Disclaimer:</strong> The Santiago Team consists of independent contractors affiliated with WFGIA. This website provides educational information about financial concepts and WFG opportunities. All content is for informational purposes only and does not constitute financial advice. Individual results may vary and are not guaranteed. Please consult with one of our licensed professionals for specific financial guidance.
      </AlertDescription>
    </Alert>
  );
}