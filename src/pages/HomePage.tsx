
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  TrendingUp, 
  Shield, 
  Zap, 
  Brain, 
  BarChart3, 
  Target, 
  MessageCircle,
  CheckCircle,
  ArrowRight,
  Star,
  Users,
  Award
} from 'lucide-react';

const HomePage = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Insights",
      description: "Get personalized financial advice powered by advanced AI technology",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: BarChart3,
      title: "Portfolio Analysis", 
      description: "Comprehensive analysis of your investments and SIP performance",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Target,
      title: "Goal Planning",
      description: "Smart goal tracking and achievement strategies",
      gradient: "from-emerald-500 to-teal-500"
    },
    {
      icon: Shield,
      title: "Secure & Private",
      description: "Bank-level security with end-to-end encryption",
      gradient: "from-orange-500 to-red-500"
    }
  ];

  const benefits = [
    "Real-time portfolio tracking",
    "AI-driven investment recommendations", 
    "Automated expense categorization",
    "Goal-based financial planning",
    "Risk assessment and optimization",
    "Tax optimization strategies"
  ];

  const stats = [
    { icon: Users, label: "Active Users", value: "50K+", color: "text-blue-600" },
    { icon: TrendingUp, label: "Assets Tracked", value: "₹1000Cr+", color: "text-emerald-600" },
    { icon: Award, label: "AI Accuracy", value: "95%", color: "text-purple-600" },
    { icon: Star, label: "User Rating", value: "4.9/5", color: "text-orange-500" }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative py-24 px-6 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
          <div className="absolute inset-0 opacity-50" style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.05'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
          }}></div>
        </div>
        
        <div className="container mx-auto max-w-6xl text-center relative z-10">
          <div className="animate-fade-in">
            <Badge variant="outline" className="mb-8 text-emerald-600 border-emerald-200 bg-white/80 backdrop-blur-sm px-6 py-2 text-sm font-semibold">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Financial Intelligence
            </Badge>
            
            <h1 className="text-6xl md:text-7xl font-bold mb-8 leading-tight">
              <span className="bg-gradient-to-r from-emerald-600 via-blue-600 to-purple-600 bg-clip-text text-transparent">
                Let AI Speak to
              </span>
              <br />
              <span className="bg-gradient-to-r from-purple-600 via-pink-600 to-orange-600 bg-clip-text text-transparent">
                Your Money
              </span>
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
              Connect your financial life and get personalized insights powered by Gemini. 
              Transform your financial future with AI-driven strategies and automated portfolio management.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link to="/signin">
                <Button size="lg" className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white text-lg px-10 py-4 h-14 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
                  Get Started Free
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </Link>
              <Link to="/about">
                <Button variant="outline" size="lg" className="text-lg px-10 py-4 h-14 border-2 hover:bg-gray-50 transition-all duration-300">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>

          {/* Stats Section */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 max-w-4xl mx-auto">
            {stats.map((stat, index) => (
              <div key={index} className="text-center animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
                <div className={`w-12 h-12 mx-auto mb-3 flex items-center justify-center rounded-full bg-white shadow-lg ${stat.color}`}>
                  <stat.icon className="w-6 h-6" />
                </div>
                <div className="text-3xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-bold mb-6 text-gray-800">
              Intelligent Financial Management
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Our AI-powered platform provides comprehensive financial insights and personalized recommendations
              that adapt to your unique financial goals and risk profile.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="group bg-white border-0 shadow-lg hover:shadow-2xl transition-all duration-500 hover:-translate-y-2 overflow-hidden relative">
                <div className={`absolute inset-0 bg-gradient-to-br ${feature.gradient} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}></div>
                <CardHeader className="text-center pb-4 relative z-10">
                  <div className={`w-20 h-20 bg-gradient-to-r ${feature.gradient} rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className="w-10 h-10 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-800 mb-3">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="relative z-10">
                  <p className="text-gray-600 text-center leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-6 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8">
              <h2 className="text-5xl font-bold text-gray-800 leading-tight">
                Everything You Need for
                <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent"> Financial Success</span>
              </h2>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-center space-x-4 p-3 rounded-lg hover:bg-white/50 transition-colors duration-200">
                    <div className="w-8 h-8 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-full flex items-center justify-center flex-shrink-0">
                      <CheckCircle className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-gray-700 text-lg">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <Card className="bg-gradient-to-br from-emerald-500 via-blue-500 to-purple-500 text-white border-0 shadow-2xl transform hover:scale-105 transition-transform duration-300">
              <CardHeader className="text-center pb-6">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <CardTitle className="text-3xl font-bold">
                  Start Your Financial Journey
                </CardTitle>
                <p className="text-white/90 text-lg mt-2">Join thousands of users already improving their financial health</p>
              </CardHeader>
              <CardContent className="text-center space-y-8">
                <div className="space-y-3">
                  <div className="text-5xl font-bold">₹0</div>
                  <div className="text-xl text-white/90">Free Forever Plan</div>
                </div>
                <div className="space-y-4">
                  {["Basic portfolio tracking", "AI insights (limited)", "Goal setting", "Security & privacy"].map((feature, index) => (
                    <div key={index} className="flex items-center justify-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-white/80" />
                      <span className="text-white/90">{feature}</span>
                    </div>
                  ))}
                </div>
                <Link to="/signin">
                  <Button className="w-full bg-white text-emerald-600 hover:bg-gray-100 font-bold text-lg py-4 h-14 shadow-lg hover:shadow-xl transition-all duration-300">
                    Get Started Now
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6 bg-gradient-to-r from-emerald-500 via-blue-500 to-purple-500 relative overflow-hidden">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="container mx-auto max-w-4xl text-center text-white relative z-10">
          <h2 className="text-5xl font-bold mb-8 leading-tight">
            Ready to Transform Your Finances?
          </h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            Join thousands of users who have already improved their financial health with our AI-powered platform
          </p>
          <Link to="/signin">
            <Button size="lg" className="bg-white text-emerald-600 hover:bg-gray-100 text-xl px-12 py-6 h-16 font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105">
              Start Your Free Journey
              <Sparkles className="ml-3 w-6 h-6" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
