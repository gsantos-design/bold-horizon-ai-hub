import React, { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Progress } from '@/components/ui/progress';
import { 
  Play,
  Pause,
  RotateCcw,
  Settings,
  Users,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  Clock,
  AlertCircle,
  TrendingUp,
  Bot,
  Target,
  Filter,
  Download,
  Maximize2,
  Eye,
  ArrowRight,
  ArrowDown,
  Zap,
  MessageSquare
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface WorkflowNode {
  id: string;
  type: 'start' | 'action' | 'decision' | 'end' | 'delay';
  title: string;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'failed';
  duration?: number;
  position: { x: number; y: number };
  connections: string[];
  metadata?: {
    leads?: number;
    conversion_rate?: number;
    cost?: number;
    automation_type?: string;
  };
}

interface WorkflowTemplate {
  id: string;
  name: string;
  description: string;
  category: 'lead_generation' | 'nurturing' | 'conversion' | 'ai_automation';
  nodes: WorkflowNode[];
  metrics: {
    total_leads: number;
    conversion_rate: number;
    avg_duration: number;
    success_rate: number;
  };
}

export default function DynamicWorkflowVisualization() {
  const [selectedWorkflow, setSelectedWorkflow] = useState<string>('ai_lead_outreach');
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentStep, setCurrentStep] = useState(0);
  const [viewMode, setViewMode] = useState<'overview' | 'detailed' | 'realtime'>('overview');
  const [selectedNode, setSelectedNode] = useState<string | null>(null);
  const canvasRef = useRef<SVGSVGElement>(null);

  const workflowTemplates: WorkflowTemplate[] = [
    {
      id: 'ai_lead_outreach',
      name: 'AI-Powered Lead Outreach',
      description: 'Automated lead generation using AI phone calls and personalized videos',
      category: 'ai_automation',
      nodes: [
        {
          id: 'start',
          type: 'start',
          title: 'Lead Import',
          description: 'Import leads from HubSpot, LinkedIn, or manual upload',
          status: 'completed',
          position: { x: 100, y: 100 },
          connections: ['qualify'],
          metadata: { leads: 1247 }
        },
        {
          id: 'qualify',
          type: 'decision',
          title: 'Lead Qualification',
          description: 'AI analyzes lead profile and assigns priority score',
          status: 'completed',
          position: { x: 300, y: 100 },
          connections: ['ai_call', 'email_sequence'],
          metadata: { leads: 856, conversion_rate: 68.7 }
        },
        {
          id: 'ai_call',
          type: 'action',
          title: 'AI Phone Call',
          description: 'Automated call using Nolly/Pablo voice clones',
          status: 'active',
          duration: 120,
          position: { x: 500, y: 50 },
          connections: ['follow_up'],
          metadata: { leads: 523, automation_type: 'retell_ai', cost: 1.50 }
        },
        {
          id: 'email_sequence',
          type: 'action',
          title: 'Email Sequence',
          description: 'Personalized email campaign with AI-generated content',
          status: 'active',
          position: { x: 500, y: 150 },
          connections: ['video_message'],
          metadata: { leads: 333, conversion_rate: 24.2 }
        },
        {
          id: 'video_message',
          type: 'action',
          title: 'Personalized Video',
          description: 'AI-generated video with Santiago Team avatars',
          status: 'pending',
          position: { x: 700, y: 150 },
          connections: ['follow_up'],
          metadata: { automation_type: 'tavus_heygen' }
        },
        {
          id: 'follow_up',
          type: 'delay',
          title: 'Follow-up Scheduler',
          description: 'Intelligent timing for next contact attempt',
          status: 'pending',
          position: { x: 700, y: 100 },
          connections: ['meeting_booking'],
          metadata: { leads: 287 }
        },
        {
          id: 'meeting_booking',
          type: 'action',
          title: 'Meeting Booking',
          description: 'Calendly integration for appointment scheduling',
          status: 'pending',
          position: { x: 900, y: 100 },
          connections: ['conversion'],
          metadata: { conversion_rate: 34.5 }
        },
        {
          id: 'conversion',
          type: 'end',
          title: 'Conversion',
          description: 'Lead becomes client or team member',
          status: 'pending',
          position: { x: 1100, y: 100 },
          connections: [],
          metadata: { leads: 98, conversion_rate: 34.1 }
        }
      ],
      metrics: {
        total_leads: 1247,
        conversion_rate: 7.9,
        avg_duration: 14.5,
        success_rate: 89.2
      }
    },
    {
      id: '401k_rollover_campaign',
      name: '401k Rollover Campaign',
      description: 'Targeting pre-retirees with tax-free rollover strategies',
      category: 'lead_generation',
      nodes: [
        {
          id: 'targeting',
          type: 'start',
          title: 'Demographic Targeting',
          description: 'Age 55+, $100k+ retirement accounts, job transitions',
          status: 'completed',
          position: { x: 100, y: 100 },
          connections: ['outreach'],
          metadata: { leads: 2847 }
        },
        {
          id: 'outreach',
          type: 'action',
          title: 'Initial Outreach',
          description: 'AI phone calls about tax-free rollover benefits',
          status: 'active',
          position: { x: 300, y: 100 },
          connections: ['education'],
          metadata: { leads: 892, conversion_rate: 31.3 }
        },
        {
          id: 'education',
          type: 'action',
          title: 'Educational Content',
          description: 'IUL, Annuities, and strategic investment materials',
          status: 'active',
          position: { x: 500, y: 100 },
          connections: ['consultation'],
          metadata: { leads: 445, conversion_rate: 49.9 }
        },
        {
          id: 'consultation',
          type: 'action',
          title: 'Strategy Consultation',
          description: 'One-on-one consultation with Santiago Team',
          status: 'pending',
          position: { x: 700, y: 100 },
          connections: ['conversion'],
          metadata: { leads: 234, conversion_rate: 67.5 }
        },
        {
          id: 'conversion',
          type: 'end',
          title: 'Account Setup',
          description: 'Client opens IUL or annuity account',
          status: 'pending',
          position: { x: 900, y: 100 },
          connections: [],
          metadata: { leads: 158, conversion_rate: 67.5 }
        }
      ],
      metrics: {
        total_leads: 2847,
        conversion_rate: 5.5,
        avg_duration: 21.3,
        success_rate: 94.7
      }
    },
    {
      id: 'high_yield_targeting',
      name: 'High-Yield Account Targeting',
      description: 'Conservative investors seeking CD alternatives with guaranteed returns',
      category: 'lead_generation',
      nodes: [
        {
          id: 'research',
          type: 'start',
          title: 'Market Research',
          description: 'Target investors with CDs, savings accounts $50k+',
          status: 'completed',
          position: { x: 100, y: 100 },
          connections: ['approach'],
          metadata: { leads: 1893 }
        },
        {
          id: 'approach',
          type: 'action',
          title: 'Yield Comparison',
          description: 'Present 4.5-6.8% vs traditional CD rates',
          status: 'active',
          position: { x: 300, y: 100 },
          connections: ['safety_demo'],
          metadata: { leads: 745, conversion_rate: 39.4 }
        },
        {
          id: 'safety_demo',
          type: 'action',
          title: 'Safety Demonstration',
          description: 'Explain principal protection and guarantee features',
          status: 'active',
          position: { x: 500, y: 100 },
          connections: ['application'],
          metadata: { leads: 456, conversion_rate: 61.2 }
        },
        {
          id: 'application',
          type: 'action',
          title: 'Application Process',
          description: 'Guided account opening with Santiago Team',
          status: 'pending',
          position: { x: 700, y: 100 },
          connections: ['funding'],
          metadata: { leads: 279, conversion_rate: 75.3 }
        },
        {
          id: 'funding',
          type: 'end',
          title: 'Account Funding',
          description: 'Client transfers funds to high-yield account',
          status: 'pending',
          position: { x: 900, y: 100 },
          connections: [],
          metadata: { leads: 210, conversion_rate: 75.3 }
        }
      ],
      metrics: {
        total_leads: 1893,
        conversion_rate: 11.1,
        avg_duration: 12.8,
        success_rate: 91.4
      }
    }
  ];

  const selectedWorkflowData = workflowTemplates.find(w => w.id === selectedWorkflow);

  const getNodeColor = (status: WorkflowNode['status']) => {
    switch (status) {
      case 'completed': return 'text-green-600 bg-green-100 border-green-300';
      case 'active': return 'text-blue-600 bg-blue-100 border-blue-300';
      case 'pending': return 'text-gray-600 bg-gray-100 border-gray-300';
      case 'failed': return 'text-red-600 bg-red-100 border-red-300';
      default: return 'text-gray-600 bg-gray-100 border-gray-300';
    }
  };

  const getNodeIcon = (type: WorkflowNode['type']) => {
    switch (type) {
      case 'start': return <Play className="h-4 w-4" />;
      case 'action': return <Zap className="h-4 w-4" />;
      case 'decision': return <Target className="h-4 w-4" />;
      case 'delay': return <Clock className="h-4 w-4" />;
      case 'end': return <CheckCircle className="h-4 w-4" />;
      default: return <ArrowRight className="h-4 w-4" />;
    }
  };

  const startAnimation = () => {
    setIsPlaying(true);
    setCurrentStep(0);
    
    // Animate through workflow steps
    const timer = setInterval(() => {
      setCurrentStep(prev => {
        if (prev >= (selectedWorkflowData?.nodes.length || 0) - 1) {
          setIsPlaying(false);
          clearInterval(timer);
          return 0;
        }
        return prev + 1;
      });
    }, 1500);
  };

  const resetAnimation = () => {
    setIsPlaying(false);
    setCurrentStep(0);
  };

  return (
    <div className="space-y-6">
      {/* Header Controls */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gray-900">Dynamic Workflow Visualization</h2>
          <p className="text-gray-600">Interactive visualization of Santiago Team automation workflows</p>
        </div>
        <div className="flex items-center gap-4">
          <Select value={selectedWorkflow} onValueChange={setSelectedWorkflow}>
            <SelectTrigger className="w-64">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {workflowTemplates.map(template => (
                <SelectItem key={template.id} value={template.id}>
                  {template.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={isPlaying ? () => setIsPlaying(false) : startAnimation}
              className="flex items-center gap-2"
            >
              {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              {isPlaying ? 'Pause' : 'Play'}
            </Button>
            <Button onClick={resetAnimation} variant="outline">
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Workflow Metrics */}
      {selectedWorkflowData && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Total Leads</p>
                  <p className="text-2xl font-bold text-blue-600">
                    {selectedWorkflowData.metrics.total_leads.toLocaleString()}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Conversion Rate</p>
                  <p className="text-2xl font-bold text-green-600">
                    {selectedWorkflowData.metrics.conversion_rate}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Avg Duration</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {selectedWorkflowData.metrics.avg_duration} days
                  </p>
                </div>
                <Clock className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>
          
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">Success Rate</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {selectedWorkflowData.metrics.success_rate}%
                  </p>
                </div>
                <CheckCircle className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="detailed">Detailed Flow</TabsTrigger>
          <TabsTrigger value="realtime">Real-time</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Eye className="h-5 w-5" />
                Workflow Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              {selectedWorkflowData && (
                <div className="relative bg-gray-50 rounded-lg p-8 overflow-auto" style={{ minHeight: '400px' }}>
                  <svg
                    ref={canvasRef}
                    width="100%"
                    height="400"
                    viewBox="0 0 1200 300"
                    className="overflow-visible"
                  >
                    {/* Connections */}
                    {selectedWorkflowData.nodes.map(node => 
                      node.connections.map(connectionId => {
                        const targetNode = selectedWorkflowData.nodes.find(n => n.id === connectionId);
                        if (!targetNode) return null;
                        
                        return (
                          <motion.line
                            key={`${node.id}-${connectionId}`}
                            x1={node.position.x + 60}
                            y1={node.position.y + 30}
                            x2={targetNode.position.x}
                            y2={targetNode.position.y + 30}
                            stroke="#94a3b8"
                            strokeWidth="2"
                            markerEnd="url(#arrowhead)"
                            initial={{ pathLength: 0 }}
                            animate={{ 
                              pathLength: isPlaying ? 1 : 1,
                              stroke: isPlaying ? "#3b82f6" : "#94a3b8"
                            }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                          />
                        );
                      })
                    )}
                    
                    {/* Arrow marker */}
                    <defs>
                      <marker
                        id="arrowhead"
                        markerWidth="10"
                        markerHeight="7"
                        refX="0"
                        refY="3.5"
                        orient="auto"
                      >
                        <polygon
                          points="0 0, 10 3.5, 0 7"
                          fill="#94a3b8"
                        />
                      </marker>
                    </defs>
                  </svg>
                  
                  {/* Nodes */}
                  {selectedWorkflowData.nodes.map((node, index) => (
                    <motion.div
                      key={node.id}
                      className={`absolute cursor-pointer transition-all duration-300 ${
                        selectedNode === node.id ? 'scale-110 z-10' : ''
                      }`}
                      style={{
                        left: node.position.x,
                        top: node.position.y,
                        width: '120px'
                      }}
                      onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ 
                        opacity: 1, 
                        scale: isPlaying && index === currentStep ? 1.1 : 1,
                        backgroundColor: isPlaying && index === currentStep ? '#3b82f6' : undefined
                      }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <div className={`border-2 rounded-lg p-3 bg-white shadow-md ${getNodeColor(node.status)}`}>
                        <div className="flex items-center gap-2 mb-2">
                          {getNodeIcon(node.type)}
                          <span className="text-xs font-semibold truncate">{node.title}</span>
                        </div>
                        <p className="text-xs text-gray-600 leading-tight">{node.description}</p>
                        
                        {node.metadata && (
                          <div className="mt-2 space-y-1">
                            {node.metadata.leads && (
                              <div className="text-xs">
                                <span className="font-medium">{node.metadata.leads}</span> leads
                              </div>
                            )}
                            {node.metadata.conversion_rate && (
                              <div className="text-xs text-green-600">
                                {node.metadata.conversion_rate}% conversion
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="detailed" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Node Details */}
            <Card>
              <CardHeader>
                <CardTitle>Workflow Steps</CardTitle>
              </CardHeader>
              <CardContent>
                {selectedWorkflowData && (
                  <div className="space-y-4">
                    {selectedWorkflowData.nodes.map((node, index) => (
                      <motion.div
                        key={node.id}
                        className={`p-4 border rounded-lg cursor-pointer transition-all ${
                          selectedNode === node.id ? 'border-blue-300 bg-blue-50' : 'border-gray-200'
                        } ${getNodeColor(node.status)}`}
                        onClick={() => setSelectedNode(selectedNode === node.id ? null : node.id)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <div className="p-2 rounded-full bg-white">
                              {getNodeIcon(node.type)}
                            </div>
                            <div>
                              <h4 className="font-semibold">{node.title}</h4>
                              <p className="text-sm opacity-75">{node.description}</p>
                            </div>
                          </div>
                          <Badge className={getNodeColor(node.status)}>
                            {node.status}
                          </Badge>
                        </div>
                        
                        {node.metadata && (
                          <div className="grid grid-cols-2 gap-4 mt-3 text-sm">
                            {node.metadata.leads && (
                              <div>
                                <span className="text-gray-600">Leads:</span>
                                <span className="font-semibold ml-2">{node.metadata.leads}</span>
                              </div>
                            )}
                            {node.metadata.conversion_rate && (
                              <div>
                                <span className="text-gray-600">Conversion:</span>
                                <span className="font-semibold ml-2 text-green-600">
                                  {node.metadata.conversion_rate}%
                                </span>
                              </div>
                            )}
                            {node.metadata.cost && (
                              <div>
                                <span className="text-gray-600">Cost:</span>
                                <span className="font-semibold ml-2">${node.metadata.cost}</span>
                              </div>
                            )}
                            {node.metadata.automation_type && (
                              <div>
                                <span className="text-gray-600">Type:</span>
                                <span className="font-semibold ml-2">{node.metadata.automation_type}</span>
                              </div>
                            )}
                          </div>
                        )}
                      </motion.div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Performance Analytics */}
            <Card>
              <CardHeader>
                <CardTitle>Performance Analytics</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold mb-3">Conversion Funnel</h4>
                    <div className="space-y-3">
                      {selectedWorkflowData?.nodes
                        .filter(node => node.metadata?.leads)
                        .map((node, index) => {
                          const maxLeads = selectedWorkflowData.metrics.total_leads;
                          const percentage = ((node.metadata?.leads || 0) / maxLeads) * 100;
                          
                          return (
                            <div key={node.id} className="space-y-2">
                              <div className="flex justify-between text-sm">
                                <span>{node.title}</span>
                                <span className="font-semibold">{node.metadata?.leads} leads</span>
                              </div>
                              <div className="w-full bg-gray-200 rounded-full h-2">
                                <motion.div
                                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                                  initial={{ width: 0 }}
                                  animate={{ width: `${percentage}%` }}
                                  transition={{ duration: 1, delay: index * 0.2 }}
                                />
                              </div>
                              <div className="text-xs text-gray-600">
                                {percentage.toFixed(1)}% of total
                              </div>
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">ROI Analysis</h4>
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-4">
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span>Campaign Investment:</span>
                          <span className="font-semibold">$2,847</span>
                        </div>
                        <div className="flex justify-between">
                          <span>Generated Revenue:</span>
                          <span className="font-semibold text-green-600">$427,500</span>
                        </div>
                        <div className="flex justify-between border-t pt-2">
                          <span className="font-semibold">ROI:</span>
                          <span className="font-bold text-green-600">14,912%</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="realtime" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5" />
                Real-time Workflow Activity
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <div>
                        <p className="font-semibold text-blue-800">Active Campaigns</p>
                        <p className="text-2xl font-bold text-blue-600">7</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-green-50 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <div>
                        <p className="font-semibold text-green-800">Leads in Progress</p>
                        <p className="text-2xl font-bold text-green-600">1,234</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-purple-50 rounded-lg p-4">
                    <div className="flex items-center gap-3">
                      <div className="w-3 h-3 bg-purple-500 rounded-full animate-pulse"></div>
                      <div>
                        <p className="font-semibold text-purple-800">Today's Conversions</p>
                        <p className="text-2xl font-bold text-purple-600">23</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border rounded-lg">
                  <div className="p-4 border-b bg-gray-50">
                    <h4 className="font-semibold">Live Activity Feed</h4>
                  </div>
                  <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
                    {[
                      { time: '2 min ago', action: 'AI call completed', lead: 'Sarah Johnson', result: 'Meeting booked' },
                      { time: '5 min ago', action: 'Email opened', lead: 'Mike Davis', result: 'Engagement tracked' },
                      { time: '8 min ago', action: 'Video watched', lead: 'Lisa Chen', result: '87% completion' },
                      { time: '12 min ago', action: 'AI call started', lead: 'Robert Smith', result: 'In progress' },
                      { time: '15 min ago', action: 'Lead qualified', lead: 'Amanda Wilson', result: 'High priority' }
                    ].map((activity, index) => (
                      <motion.div
                        key={index}
                        className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                          <div>
                            <p className="font-medium">{activity.action}</p>
                            <p className="text-sm text-gray-600">Lead: {activity.lead}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-600">{activity.result}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}