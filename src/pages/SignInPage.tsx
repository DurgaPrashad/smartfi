
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Sparkles, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff,
  Chrome,
  Shield,
  Zap
} from 'lucide-react';

const SignInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

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

  const handleDemoLogin = () => {
    const userData = {
      id: 'demo_user',
      name: 'Demo User',
      email: 'demo@smartfi.com',
      avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=demo',
      isPremium: false
    };

    login(userData);
    toast({
      title: "Demo Mode Activated",
      description: "Exploring SmartFi with demo data.",
    });
    navigate('/dashboard');
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
          </CardHeader>
          <CardContent className="space-y-4 sm:space-y-6 px-4 sm:px-6 pb-6 sm:pb-8">
            
            {/* Google Sign In */}
            <Button 
              onClick={handleGoogleSignIn} 
              disabled={isLoading}
              variant="outline" 
              className="w-full h-10 sm:h-12 text-sm sm:text-base font-medium"
            >
              <Chrome className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
              Continue with Google
            </Button>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Or continue with email</span>
              </div>
            </div>

            {/* Email Sign In Form */}
            <form onSubmit={handleEmailSignIn} className="space-y-3 sm:space-y-4">
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="email" className="text-sm">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 h-10 sm:h-11 text-sm sm:text-base"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-1 sm:space-y-2">
                <Label htmlFor="password" className="text-sm">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-10 sm:h-11 text-sm sm:text-base"
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-400" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-400" />
                    )}
                  </Button>
                </div>
              </div>

              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-10 sm:h-12 bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-sm sm:text-base font-medium"
              >
                {isLoading ? "Signing In..." : "Sign In"}
              </Button>
            </form>

            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-muted-foreground">Or try demo</span>
              </div>
            </div>

            {/* Demo Login */}
            <Button 
              onClick={handleDemoLogin}
              variant="secondary" 
              className="w-full h-10 sm:h-12 text-sm sm:text-base font-medium"
            >
              <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3" />
              Try Demo Account
            </Button>

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
