import React, { useState } from "react";
import { 
  SignedIn, 
  SignedOut, 
  SignInButton, 
  SignUpButton, 
  UserButton,
  useUser 
} from "@clerk/clerk-react";

const demoFiles = [
  {
    label: "Net Worth Data",
    file: "/sample_responses/fetch_net_worth.json",
  },
  {
    label: "Credit Report Data",
    file: "/sample_responses/fetch_credit_report.json",
  },
  {
    label: "EPF Details Data",
    file: "/sample_responses/fetch_epf_details.json",
  },
  {
    label: "Mutual Fund Transactions Data",
    file: "/sample_responses/fetch_mf_transactions.json",
  },
];

interface FinancialData {
  [key: string]: unknown;
}

interface LoadingState {
  [key: string]: boolean;
}

interface ErrorState {
  [key: string]: string | null;
}

export default function AuthDemo() {
  const [data, setData] = useState<FinancialData>({});
  const [loading, setLoading] = useState<LoadingState>({});
  const [error, setError] = useState<ErrorState>({});
  const { user } = useUser();

  const handleShowData = async (file: string) => {
    setLoading((prev) => ({ ...prev, [file]: true }));
    setError((prev) => ({ ...prev, [file]: null }));
    try {
      const res = await fetch(file);
      if (!res.ok) throw new Error("Failed to fetch data");
      const json = await res.json();
      setData((prev) => ({ ...prev, [file]: json }));
    } catch (e) {
      const err = e as Error;
      setError((prev) => ({ ...prev, [file]: err.message || "Unknown error" }));
    } finally {
      setLoading((prev) => ({ ...prev, [file]: false }));
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-emerald-50">
      {/* Header with Auth Buttons */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">SmartFi Demo</h1>
            <div className="flex items-center space-x-4">
              <SignedOut>
                <SignInButton mode="modal">
                  <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md transition-colors">
                    Sign In
                  </button>
                </SignInButton>
                <SignUpButton mode="modal">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md transition-colors">
                    Sign Up
                  </button>
                </SignUpButton>
              </SignedOut>
              <SignedIn>
                <div className="flex items-center space-x-2">
                  <span className="text-gray-700">Welcome, {user?.firstName || 'User'}!</span>
                  <UserButton />
                </div>
              </SignedIn>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SignedOut>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to the Demo</h2>
            <p className="text-lg text-gray-600 mb-8">
              Please sign in with Google or your phone number to view the demo financial data.
            </p>
            <div className="space-x-4">
              <SignInButton mode="modal">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg text-lg transition-colors">
                  Sign In to Continue
                </button>
              </SignInButton>
            </div>
          </div>
        </SignedOut>

        <SignedIn>
          <div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Demo Financial Data</h2>
            <p className="text-gray-600 mb-6">
              Click a button below to view the sample financial dataset inline:
            </p>
            
            <div className="space-y-6">
              {demoFiles.map(({ label, file }) => (
                <div key={file} className="bg-white rounded-lg shadow-md p-6">
                  <button
                    onClick={() => handleShowData(file)}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed mb-4"
                    disabled={loading[file]}
                  >
                    {loading[file] ? "Loading..." : `Show ${label}`}
                  </button>
                  
                  {error[file] && (
                    <div className="text-red-600 bg-red-50 p-3 rounded-md mb-4">
                      Error: {error[file]}
                    </div>
                  )}
                  
                  {data[file] && (
                    <div className="bg-gray-50 rounded-md p-4 max-h-96 overflow-auto">
                      <h3 className="font-semibold text-gray-800 mb-2">{label}:</h3>
                      <pre className="text-sm text-gray-700 whitespace-pre-wrap">
                        {JSON.stringify(data[file], null, 2)}
                      </pre>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </SignedIn>
      </main>
    </div>
  );
}