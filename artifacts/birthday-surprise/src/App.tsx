import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { Route, Switch, Router as WouterRouter } from 'wouter';
import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';

import { StarryBackground } from './components/StarryBackground';
import { SceneEnvelope } from './components/SceneEnvelope';
import { SceneQuestion } from './components/SceneQuestion';
import { SceneReveal } from './components/SceneReveal';

const queryClient = new QueryClient();

function BirthdayExperience() {
  const [scene, setScene] = useState(0);

  return (
    <div className="relative min-h-[100dvh] w-full bg-[#060a16] text-white selection:bg-white/20 overflow-x-hidden font-sans">
      <StarryBackground />
      
      <AnimatePresence mode="wait">
        {scene === 0 && (
          <SceneEnvelope key="scene-0" onOpen={() => setScene(1)} />
        )}
        {scene === 1 && (
          <SceneQuestion key="scene-1" onYes={() => setScene(2)} />
        )}
        {scene === 2 && (
          <SceneReveal key="scene-2" />
        )}
      </AnimatePresence>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL?.replace(/\/$/, '') || ''}>
          <Switch>
            <Route path="/" component={BirthdayExperience} />
            <Route path="/:rest*" component={BirthdayExperience} />
          </Switch>
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
