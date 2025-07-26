
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { PieChart, Pie, Cell, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, CreditCard, Lock, AlertCircle, Database } from 'lucide-react';

interface OverviewTabProps {
  data: any;
  isLoading: boolean;
}

const OverviewTab: React.FC<OverviewTabProps> = ({ data, isLoading }) => {

  const formatCurrency = (amount: number) => {
    if (!amount) return '₹0';
    if (amount >= 10000000) {
      return `₹${(amount / 10000000).toFixed(1)}Cr`;
    } else if (amount >= 100000) {
      return `₹${(amount / 100000).toFixed(1)}L`;
    } else {
      return `₹${(amount / 1000).toFixed(0)}K`;
    }
  };

  // Extract data from Fi MCP API responses
  const netWorthData = data?.netWorth?.netWorthResponse;
  const creditData = data?.creditReport?.creditReport;
  const bankData = data?.bankTransactions?.bankTransactions;
  const mutualFundData = data?.mutualFunds?.mutualFundTransactions;
  const epfData = data?.epfDetails?.epfDetails;

  const totalNetWorth = netWorthData?.totalNetWorthValue ? parseInt(netWorthData.totalNetWorthValue.units) : 0;
  const creditScore = creditData?.creditScore || 0;
  const monthlyIncome = bankData?.monthlyAnalytics?.totalIncome || 0;
  const monthlyExpenses = bankData?.monthlyAnalytics?.totalExpenses || 0;

  // Create portfolio breakdown from assets
  const portfolioData = [];
  if (netWorthData?.assetValues) {
    netWorthData.assetValues.forEach((asset: any) => {
      const value = parseInt(asset.value.units);
      let name = '';
      let color = '';
      
      switch (asset.netWorthAttribute) {
        case 'ASSET_TYPE_MUTUAL_FUND':
          name = 'Mutual Funds';
          color = '#10B981';
          break;
        case 'ASSET_TYPE_EPF':
          name = 'EPF';
          color = '#F59E0B';
          break;
        case 'ASSET_TYPE_BANK_SAVINGS':
          name = 'Bank Savings';
          color = '#8B5CF6';
          break;
        case 'ASSET_TYPE_STOCKS_INDIAN':
          name = 'Indian Stocks';
          color = '#3B82F6';
          break;
        case 'ASSET_TYPE_STOCKS_US':
          name = 'US Stocks';
          color = '#EF4444';
          break;
        default:
          name = asset.netWorthAttribute.replace('ASSET_TYPE_', '').replace('_', ' ');
          color = '#6B7280';
      }
      
      if (value > 0) {
        portfolioData.push({ name, value, color });
      }
    });
  }

  if (isLoading) {
    return (
      <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardContent className="p-6">
                <Skeleton className="h-4 w-20 mb-2" />
                <Skeleton className="h-8 w-32 mb-2" />
                <Skeleton className="h-4 w-16" />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <Skeleton className="h-6 w-32" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-64 w-full" />
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  if (!data || Object.keys(data).length === 0) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-center">
          <AlertCircle className="h-12 w-12 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-gray-600 mb-2">No Financial Data Available</h3>
          <p className="text-gray-500">Please ensure you're connected to Fi MCP and try refreshing.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Financial Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="bg-gradient-to-br from-emerald-500 to-emerald-600 text-white border-0 shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-emerald-100 text-sm font-medium">Net Worth</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{formatCurrency(totalNetWorth)}</div>
            <div className="flex items-center mt-2 text-emerald-100">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm">From Fi MCP</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-600 text-sm font-medium">Monthly Savings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800">
              {formatCurrency(monthlyIncome - monthlyExpenses)}
            </div>
            <div className="flex items-center mt-2 text-blue-600">
              <DollarSign className="w-4 h-4 mr-1" />
              <span className="text-sm">{monthlyIncome > 0 ? Math.round(((monthlyIncome - monthlyExpenses) / monthlyIncome) * 100) : 0}% of income</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-600 text-sm font-medium">Monthly Income</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800">
              {formatCurrency(monthlyIncome)}
            </div>
            <div className="flex items-center mt-2 text-purple-600">
              <TrendingUp className="w-4 h-4 mr-1" />
              <span className="text-sm">Bank data</span>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
          <CardHeader className="pb-2">
            <CardTitle className="text-gray-600 text-sm font-medium">Credit Score</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold text-gray-800">
              {creditScore || 'N/A'}
            </div>
            <div className="flex items-center mt-2 text-green-600">
              <CreditCard className="w-4 h-4 mr-1" />
              <span className="text-sm">{creditScore >= 750 ? 'Excellent' : creditScore >= 650 ? 'Good' : creditScore >= 550 ? 'Fair' : creditScore > 0 ? 'Poor' : 'No data'}</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row - Only show if we have data */}
      {portfolioData.length > 0 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Portfolio Distribution */}
          <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-gray-800">Portfolio Distribution</CardTitle>
              <Badge variant="secondary" className="w-fit">
                <Database className="w-3 h-3 mr-1" />
                Fi MCP Data
              </Badge>
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

          {/* Financial Summary */}
          <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
            <CardHeader>
              <CardTitle className="text-gray-800">Financial Summary</CardTitle>
              <Badge variant="secondary" className="w-fit">
                <Database className="w-3 h-3 mr-1" />
                Live Data
              </Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                <span className="text-green-800 font-medium">Monthly Income</span>
                <span className="text-green-800 font-bold">{formatCurrency(monthlyIncome)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                <span className="text-red-800 font-medium">Monthly Expenses</span>
                <span className="text-red-800 font-bold">{formatCurrency(monthlyExpenses)}</span>
              </div>
              <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                <span className="text-blue-800 font-medium">Savings Rate</span>
                <span className="text-blue-800 font-bold">
                  {bankData?.monthlyAnalytics?.savingsRate ? `${bankData.monthlyAnalytics.savingsRate.toFixed(1)}%` : 'N/A'}
                </span>
              </div>
              {mutualFundData?.summary && (
                <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                  <span className="text-purple-800 font-medium">MF Returns</span>
                  <span className="text-purple-800 font-bold">
                    {mutualFundData.summary.totalReturns ? `${mutualFundData.summary.totalReturns.toFixed(1)}%` : 'N/A'}
                  </span>
                </div>
              )}
              {epfData?.summary && (
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-lg">
                  <span className="text-yellow-800 font-medium">EPF Balance</span>
                  <span className="text-yellow-800 font-bold">{formatCurrency(epfData.summary.totalBalance)}</span>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}

      {/* Data Source Footer */}
      <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
        <div className="flex items-center gap-2 text-blue-800 text-sm">
          <Database className="w-4 h-4" />
          <span className="font-medium">Data Source:</span>
          <code className="bg-blue-100 px-2 py-1 rounded text-xs">
            https://fi-mcp-dev-production.up.railway.app
          </code>
        </div>
        <p className="text-blue-700 text-xs mt-2">
          ✅ All financial data is fetched live from Railway Fi MCP API - No local demo data used
        </p>
      </div>
    </div>
  );
};

export default OverviewTab;
