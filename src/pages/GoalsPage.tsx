
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Target, Plus, TrendingUp, Calendar, DollarSign, Home, Car, GraduationCap, Plane } from 'lucide-react';

const GoalsPage = () => {
  const goals = [
    {
      id: 1,
      title: "Emergency Fund",
      target: 500000,
      current: 285000,
      icon: Target,
      color: "emerald",
      deadline: "Dec 2024",
      monthlyContribution: 15000,
      status: "on-track"
    },
    {
      id: 2,
      title: "House Down Payment",
      target: 2000000,
      current: 650000,
      icon: Home,
      color: "blue",
      deadline: "Jun 2026",
      monthlyContribution: 25000,
      status: "on-track"
    },
    {
      id: 3,
      title: "Car Purchase",
      target: 800000,
      current: 320000,
      icon: Car,
      color: "purple",
      deadline: "Mar 2025",
      monthlyContribution: 20000,
      status: "behind"
    },
    {
      id: 4,
      title: "Child Education",
      target: 1500000,
      current: 180000,
      icon: GraduationCap,
      color: "orange",
      deadline: "Aug 2030",
      monthlyContribution: 12000,
      status: "on-track"
    },
    {
      id: 5,
      title: "Dream Vacation",
      target: 200000,
      current: 150000,
      icon: Plane,
      color: "pink",
      deadline: "Dec 2024",
      monthlyContribution: 8000,
      status: "ahead"
    }
  ];

  const getProgressPercentage = (current: number, target: number) => {
    return Math.round((current / target) * 100);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "ahead": return "text-emerald-600";
      case "on-track": return "text-blue-600";
      case "behind": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "ahead": return <Badge className="bg-emerald-100 text-emerald-800">Ahead</Badge>;
      case "on-track": return <Badge className="bg-blue-100 text-blue-800">On Track</Badge>;
      case "behind": return <Badge className="bg-red-100 text-red-800">Behind</Badge>;
      default: return <Badge>Unknown</Badge>;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Financial Goals</h1>
            <p className="text-gray-600">Track and achieve your financial milestones</p>
          </div>
          <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white flex items-center gap-2 mt-4 sm:mt-0">
            <Plus className="w-4 h-4" />
            Create New Goal
          </Button>
        </div>

        {/* Goals Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Total Goals</p>
                <Target className="w-4 h-4 text-emerald-500" />
              </div>
              <p className="text-2xl font-bold text-gray-800">{goals.length}</p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Total Target</p>
                <DollarSign className="w-4 h-4 text-blue-500" />
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {formatCurrency(goals.reduce((sum, goal) => sum + goal.target, 0))}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Total Saved</p>
                <TrendingUp className="w-4 h-4 text-purple-500" />
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {formatCurrency(goals.reduce((sum, goal) => sum + goal.current, 0))}
              </p>
            </CardContent>
          </Card>

          <Card className="bg-white shadow-lg border-0">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-2">
                <p className="text-sm text-gray-600">Monthly SIP</p>
                <Calendar className="w-4 h-4 text-orange-500" />
              </div>
              <p className="text-2xl font-bold text-gray-800">
                {formatCurrency(goals.reduce((sum, goal) => sum + goal.monthlyContribution, 0))}
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Goals Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {goals.map((goal) => {
            const IconComponent = goal.icon;
            const progress = getProgressPercentage(goal.current, goal.target);
            
            return (
              <Card key={goal.id} className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 bg-gradient-to-r from-${goal.color}-500 to-${goal.color}-600 rounded-xl flex items-center justify-center`}>
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <CardTitle className="text-xl">{goal.title}</CardTitle>
                        <p className="text-sm text-gray-600">Target: {formatCurrency(goal.target)}</p>
                      </div>
                    </div>
                    {getStatusBadge(goal.status)}
                  </div>
                </CardHeader>
                
                <CardContent className="space-y-6">
                  {/* Progress */}
                  <div>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm text-gray-600">Progress</span>
                      <span className="text-sm font-semibold">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-3" />
                    <div className="flex justify-between items-center mt-2 text-sm">
                      <span className="text-gray-600">{formatCurrency(goal.current)}</span>
                      <span className="text-gray-600">{formatCurrency(goal.target)}</span>
                    </div>
                  </div>

                  {/* Details */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600">Monthly SIP</p>
                      <p className="font-semibold">{formatCurrency(goal.monthlyContribution)}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">Target Date</p>
                      <p className="font-semibold">{goal.deadline}</p>
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="flex-1">
                      Adjust Goal
                    </Button>
                    <Button size="sm" className="flex-1 bg-gradient-to-r from-emerald-500 to-blue-500 text-white">
                      Add Money
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* AI Recommendations */}
        <Card className="mt-8 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 text-white border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="w-5 h-5" />
              AI Goal Recommendations
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold mb-2">Optimize Car Purchase Goal</h3>
                <p className="text-white/90 text-sm mb-3">
                  Increase monthly contribution by ₹5,000 to meet your deadline comfortably.
                </p>
                <Button variant="secondary" size="sm">
                  Apply Suggestion
                </Button>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold mb-2">New Goal Suggestion</h3>
                <p className="text-white/90 text-sm mb-3">
                  Consider starting a retirement fund goal based on your current savings pattern.
                </p>
                <Button variant="secondary" size="sm">
                  Create Goal
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GoalsPage;
