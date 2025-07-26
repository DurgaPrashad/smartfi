
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SignIn, useUser } from '@clerk/clerk-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useAuth } from '@/contexts/AuthContext';
import { useFiMCP } from '@/contexts/FiMCPContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  Chrome,
  Shield,
  Zap,
  Database,
  Users
} from 'lucide-react';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [authMode, setAuthMode] = useState<'clerk' | 'demo'>('clerk');
  const [selectedPhoneNumber, setSelectedPhoneNumber] = useState('');
  const { login } = useAuth();
  const { isSignedIn } = useUser();
  const { switchToDemo, isDemoMode } = useFiMCP();
  const { toast } = useToast();
  const navigate = useNavigate();

  // Demo phone numbers with descriptions
  const demoAccounts = [
    { phone: '2222222222', description: 'Complete Portfolio - All assets connected with large mutual fund portfolio' },
    { phone: '7777777777', description: 'Debt-Heavy Profile - High debt, poor performance scenario' },
    { phone: '8888888888', description: 'SIP Investor - Consistent monthly SIP investor profile' },
    { phone: '9999999999', description: 'Conservative Investor - Fixed income fanatic with low-risk investments' },
    { phone: '1010101010', description: 'Gold Investor - High allocation to precious metals' },
    { phone: '5555555555', description: 'No Credit Score - All assets except credit report' },
    { phone: '1111111111', description: 'Minimal Assets - Only savings account balance' },
  ];

  React.useEffect(() => {
    if (isSignedIn || isDemoMode) {
      navigate('/dashboard');
    }
  }, [isSignedIn, isDemoMode, navigate]);

  const handleEmailSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Demo login - in production, this would be a real API call
      const userData = {
        id: '1',
        name: email.split('@')[0],
        email: email,
        avatar: `https://api.dicebear.com/7.x/avataaars/svg?seed=${email}`,
        isPremium: false
      };

      login(userData);
      toast({
        title: "Welcome back!",
        description: "You've successfully signed in to SmartFi.",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Sign in failed",
        description: "Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    setIsLoading(true);
    
    try {
      // Simulate Google OAuth flow
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const userData = {
        id: 'google_user',
        name: 'Demo User',
        email: 'demo@smartfi.com',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
        isPremium: false
      };

      login(userData);
      toast({
        title: "Welcome to SmartFi!",
        description: "You've successfully signed in with Google.",
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Google sign in failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleDemoLogin = async () => {
    if (!selectedPhoneNumber) {
      toast({
        title: "Please select a demo account",
        description: "Choose from the available demo financial profiles.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      await switchToDemo(selectedPhoneNumber);
      const selectedAccount = demoAccounts.find(acc => acc.phone === selectedPhoneNumber);
      toast({
        title: "Fi MCP Demo Mode Activated",
        description: `Connected to: ${selectedAccount?.description}`,
      });
      navigate('/dashboard');
    } catch (error) {
      toast({
        title: "Demo login failed",
        description: "Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen py-4 sm:py-8 lg:py-12 px-4 sm:px-6 flex items-center justify-center bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <div className="w-full max-w-7xl grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-12 items-center">
        
        {/* Left Side - Marketing */}
        <div className="space-y-6 sm:space-y-8 order-2 lg:order-1">
          <div>
            <Badge variant="outline" className="mb-3 sm:mb-4 text-emerald-600 border-emerald-200 text-xs sm:text-sm">
              <Sparkles className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-2" />
              Join SmartFi Today
            </Badge>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold mb-3 sm:mb-4 bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent leading-tight">
              Your Financial Future Starts Here
            </h1>
            <p className="text-base sm:text-lg lg:text-xl text-gray-600 leading-relaxed">
              Get personalized AI-powered financial insights and take control of your wealth.
            </p>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Shield className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Bank-Level Security</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Your financial data is protected with enterprise-grade encryption and security protocols.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Zap className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Instant AI Insights</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Get real-time analysis and recommendations powered by advanced AI algorithms.</p>
              </div>
            </div>

            <div className="flex items-start space-x-3 sm:space-x-4">
              <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl sm:rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                <Sparkles className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-1 text-sm sm:text-base">Personalized Experience</h3>
                <p className="text-gray-600 text-sm sm:text-base leading-relaxed">Tailored financial strategies that adapt to your unique goals and risk profile.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Sign In Form */}
        <Card className="bg-white/90 backdrop-blur-sm border border-white/20 shadow-2xl order-1 lg:order-2 w-full max-w-md mx-auto lg:max-w-none">
          <CardHeader className="text-center px-4 sm:px-6 pt-6 sm:pt-8">
            <CardTitle className="text-xl sm:text-2xl font-bold text-gray-800">
              Sign In to SmartFi
            </CardTitle>
            <p className="text-gray-600 text-sm sm:text-base">Choose your preferred sign-in method</p>
            
            {/* Authentication Mode Selector */}
            <div className="flex bg-gray-100 rounded-lg p-1 mt-4">
              <Button
                type="button"
                variant={authMode === 'clerk' ? 'default' : 'ghost'}
                size="sm"
                className="flex-1 text-xs"
                onClick={() => setAuthMode('clerk')}
              >
                <Users className="w-3 h-3 mr-1" />
                Clerk Auth
              </Button>
              <Button
                type="button"
                variant={authMode === 'demo' ? 'default' : 'ghost'}
                size="sm"
                className="flex-1 text-xs"
                onClick={() => setAuthMode('demo')}
              >
                <Database className="w-3 h-3 mr-1" />
                Fi MCP Demo
              </Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-6 sm:pb-8">
            
            {authMode === 'clerk' ? (
              // Clerk Authentication
              <div className="space-y-4">
                <div className="flex justify-center">
                  <SignIn 
                    routing="hash"
                    signUpUrl="#/sign-up"
                    redirectUrl="/dashboard"
                    appearance={{
                      elements: {
                        formButtonPrimary: 'bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600',
                        card: 'shadow-none border-none',
                        headerTitle: 'hidden',
                        headerSubtitle: 'hidden',
                      }
                    }}
                  />
                </div>
              </div>
            ) : (
              // Fi MCP Demo Authentication
              <div className="space-y-4">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <h3 className="font-semibold text-blue-800 mb-2 flex items-center">
                    <Database className="w-4 h-4 mr-2" />
                    Fi MCP Demo Data
                  </h3>
                  <p className="text-blue-700 text-sm">
                    Experience SmartFi with real-world financial scenarios using the Fi MCP Server demo data.
                  </p>
                </div>

                <div className="space-y-3">
                  <Label htmlFor="demo-account" className="text-sm font-medium">
                    Select Demo Financial Profile
                  </Label>
                  <Select value={selectedPhoneNumber} onValueChange={setSelectedPhoneNumber}>
                    <SelectTrigger className="w-full h-11">
                      <SelectValue placeholder="Choose a demo account..." />
                    </SelectTrigger>
                    <SelectContent>
                      {demoAccounts.map((account) => (
                        <SelectItem key={account.phone} value={account.phone}>
                          <div className="flex flex-col">
                            <span className="font-medium">{account.phone}</span>
                            <span className="text-xs text-gray-500">{account.description}</span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleDemoLogin}
                  disabled={isLoading || !selectedPhoneNumber}
                  className="w-full h-11 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-sm font-medium"
                >
                  {isLoading ? (
                    "Connecting to Fi MCP..."
                  ) : (
                    <>
                      <Database className="w-4 h-4 mr-2" />
                      Connect to Fi MCP Demo
                    </>
                  )}
                </Button>

                <div className="bg-gray-50 border rounded-lg p-3">
                  <div className="text-xs text-gray-600 space-y-1">
                    <p className="font-medium">🧪 Demo Features:</p>
                    <ul className="list-disc list-inside space-y-0.5 ml-2">
                      <li>Real net worth calculations</li>
                      <li>Mutual fund portfolio analysis</li>
                      <li>Bank transaction insights</li>
                      <li>Credit report simulation</li>
                      <li>EPF account details</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            <p className="text-xs text-center text-gray-500 leading-relaxed">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default SignInPage;
