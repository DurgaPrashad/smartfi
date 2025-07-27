<h1 align="center">💡 SmartFi – Your AI Financial Strategist</h1>

<p align="center"><i>"Let AI speak to your money."</i></p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/7810018a-6739-4451-be42-e3d13ba7cb49" alt="SmartFi Banner" width="80%" />
</p>

<p align="center">
  <a href="https://smartfi-topaz.vercel.app/">
    <img src="https://img.shields.io/badge/Live-Demo-brightgreen?style=for-the-badge&logo=vercel" alt="Live Demo"/>
  </a>
  <a href="https://youtu.be/M-PEB5ryV6o">
    <img src="https://img.shields.io/badge/Watch-Demo%20Video-red?style=for-the-badge&logo=youtube" alt="Demo Video"/>
  </a>
  <a href="https://github.com/DurgaPrashad/smartfi">
    <img src="https://img.shields.io/badge/View-Code-000000?style=for-the-badge&logo=github" alt="GitHub"/>
  </a>
</p>

---

## 📸 Preview

<p align="center">
  <img src="https://github.com/user-attachments/assets/233fb4cb-d35d-446a-8324-20d93b57137e" width="48%"/>
  <img src="https://github.com/user-attachments/assets/efcf6d03-13eb-44f8-8ca1-a0c94d7d59e5" width="48%"/>
</p>

---

## 🔍 Problem Statement

> Your financial life is scattered across accounts—banks, investments, credit, EPF. This fragmentation creates confusion, stress, and poor decision-making. Even the best AI tools fall short without access to this structured data.

---

## 🚀 Our Solution: SmartFi

**SmartFi** is an **AI-powered financial assistant** built using **Google Gemini** and **Fi Money’s MCP Server**. It aggregates your financial data from 18+ sources and provides personalized insights to help you make smart, timely decisions.

🧠 **Ask Gemini:**
- *“Can I afford a ₹50L loan?”*
- *“Which of my SIPs haven’t performed well?”*
- *“What will I save by 40?”*

📊 **Get Insights On:**
- Portfolio & net worth
- Financial goal progress
- Investment performance
- Forecasts & actionables

<p align="center">
  <img src="https://github.com/user-attachments/assets/1c069b92-2a50-4808-b39a-9be7b5d7061b" width="90%"/>
</p>

---

## ✨ Features

✅ **Conversational Financial Assistant**  
> Ask financial questions in plain English.

✅ **MCP-Powered 360° Snapshot**  
> Unified view from banks, SIPs, loans, stocks, EPF & more.

✅ **Goal-Based AI Guidance**  
> Create financial goals and track progress with AI help.

✅ **Proactive Investment Insights**  
> Spot underperforming assets and get recommendations.

✅ **Forecast Modeling**  
> AI-based visual future simulations (e.g. savings vs. spend).

✅ **Privacy First**  
> Built on Fi MCP's secure-by-design architecture.

---

## 🧠 Tech Stack

### ⚙️ Core AI
- **Google Gemini** – NLP for financial reasoning
- **Vertex AI / Agent Builder** – Tool orchestration
- **Firebase AI Studio** – Prompt & workflow designer

### 💰 Finance Data Integration
- **Fi Money MCP Server** – Aggregated finance source
- **MCP API** – Tools like `fetch_net_worth`, `fetch_credit_report`

### 🌐 Web App
- **React.js / Next.js** – Frontend
- **Firebase** – Goal/data storage
- **Railway** – Backend hosting
- **Vercel** – Frontend hosting

<p align="center">
  <img src="https://github.com/user-attachments/assets/abdbac6d-2245-4991-a8a4-422cb227d9c1" width="90%"/>
</p>

---

## 🔑 API Tools (MCP Endpoints)

| Tool | Description |
|------|-------------|
| `fetch_net_worth` | Real-time net worth from connected accounts |
| `fetch_credit_report` | Full credit report snapshot |
| `fetch_epf_details` | EPF account info |
| `fetch_mf_transactions` | SIP & MF transaction history |

Each endpoint has error handling for disconnected accounts and offers user prompts accordingly.

---

## 🏗️ Setting up the Fi MCP Dev Server

### 📦 Prerequisites
- Go 1.23+

### 🧪 Steps to Run
```bash
# Clone the dev server
git clone https://github.com/epiFi/fi-mcp-dev.git
cd fi-mcp-dev

# Install dependencies
go mod tidy

# Start the dev server
FI_MCP_PORT=8080 go run .
Each endpoint has error handling for disconnected accounts and offers user prompts accordingly.

---

## 🏗️ Setting up the Fi MCP Dev Server

### 📦 Prerequisites
- Go 1.23+

### 🧪 Steps to Run
```bash
# Clone the dev server
git clone https://github.com/epiFi/fi-mcp-dev.git
cd fi-mcp-dev

# Install dependencies
go mod tidy

# Start the dev server
FI_MCP_PORT=8080 go run .
Access server at: http://localhost:8080

🔐 Authentication Flow
Try calling a tool → server checks for session.

If not found, you'll get a login_url.

Open it in your browser → enter test phone (below) + OTP/passcode.

Your session is now active for the session.

Test Numbers & Scenarios
Phone Number	Scenario
1111111111	No assets (basic savings account)
2222222222	All assets + EPF + credit + MF portfolio
3333333333	All assets (minimal mutual fund portfolio)

More in fi-mcp-dev README

🧱 Architecture Overview
sql
Copy
Edit
User → SmartFi UI → Gemini AI (via AgentBuilder) → Fi MCP APIs → Real-time Financial Data
🧪 Integration Examples
🐍 Python
python
Copy
Edit
from mcp.client.streamable_http import streamablehttp_client
from mcp.client.session import ClientSession
import asyncio

async def main():
    async with streamablehttp_client("http://localhost:8080/mcp/stream") as (read_stream, write_stream, _):
        async with ClientSession(read_stream, write_stream) as session:
            await session.initialize()
            networth = await session.call('networth:fetch_net_worth')
            print(networth)

asyncio.run(main())
🌐 JavaScript
js
Copy
Edit
async function getUserNetWorth() {
  const res = await fetch('/api/mcp', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Mcp-Session-Id': 'your-session-id'
    },
    body: JSON.stringify({
      method: 'tools/call',
      params: { name: 'fetch_net_worth', arguments: {} }
    })
  });
  const data = await res.json();
  console.log(data);
}
🌀 cURL
bash
Copy
Edit
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Mcp-Session-Id: mcp-session-xxxx" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"fetch_net_worth","arguments":{}}}' \
  http://localhost:8080/mcp/stream
🔮 Future Scope
✅ Real-time fraud detection

📈 Predictive market intelligence

🔁 Automated savings/payment triggers

🎙️ Voice assistant support (Alexa, Google)

📱 Native mobile app, tax & insurance coverage

📣 Call to Action
We're building the future of intelligent personal finance. Join us in revolutionizing how people interact with money using AI.
