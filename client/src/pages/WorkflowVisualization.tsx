import React from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import DynamicWorkflowVisualization from '@/components/DynamicWorkflowVisualization';
import FloatingHelpButton from '@/components/FloatingHelpButton';
import { Badge } from '@/components/ui/badge';

export default function WorkflowVisualization() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-4 bg-white/20 text-white px-6 py-2">
              📊 Workflow Analytics
            </Badge>
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Dynamic Workflow<br/>
              <span className="text-yellow-300">Visualization</span>
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Interactive visualization and real-time monitoring of Santiago Team automation workflows, 
              lead generation processes, and campaign performance analytics.
            </p>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="pt-16 pb-12">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            <DynamicWorkflowVisualization />
          </div>
        </div>
      </main>

      <Footer />
      <FloatingHelpButton currentPage="workflow-visualization" />
    </div>
  );
}