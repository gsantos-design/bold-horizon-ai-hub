import Header from "@/components/Header";
import AgentProfile from "@/components/AgentProfile";
import FinancialIndependence from "@/components/FinancialIndependence";
import VideoSection from "@/components/VideoSection";
import Services from "@/components/Services";
import AppointmentForm from "@/components/AppointmentForm";
import BuildingEntrepreneurs from "@/components/BuildingEntrepreneurs";
import FAQ from "@/components/FAQ";
import OfficeInfo from "@/components/OfficeInfo";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, ArrowRight } from "lucide-react";
import { Link } from "wouter";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      
      {/* Empower360 Featured Section */}
      <section className="bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 py-12">
        <div className="container mx-auto px-4">
          <Card className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm border-0 shadow-2xl">
            <CardContent className="p-8 text-center">
              <Badge className="mb-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white px-4 py-2">
                🌟 New Feature: Our Philosophy
              </Badge>
              <h2 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-4">
                Experience Empower360
              </h2>
              <p className="text-lg text-gray-700 mb-6 max-w-2xl mx-auto">
                Master the <strong>New Art of Living</strong> through our transformative philosophy: 
                Multi-Handed Income, Financial Education, and Self-Improvement
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/empower360">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white">
                    <Star className="h-5 w-5 mr-2" />
                    Explore Empower360
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </Link>
                <Button 
                  size="lg" 
                  variant="outline"
                  className="border-purple-600 text-purple-600 hover:bg-purple-50"
                  onClick={() => window.location.href = 'tel:407-777-1087'}
                >
                  Speak with Nolly
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
      
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
