import React, { createContext, useContext, useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';

interface FiMCPData {
  netWorth?: any;
  creditReport?: any;
  epfDetails?: any;
  mutualFunds?: any;
  bankTransactions?: any;
}

interface FiMCPContextType {
  data: FiMCPData;
  isLoading: boolean;
  error: string | null;
  isDemoMode: boolean;
  demoPhoneNumber: string | null;
  switchToDemo: (phoneNumber: string) => void;
  switchToClerk: () => void;
  fetchNetWorth: () => Promise<void>;
  fetchCreditReport: () => Promise<void>;
  fetchEPFDetails: () => Promise<void>;
  fetchMutualFunds: () => Promise<void>;
  fetchBankTransactions: () => Promise<void>;
  fetchAllData: () => Promise<void>;
}

const FiMCPContext = createContext<FiMCPContextType | undefined>(undefined);

export const useFiMCP = () => {
  const context = useContext(FiMCPContext);
  if (context === undefined) {
    throw new Error('useFiMCP must be used within a FiMCPProvider');
  }
  return context;
};

const API_BASE_URL = 'https://fi-mcp-dev-production.up.railway.app';

export const FiMCPProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user, isSignedIn } = useUser();
  const [data, setData] = useState<FiMCPData>({});
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [demoPhoneNumber, setDemoPhoneNumber] = useState<string | null>(null);
  const [sessionId, setSessionId] = useState<string>('');

  useEffect(() => {
    // Generate or retrieve session ID
    let storedSessionId = localStorage.getItem('mcp_session_id');
    if (!storedSessionId) {
      storedSessionId = `mcp-session-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('mcp_session_id', storedSessionId);
    }
    setSessionId(storedSessionId);

    // Check for demo mode preference
    const savedDemoMode = localStorage.getItem('fi_mcp_demo_mode');
    const savedPhoneNumber = localStorage.getItem('fi_mcp_demo_phone');
    if (savedDemoMode === 'true' && savedPhoneNumber) {
      setIsDemoMode(true);
      setDemoPhoneNumber(savedPhoneNumber);
    }
  }, []);

  const switchToDemo = async (phoneNumber: string) => {
    setIsDemoMode(true);
    setDemoPhoneNumber(phoneNumber);
    localStorage.setItem('fi_mcp_demo_mode', 'true');
    localStorage.setItem('fi_mcp_demo_phone', phoneNumber);
    
    // Login to demo account
    try {
      const response = await fetch(`${API_BASE_URL}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          sessionId: sessionId,
          phoneNumber: phoneNumber,
          otp: 'demo'
        })
      });
      
      if (response.ok) {
        await fetchAllData();
      }
    } catch (err) {
      console.error('Demo login failed:', err);
    }
  };

  const switchToClerk = () => {
    setIsDemoMode(false);
    setDemoPhoneNumber(null);
    localStorage.setItem('fi_mcp_demo_mode', 'false');
    localStorage.removeItem('fi_mcp_demo_phone');
    setData({});
  };

  const callMCPAPI = async (toolName: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/mcp/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Mcp-Session-Id': sessionId,
        },
        body: JSON.stringify({
          jsonrpc: '2.0',
          id: 1,
          method: 'tools/call',
          params: {
            name: toolName,
            arguments: {}
          }
        })
      });

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error.message || 'API call failed');
      }

      if (result.result && result.result.login_url) {
        // Need to login first
        window.open(result.result.login_url, '_blank');
        throw new Error('Please complete login in the opened window and try again');
      }

      return result.result;
    } catch (err) {
      console.error(`Error calling ${toolName}:`, err);
      throw err;
    }
  };

  const fetchNetWorth = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await callMCPAPI('fetch_net_worth');
      setData(prev => ({ ...prev, netWorth: result }));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchCreditReport = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await callMCPAPI('fetch_credit_report');
      setData(prev => ({ ...prev, creditReport: result }));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchEPFDetails = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await callMCPAPI('fetch_epf_details');
      setData(prev => ({ ...prev, epfDetails: result }));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchMutualFunds = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await callMCPAPI('fetch_mutual_fund_transactions');
      setData(prev => ({ ...prev, mutualFunds: result }));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchBankTransactions = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const result = await callMCPAPI('fetch_bank_transactions');
      setData(prev => ({ ...prev, bankTransactions: result }));
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchAllData = async () => {
    setIsLoading(true);
    setError(null);
    
    try {
      await Promise.all([
        fetchNetWorth(),
        fetchCreditReport(),
        fetchEPFDetails(),
        fetchMutualFunds(),
        fetchBankTransactions(),
      ]);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  const value = {
    data,
    isLoading,
    error,
    isDemoMode,
    demoPhoneNumber,
    switchToDemo,
    switchToClerk,
    fetchNetWorth,
    fetchCreditReport,
    fetchEPFDetails,
    fetchMutualFunds,
    fetchBankTransactions,
    fetchAllData,
  };

  return <FiMCPContext.Provider value={value}>{children}</FiMCPContext.Provider>;
};