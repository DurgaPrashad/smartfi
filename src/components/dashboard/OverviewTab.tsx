
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Lock } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

const OverviewTab = () => {
  const { user } = useAuth();

  // Mock financial data - would come from Fi MCP API
  const financialData = {
    netWorth: 2100000,
    monthlyIncome: 85000,
    monthlyExpenses: 65000,
    monthlyInvestments: 15000,
    creditScore: 780
  };

  const portfolioData = [
    { name: 'Mutual Funds', value: 750000, color: '#10B981' },
    { name: 'Stocks', value: 400000, color: '#3B82F6' },
    { name: 'Bank Balance', value: 500000, color: '#8B5CF6' },
    { name: 'EPF', value: 350000, color: '#F59E0B' },
    { name: 'Fixed Deposits', value: 100000, color: '#EF4444' }
  ];

  const netWorthTrend = [
    { month: 'Jan', value: 1800000 },
    { month: 'Feb', value: 1850000 },
    { month: 'Mar', value: 1920000 },
    { month: 'Apr', value: 1980000 },
    { month: 'May', value: 2050000 },
    { month: 'Jun', value: 2100000 }
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
      {/* Welcome Section */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">Welcome back, {user?.name}!</h2>
          <p className="text-gray-600">Here's your financial overview</p>
        </div>
        <Badge variant={user?.isPremium ? "default" : "secondary"} className={user?.isPremium ? "bg-gradient-to-r from-emerald-500 to-blue-500" : ""}>
          {user?.isPremium ? "Premium" : "Free Plan"}
        </Badge>
      </div>

      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-emerald-100 text-sm font-medium">Net Worth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(financialData.netWorth)}</div>
            <div className="flex items-center mt-2 text-emerald-100">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm">+8.2% this month</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-600 text-sm font-medium">Monthly Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800">
              {formatCurrency(financialData.monthlyIncome - financialData.monthlyExpenses)}
            </div>
            <div className="flex items-center mt-2 text-blue-600">
              <DollarSign className="w-4 h-4 mr-1" />
              <span className="text-sm">23.5% of income</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-600 text-sm font-medium">Monthly Investments</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800">
              {formatCurrency(financialData.monthlyInvestments)}
            </div>
            <div className="flex items-center mt-2 text-purple-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm">17.6% of income</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-600 text-sm font-medium">Credit Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800">
              {financialData.creditScore}
            </div>
            <div className="flex items-center mt-2 text-green-600">
              <CreditCard className="w-4 h-4 mr-1" />
              <span className="text-sm">Excellent</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Portfolio Distribution */}
        <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-gray-800">Portfolio Distribution</CardTitle>
            {!user?.isPremium && (
              <Badge variant="secondary" className="w-fit">
                <Lock className="w-3 h-3 mr-1" />
                Limited View
              </Badge>
            )}
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={portfolioData}
                  cx="50%"
                  cy="50%"
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {portfolioData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Net Worth Trend */}
        <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
          <CardHeader>
            <CardTitle className="text-gray-800">Net Worth Trend</CardTitle>
            {!user?.isPremium && (
              <Badge variant="secondary" className="w-fit">
                <Lock className="w-3 h-3 mr-1" />
                Last 6 months only
              </Badge>
            )}
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={netWorthTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e0e7ff" />
                <XAxis dataKey="month" stroke="#6b7280" />
                <YAxis stroke="#6b7280" tickFormatter={(value) => formatCurrency(value)} />
                <Tooltip formatter={(value) => formatCurrency(value as number)} />
                <Line 
                  type="monotone" 
                  dataKey="value" 
                  stroke="#10B981" 
                  strokeWidth={3}
                  dot={{ fill: '#10B981', strokeWidth: 2, r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewTab;
