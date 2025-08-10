import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DynamicTeamMissionHighlightReel from '@/components/DynamicTeamMissionHighlightReel';

export default function MissionHighlightReel() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <DynamicTeamMissionHighlightReel />
      <Footer />
    </div>
  );
}