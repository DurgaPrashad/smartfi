
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  Shield, 
  Users, 
  Award, 
  TrendingUp, 
  Brain,
  Globe,
  Clock
} from 'lucide-react';

const AboutPage = () => {
  const stats = [
    { icon: Users, label: "Active Users", value: "50K+" },
    { icon: TrendingUp, label: "Assets Tracked", value: "₹1000Cr+" },
    { icon: Award, label: "AI Accuracy", value: "95%" },
    { icon: Globe, label: "Countries", value: "15+" }
  ];

  const team = [
    {
      name: "AI Financial Engine",
      role: "Powered by Google Gemini",
      description: "Advanced machine learning algorithms that analyze market trends and provide personalized insights"
    },
    {
      name: "Security Framework",
      role: "Bank-level Protection",
      description: "End-to-end encryption and secure data handling with compliance to global financial standards"
    },
    {
      name: "Analytics Platform",
      role: "Real-time Processing",
      description: "Lightning-fast data processing and visualization for instant financial insights"
    }
  ];

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-6 text-emerald-600 border-emerald-200">
            <Sparkles className="w-4 h-4 mr-2" />
            About SmartFi
          </Badge>
          
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Revolutionizing Personal Finance
            <br />
            with Artificial Intelligence
          </h1>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            SmartFi combines cutting-edge AI technology with financial expertise to provide 
            personalized insights, automated portfolio management, and intelligent investment strategies 
            that adapt to your unique financial goals.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <Card key={index} className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl text-center">
              <CardContent className="pt-6">
                <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
                <div className="text-2xl font-bold text-gray-800 mb-1">{stat.value}</div>
                <div className="text-sm text-gray-600">{stat.label}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Mission Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6 text-gray-800">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              We believe everyone deserves access to sophisticated financial intelligence. Our mission is to 
              democratize financial expertise through AI, making advanced portfolio management and investment 
              strategies accessible to everyone, regardless of their financial background.
            </p>
            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <Shield className="w-6 h-6 text-emerald-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">Security First</h3>
                  <p className="text-gray-600">Your financial data is protected with bank-level security and encryption.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Brain className="w-6 h-6 text-blue-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">AI-Powered Insights</h3>
                  <p className="text-gray-600">Advanced machine learning provides personalized financial recommendations.</p>
                </div>
              </div>
              <div className="flex items-start space-x-3">
                <Clock className="w-6 h-6 text-purple-500 mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-800">Real-time Analysis</h3>
                  <p className="text-gray-600">Get instant insights and updates on your financial portfolio.</p>
                </div>
              </div>
            </div>
          </div>
          
          <Card className="bg-gradient-to-br from-emerald-500 to-blue-500 text-white border-0 shadow-2xl">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                Why Choose SmartFi?
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Personalized AI financial advisor</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Automated portfolio optimization</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Goal-based investment planning</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Risk assessment and management</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>Tax optimization strategies</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                  <span>24/7 market monitoring</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Technology Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">Powered by Advanced Technology</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader className="text-center">
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    {member.name}
                  </CardTitle>
                  <Badge variant="secondary" className="mx-auto">
                    {member.role}
                  </Badge>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 text-center">{member.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Values Section */}
        <Card className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl">
          <CardHeader className="text-center">
            <CardTitle className="text-2xl font-bold text-gray-800">Our Core Values</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Transparency</h3>
                <p className="text-gray-600">Clear, honest communication about your financial data and our AI recommendations.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Innovation</h3>
                <p className="text-gray-600">Continuously improving our AI algorithms to provide better financial insights.</p>
              </div>
              <div>
                <h3 className="font-bold text-lg text-gray-800 mb-2">Empowerment</h3>
                <p className="text-gray-600">Giving you the tools and knowledge to make confident financial decisions.</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
