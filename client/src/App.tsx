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
import AiAutomationHub from "@/pages/AiAutomationHub";
import SetupGuide from "@/pages/SetupGuide";
import WorkflowVisualization from "@/pages/WorkflowVisualization";
import LocalizationWizard from "@/pages/LocalizationWizard";
import TeamSantiago from "@/pages/TeamSantiago";
import MissionHighlightReel from "@/pages/MissionHighlightReel";
import Events from "@/pages/Events";
import WhyJoinOurTeam from "@/pages/WhyJoinOurTeam";
import SpanishRegistration from "@/pages/SpanishRegistration";
import { LanguageProvider } from "@/lib/LanguageContext";
import { ProgressProvider } from "@/lib/ProgressContext";
import AchievementNotificationContainer from "@/components/AchievementNotification";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/empower360" component={Empower360} />
      <Route path="/three-philosophies" component={ThreePhilosophiesPage} />
      <Route path="/ai-automation" component={AiAutomationHub} />
      <Route path="/setup-guide" component={SetupGuide} />
      <Route path="/workflow-visualization" component={WorkflowVisualization} />
      <Route path="/localization-wizard" component={LocalizationWizard} />
      <Route path="/team-santiago" component={TeamSantiago} />
      <Route path="/mission-highlights" component={MissionHighlightReel} />
      <Route path="/events" component={Events} />
      <Route path="/why-join-our-team" component={WhyJoinOurTeam} />
      <Route path="/registro-espanol" component={SpanishRegistration} />
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
