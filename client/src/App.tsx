import { Switch, Route, Router } from "wouter";
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
import SpanishTutorial from "@/pages/SpanishTutorial";
import TooltipDemo from "@/pages/TooltipDemo";
import LanguageHeatmap from "@/pages/LanguageHeatmap";
import Documentation from "@/pages/Documentation";
import CustomAI from "@/pages/CustomAI";
import EpicVideo from "@/pages/EpicVideo";
import { LanguageProvider } from "@/lib/LanguageContext";
import { SoundProvider } from "@/lib/SoundContext";
import { ProgressProvider } from "@/lib/ProgressContext";
import AchievementNotificationContainer from "@/components/AchievementNotification";

function AppRouter() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/empower360" component={Empower360} />
      <Route path="/three-philosophies" component={ThreePhilosophiesPage} />
      <Route path="/ai-automation" component={AiAutomationHub} />
      <Route path="/ai-automation-hub" component={AiAutomationHub} />
      <Route path="/setup-guide" component={SetupGuide} />
      <Route path="/workflow-visualization" component={WorkflowVisualization} />
      <Route path="/localization-wizard" component={LocalizationWizard} />
      <Route path="/team-santiago" component={TeamSantiago} />
      <Route path="/mission-highlights" component={MissionHighlightReel} />
      <Route path="/events" component={Events} />
      <Route path="/why-join-our-team" component={WhyJoinOurTeam} />
      <Route path="/registro-espanol" component={SpanishRegistration} />
      <Route path="/tutorial-espanol" component={SpanishTutorial} />
      <Route path="/diccionario" component={TooltipDemo} />
      <Route path="/language-heatmap" component={LanguageHeatmap} />
      <Route path="/ai-mentor" component={AiCareerMentor} />
      <Route path="/lead-engine" component={LeadEngine} />
      <Route path="/lead-engine/board" component={LeadBoard} />
      <Route path="/team/leaderboard" component={Leaderboard} />
      <Route path="/admin/owners" component={AdminOwners} />
      <Route path="/docs" component={Documentation} />
      <Route path="/custom-ai" component={CustomAI} />
      <Route path="/epic-video" component={EpicVideo} />
      <Route path="/ai-automation/epic-video" component={EpicVideo} />
      <Route component={NotFound} />
    </Switch>
  );
}


function AppContent() {
  // Auto-detect base URL for different deployment environments
  const base = typeof window !== 'undefined' ? 
    window.location.pathname.includes('/app/') ? '/app' : '' : '';

  return (
    <>
      <Router base={base}>
        <Toaster />
        <AppRouter />
        <AchievementNotificationContainer />
      </Router>
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <SoundProvider>
        <ProgressProvider>
          <TooltipProvider>
            <AppContent />
          </TooltipProvider>
        </ProgressProvider>
      </SoundProvider>
    </LanguageProvider>
  );
}

export default App;
