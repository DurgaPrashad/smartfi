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
  analyzeFinancialData: (question?: string) => Promise<string>;
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
const GEMINI_API_KEY = "AIzaSyCKxef2OEUNjIeH3XMD5nXbMJ-cUVYE_PI";

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

  const analyzeFinancialData = async (question: string = "Provide a comprehensive financial analysis") => {
    try {
      const financialContext = JSON.stringify({
        netWorth: data.netWorth,
        creditReport: data.creditReport,
        bankTransactions: data.bankTransactions,
        mutualFunds: data.mutualFunds,
        epfDetails: data.epfDetails,
        userQuestion: question
      });

      const prompt = `You are a highly knowledgeable AI financial advisor. Analyze the following financial data and provide:

1. A clear summary of their financial position (assets, liabilities, net worth)
2. Personalized insights based on the data (investment strategy, risk analysis, debt advice)
3. Actionable recommendations to improve or optimize their financial health

User Question: ${question}

Financial Data: ${financialContext}

Please provide a comprehensive, actionable financial analysis in a friendly, professional tone.`;

      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          contents: [{
            parts: [{
              text: prompt
            }]
          }]
        })
      });

      if (!response.ok) {
        throw new Error(`Gemini API error: ${response.status}`);
      }

      const result = await response.json();
      return result.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('Financial analysis error:', error);
      
      // Fallback analysis if Gemini fails
      const netWorthData = data.netWorth?.netWorthResponse;
      const totalNetWorth = netWorthData?.totalNetWorthValue ? parseInt(netWorthData.totalNetWorthValue.units) : 0;
      const creditScore = data.creditReport?.creditReport?.creditScore || 0;
      
      return `**Financial Summary** (Fallback Analysis)

**Net Worth**: ₹${totalNetWorth.toLocaleString()}
**Credit Score**: ${creditScore || 'Not available'}

**Key Insights**:
- ${totalNetWorth > 1000000 ? 'You have a strong financial foundation' : 'Focus on building your wealth through systematic investments'}
- ${creditScore >= 750 ? 'Excellent credit score - you can access the best loan rates' : creditScore >= 650 ? 'Good credit score - maintain this level' : 'Work on improving your credit score'}

**Recommendations**:
- Continue with SIP investments if you have active mutual funds
- Maintain an emergency fund of 6-12 months expenses
- Review and optimize your insurance coverage

*Note: This is a basic analysis. For detailed insights, ensure all your financial accounts are connected.*`;
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
    analyzeFinancialData,
  };

  return <FiMCPContext.Provider value={value}>{children}</FiMCPContext.Provider>;
};