
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, TrendingDown, DollarSign, PieChart, Plus, Filter, Download } from 'lucide-react';

const InvestmentsPage = () => {
  const portfolioStats = [
    { label: "Total Portfolio Value", value: "₹2,45,680", change: "+12.5%", trend: "up" },
    { label: "Monthly SIP", value: "₹15,000", change: "+5.2%", trend: "up" },
    { label: "Returns (1Y)", value: "₹28,450", change: "+15.8%", trend: "up" },
    { label: "Today's P&L", value: "₹1,240", change: "-2.1%", trend: "down" }
  ];

  const investments = [
    {
      name: "HDFC Top 100 Fund",
      type: "Large Cap",
      invested: "₹85,000",
      current: "₹95,600",
      returns: "+12.5%",
      trend: "up"
    },
    {
      name: "Axis Bluechip Fund",
      type: "Large Cap",
      invested: "₹65,000",
      current: "₹68,900",
      returns: "+6.0%",
      trend: "up"
    },
    {
      name: "Mirae Asset Emerging Bluechip",
      type: "Mid Cap",
      invested: "₹45,000",
      current: "₹52,180",
      returns: "+15.9%",
      trend: "up"
    },
    {
      name: "SBI Small Cap Fund",
      type: "Small Cap",
      invested: "₹30,000",
      current: "₹29,000",
      returns: "-3.3%",
      trend: "down"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50 p-6">
      <div className="container mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">Investment Portfolio</h1>
            <p className="text-gray-600">Track and manage your investment portfolio</p>
          </div>
          <div className="flex flex-wrap gap-3 mt-4 sm:mt-0">
            <Button variant="outline" className="flex items-center gap-2">
              <Filter className="w-4 h-4" />
              Filter
            </Button>
            <Button variant="outline" className="flex items-center gap-2">
              <Download className="w-4 h-4" />
              Export
            </Button>
            <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white flex items-center gap-2">
              <Plus className="w-4 h-4" />
              Add Investment
            </Button>
          </div>
        </div>

        {/* Portfolio Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {portfolioStats.map((stat, index) => (
            <Card key={index} className="bg-white shadow-lg border-0 hover:shadow-xl transition-shadow duration-300">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  {stat.trend === "up" ? (
                    <TrendingUp className="w-4 h-4 text-emerald-500" />
                  ) : (
                    <TrendingDown className="w-4 h-4 text-red-500" />
                  )}
                </div>
                <p className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</p>
                <p className={`text-sm ${stat.trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
                  {stat.change}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Investments List */}
        <Card className="bg-white shadow-lg border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <PieChart className="w-5 h-5 text-emerald-600" />
              Your Investments
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {investments.map((investment, index) => (
                <div key={index} className="flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div className="flex-1 mb-4 sm:mb-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-semibold text-gray-800">{investment.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        {investment.type}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                      <span>Invested: <span className="font-medium">{investment.invested}</span></span>
                      <span>Current: <span className="font-medium">{investment.current}</span></span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <p className={`font-semibold ${investment.trend === "up" ? "text-emerald-600" : "text-red-600"}`}>
                        {investment.returns}
                      </p>
                    </div>
                    {investment.trend === "up" ? (
                      <TrendingUp className="w-5 h-5 text-emerald-500" />
                    ) : (
                      <TrendingDown className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white border-0 hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              <Plus className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h3 className="text-xl font-semibold mb-2">Start New SIP</h3>
              <p className="text-white/80 mb-4">Begin systematic investment with AI recommendations</p>
              <Button variant="secondary" className="w-full">
                Get Started
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              <PieChart className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h3 className="text-xl font-semibold mb-2">Portfolio Review</h3>
              <p className="text-white/80 mb-4">Get AI-powered portfolio analysis and suggestions</p>
              <Button variant="secondary" className="w-full">
                Review Now
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-orange-500 to-red-500 text-white border-0 hover:shadow-xl transition-shadow duration-300">
            <CardContent className="p-6 text-center">
              <DollarSign className="w-12 h-12 mx-auto mb-4 text-white/80" />
              <h3 className="text-xl font-semibold mb-2">Tax Optimizer</h3>
              <p className="text-white/80 mb-4">Optimize your investments for tax savings</p>
              <Button variant="secondary" className="w-full">
                Optimize
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default InvestmentsPage;
