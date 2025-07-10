
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  PieChart, 
  BarChart3, 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Target,
  Download,
  Calendar,
  Filter
} from 'lucide-react';

const AnalyticsPage = () => {
  const analyticsCards = [
    {
      title: "Portfolio Growth",
      value: "₹2,45,680",
      change: "+15.8%",
      trend: "up",
      icon: TrendingUp,
      color: "emerald"
    },
    {
      title: "Monthly Expenses",
      value: "₹45,200",
      change: "-5.2%",
      trend: "down",
      icon: DollarSign,
      color: "blue"
    },
    {
      title: "Goal Achievement",
      value: "68%",
      change: "+12%",
      trend: "up",
      icon: Target,
      color: "purple"
    },
    {
      title: "Investment Returns",
      value: "₹28,450",
      change: "+18.3%",
      trend: "up",
      icon: BarChart3,
      color: "orange"
    }
  ];

  const assetAllocation = [
    { category: "Equity Funds", amount: "₹1,45,000", percentage: 59, color: "emerald" },
    { category: "Debt Funds", amount: "₹65,000", percentage: 26, color: "blue" },
    { category: "Gold ETF", amount: "₹25,000", percentage: 10, color: "yellow" },
    { category: "Cash", amount: "₹10,680", percentage: 5, color: "gray" }
  ];

  const monthlyData = [
    { month: "Jan", income: 85000, expenses: 45000, savings: 40000 },
    { month: "Feb", income: 85000, expenses: 42000, savings: 43000 },
    { month: "Mar", income: 90000, expenses: 48000, savings: 42000 },
    { month: "Apr", income: 85000, expenses: 44000, savings: 41000 },
    { month: "May", income: 95000, expenses: 46000, savings: 49000 },
    { month: "Jun", income: 85000, expenses: 45200, savings: 39800 }
  ];

  const topPerformers = [
    { name: "Axis Bluechip Fund", returns: "18.5%", amount: "₹68,900" },
    { name: "HDFC Top 100 Fund", returns: "15.2%", amount: "₹95,600" },
    { name: "Mirae Asset Emerging", returns: "22.8%", amount: "₹52,180" }
  ];

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
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Analytics Dashboard</h1>
            <p className="text-gray-600">Comprehensive insights into your financial performance</p>
          </div>
          <div className="flex flex-wrap gap-3 mt-4 sm:mt-0">
            <Button variant="outline" className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              This Month
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export Report
            </Button>
          </div>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {analyticsCards.map((card, index) => {
            const IconComponent = card.icon;
            return (
              <Card key={index} className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 bg-gradient-to-r from-${card.color}-500 to-${card.color}-600 rounded-xl flex items-center justify-center`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    {card.trend === "up" ? (
                      <TrendingUp className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                  <h3 className="text-sm text-gray-600 mb-1">{card.title}</h3>
                  <p className="text-2xl font-bold text-gray-800 mb-1">{card.value}</p>
                  <p className={`text-sm ${card.trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
                    {card.change} from last month
                  </p>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Asset Allocation */}
          <Card className="bg-white shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-emerald-600" />
                Asset Allocation
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {assetAllocation.map((asset, index) => (
                  <div key={index} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className={`w-4 h-4 bg-${asset.color}-500 rounded-full`}></div>
                      <span className="text-sm font-medium">{asset.category}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{asset.amount}</p>
                      <p className="text-xs text-gray-600">{asset.percentage}%</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Top Performers */}
          <Card className="bg-white shadow-lg border-0">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-emerald-600" />
                Top Performers
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topPerformers.map((performer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <p className="font-medium text-gray-800">{performer.name}</p>
                      <p className="text-sm text-gray-600">{performer.amount}</p>
                    </div>
                    <Badge className="bg-emerald-100 text-emerald-800">
                      {performer.returns}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Monthly Trends */}
        <Card className="bg-white shadow-lg border-0 mb-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-emerald-600" />
              Monthly Income vs Expenses
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {monthlyData.map((data, index) => (
                <div key={index} className="grid grid-cols-4 gap-4 p-4 bg-gray-50 rounded-lg">
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Month</p>
                    <p className="font-semibold">{data.month}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Income</p>
                    <p className="font-semibold text-emerald-600">{formatCurrency(data.income)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Expenses</p>
                    <p className="font-semibold text-red-600">{formatCurrency(data.expenses)}</p>
                  </div>
                  <div className="text-center">
                    <p className="text-sm text-gray-600">Savings</p>
                    <p className="font-semibold text-blue-600">{formatCurrency(data.savings)}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* AI Insights */}
        <Card className="bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 text-white border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5" />
              AI-Powered Insights
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold mb-2">Portfolio Optimization</h3>
                <p className="text-white/90 text-sm mb-3">
                  Your equity allocation is optimal. Consider increasing debt fund allocation by 5% for better risk management.
                </p>
                <Button variant="secondary" size="sm">
                  View Details
                </Button>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <h3 className="font-semibold mb-2">Expense Analysis</h3>
                <p className="text-white/90 text-sm mb-3">
                  Your monthly expenses decreased by 5.2%. Great job! Consider investing the saved amount in your emergency fund.
                </p>
                <Button variant="secondary" size="sm">
                  Apply Suggestion
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AnalyticsPage;
