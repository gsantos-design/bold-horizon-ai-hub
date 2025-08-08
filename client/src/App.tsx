import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import LeadEngine from "@/pages/LeadEngine";
import LeadBoard from "@/pages/LeadBoard";
import AdminOwners from "@/pages/AdminOwners";
import { LanguageProvider } from "@/lib/LanguageContext";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/lead-engine" component={LeadEngine} />
      <Route path="/lead-engine/board" component={LeadBoard} />
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
    </>
  );
}

function App() {
  return (
    <LanguageProvider>
      <TooltipProvider>
        <AppContent />
      </TooltipProvider>
    </LanguageProvider>
  );
}

export default App;
