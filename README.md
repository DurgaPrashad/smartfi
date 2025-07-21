
# SmartFi — Your Personal Finance AI Agent

## Overview
SmartFi is an AI-powered personal finance assistant that consolidates your entire financial picture and provides actionable, personalized recommendations. It integrates with the Fi MCP (Model Context Protocol) dev server, which simulates real-world financial data for development and hackathon use.

---

## 🏗️ How to Run the Fi MCP Dev Server

### Prerequisites
- Go 1.23 or later

### Steps
```bash
# Clone the fi-mcp-dev repository
# (or use your own fork)
git clone https://github.com/epiFi/fi-mcp-dev.git
cd fi-mcp-dev

go mod tidy
FI_MCP_PORT=8080 go run .
```
The server will start on http://localhost:8080.

### Authentication Flow
- When you call an API/tool, the server checks for a valid session.
- If not authenticated, you’ll get a login_url in the response.
- Open the login URL in your browser, enter any allowed phone number (see below), and any OTP/passcode.
- On success, your session is active for the server run.

#### Test Phone Numbers & Scenarios
| Phone Number | Scenario Description |
|--------------|---------------------|
| 1111111111   | No assets connected. Only savings account balance present |
| 2222222222   | All assets connected (Banks, EPF, Indian/US stocks, Credit report). Large MF portfolio |
| 3333333333   | All assets connected. Small MF portfolio |
| ...          | ... (see full list in fi-mcp-dev README) |

---

## 🔑 Available API Tools (Endpoints)

### 1. fetch_net_worth
- **Purpose**: Calculate comprehensive net worth using actual data from connected accounts
- **Use Cases**: Portfolio analysis, net worth tracking, financial health, investment performance, debt-to-asset ratio
- **Sample Response**:
```json
{
  "netWorthResponse": {
    "assetValues": [
      {"netWorthAttribute": "ASSET_TYPE_MUTUAL_FUND", "value": {"currencyCode": "INR", "units": "84613"}},
      {"netWorthAttribute": "ASSET_TYPE_EPF", "value": {"currencyCode": "INR", "units": "211111"}},
      {"netWorthAttribute": "ASSET_TYPE_INDIAN_SECURITIES", "value": {"currencyCode": "INR", "units": "200642"}},
      {"netWorthAttribute": "ASSET_TYPE_SAVINGS_ACCOUNTS", "value": {"currencyCode": "INR", "units": "436355"}}
    ],
    "liabilityValues": [
      {"netWorthAttribute": "LIABILITY_TYPE_OTHER_LOAN", "value": {"currencyCode": "INR", "units": "42000"}},
      {"netWorthAttribute": "LIABILITY_TYPE_HOME_LOAN", "value": {"currencyCode": "INR", "units": "17000"}},
      {"netWorthAttribute": "LIABILITY_TYPE_VEHICLE_LOAN", "value": {"currencyCode": "INR", "units": "5000"}}
    ],
    "totalNetWorthValue": {"currencyCode": "INR", "units": "868721"}
  }
}
```
- **Error Handling**: Returns empty if no accounts connected. Prompts user to connect missing accounts.

### 2. fetch_credit_report
- **Purpose**: Retrieve comprehensive credit report information
- **Sample Response**: (see full JSON in documentation)
- **Error Handling**: Returns "No credit score data available" if not connected. Prompts user to connect credit profile.

### 3. fetch_epf_details
- **Purpose**: Access Employee Provident Fund account information
- **Sample Response**:
```json
{
  "uanAccounts": [
    {
      "phoneNumber": {},
      "rawDetails": {
        "est_details": [
          {"est_name": "KARZA TECHNOLOGIES PRIVATE LIMITED", "member_id": "MHBANXXXXXXXXXXXXXXXXX", "office": "(RO)BANDRA(MUMBAI-I)", "doj_epf": "24-03-2021", "doe_epf": "02-01-2022", "doe_eps": "02-01-2022", "pf_balance": {"net_balance": "200000", "employee_share": {"credit": "100000", "balance": "100000"}, "employer_share": {"credit": "100000", "balance": "100000"}}}
        ],
        "overall_pf_balance": {"pension_balance": "1000000", "current_pf_balance": "211111", "employee_share_total": {"credit": "1111", "balance": "11111"}}
      }
    }
  ]
}
```
- **Error Handling**: Directs users to link EPF account if not connected.

### 4. fetch_mf_transactions
- **Purpose**: Retrieve mutual funds transaction history for portfolio analysis
- **Sample Response**:
```json
{
  "transactions": [
    {"isinNumber": "INF760K01FC4", "folioId": "55557777", "externalOrderType": "BUY", "transactionDate": "2022-12-31T18:30:00Z", "purchasePrice": {"currencyCode": "INR", "units": "66", "nanos": 554600000}, "transactionAmount": {"currencyCode": "INR", "units": "6655", "nanos": 460000000}, "transactionUnits": 100, "transactionMode": "N", "schemeName": "Canara Robeco Gilt Fund - Regular Plan"}
  ]
}
```
- **Error Handling**: Returns available data with clear indication of limitations.

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
```

### JavaScript Example
```js
async function getUserNetWorth() {
  const response = await fetch('/api/mcp', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Mcp-Session-Id': 'your-session-id' },
    body: JSON.stringify({ method: 'tools/call', params: { name: 'fetch_net_worth', arguments: {} } })
  });
  const data = await response.json();
  // handle data
}
```

### Curl Example
```bash
curl -X POST -H "Content-Type: application/json" -H "Mcp-Session-Id: mcp-session-xxxx" -d '{"jsonrpc":"2.0","id":1,"method":"tools/call","params":{"name":"fetch_net_worth","arguments":{}}}' http://localhost:8080/mcp/stream
```

---

## 💬 AI Chat Integration (Gemini API)

- The AI chat is powered by Google Gemini API.
- When a user asks a financial question (e.g., "What’s my net worth?"), the chat triggers a real MCP call, fetches the data, and summarizes it using Gemini.
- If Gemini is unavailable, the chat falls back to local logic for common queries.
- All chat UI is fully responsive and accessible.

### Example Chat Flow
1. User: "How much is my net worth?"
2. Chat triggers `fetch_net_worth` via MCP, gets real data.
3. Gemini API summarizes and responds: "Your total net worth is ₹8,68,721, with major assets in savings accounts and mutual funds."

#### Gemini API Setup
- Already integrated in the codebase.
- Set your API key in `.env` as `VITE_GEMINI_API_KEY`.

---

## 📱 Responsive UI & Accessibility
- All components are mobile-first, tablet-friendly, and desktop-rich.
- Keyboard navigation, screen reader support, and color contrast are built-in.

---

## 🧑‍💻 Best Practices
- Always check if required accounts are connected before displaying data.
- Handle partial data gracefully.
- Provide clear error messages and user guidance.
- Never store or cache sensitive financial data.
- Use Gemini API for all AI/analytics features (no Vertex API).

---

## 🖼️ Screenshots & Sample Conversations
*(Add screenshots here if available)*

---

## 🤝 Contributing & Support
See original contributing guidelines. For support, email support@smartfi.app or join our Discord.

---

**Built with ❤️ for smarter financial futures**