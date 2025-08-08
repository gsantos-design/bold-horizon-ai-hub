import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Download } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "wouter";

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

export default function LeadBoard() {
  const [userEmail, setUserEmail] = useState("nolly@santiago-team.com");
  const [userRole, setUserRole] = useState<"team" | "founder">("founder");

  const { data: leads = [], isLoading } = useQuery({
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
      case "new": return "bg-blue-100 text-blue-800 border-blue-200";
      case "contacted": return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "meeting_booked": return "bg-green-100 text-green-800 border-green-200";
      case "closed": return "bg-emerald-100 text-emerald-800 border-emerald-200";
      case "lost": return "bg-red-100 text-red-800 border-red-200";
      default: return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const groupedLeads = leads.reduce((acc: Record<string, Lead[]>, lead: Lead) => {
    const status = lead.status || "new";
    if (!acc[status]) acc[status] = [];
    acc[status].push(lead);
    return acc;
  }, {});

  const statusColumns = [
    { key: "new", title: "New Leads", count: groupedLeads.new?.length || 0 },
    { key: "contacted", title: "Contacted", count: groupedLeads.contacted?.length || 0 },
    { key: "meeting_booked", title: "Meeting Booked", count: groupedLeads.meeting_booked?.length || 0 },
    { key: "closed", title: "Closed", count: groupedLeads.closed?.length || 0 },
    { key: "lost", title: "Lost", count: groupedLeads.lost?.length || 0 },
  ];

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading board...</div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Link href="/lead-engine">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to List
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Lead Board</h1>
            <p className="text-gray-600 mt-2">Kanban view of your pipeline</p>
          </div>
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
        </div>
      </div>

      {/* Kanban Board */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        {statusColumns.map((column) => (
          <div key={column.key} className="flex flex-col">
            <Card className="mb-4">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium flex justify-between items-center">
                  {column.title}
                  <Badge variant="secondary">{column.count}</Badge>
                </CardTitle>
              </CardHeader>
            </Card>
            
            <div className="space-y-3 flex-1">
              {(groupedLeads[column.key] || []).map((lead: Lead) => (
                <Card key={lead.id} className="border-l-4 hover:shadow-md transition-shadow cursor-pointer">
                  <CardContent className="p-4">
                    <div className="space-y-2">
                      <div className="font-medium text-sm">
                        {lead.firstName} {lead.lastName}
                      </div>
                      <div className="text-xs text-gray-600">{lead.email}</div>
                      {lead.phone && (
                        <div className="text-xs text-gray-600">{lead.phone}</div>
                      )}
                      <div className="flex justify-between items-center">
                        <Badge className={`text-xs ${getStatusColor(lead.status)}`}>
                          {lead.source}
                        </Badge>
                        <div className="text-xs text-gray-500">
                          {new Date(lead.createdAt).toLocaleDateString()}
                        </div>
                      </div>
                      {lead.ownerEmail && (
                        <div className="text-xs text-gray-500">
                          Owner: {lead.ownerEmail.split('@')[0]}
                        </div>
                      )}
                      {lead.notes && (
                        <div className="text-xs text-gray-600 truncate">
                          {lead.notes}
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
              
              {(groupedLeads[column.key] || []).length === 0 && (
                <div className="text-center text-gray-400 text-sm py-8 border-2 border-dashed border-gray-200 rounded-lg">
                  No leads in this stage
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}