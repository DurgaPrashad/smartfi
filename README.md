# SmartFi - Fi MCP Integration

A complete financial dashboard application integrating the Fi MCP Server with Clerk authentication and Railway hosting.

## 🌟 Features

- **Dual Authentication**: Support for both Clerk authentication and Fi MCP demo accounts
- **Live Financial Data**: Fetches ONLY from Railway-hosted Fi MCP API:
  - Real-time net worth calculations
  - Live mutual fund portfolios
  - Actual bank transactions
  - Current credit reports
  - EPF account details
- **AI Financial Advisor**: Powered by Google Gemini 2.0 Flash for:
  - Comprehensive financial analysis
  - Personalized investment insights
  - Actionable recommendations
- **Modern UI**: Built with React, TypeScript, and Tailwind CSS
- **Railway Hosting**: Fully deployed and production-ready

## 🚀 Live Demo

**Production URL**: https://fi-mcp-dev-production.up.railway.app

### Demo Accounts Available:

| Phone Number | Description |
|-------------|-------------|
| `2222222222` | Complete Portfolio - All assets connected with large mutual fund portfolio |
| `7777777777` | Debt-Heavy Profile - High debt, poor performance scenario |
| `8888888888` | SIP Investor - Consistent monthly SIP investor profile |
| `9999999999` | Conservative Investor - Fixed income fanatic with low-risk investments |
| `1010101010` | Gold Investor - High allocation to precious metals |
| `5555555555` | No Credit Score - All assets except credit report |
| `1111111111` | Minimal Assets - Only savings account balance |

## 🛠️ Technology Stack

### Frontend
- **React 18** with TypeScript
- **Vite** for build tooling
- **Tailwind CSS** for styling
- **Shadcn/ui** for components
- **Clerk** for authentication
- **Recharts** for data visualization

### Backend
- **Go 1.21** for Fi MCP Server
- **Gorilla Mux** for routing
- **CORS** support
- **JSON-based demo data**

### Deployment
- **Railway** for hosting
- **Docker** multi-stage builds
- **Node.js** proxy server

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   React Frontend │────│  Node.js Proxy   │────│   Go Backend    │
│   (Port 8080)    │    │   (Port 8080)    │    │   (Port 3001)   │
└─────────────────┘    └──────────────────┘    └─────────────────┘
         │                        │                        │
         │                        │                        │
    ┌────▼────┐              ┌────▼────┐            ┌─────▼─────┐
    │  Clerk  │              │ Railway │            │ Fi MCP    │
    │   Auth  │              │Hosting  │            │ Test Data │
    └─────────┘              └─────────┘            └───────────┘
```

## 🚧 Local Development

### Prerequisites

- Node.js 18+
- Go 1.21+
- Git

### Installation

1. **Clone the repository**
```bash
git clone <repository-url>
cd smartfi-fi-mcp
```

2. **Install dependencies**
```bash
npm run setup
```

3. **Environment setup**
Create `.env.local`:
```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_d29ydGh5LXJhY2VyLTc3LmNsZXJrLmFjY291bnRzLmRldiQ
```

4. **Start development servers**
```bash
npm run dev
```

This starts both frontend (Vite) and backend (Go) concurrently.

### Development URLs

- **Frontend**: http://localhost:8080
- **Backend API**: http://localhost:3001

## 📦 Deployment

### Railway Deployment

1. **Connect to Railway**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway link
railway up
```

2. **Environment Variables**
Set in Railway dashboard:
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_d29ydGh5LXJhY2VyLTc3LmNsZXJrLmFjY291bnRzLmRldiQ
```

3. **Build Configuration**
Railway automatically detects the `Dockerfile` and builds the application.

### Manual Build

```bash
# Build frontend
npm run build:frontend

# Build backend
npm run build:backend

# Start production server
npm start
```

## 🔐 Authentication

### Clerk Authentication
- Standard email/password signup
- Google OAuth integration
- User management and sessions

### Fi MCP Demo Authentication
- Phone number based demo accounts
- No real OTP verification
- Instant access to financial data

## 🤖 AI Financial Analysis

**Powered by Google Gemini 2.0 Flash API**
- Uses real Fi MCP data for personalized analysis
- Provides comprehensive financial summaries
- Offers actionable investment recommendations
- Analyzes spending patterns and suggests optimizations

## 📊 Fi MCP API Integration

**Live Data Source**: `https://fi-mcp-dev-production.up.railway.app`

### Available Financial Tools

- `fetch_net_worth` - Real-time asset and liability calculations
- `fetch_credit_report` - Live credit score and detailed history
- `fetch_epf_details` - Current EPF account balances and projections
- `fetch_mutual_fund_transactions` - Live portfolio performance analysis
- `fetch_bank_transactions` - Real transaction history and spending analytics

**Note**: All local test data has been removed. The application exclusively uses the Railway-hosted Fi MCP API for authentic financial data.

## 🎨 UI Components

### Dashboard Features

- **Overview Tab**: Net worth summary, portfolio distribution
- **Investments Tab**: Mutual fund performance and SIP tracking
- **Goals Tab**: Financial planning and target tracking
- **Chat Tab**: AI-powered financial assistant

### Responsive Design

- Mobile-first approach
- Adaptive layouts for tablets and desktop
- Touch-friendly interactions

## 🔒 Security

- **Environment Variables**: Sensitive data in Railway secrets
- **CORS Configuration**: Proper origin restrictions
- **Authentication**: Clerk security standards
- **Data Validation**: Input sanitization and validation

## 🐛 Troubleshooting

### Common Issues

1. **Build Failures**
   - Ensure Go 1.21+ is installed
   - Check Node.js version (18+)
   - Verify all dependencies are installed

2. **API Connection Issues**
   - Check Railway deployment status
   - Verify environment variables
   - Test Fi MCP endpoint directly

3. **Authentication Problems**
   - Confirm Clerk publishable key
   - Check demo phone numbers
   - Verify session management

### Debug Commands

```bash
# Check build output
npm run build

# Test Go server locally
cd server && go run main.go

# Test API endpoints
curl -X POST https://fi-mcp-dev-production.up.railway.app/mcp/stream \
  -H "Content-Type: application/json" \
  -H "Mcp-Session-Id: mcp-session-demo" \
  -d '{"jsonrpc":"2.0","id":1,"method":"tools/list","params":{}}'
```

## 📝 API Testing

### Example cURL Commands

```bash
# Login to demo account
curl -X POST https://fi-mcp-dev-production.up.railway.app/login \
  -H "Content-Type: application/json" \
  -d '{
    "sessionId": "mcp-session-demo",
    "phoneNumber": "2222222222",
    "otp": "demo"
  }'

# Fetch net worth
curl -X POST https://fi-mcp-dev-production.up.railway.app/mcp/stream \
  -H "Content-Type: application/json" \
  -H "Mcp-Session-Id: mcp-session-demo" \
  -d '{
    "jsonrpc": "2.0",
    "id": 1,
    "method": "tools/call",
    "params": {
      "name": "fetch_net_worth",
      "arguments": {}
    }
  }'
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
- Check the troubleshooting section
- Review Railway deployment logs
- Test API endpoints directly
- Verify authentication configuration

---

**Built with ❤️ for the Fi MCP Hackathon**