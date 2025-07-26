
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useUser } from '@clerk/clerk-react';
import { Toaster } from "@/components/ui/toaster";
import Navbar from '@/components/layout/Navbar';
import HomePage from '@/pages/HomePage';
import AboutPage from '@/pages/AboutPage';
import FeaturesPage from '@/pages/FeaturesPage';
import SignInPage from '@/pages/SignInPage';
import DashboardPage from '@/pages/DashboardPage';
import InvestmentsPage from '@/pages/InvestmentsPage';
import GoalsPage from '@/pages/GoalsPage';
import AnalyticsPage from '@/pages/AnalyticsPage';
import PaymentPage from '@/pages/PaymentPage';
import { AuthProvider, useAuth } from '@/contexts/AuthContext';
import { FiMCPProvider, useFiMCP } from '@/contexts/FiMCPContext';
import ChatInterface from '@/components/ChatInterface';
import './App.css';

// 🔒 Safety check for required environment variables
const requiredEnvVars = {
  VITE_CLERK_PUBLISHABLE_KEY: import.meta.env.VITE_CLERK_PUBLISHABLE_KEY,
};

const missingEnvVars = Object.entries(requiredEnvVars)
  .filter(([_, value]) => !value)
  .map(([key]) => key);

if (missingEnvVars.length > 0) {
  console.warn('⚠️ Missing required environment variables:', missingEnvVars);
  console.warn('📋 Please check your .env.local file or deployment environment variables');
}

const queryClient = new QueryClient();

// Protected Route Component
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated } = useAuth();
  const { isSignedIn } = useUser();
  const { isDemoMode } = useFiMCP();
  
  return (isAuthenticated || isSignedIn || isDemoMode) ? <>{children}</> : <Navigate to="/signin" />;
};

function AppContent() {
  const [showChat, setShowChat] = useState(false);
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      <Navbar />
      <main className="relative">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/features" element={<FeaturesPage />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route 
            path="/dashboard" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/investments" 
            element={
              <ProtectedRoute>
                <InvestmentsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/goals" 
            element={
              <ProtectedRoute>
                <GoalsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/analytics" 
            element={
              <ProtectedRoute>
                <AnalyticsPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/payment" 
            element={
              <ProtectedRoute>
                <PaymentPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/agent" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
          <Route 
            path="/export" 
            element={
              <ProtectedRoute>
                <DashboardPage />
              </ProtectedRoute>
            } 
          />
        </Routes>
      </main>
      <Toaster />
      {/* Floating AI Chat Agent */}
      <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 50 }}>
        {showChat && (
          <div style={{
            width: '100vw',
            maxWidth: 400,
            height: '70vh',
            maxHeight: 600,
            boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
            borderRadius: 16,
            overflow: 'hidden',
            background: 'white',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', background: 'rgba(16, 185, 129, 0.1)', padding: 8 }}>
              <button
                aria-label="Close chat"
                onClick={() => setShowChat(false)}
                style={{ background: 'none', border: 'none', fontSize: 20, cursor: 'pointer', color: '#2563eb' }}
              >
                ×
              </button>
            </div>
            <div style={{ flex: 1, minHeight: 0, overflow: 'auto' }}>
              <ChatInterface />
            </div>
          </div>
        )}
        {!showChat && (
          <button
            aria-label="Open SmartFi AI Chat"
            onClick={() => setShowChat(true)}
            style={{
              background: 'linear-gradient(90deg, #10b981 0%, #2563eb 100%)',
              color: 'white',
              border: 'none',
              borderRadius: '50%',
              width: 56,
              height: 56,
              boxShadow: '0 4px 16px rgba(16,185,129,0.18)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 28,
              cursor: 'pointer',
              zIndex: 51,
            }}
          >
            💬
          </button>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <AuthProvider>
          <FiMCPProvider>
            <AppContent />
          </FiMCPProvider>
        </AuthProvider>
      </Router>
    </QueryClientProvider>
  );
}

export default App;
