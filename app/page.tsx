'use client';
import React, { useState } from "react";
import { SignedIn, SignedOut, SignInButton } from "@clerk/nextjs";

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

export default function HomePage() {
  const [data, setData] = useState<{ [key: string]: any }>({});
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [error, setError] = useState<{ [key: string]: string | null }>({});

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
    <main style={{ padding: 32 }}>
      <SignedOut>
        <h1>Welcome to the Demo Login</h1>
        <p>Please sign in with Google or your phone number to view the demo data.</p>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <h1>Demo Data</h1>
        <p>Click a button below to view the sample financial dataset inline:</p>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {demoFiles.map(({ label, file }) => (
            <li key={file} style={{ marginBottom: 24 }}>
              <button
                onClick={() => handleShowData(file)}
                style={{
                  padding: "8px 16px",
                  background: "#2563eb",
                  color: "white",
                  border: "none",
                  borderRadius: 4,
                  cursor: "pointer",
                  marginBottom: 8,
                }}
                disabled={loading[file]}
              >
                {loading[file] ? "Loading..." : `Show ${label}`}
              </button>
              {error[file] && (
                <div style={{ color: "red", marginTop: 8 }}>{error[file]}</div>
              )}
              {data[file] && (
                <pre
                  style={{
                    background: "#f3f4f6",
                    padding: 16,
                    borderRadius: 4,
                    marginTop: 8,
                    maxHeight: 400,
                    overflow: "auto",
                  }}
                >
                  {JSON.stringify(data[file], null, 2)}
                </pre>
              )}
            </li>
          ))}
        </ul>
      </SignedIn>
    </main>
  );
}
