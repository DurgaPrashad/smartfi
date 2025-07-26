
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Crown, 
  CheckCircle, 
  Sparkles, 
  TrendingUp, 
  Shield,
  Zap,
  Star,
  Clock
} from 'lucide-react';

const PaymentPage = () => {
  const [isProcessing, setIsProcessing] = useState(false);
  const { user, updatePremiumStatus } = useAuth();
  const { toast } = useToast();

  const premiumFeatures = [
    {
      icon: Sparkles,
      title: "Unlimited AI Insights",
      description: "Get unlimited personalized financial recommendations"
    },
    {
      icon: TrendingUp,
      title: "Advanced Analytics",
      description: "Deep portfolio analysis with prediction models"
    },
    {
      icon: Shield,
      title: "Priority Support",
      description: "24/7 premium support with dedicated assistance"
    },
    {
      icon: Zap,
      title: "Real-time Alerts",
      description: "Instant notifications for market opportunities"
    },
    {
      icon: Star,
      title: "Custom Strategies",
      description: "Personalized investment strategies based on your goals"
    },
    {
      icon: Clock,
      title: "Historical Analysis",
      description: "Access to 10+ years of historical market data"
    }
  ];

  const handleUpgrade = async () => {
    setIsProcessing(true);

    try {
      // Simulate Razorpay payment flow
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // In production, this would integrate with Razorpay
      interface RazorpayResponse {
        razorpay_payment_id: string;
        razorpay_order_id?: string;
        razorpay_signature?: string;
      }

      const options = {
        key: "rzp_test_e75mVTVwkTrOHy", // Demo key
        amount: 99900, // ₹999 in paise
        currency: "INR",
        name: "SmartFi Premium",
        description: "Upgrade to Premium Plan",
        handler: function (response: RazorpayResponse) {
          updatePremiumStatus(true);
          toast({
            title: "Welcome to Premium!",
            description: "Your account has been upgraded successfully.",
          });
        },
        prefill: {
          name: user?.name,
          email: user?.email,
        },
        theme: {
          color: "#10B981"
        }
      };

      // Simulate successful payment
      updatePremiumStatus(true);
      toast({
        title: "Welcome to Premium!",
        description: "Your account has been upgraded successfully. Enjoy unlimited AI insights!",
      });

    } catch (error) {
      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  if (user?.isPremium) {
    return (
      <div className="min-h-screen py-12 px-6 flex items-center justify-center">
        <Card className="max-w-2xl w-full bg-gradient-to-br from-emerald-500 to-blue-500 text-white border-0 shadow-2xl">
          <CardHeader className="text-center">
            <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <Crown className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-3xl font-bold">You're Premium!</CardTitle>
            <p className="text-emerald-100">Enjoying all the premium features</p>
          </CardHeader>
          <CardContent className="text-center space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/10 rounded-lg p-4">
                <Sparkles className="w-8 h-8 mx-auto mb-2" />
                <div className="text-sm">Unlimited AI Insights</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <TrendingUp className="w-8 h-8 mx-auto mb-2" />
                <div className="text-sm">Advanced Analytics</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <Shield className="w-8 h-8 mx-auto mb-2" />
                <div className="text-sm">Priority Support</div>
              </div>
              <div className="bg-white/10 rounded-lg p-4">
                <Star className="w-8 h-8 mx-auto mb-2" />
                <div className="text-sm">Custom Strategies</div>
              </div>
            </div>
            <p className="text-emerald-100">
              Thank you for being a premium member! Continue exploring your enhanced dashboard.
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-12">
          <Badge variant="outline" className="mb-4 text-emerald-600 border-emerald-200">
            <Crown className="w-4 h-4 mr-2" />
            Upgrade to Premium
          </Badge>
          <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
            Unlock Your Financial Potential
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get unlimited AI insights, advanced analytics, and personalized investment strategies
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Features Grid */}
          <div className="lg:col-span-2 grid grid-cols-1 md:grid-cols-2 gap-6">
            {premiumFeatures.map((feature, index) => (
              <Card key={index} className="bg-white/80 backdrop-blur-sm border border-white/20 shadow-xl hover:shadow-2xl transition-all duration-300">
                <CardHeader>
                  <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center mb-3">
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-lg font-semibold text-gray-800">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Pricing Card */}
          <div className="lg:col-span-1">
            <Card className="bg-gradient-to-br from-emerald-500 to-blue-500 text-white border-0 shadow-2xl sticky top-8">
              <CardHeader className="text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Crown className="w-8 h-8 text-white" />
                </div>
                <CardTitle className="text-2xl font-bold">Premium Plan</CardTitle>
                <div className="text-4xl font-bold mt-2">₹999</div>
                <div className="text-emerald-100">per month</div>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-3">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-200 flex-shrink-0" />
                    <span className="text-sm">Unlimited AI insights</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-200 flex-shrink-0" />
                    <span className="text-sm">Advanced portfolio analytics</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-200 flex-shrink-0" />
                    <span className="text-sm">Real-time market alerts</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-200 flex-shrink-0" />
                    <span className="text-sm">Custom investment strategies</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-200 flex-shrink-0" />
                    <span className="text-sm">Priority customer support</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-emerald-200 flex-shrink-0" />
                    <span className="text-sm">Historical data access</span>
                  </div>
                </div>

                <Button 
                  onClick={handleUpgrade}
                  disabled={isProcessing}
                  className="w-full bg-white text-emerald-600 hover:bg-gray-100 font-semibold h-12 text-lg"
                >
                  {isProcessing ? "Processing..." : "Upgrade Now"}
                  <Sparkles className="ml-2 w-5 h-5" />
                </Button>

                <div className="text-center">
                  <p className="text-xs text-emerald-100">
                    Cancel anytime • Secure payment by Razorpay
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Trust Section */}
        <div className="mt-16 text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Trusted by Thousands</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="space-y-2">
              <div className="text-3xl font-bold text-emerald-600">50K+</div>
              <div className="text-gray-600">Active Premium Users</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-blue-600">₹1000Cr+</div>
              <div className="text-gray-600">Assets Under Management</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-bold text-purple-600">4.9/5</div>
              <div className="text-gray-600">User Satisfaction</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
