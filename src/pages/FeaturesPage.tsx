
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Brain, 
  BarChart3, 
  Target, 
  Shield, 
  Zap, 
  TrendingUp,
  MessageCircle,
  PieChart,
  Bell,
  Crown,
  CheckCircle,
  ArrowRight
} from 'lucide-react';

const FeaturesPage = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Get personalized financial advice powered by advanced AI technology that learns from your spending patterns.",
      benefits: ["Personalized recommendations", "Smart spending analysis", "Investment suggestions", "Risk assessment"],
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Portfolio Analysis", 
      description: "Comprehensive analysis of your investments and SIP performance with real-time tracking.",
      benefits: ["Real-time tracking", "Performance metrics", "Diversification analysis", "Historical trends"],
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      title: "Goal Planning",
      description: "Smart goal tracking and achievement strategies with automated savings recommendations.",
      benefits: ["Goal tracking", "Savings automation", "Progress monitoring", "Achievement rewards"],
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: MessageCircle,
      title: "AI Financial Assistant",
      description: "Chat with our AI assistant for instant financial advice and portfolio insights.",
      benefits: ["24/7 availability", "Instant responses", "Contextual advice", "Learning capability"],
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: PieChart,
      title: "Advanced Analytics",
      description: "Deep dive into your financial data with comprehensive analytics and reporting.",
      benefits: ["Detailed reports", "Trend analysis", "Comparative metrics", "Export options"],
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Shield,
      title: "Security & Privacy",
      description: "Bank-level security with end-to-end encryption to protect your financial data.",
      benefits: ["End-to-end encryption", "Secure storage", "Privacy controls", "Compliance certified"],
      gradient: "from-gray-600 to-gray-800"
    }
  ];

  const premiumFeatures = [
    "Unlimited AI conversations",
    "Advanced portfolio analytics",
    "Custom goal tracking",
    "Priority customer support",
    "Export to multiple formats",
    "Advanced risk assessment"
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      {/* Hero Section */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-4xl text-center">
          <Badge variant="outline" className="mb-8 text-emerald-600 border-emerald-200 bg-white/80 backdrop-blur-sm px-6 py-2 text-sm font-semibold">
            <Zap className="w-4 h-4 mr-2" />
            Powerful Features
          </Badge>
          
          <h1 className="text-5xl md:text-6xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
              Everything You Need for
            </span>
            <br />
            <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
              Financial Success
            </span>
          </h1>
          
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Discover how our AI-powered platform transforms your financial management 
            with intelligent insights and automated tools.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                <CardHeader className="text-center pb-4 relative z-10">
                  <div className={`w-16 h-16 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800 mb-3">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10 space-y-4">
                  <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <span className="text-sm text-gray-600">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Premium Features Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-500">
        <div className="container mx-auto max-w-4xl text-center text-white">
          <Crown className="w-16 h-16 mx-auto mb-8 text-yellow-300" />
          <h2 className="text-4xl font-bold mb-8">Premium Features</h2>
          <p className="text-xl mb-12 opacity-90">
            Unlock the full potential of SmartFi with our premium features
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {premiumFeatures.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white/10 backdrop-blur-sm rounded-lg p-4">
                <CheckCircle className="w-5 h-5 text-yellow-300 flex-shrink-0" />
                <span className="text-white">{feature}</span>
              </div>
            ))}
          </div>
          
          <Link to="/payment">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-lg px-10 py-4 h-14 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              Upgrade to Premium
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="text-4xl font-bold mb-8 text-gray-800">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-gray-600 mb-12">
            Join thousands of users who have transformed their financial future with SmartFi
          </p>
          <Link to="/signin">
            <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white text-lg px-10 py-4 h-14 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              Start Your Free Journey
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;
