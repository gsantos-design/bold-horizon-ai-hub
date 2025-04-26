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
import GrowthMindset from "@/components/GrowthMindset";
import AboutUs from "@/components/AboutUs";
import CareerQuiz from "@/components/CareerQuiz";
import RecruitmentJourney from "@/components/RecruitmentJourney";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent">
      {/* Main content with semi-transparent backgrounds to let cosmic effects show through */}
      <Header />
      <Hero />
      <AboutUs />
      <main className="container mx-auto px-4 py-12 relative z-10">
        {/* Main content sections with theme-consistent styling */}
        <div className="space-y-16 backdrop-blur-sm">
          <CompensationStructure />
          <CommissionCalculator />
          <PromotionGuidelines />
          <TeamBuilding />
          <GrowthMindset />
          <AdditionalBonuses />
          <RecruitmentJourney />
          <CareerQuiz />
          <Resources />
          <ContactForm />
        </div>
      </main>
      <Footer />
    </div>
  );
}
