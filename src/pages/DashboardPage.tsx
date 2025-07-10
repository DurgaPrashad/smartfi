
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTab from '@/components/dashboard/OverviewTab';
import InvestmentsTab from '@/components/dashboard/InvestmentsTab';
import GoalsTab from '@/components/dashboard/GoalsTab';
import ChatTab from '@/components/dashboard/ChatTab';
import { PieChart as PieChartIcon, BarChart3, Target, MessageCircle, Sparkles } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const DashboardPage = () => {
  const { user } = useAuth();

  return (
    <div className="min-h-screen py-4 px-4 bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <div className="container mx-auto max-w-6xl">
        {/* Header */}
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-2">
                Welcome back, <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">{user?.name}</span>
              </h1>
              <p className="text-gray-600">Monitor your portfolio and get AI-powered insights</p>
            </div>
            <div className="flex items-center space-x-2 bg-white/80 backdrop-blur-sm rounded-xl px-4 py-2 shadow-lg w-fit">
              <Sparkles className="w-4 h-4 text-emerald-500" />
              <span className="text-sm font-semibold text-gray-700">AI Assistant Ready</span>
            </div>
          </div>
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
            <OverviewTab />
          </TabsContent>

          <TabsContent value="investments" className="mt-6">
            <InvestmentsTab />
          </TabsContent>

          <TabsContent value="goals" className="mt-6">
            <GoalsTab />
          </TabsContent>

          <TabsContent value="chat" className="mt-6">
            <ChatTab />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DashboardPage;
