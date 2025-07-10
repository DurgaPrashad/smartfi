
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Target, Plus, Crown, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const GoalsTab = () => {
  const { user } = useAuth();

  const goals = [
    { 
      name: 'Emergency Fund', 
      target: 500000, 
      current: 500000, 
      progress: 100,
      icon: '🛡️',
      priority: 'High',
      timeline: 'Completed'
    },
    { 
      name: 'House Down Payment', 
      target: 2000000, 
      current: 800000, 
      progress: 40,
      icon: '🏠',
      priority: 'High',
      timeline: '2 years left'
    },
    { 
      name: 'Retirement Corpus', 
      target: 50000000, 
      current: 2100000, 
      progress: 4.2,
      icon: '🏖️',
      priority: 'Medium',
      timeline: '25 years left'
    },
    { 
      name: 'Child Education', 
      target: 3000000, 
      current: 450000, 
      progress: 15,
      icon: '🎓',
      priority: 'Medium',
      timeline: '12 years left'
    }
  ];

  const formatCurrency = (amount: number) => {
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    } else {
      return `₹${(amount / 1000).toFixed(0)}K`;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Financial Goals</h2>
          <p className="text-gray-600">Track your progress towards financial milestones</p>
        </div>
        <div className="flex space-x-3">
          {!user?.isPremium && (
            <Link to="/payment">
              <Button variant="outline" className="border-emerald-200 text-emerald-600 hover:bg-emerald-50">
                <Crown className="w-4 h-4 mr-2" />
                Unlock Smart Goals
              </Button>
            </Link>
          )}
          <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
            <Plus className="w-4 h-4 mr-2" />
            Add Goal
          </Button>
        </div>
      </div>

      {/* Goals Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {goals.map((goal, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="text-2xl">{goal.icon}</div>
                  <div>
                    <CardTitle className="text-lg font-semibold text-gray-800">
                      {goal.name}
                    </CardTitle>
                    <div className="flex items-center space-x-2 mt-1">
                      <Badge variant={goal.priority === 'High' ? 'destructive' : 'secondary'} className="text-xs">
                        {goal.priority}
                      </Badge>
                      <span className="text-xs text-gray-500">{goal.timeline}</span>
                    </div>
                  </div>
                </div>
                <Badge variant={goal.progress === 100 ? "default" : "secondary"} className={
                  goal.progress === 100 ? "bg-emerald-500" : ""
                }>
                  {goal.progress}%
                </Badge>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Current:</span>
                  <span className="font-medium">{formatCurrency(goal.current)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Target:</span>
                  <span className="font-medium">{formatCurrency(goal.target)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Remaining:</span>
                  <span className="font-medium text-emerald-600">{formatCurrency(goal.target - goal.current)}</span>
                </div>
              </div>
              
              <Progress 
                value={Math.min(goal.progress, 100)} 
                className="h-3"
              />

              {user?.isPremium && (
                <div className="bg-emerald-50 rounded-lg p-3 mt-4">
                  <h4 className="font-semibold text-emerald-800 text-sm mb-1">AI Recommendation</h4>
                  <p className="text-emerald-700 text-xs">
                    {goal.name === 'House Down Payment' && "Increase SIP by ₹5,000/month to reach goal 6 months earlier."}
                    {goal.name === 'Retirement Corpus' && "Consider increasing equity allocation to 70% for better long-term returns."}
                    {goal.name === 'Child Education' && "Start a dedicated education fund with tax-saving ELSS funds."}
                    {goal.name === 'Emergency Fund' && "🎉 Congratulations! Goal achieved. Consider investing surplus in liquid funds."}
                  </p>
                </div>
              )}

              {!user?.isPremium && index > 1 && (
                <div className="bg-gray-50 rounded-lg p-3 mt-4 flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <Lock className="w-4 h-4 text-gray-400" />
                    <span className="text-sm text-gray-600">Unlock AI insights</span>
                  </div>
                  <Link to="/payment">
                    <Button size="sm" variant="outline" className="text-xs">
                      Upgrade
                    </Button>
                  </Link>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Goal Planning Section */}
      {user?.isPremium ? (
        <Card className="bg-gradient-to-br from-emerald-500 to-blue-500 text-white border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold flex items-center">
              <Target className="w-6 h-6 mr-2" />
              Smart Goal Planning
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">₹25,000</div>
                <div className="text-emerald-100 text-sm">Monthly investment needed for all goals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">8.5 years</div>
                <div className="text-emerald-100 text-sm">Average timeline to achieve goals</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold mb-1">12%</div>
                <div className="text-emerald-100 text-sm">Required annual return rate</div>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
          <CardContent className="text-center py-12">
            <Target className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Unlock Smart Goal Planning</h3>
            <p className="text-gray-600 mb-6">Get AI-powered goal optimization, timeline predictions, and investment strategies tailored to your objectives.</p>
            <Link to="/payment">
              <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
                <Crown className="w-4 h-4 mr-2" />
                Upgrade to Premium
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default GoalsTab;
