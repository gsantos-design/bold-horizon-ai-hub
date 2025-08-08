import Header from "@/components/Header";
import AgentProfile from "@/components/AgentProfile";
import FinancialIndependence from "@/components/FinancialIndependence";
import VideoSection from "@/components/VideoSection";
import Services from "@/components/Services";
import AppointmentForm from "@/components/AppointmentForm";
import BuildingEntrepreneurs from "@/components/BuildingEntrepreneurs";
import FAQ from "@/components/FAQ";
import OfficeInfo from "@/components/OfficeInfo";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <AgentProfile />
      <FinancialIndependence />
      <VideoSection />
      <Services />
      <AppointmentForm />
      <BuildingEntrepreneurs />
      <FAQ />
      <OfficeInfo />
    </div>
  );
}
