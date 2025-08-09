import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import LeadEngine from "@/pages/LeadEngine";
import LeadBoard from "@/pages/LeadBoard";
import Leaderboard from "@/pages/Leaderboard";
import AdminOwners from "@/pages/AdminOwners";
import Empower360 from "@/pages/Empower360";
import AiCareerMentor from "@/pages/AiCareerMentor";
import ThreePhilosophiesPage from "@/pages/ThreePhilosophiesPage";
import { LanguageProvider } from "@/lib/LanguageContext";
import { ProgressProvider } from "@/lib/ProgressContext";
import AchievementNotificationContainer from "@/components/AchievementNotification";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/empower360" component={Empower360} />
      <Route path="/three-philosophies" component={ThreePhilosophiesPage} />
      <Route path="/ai-mentor" component={AiCareerMentor} />
      <Route path="/lead-engine" component={LeadEngine} />
      <Route path="/lead-engine/board" component={LeadBoard} />
      <Route path="/team/leaderboard" component={Leaderboard} />
      <Route path="/admin/owners" component={AdminOwners} />
      <Route component={NotFound} />
    </Switch>
  );
}


function AppContent() {
  return (
    <>
      <Toaster />
      <Router />
      <AchievementNotificationContainer />
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <ProgressProvider>
        <TooltipProvider>
          <AppContent />
        </TooltipProvider>
      </ProgressProvider>
    </LanguageProvider>
  );
}

export default App;
