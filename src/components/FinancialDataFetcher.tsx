import React, { useState } from 'react';

const FinancialDataFetcher: React.FC = () => {
  const [sessionId, setSessionId] = useState('');
  const [loginUrl, setLoginUrl] = useState('');
  const [financialData, setFinancialData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchData = async () => {
    setLoading(true);
    setError(null);
    setFinancialData(null);
    setLoginUrl('');

    // Generate a unique session ID (a simple timestamp can work for testing)
    const currentSessionId = `mcp-session-${Date.now()}`;
    setSessionId(currentSessionId);

    const requestBody = {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: 'fetch_net_worth', // We'll start with net worth as an example
        arguments: {},
      },
    };

    try {
      const response = await fetch('https://fi-mcp-dev-production.up.railway.app/mcp/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Mcp-Session-Id': currentSessionId,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

      if (data.result && data.result.login_url) {
        setLoginUrl(data.result.login_url);
        // Instruct the user to open the URL
      } else if (data.result) {
        setFinancialData(data.result);
        // Display the financial data
      } else if (data.error) {
        setError(data.error.message);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleFetchAuthenticatedData = async () => {
    if (!sessionId) {
      setError('Session ID is missing. Please initiate the first step.');
      return;
    }

    setLoading(true);
    setError(null);
    setFinancialData(null);
    setLoginUrl(''); // Clear login URL as we expect data now

    const requestBody = {
      jsonrpc: '2.0',
      id: 1,
      method: 'tools/call',
      params: {
        name: 'fetch_net_worth', // Using net worth again for the authenticated call
        arguments: {},
      },
    };

    try {
      const response = await fetch('https://fi-mcp-dev-production.up.railway.app/mcp/stream', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Mcp-Session-Id': sessionId,
        },
        body: JSON.stringify(requestBody),
      });

      const data = await response.json();

       if (data.result && data.result.login_url) {
        setLoginUrl(data.result.login_url);
        setError('Authentication required. Please complete the login via the URL.');
      } else if (data.result) {
        setFinancialData(data.result);
      } else if (data.error) {
        setError(data.error.message);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <h2>Financial Data Fetcher</h2>
      <button onClick={handleFetchData} disabled={loading}>
        {loading ? 'Loading...' : 'Initiate Data Fetch (Get Login URL)'}
      </button>

      {loginUrl && (
        <div>
          <p>Please complete the manual login by visiting this URL:</p>
          <a href={loginUrl} target="_blank" rel="noopener noreferrer">{loginUrl}</a>
          <p>After logging in, click the button below to fetch the data.</p>
           <button onClick={handleFetchAuthenticatedData} disabled={loading}>
            {loading ? 'Loading...' : 'Fetch Authenticated Data'}
          </button>
        </div>
      )}

      {financialData && (
        <div>
          <h3>Fetched Data:</h3>
          <pre>{JSON.stringify(financialData, null, 2)}</pre>
        </div>
      )}

      {error && (
        <div style={{ color: 'red' }}>
          <h3>Error:</h3>
          <p>{error}</p>
        </div>
      )}
    </div>
  );
};

export default FinancialDataFetcher;