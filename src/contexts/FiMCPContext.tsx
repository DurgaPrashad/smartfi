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
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

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
    
    // Login to demo account directly on Railway Fi MCP
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
      // Make direct call to Railway Fi MCP API with timeout and error handling
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 15000); // 15 second timeout

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
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      
      if (result.error) {
        throw new Error(result.error.message || 'API call failed');
      }

      if (result.result && result.result.login_url) {
        // Need to login first - open Railway login page
        window.open(result.result.login_url, '_blank');
        throw new Error('Please complete login in the opened window and try again');
      }

      return result.result;
    } catch (err) {
      console.error(`Error calling ${toolName}:`, err);
      
      // Handle specific error types
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          throw new Error('Request timeout - please try again');
        }
        if (err.message.includes('Failed to fetch')) {
          throw new Error('Network error - please check your connection');
        }
      }
      
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
    // Safety check for API key
    if (!GEMINI_API_KEY) {
      console.warn('Gemini API key not configured. Using fallback analysis.');
      return getFallbackAnalysis(question);
    }

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
      return getFallbackAnalysis(question);
    }
  };

  const getFallbackAnalysis = (question: string) => {
    // Fallback analysis using Fi MCP data when Gemini is unavailable
    const netWorthData = data.netWorth?.netWorthResponse;
    const totalNetWorth = netWorthData?.totalNetWorthValue ? parseInt(netWorthData.totalNetWorthValue.units) : 0;
    const creditScore = data.creditReport?.creditReport?.creditScore || 0;
    const bankData = data.bankTransactions?.bankTransactions;
    const monthlyIncome = bankData?.monthlyAnalytics?.totalIncome || 0;
    const monthlyExpenses = bankData?.monthlyAnalytics?.totalExpenses || 0;

    return `**🤖 Financial Analysis** (Based on Railway Fi MCP Data)

**Your Question**: ${question}

**📊 Current Financial Position**:
- **Net Worth**: ₹${totalNetWorth.toLocaleString()}
- **Credit Score**: ${creditScore || 'Not available'}
- **Monthly Income**: ₹${monthlyIncome.toLocaleString()}
- **Monthly Expenses**: ₹${monthlyExpenses.toLocaleString()}

**💡 Key Insights** (from real Fi MCP data):
- ${totalNetWorth > 1000000 ? '✅ Strong financial foundation with solid net worth' : '📈 Focus on building wealth through systematic investments'}
- ${creditScore >= 750 ? '🏆 Excellent credit score - access to best loan rates' : creditScore >= 650 ? '👍 Good credit score - maintain this level' : '⚠️ Work on improving credit score for better financial opportunities'}
- ${monthlyIncome > monthlyExpenses ? '💰 Positive cash flow - great for investments' : '⚠️ Monitor expenses to improve savings rate'}

**🎯 Actionable Recommendations**:
- Continue with SIP investments if you have active mutual funds
- Maintain an emergency fund of 6-12 months expenses  
- Review and optimize your insurance coverage
- ${totalNetWorth < 500000 ? 'Focus on increasing savings rate and starting SIPs' : 'Consider diversifying into different asset classes'}

**🔍 Data Source**: Live Railway Fi MCP API
*Note: This analysis is based on your real financial data from Fi MCP. For AI-powered insights, ensure Gemini API is configured.*`;
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