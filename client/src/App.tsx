import { Switch, Route } from "wouter";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Home from "@/pages/Home";
import CosmicBackground from "@/components/CosmicBackground";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <TooltipProvider>
      {/* 3D/4D Cosmic Background for entire site */}
      <CosmicBackground intensity="high" primaryColor="blue" />
      <Toaster />
      <Router />
    </TooltipProvider>
  );
}

export default App;
