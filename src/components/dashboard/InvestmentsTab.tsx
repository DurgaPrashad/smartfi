
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { TrendingUp, TrendingDown, Lock, Crown } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';

const InvestmentsTab = () => {
  const { user } = useAuth();

  const sipPerformance = [
    { name: 'Axis Bluechip Fund', invested: 60000, current: 68000, returns: 13.3 },
    { name: 'HDFC Midcap Fund', invested: 45000, current: 47700, returns: 6.0 },
    { name: 'SBI Small Cap Fund', invested: 30000, current: 34500, returns: 15.0 },
    { name: 'ICICI Focused Fund', invested: 25000, current: 27250, returns: 9.0 }
  ];

  const formatCurrency = (amount: number) => {
    if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    } else {
      return `₹${(amount / 1000).toFixed(0)}K`;
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Investment Portfolio</h2>
          <p className="text-gray-600">Track your SIP performance and investment returns</p>
        </div>
        {!user?.isPremium && (
          <Link to="/payment">
            <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600">
              <Crown className="w-4 h-4 mr-2" />
              Upgrade for Full Analysis
            </Button>
          </Link>
        )}
      </div>

      {/* SIP Performance Chart */}
      <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
        <CardHeader>
          <CardTitle className="text-gray-800">SIP Performance Analysis</CardTitle>
          {!user?.isPremium && (
            <Badge variant="secondary" className="w-fit">
              <Lock className="w-3 h-3 mr-1" />
              Premium feature - Limited view
            </Badge>
          )}
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart data={sipPerformance}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
              <XAxis dataKey="name" stroke="#6b7280" />
              <YAxis stroke="#6b7280" tickFormatter={(value) => formatCurrency(value)} />
              <Tooltip formatter={(value) => formatCurrency(value as number)} />
              <Legend />
              <Bar dataKey="invested" fill="#8B5CF6" name="Invested Amount" />
              <Bar dataKey="current" fill="#10B981" name="Current Value" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Individual SIP Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {sipPerformance.map((sip, index) => (
          <Card key={index} className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">{sip.name}</CardTitle>
              {!user?.isPremium && index > 1 && (
                <div className="absolute inset-0 bg-white/90 flex items-center justify-center rounded-lg">
                  <div className="text-center">
                    <Lock className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                    <p className="text-sm text-gray-600">Premium Only</p>
                  </div>
                </div>
              )}
            </CardHeader>
            <CardContent className="relative">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Invested:</span>
                  <span className="font-medium">{formatCurrency(sip.invested)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Current:</span>
                  <span className="font-medium">{formatCurrency(sip.current)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span>Returns:</span>
                  <span className={`font-bold flex items-center ${
                    sip.returns >= 10 ? 'text-emerald-600' : 
                    sip.returns >= 5 ? 'text-yellow-600' : 'text-red-500'
                  }`}>
                    {sip.returns >= 5 ? <TrendingUp className="w-3 h-3 mr-1" /> : <TrendingDown className="w-3 h-3 mr-1" />}
                    {sip.returns > 0 ? '+' : ''}{sip.returns}%
                  </span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Investment Insights */}
      {user?.isPremium ? (
        <Card className="bg-gradient-to-br from-emerald-500 to-blue-500 text-white border-0 shadow-xl">
          <CardHeader>
            <CardTitle className="text-xl font-bold">AI Investment Insights</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold mb-2">Top Performer</h3>
                <p className="text-emerald-100">SBI Small Cap Fund is your best performer with 15% returns. Consider increasing allocation.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Underperformer Alert</h3>
                <p className="text-emerald-100">HDFC Midcap Fund is underperforming. Consider rebalancing your portfolio.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Diversification Score</h3>
                <p className="text-emerald-100">Your portfolio is well-diversified across market caps. Maintain current allocation.</p>
              </div>
              <div>
                <h3 className="font-semibold mb-2">Risk Assessment</h3>
                <p className="text-emerald-100">Medium risk profile. Consider adding debt funds for stability.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
          <CardContent className="text-center py-12">
            <Lock className="w-16 h-16 mx-auto mb-4 text-gray-400" />
            <h3 className="text-xl font-semibold text-gray-800 mb-2">Unlock Advanced Analytics</h3>
            <p className="text-gray-600 mb-6">Get AI-powered investment insights, portfolio optimization, and personalized recommendations.</p>
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

export default InvestmentsTab;
