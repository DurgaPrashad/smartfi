
import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger, DropdownMenuSeparator } from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Sparkles, LogOut, User, CreditCard, Bell, Crown, Menu, X, Search, TrendingUp, Target, PieChart, Home, Info, Zap, BarChart3, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { Input } from '@/components/ui/input';

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isActive = (path: string) => location.pathname === path;

  // Navigation items for authenticated users
  const authenticatedNavItems = [
    { path: '/dashboard', label: 'Dashboard', icon: BarChart3 },
    { path: '/investments', label: 'Investments', icon: TrendingUp },
    { path: '/goals', label: 'Goals', icon: Target },
    { path: '/analytics', label: 'Analytics', icon: PieChart },
  ];

  // Navigation items for non-authenticated users
  const publicNavItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/about', label: 'About', icon: Info },
    { path: '/features', label: 'Features', icon: Zap },
  ];

  const navItems = isAuthenticated ? authenticatedNavItems : publicNavItems;

  return (
    <nav className="sticky top-0 z-50 border-b bg-white/95 backdrop-blur-xl shadow-sm">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-blue-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 relative overflow-hidden">
              <img 
                src="/placeholder-logo.png" 
                alt="SmartFi Logo" 
                className="w-full h-full object-cover opacity-0 transition-opacity duration-300"
                onLoad={(e) => {
                  e.currentTarget.style.opacity = '1';
                  e.currentTarget.parentElement?.querySelector('.absolute')?.remove();
                }}
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <Sparkles className="w-6 h-6 text-white relative z-10" />
            </div>
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">
                SmartFi
              </h1>
              <p className="text-xs text-gray-600 hidden sm:block font-medium">AI Financial Assistant</p>
            </div>
          </Link>

          {/* Search Bar - Only show when authenticated and on desktop */}
          {isAuthenticated && (
            <div className="hidden md:flex items-center flex-1 max-w-sm mx-6">
              <div className="relative w-full">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                <Input
                  type="text"
                  placeholder="Search..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full bg-gray-50 border-gray-200 focus:bg-white focus:border-emerald-400 focus:ring-emerald-400 transition-all duration-200"
                />
              </div>
            </div>
          )}

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-4">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <Link 
                  key={item.path}
                  to={item.path} 
                  className={`flex items-center space-x-2 text-sm font-semibold transition-all duration-200 hover:text-emerald-600 relative px-3 py-2 rounded-lg hover:bg-emerald-50 ${
                    isActive(item.path) ? 'text-emerald-600 bg-emerald-50' : 'text-gray-600'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2"
            >
              {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>

          {/* Auth Section */}
          <div className="flex items-center space-x-3">
            {isAuthenticated ? (
              <div className="flex items-center space-x-2">
                {/* Notifications - Desktop only */}
                <Button variant="ghost" size="sm" className="relative p-2 hover:bg-gray-100 hidden sm:flex">
                  <Bell className="w-4 h-4 text-gray-600" />
                  <div className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-full"></div>
                </Button>

                {/* Premium Badge - Desktop only */}
                {user?.isPremium && (
                  <Badge className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white px-3 py-1 shadow-lg text-xs hidden sm:flex">
                    <Crown className="w-3 h-3 mr-1" />
                    Premium
                  </Badge>
                )}

                {/* User Dropdown */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full hover:bg-gray-100 transition-colors duration-200">
                      <Avatar className="h-10 w-10 shadow-lg">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white font-semibold">
                          {user?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-64 bg-white border shadow-xl z-50" align="end" forceMount>
                    <div className="flex items-center justify-start gap-3 p-4 border-b">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user?.avatar} alt={user?.name} />
                        <AvatarFallback className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white">
                          {user?.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-semibold text-gray-800">{user?.name}</p>
                        <p className="text-sm text-gray-600 truncate">
                          {user?.email}
                        </p>
                        {user?.isPremium && (
                          <Badge className="bg-gradient-to-r from-emerald-500 to-blue-500 text-white text-xs w-fit">
                            <Crown className="w-3 h-3 mr-1" />
                            Premium
                          </Badge>
                        )}
                      </div>
                    </div>
                    
                    <DropdownMenuItem asChild className="cursor-pointer">
                      <Link to="/dashboard" className="flex items-center py-2">
                        <User className="mr-3 h-4 w-4" />
                        Dashboard
                      </Link>
                    </DropdownMenuItem>

                    {!user?.isPremium && (
                      <DropdownMenuItem asChild className="cursor-pointer">
                        <Link to="/payment" className="flex items-center py-2 text-emerald-600">
                          <CreditCard className="mr-3 h-4 w-4" />
                          Upgrade to Premium
                        </Link>
                      </DropdownMenuItem>
                    )}

                    <DropdownMenuSeparator />
                    
                    <DropdownMenuItem onClick={handleLogout} className="cursor-pointer py-2 text-red-600">
                      <LogOut className="mr-3 h-4 w-4" />
                      Sign out
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ) : (
              <div className="flex items-center space-x-2">
                <Link to="/signin">
                  <Button variant="ghost" className="text-gray-600 hover:text-emerald-600 font-semibold">
                    Sign In
                  </Button>
                </Link>
                <Link to="/signin">
                  <Button className="bg-gradient-to-r from-emerald-500 to-blue-500 hover:from-emerald-600 hover:to-blue-600 text-white font-semibold px-4 py-2 shadow-lg hover:shadow-xl transition-all duration-300 text-sm">
                    Get Started
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t pt-4">
            {/* Mobile Search - Only show when authenticated */}
            {isAuthenticated && (
              <div className="mb-4">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <Input
                    type="text"
                    placeholder="Search..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-10 pr-4 py-2 w-full bg-gray-50 border-gray-200"
                  />
                </div>
              </div>
            )}

            <div className="flex flex-col space-y-3">
              {navItems.map((item) => {
                const IconComponent = item.icon;
                return (
                  <Link 
                    key={item.path}
                    to={item.path} 
                    className={`flex items-center space-x-3 text-sm font-semibold transition-colors duration-200 hover:text-emerald-600 p-2 rounded-lg hover:bg-emerald-50 ${
                      isActive(item.path) ? 'text-emerald-600 bg-emerald-50' : 'text-gray-600'
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <IconComponent className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
