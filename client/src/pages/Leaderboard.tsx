import { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Users, Calendar, Target, Medal, Award, Star, TrendingUp } from "lucide-react";
import Header from "@/components/Header";
import { useQuery } from "@tanstack/react-query";

type Lead = { 
  id: string; 
  ownerId?: string; 
  stage?: string; 
}

type Owner = {
  id: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}

type LeaderStats = {
  name: string;
  total: number;
  meetings: number;
  won: number;
  contacted: number;
  conversionRate: number;
}

export default function Leaderboard() {
  const [owners, setOwners] = useState<Owner[]>([]);

  const { data: leads = [], isLoading: leadsLoading } = useQuery({
    queryKey: ['/api/leads/list'],
  });

  const { data: hubspotData, isLoading: ownersLoading } = useQuery({
    queryKey: ['/api/hubspot/owners'],
  });

  useEffect(() => {
    if (hubspotData && 'results' in hubspotData && Array.isArray(hubspotData.results)) {
      setOwners(hubspotData.results);
    }
  }, [hubspotData]);

  const isLoading = leadsLoading || ownersLoading;

  // Calculate statistics
  const stats: Record<string, LeaderStats> = {};
  
  for (const lead of leads as Lead[]) {
    const id = lead.ownerId || 'unassigned';
    const owner = owners.find((o: Owner) => o.id === id);
    const name = owner 
      ? `${owner.firstName || ''} ${owner.lastName || ''}`.trim() || owner.email || owner.id
      : id === 'unassigned' 
        ? 'Unassigned' 
        : id === 'nolly@santiago-team.com' 
          ? 'Nolly Santiago'
          : id === 'paul@santiago-team.com'
            ? 'Paul Santiago'
            : id;
    
    if (!stats[id]) {
      stats[id] = { name, total: 0, meetings: 0, won: 0, contacted: 0, conversionRate: 0 };
    }
    
    stats[id].total += 1;
    
    if (lead.stage === 'Meeting Booked') stats[id].meetings += 1;
    if (lead.stage === 'Closed Won') stats[id].won += 1;
    if (lead.stage === 'Contacted') stats[id].contacted += 1;
  }

  // Calculate conversion rates
  Object.values(stats).forEach(stat => {
    stat.conversionRate = stat.total > 0 ? (stat.won / stat.total) * 100 : 0;
  });

  const rows = Object.entries(stats)
    .map(([id, s]) => ({ id, ...s }))
    .sort((a, b) => b.won - a.won || b.meetings - a.meetings || b.total - a.total);

  const getTrophyIcon = (index: number) => {
    if (index === 0) return <Trophy className="h-5 w-5 text-yellow-500" />;
    if (index === 1) return <Medal className="h-5 w-5 text-gray-400" />;
    if (index === 2) return <Award className="h-5 w-5 text-amber-600" />;
    return <Star className="h-4 w-4 text-gray-300" />;
  };

  const getRowStyling = (index: number) => {
    if (index === 0) return "bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200";
    if (index === 1) return "bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200";
    if (index === 2) return "bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200";
    return "bg-white border-gray-100";
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/4 mb-6"></div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="space-y-4">
                {[1, 2, 3, 4].map(i => (
                  <div key={i} className="h-12 bg-gray-100 rounded"></div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            🏆 Santiago Team Leaderboard
          </h1>
          <p className="text-lg text-gray-600">
            Track our team's performance and celebrate our wins together
          </p>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Total Leads</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {Object.values(stats).reduce((sum, stat) => sum + stat.total, 0)}
                  </p>
                </div>
                <Users className="h-8 w-8 text-blue-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Meetings Booked</p>
                  <p className="text-2xl font-bold text-green-600">
                    {Object.values(stats).reduce((sum, stat) => sum + stat.meetings, 0)}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-green-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Deals Closed</p>
                  <p className="text-2xl font-bold text-purple-600">
                    {Object.values(stats).reduce((sum, stat) => sum + stat.won, 0)}
                  </p>
                </div>
                <Target className="h-8 w-8 text-purple-600" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">Avg Conversion</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {Object.values(stats).length > 0 
                      ? Math.round(Object.values(stats).reduce((sum, stat) => sum + stat.conversionRate, 0) / Object.values(stats).length)
                      : 0}%
                  </p>
                </div>
                <TrendingUp className="h-8 w-8 text-orange-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Leaderboard Table */}
        <Card>
          <CardHeader>
            <CardTitle className="text-2xl font-bold text-gray-900">
              Team Performance Rankings
            </CardTitle>
          </CardHeader>
          <CardContent>
            {rows.length === 0 ? (
              <div className="text-center py-12">
                <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg">No leads data available yet</p>
                <p className="text-gray-400">Start generating leads to see the leaderboard!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {rows.map((row, index) => (
                  <div
                    key={row.id}
                    className={`p-6 rounded-lg border-2 transition-all hover:shadow-md ${getRowStyling(index)}`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                          {getTrophyIcon(index)}
                          <span className="text-lg font-bold text-gray-700">
                            #{index + 1}
                          </span>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold text-gray-900">{row.name}</h3>
                          {row.conversionRate > 0 && (
                            <Badge variant="secondary" className="mt-1">
                              {row.conversionRate.toFixed(1)}% conversion rate
                            </Badge>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex space-x-6 text-center">
                        <div>
                          <p className="text-2xl font-bold text-blue-600">{row.total}</p>
                          <p className="text-sm text-gray-600">Total Leads</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-green-600">{row.meetings}</p>
                          <p className="text-sm text-gray-600">Meetings</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-purple-600">{row.won}</p>
                          <p className="text-sm text-gray-600">Closed Won</p>
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-orange-600">{row.contacted}</p>
                          <p className="text-sm text-gray-600">Contacted</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Integration Note */}
        <Card className="mt-8 bg-blue-50 border-blue-200">
          <CardContent className="p-6">
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="h-4 w-4 text-blue-600" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  Enhanced Tracking Available
                </h3>
                <p className="text-blue-700 mb-3">
                  Connect your HubSpot account and Calendly webhooks for real-time lead tracking and automated stage updates.
                </p>
                <div className="text-sm text-blue-600">
                  <p><strong>Calendly Integration:</strong> Automatically track meeting bookings</p>
                  <p><strong>Email Reply Tracking:</strong> Monitor lead engagement via Zapier</p>
                  <p><strong>HubSpot Sync:</strong> Keep your CRM data in sync</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}