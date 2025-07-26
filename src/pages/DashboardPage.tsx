
import React, { useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import OverviewTab from '@/components/dashboard/OverviewTab';
import InvestmentsTab from '@/components/dashboard/InvestmentsTab';
import GoalsTab from '@/components/dashboard/GoalsTab';
import ChatTab from '@/components/dashboard/ChatTab';
import { PieChart as PieChartIcon, BarChart3, Target, MessageCircle, Sparkles, Database, RefreshCw, Users } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useFiMCP } from '@/contexts/FiMCPContext';
import { useToast } from '@/hooks/use-toast';

const DashboardPage = () => {
  const { user } = useAuth();
  const { user: clerkUser } = useUser();
  const { 
    data, 
    isLoading, 
    error, 
    isDemoMode, 
    demoPhoneNumber, 
    switchToClerk, 
    fetchAllData 
  } = useFiMCP();
  const { toast } = useToast();

  const displayName = clerkUser?.firstName || user?.name || 'User';
  const isAuthenticated = !!user || !!clerkUser || isDemoMode;

  useEffect(() => {
    if (isDemoMode && demoPhoneNumber && !data.netWorth) {
      fetchAllData();
    }
  }, [isDemoMode, demoPhoneNumber, data.netWorth, fetchAllData]);

  const handleRefreshData = async () => {
    try {
      await fetchAllData();
      toast({
        title: "Data refreshed",
        description: "Your financial data has been updated.",
      });
    } catch (error) {
      toast({
        title: "Refresh failed",
        description: "Failed to refresh data. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
        <Card className="w-full max-w-md">
          <CardContent className="p-6 text-center">
            <p className="text-gray-600 mb-4">Please sign in to access your dashboard.</p>
            <Button onClick={() => window.location.href = '/signin'}>
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-4 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                Welcome back, <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">{displayName}</span>
              </h1>
              <p className="text-gray-600">Monitor your portfolio and get AI-powered insights</p>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2">
              {isDemoMode && (
                <div className="flex items-center space-x-2 bg-blue-100 text-blue-800 rounded-xl px-3 py-2 shadow-lg">
                  <Database className="w-4 h-4" />
                  <span className="text-sm font-semibold">Fi MCP Demo: {demoPhoneNumber}</span>
                </div>
              )}
              {clerkUser && (
                <div className="flex items-center space-x-2 bg-green-100 text-green-800 rounded-xl px-3 py-2 shadow-lg">
                  <Users className="w-4 h-4" />
                  <span className="text-sm font-semibold">Clerk Authenticated</span>
                </div>
              )}
              <div className="flex items-center space-x-2">
                <Button
                  onClick={handleRefreshData}
                  disabled={isLoading}
                  size="sm"
                  className="bg-white/80 backdrop-blur-sm text-gray-700 hover:bg-white/90"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
                  Refresh
                </Button>
                <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg">
                  <Sparkles className="w-4 h-4 text-emerald-500" />
                  <span className="text-sm font-semibold text-gray-700">AI Assistant Ready</span>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4">
              <p className="text-red-800 text-sm">{error}</p>
              <Button 
                onClick={handleRefreshData} 
                size="sm" 
                className="mt-2"
                disabled={isLoading}
              >
                Retry
              </Button>
            </div>
          )}

          {isLoading && !data.netWorth && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <div className="flex items-center space-x-2">
                <RefreshCw className="w-4 h-4 animate-spin text-blue-600" />
                <p className="text-blue-800 text-sm">Loading your financial data...</p>
              </div>
            </div>
          )}
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 bg-white/80 backdrop-blur-sm border shadow-lg h-12 p-1 rounded-xl">
            <TabsTrigger 
              value="overview" 
              className="flex items-center space-x-2 text-xs sm:text-sm font-semibold rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300"
            >
              <PieChartIcon className="w-4 h-4" />
              <span className="hidden sm:inline">Overview</span>
            </TabsTrigger>
            <TabsTrigger 
              value="investments" 
              className="flex items-center space-x-2 text-xs sm:text-sm font-semibold rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300"
            >
              <BarChart3 className="w-4 h-4" />
              <span className="hidden sm:inline">Invest</span>
            </TabsTrigger>
            <TabsTrigger 
              value="goals" 
              className="flex items-center space-x-2 text-xs sm:text-sm font-semibold rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300"
            >
              <Target className="w-4 h-4" />
              <span className="hidden sm:inline">Goals</span>
            </TabsTrigger>
            <TabsTrigger 
              value="chat" 
              className="flex items-center space-x-2 text-xs sm:text-sm font-semibold rounded-lg data-[state=active]:bg-gradient-to-r data-[state=active]:from-emerald-500 data-[state=active]:to-blue-500 data-[state=active]:text-white transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" />
              <span className="hidden sm:inline">AI Chat</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <OverviewTab data={data} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="investments" className="mt-6">
            <InvestmentsTab data={data} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="goals" className="mt-6">
            <GoalsTab data={data} isLoading={isLoading} />
          </TabsContent>

          <TabsContent value="chat" className="mt-6">
            <ChatTab data={data} isLoading={isLoading} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;
