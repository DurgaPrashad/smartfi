<h1 align="center">💡 SmartFi – Your AI Financial Strategist</h1>
<img width="1810" height="853" alt="image" src="https://github.com/user-attachments/assets/f1b4f4fb-3e70-4060-9af8-37877be43f93" />
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
  <img src="https://github.com/user-attachments/assets/233fb4cb-d35d-446a-8324-20d93b57137e" alt="Dashboard Screenshot" width="70%" />
</p>

<p align="center">
  <img src="https://github.com/user-attachments/assets/efcf6d03-13eb-44f8-8ca1-a0c94d7d59e5" alt="Chat Assistant Screenshot" width="70%" />
</p>

---

## 🔍 Problem Statement

> Your financial life is scattered across accounts—banks, investments, credit, EPF. This fragmentation creates confusion, stress, and poor decision-making. Even the best AI tools fall short without access to this structured data.

---

## 🚀 Our Solution: SmartFi

**SmartFi** is an *AI-enabled conversational financial agent* powered by Google Gemini and Fi Money's MCP Server. It delivers personalized financial insights, harmonizes your financial footprint from 18+ sources, and helps you make smarter financial decisions in real time.
<img width="1902" height="736" alt="image" src="https://github.com/user-attachments/assets/1c069b92-2a50-4808-b39a-9be7b5d7061b" />

🧠 **Ask Gemini:**
- "Can I afford a ₹50L loan?"
- "Which of my SIPs haven’t performed well?"
- "What will I save by 40?"

📊 **Get:**
- Portfolio snapshots
- Goal-based insights
- Forecasts and suggestions

---

## ✨ Features

✅ **Conversational Financial Assistant**
> Ask SmartFi your finance questions in natural language.

✅ **MCP-Powered 360° View**
> Real-time snapshot from 18+ sources (banks, SIPs, loans, EPF).

✅ **Goal-Based AI Guidance**
> Set financial goals & get personalized progress tracking.

✅ **Proactive Investment Insights**
> Flag underperforming SIPs & suggest smarter options.

✅ **Future Scenario Modeling**
> Visual forecasts based on spending or saving habits.

✅ **Privacy-First by Design**
> Your data, your control – backed by Fi MCP’s secure architecture.

---

## 🏗️ How to Run the Fi MCP Dev Server



SmartFi integrates with the Fi MCP (Model Context Protocol) dev server, which simulates real-world financial data.

### Prerequisites
- Go 1.23 or later
<img width="1727" height="786" alt="image" src="https://github.com/user-attachments/assets/860af6f1-61b2-422e-9553-00c01b6d2f7f" />
### Steps
1.  Clone the `fi-mcp-dev` repository:
    ```bash
    # Clone the fi-mcp-dev repository
    # (or use your own fork)
    git clone [https://github.com/epiFi/fi-mcp-dev.git](https://github.com/epiFi/fi-mcp-dev.git)
    cd fi-mcp-dev
    ```
2.  Install dependencies and run the server:
    ```bash
    go mod tidy
    FI_MCP_PORT=8080 go run .
    ```
    The server will start on `http://localhost:8080`.

### Authentication Flow
- When you call an API/tool, the server checks for a valid session.
- If not authenticated, you’ll get a `login_url` in the response.
- Open the login URL in your browser, enter an allowed phone number (see below), and any OTP/passcode.
- On success, your session is active for the server run.
- 
https://github.com/DurgaPrashad/fi-mcp-dev/blob/main/README.md

#### Test Phone Numbers & Scenarios
| Phone Number | Scenario Description |
|--------------|----------------------|
| `1111111111` | No assets connected. Only savings account balance present. |
| `2222222222` | All assets connected (Banks, EPF, Indian/US stocks, Credit report). Large MF portfolio. |
| `3333333333` | All assets connected. Small MF portfolio. |
| ...          | ... (see full list in fi-mcp-dev README) |

---
## 🧱 Architecture

<p align="center">
 
</p>

---

## 🤖 Tech Stack
<img width="1892" height="726" alt="image" src="https://github.com/user-attachments/assets/abdbac6d-2245-4991-a8a4-422cb227d9c1" />

### Core AI Stack
- **Google Gemini** – Natural language understanding & insights
- **Vertex AI / Agent Builder** – Tool orchestration for Gemini
- **firebase AI Studio** – Prompt and workflow design

- 
<img width="1912" height="691" alt="image" src="https://github.com/user-attachments/assets/c8c693bd-ddc8-4d12-899e-43a958582ce0" />

### Finance Data Integration
- **Fi Money’s MCP Server** – Secure unified financial data from 18+ sources
- **FI MCP API** – Gateway for SmartFi to access user portfolios

### Web Development
- **React.js / Next.js** – Responsive frontend
- **Firebase** – Store goals and user data
- **Railway** – Backend deployment
- **Vercel** – Live web app hosting
<img width="1902" height="736" alt="image" src="https://github.com/user-attachments/assets/cd11662f-31b7-4008-bff8-2e507ee5970c" />

---

## 🔑 Available API Tools (Endpoints)

### 1. `fetch_net_worth`
- **Purpose**: Calculate comprehensive net worth using actual data from connected accounts.
- **Use Cases**: Portfolio analysis, net worth tracking, financial health, investment performance, debt-to-asset ratio.

### 2. `fetch_credit_report`
- **Purpose**: Retrieve comprehensive credit report information.

### 3. `fetch_epf_details`
- **Purpose**: Access Employee Provident Fund account information.

### 4. `fetch_mf_transactions`
- **Purpose**: Retrieve mutual funds transaction history for portfolio analysis.

*Error Handling*: Each endpoint provides clear guidance if the required accounts are not connected, prompting the user to link them.

---

## 🛠️ Integration Examples

### Python Example (using mcp client)
```python
from mcp.client.streamable_http import streamablehttp_client
from mcp.client.session import ClientSession
import asyncio

async def main():
    async with streamablehttp_client("http://localhost:8080/mcp/stream") as (read_stream, write_stream, _):
        async with ClientSession(read_stream, write_stream) as session:
            await session.initialize()
            tools = await session.list_tools()
            print(tools)
            # Example: fetch net worth
            networth = await session.call('networth:fetch_net_worth')
            print(networth)

if __name__ == "__main__":
    asyncio.run(main())

JavaScript Example
JavaScript

async function getUserNetWorth() {
  const response = await fetch('/api/mcp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Mcp-Session-Id': 'your-session-id' },
    body: JSON.stringify({ method: 'tools/call', params: { name: 'fetch_net_worth', arguments: {} } })
  });
  const data = await response.json();
  // handle data
}
Curl Example
Bash

curl -X POST \
  -H "Content-Type: application/json" \
  -H "Mcp-Session-Id: mcp-session-xxxx" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"fetch_net_worth","arguments":{}}}' \
  http://localhost:8080/mcp/stream
🔮 Future Scope
⚠ Real-time fraud detection

🧠 Advanced predictive market insights

🤖 Secure automated savings & payments

🗣 Voice Assistant integration (Google Assistant, Alexa)

📱 Native mobile app & insurance/tax expansion

📣 Call to Action

We're building the future of intelligent personal finance. Be a part of it!

