import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PlusCircle, Download, Users, TrendingUp } from "lucide-react";
import { useQuery } from "@tanstack/react-query";

interface Lead {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  status: string;
  source: string;
  ownerEmail?: string;
  notes?: string;
  lastContactDate?: string;
  nextFollowUp?: string;
  createdAt: string;
  updatedAt: string;
}

export default function LeadEngine() {
  const [userEmail, setUserEmail] = useState("nolly@santiago-team.com");
  const [userRole, setUserRole] = useState<"team" | "founder">("founder");

  const { data: leads = [], isLoading, refetch } = useQuery({
    queryKey: ["/api/leads"],
    queryFn: async () => {
      const response = await fetch("/api/leads", {
        headers: {
          "x-user-email": userEmail,
          "x-user-role": userRole,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch leads");
      return response.json();
    },
  });

  const handleExportCSV = async () => {
    try {
      const response = await fetch("/api/leads/export", {
        headers: {
          "x-user-email": userEmail,
          "x-user-role": userRole,
        },
      });
      
      if (!response.ok) throw new Error("Failed to export leads");
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `leads-export-${new Date().toISOString().split('T')[0]}.csv`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error exporting leads:", error);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "new": return "bg-blue-100 text-blue-800";
      case "contacted": return "bg-yellow-100 text-yellow-800";
      case "meeting_booked": return "bg-green-100 text-green-800";
      case "closed": return "bg-emerald-100 text-emerald-800";
      case "lost": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const groupedLeads = leads.reduce((acc: Record<string, Lead[]>, lead: Lead) => {
    const status = lead.status || "new";
    if (!acc[status]) acc[status] = [];
    acc[status].push(lead);
    return acc;
  }, {});

  const statuses = ["new", "contacted", "meeting_booked", "closed", "lost"];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading leads...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Lead Engine</h1>
          <p className="text-gray-600 mt-2">Manage your recruitment pipeline</p>
        </div>
        
        <div className="flex gap-4 items-center">
          {/* Demo user controls */}
          <div className="flex gap-2 items-center">
            <label className="text-sm text-gray-600">Demo User:</label>
            <select 
              value={userRole} 
              onChange={(e) => setUserRole(e.target.value as "team" | "founder")}
              className="px-3 py-1 border rounded"
            >
              <option value="founder">Founder</option>
              <option value="team">Team Member</option>
            </select>
          </div>
          
          <Button variant="outline" onClick={handleExportCSV}>
            <Download className="h-4 w-4 mr-2" />
            Export CSV
          </Button>
          
          <Button onClick={() => window.location.href = "/lead-engine/board"}>
            <PlusCircle className="h-4 w-4 mr-2" />
            Board View
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Leads</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{leads.length}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">New Leads</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{groupedLeads.new?.length || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Meetings Booked</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{groupedLeads.meeting_booked?.length || 0}</div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Closed Deals</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{groupedLeads.closed?.length || 0}</div>
          </CardContent>
        </Card>
      </div>

      {/* Leads Table */}
      <Card>
        <CardHeader>
          <CardTitle>All Leads</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-2">Name</th>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Phone</th>
                  <th className="text-left p-2">Status</th>
                  <th className="text-left p-2">Source</th>
                  <th className="text-left p-2">Owner</th>
                  <th className="text-left p-2">Created</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead: Lead) => (
                  <tr key={lead.id} className="border-b hover:bg-gray-50">
                    <td className="p-2">
                      <div className="font-medium">
                        {lead.firstName} {lead.lastName}
                      </div>
                    </td>
                    <td className="p-2 text-sm text-gray-600">{lead.email}</td>
                    <td className="p-2 text-sm text-gray-600">{lead.phone || "—"}</td>
                    <td className="p-2">
                      <Badge className={getStatusColor(lead.status)}>
                        {lead.status.replace("_", " ").toUpperCase()}
                      </Badge>
                    </td>
                    <td className="p-2 text-sm text-gray-600">{lead.source}</td>
                    <td className="p-2 text-sm text-gray-600">{lead.ownerEmail || "—"}</td>
                    <td className="p-2 text-sm text-gray-600">
                      {new Date(lead.createdAt).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {leads.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                No leads found. Create your first lead to get started!
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}