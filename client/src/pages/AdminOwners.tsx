import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft, Plus, Trash2, Save, Users } from "lucide-react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { Link } from "wouter";
import { useToast } from "@/hooks/use-toast";

interface RoundRobinConfig {
  id?: number;
  ownerEmails: string[];
  currentIndex: number;
  updatedAt?: string;
}

export default function AdminOwners() {
  const [userEmail, setUserEmail] = useState("nolly@santiago-team.com");
  const [userRole, setUserRole] = useState<"team" | "founder">("founder");
  const [newOwnerEmail, setNewOwnerEmail] = useState("");
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const { data: config, isLoading } = useQuery({
    queryKey: ["/api/admin/round-robin"],
    queryFn: async () => {
      const response = await fetch("/api/admin/round-robin", {
        headers: {
          "x-user-email": userEmail,
          "x-user-role": userRole,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch config");
      return response.json();
    },
  });

  const updateConfigMutation = useMutation({
    mutationFn: async (newConfig: { ownerEmails: string[]; currentIndex: number }) => {
      const response = await fetch("/api/admin/round-robin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-user-email": userEmail,
          "x-user-role": userRole,
        },
        body: JSON.stringify(newConfig),
      });
      if (!response.ok) throw new Error("Failed to update config");
      return response.json();
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/admin/round-robin"] });
      toast({
        title: "Success",
        description: "Round robin configuration updated successfully",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: "Failed to update configuration",
        variant: "destructive",
      });
    },
  });

  const getNextOwnerMutation = useMutation({
    mutationFn: async () => {
      const response = await fetch("/api/admin/next-owner", {
        headers: {
          "x-user-email": userEmail,
          "x-user-role": userRole,
        },
      });
      if (!response.ok) throw new Error("Failed to get next owner");
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "Next Owner",
        description: `Next owner in rotation: ${data.nextOwner || "No owners configured"}`,
      });
      queryClient.invalidateQueries({ queryKey: ["/api/admin/round-robin"] });
    },
  });

  const handleAddOwner = () => {
    if (!newOwnerEmail.trim()) return;
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(newOwnerEmail)) {
      toast({
        title: "Invalid Email",
        description: "Please enter a valid email address",
        variant: "destructive",
      });
      return;
    }

    const currentEmails = config?.ownerEmails || [];
    if (currentEmails.includes(newOwnerEmail)) {
      toast({
        title: "Duplicate Email",
        description: "This email is already in the list",
        variant: "destructive",
      });
      return;
    }

    const newConfig = {
      ownerEmails: [...currentEmails, newOwnerEmail],
      currentIndex: config?.currentIndex || 0,
    };

    updateConfigMutation.mutate(newConfig);
    setNewOwnerEmail("");
  };

  const handleRemoveOwner = (emailToRemove: string) => {
    const currentEmails = config?.ownerEmails || [];
    const newEmails = currentEmails.filter((email: string) => email !== emailToRemove);
    
    // Adjust current index if necessary
    let newIndex = config?.currentIndex || 0;
    if (newIndex >= newEmails.length && newEmails.length > 0) {
      newIndex = 0;
    }

    const newConfig = {
      ownerEmails: newEmails,
      currentIndex: newIndex,
    };

    updateConfigMutation.mutate(newConfig);
  };

  const handleResetRotation = () => {
    const newConfig = {
      ownerEmails: config?.ownerEmails || [],
      currentIndex: 0,
    };

    updateConfigMutation.mutate(newConfig);
  };

  if (userRole !== "founder") {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Access Denied</h2>
            <p className="text-gray-600 mb-6">This page is only accessible to founders.</p>
            <Link href="/lead-engine">
              <Button>Back to Lead Engine</Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center h-64">
          <div className="text-lg">Loading configuration...</div>
        </div>
      </div>
    );
  }

  const ownerEmails = config?.ownerEmails || [];
  const currentIndex = config?.currentIndex || 0;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <div className="flex items-center gap-4">
          <Link href="/lead-engine">
            <Button variant="outline" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Lead Engine
            </Button>
          </Link>
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Round Robin Admin</h1>
            <p className="text-gray-600 mt-2">Manage lead assignment owners</p>
          </div>
        </div>
        
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
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Current Configuration */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5" />
              Current Configuration
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Total Owners:</span>
              <Badge variant="secondary">{ownerEmails.length}</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Current Index:</span>
              <Badge>{currentIndex}</Badge>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Next Owner:</span>
              <Badge className="bg-green-100 text-green-800">
                {ownerEmails.length > 0 ? ownerEmails[currentIndex] : "None"}
              </Badge>
            </div>

            <div className="flex gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => getNextOwnerMutation.mutate()}
                disabled={getNextOwnerMutation.isPending}
              >
                Test Next Owner
              </Button>
              <Button 
                variant="outline" 
                size="sm" 
                onClick={handleResetRotation}
                disabled={updateConfigMutation.isPending}
              >
                Reset Rotation
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Add New Owner */}
        <Card>
          <CardHeader>
            <CardTitle>Add New Owner</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Input
                placeholder="owner@example.com"
                value={newOwnerEmail}
                onChange={(e) => setNewOwnerEmail(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && handleAddOwner()}
              />
              <Button 
                onClick={handleAddOwner}
                disabled={updateConfigMutation.isPending || !newOwnerEmail.trim()}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add
              </Button>
            </div>
            
            <div className="text-sm text-gray-600">
              Add team member email addresses to the round robin rotation. New leads will be automatically assigned to owners in rotation.
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Owner List */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Owner List</CardTitle>
        </CardHeader>
        <CardContent>
          {ownerEmails.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              No owners configured. Add owners to enable round robin assignment.
            </div>
          ) : (
            <div className="space-y-2">
              {ownerEmails.map((email: string, index: number) => (
                <div 
                  key={email} 
                  className={`flex items-center justify-between p-3 rounded-lg border ${
                    index === currentIndex ? "bg-green-50 border-green-200" : "bg-gray-50"
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Badge variant={index === currentIndex ? "default" : "secondary"}>
                      {index + 1}
                    </Badge>
                    <span className="font-medium">{email}</span>
                    {index === currentIndex && (
                      <Badge className="bg-green-100 text-green-800">Current</Badge>
                    )}
                  </div>
                  
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleRemoveOwner(email)}
                    disabled={updateConfigMutation.isPending}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}