import Header from "@/components/Header";
import Hero from "@/components/Hero";
import CompensationStructure from "@/components/CompensationStructure";
import CommissionCalculator from "@/components/CommissionCalculator";
import PromotionGuidelines from "@/components/PromotionGuidelines";
import TeamBuilding from "@/components/TeamBuilding";
import AdditionalBonuses from "@/components/AdditionalBonuses";
import Resources from "@/components/Resources";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-neutral-100">
      <Header />
      <Hero />
      <main className="container mx-auto px-4 py-12">
        <CompensationStructure />
        <CommissionCalculator />
        <PromotionGuidelines />
        <TeamBuilding />
        <AdditionalBonuses />
        <Resources />
        <ContactForm />
      </main>
      <Footer />
    </div>
  );
}
