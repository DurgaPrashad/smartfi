# SmartFi - Fi MCP Integration

A modern financial dashboard application that directly integrates with the Railway-hosted Fi MCP Server API, featuring Clerk authentication and Google Gemini AI analysis.

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
- **Vite** for build tooling and dev server
- **Tailwind CSS** for styling
- **Shadcn/ui** for components
- **Clerk** for authentication
- **Recharts** for data visualization
- **Google Gemini 2.0 Flash** for AI analysis

### API Integration
- **Direct calls** to Railway Fi MCP Server
- **Real-time data** from production Fi MCP API
- **No local backend** required

### Deployment
- **Vercel** for frontend hosting
- **Environment variables** for secure API keys
- **SPA routing** for seamless navigation

## 🏗️ Architecture

```
┌─────────────────────────────────────────┐
│            React Frontend               │
│         (Vite + TypeScript)             │
│    ┌─────────────┐  ┌─────────────┐     │
│    │    Clerk    │  │   Gemini    │     │
│    │    Auth     │  │    AI       │     │
│    └─────────────┘  └─────────────┘     │
└─────────────────────────────────────────┘
                      │
                      │ Direct API Calls
                      ▼
┌─────────────────────────────────────────┐
│        Railway Fi MCP Server           │
│   https://fi-mcp-dev-production...      │
│                                         │
│  ┌─────────────────────────────────┐    │
│  │        Financial Data           │    │
│  │   • Net Worth • Credit Score    │    │
│  │   • Bank Txns • Mutual Funds    │    │
│  │   • EPF Details • Live Data     │    │
│  └─────────────────────────────────┘    │
└─────────────────────────────────────────┘
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
npm install
```

3. **Environment setup**
Create `.env.local`:
```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_d29ydGh5LXJhY2VyLTc3LmNsZXJrLmFjY291bnRzLmRldiQ
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

4. **Start development server**
```bash
npm run dev
```

### Development URLs

- **Frontend**: http://localhost:5173
- **Fi MCP API**: https://fi-mcp-dev-production.up.railway.app

## 📦 Deployment

### Vercel Deployment (Recommended)

1. **Connect to Vercel**
```bash
# Install Vercel CLI
npm install -g vercel

# Login and deploy
vercel login
vercel
```

2. **Environment Variables**
Set in Vercel dashboard:
```
VITE_CLERK_PUBLISHABLE_KEY=pk_test_d29ydGh5LXJhY2VyLTc3LmNsZXJrLmFjY291bnRzLmRldiQ
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```

3. **Build Configuration**
Vercel automatically detects the `vercel.json` configuration.

### Manual Build

```bash
# Build frontend
npm run build

# Preview build locally
npm run preview
```

## 🔐 Authentication & Security

### Clerk Authentication
- ✅ Standard email/password signup
- ✅ Google OAuth integration  
- ✅ User management and sessions
- ✅ Production-ready security standards

### Fi MCP Demo Authentication
- ✅ Phone number based demo accounts (Railway Fi MCP data)
- ✅ No real OTP verification (demo purposes only)
- ✅ Instant access to live financial data
- ✅ Secure session management

### 🔒 Security Best Practices Implemented

- ✅ **No hardcoded API keys** - All secrets in environment variables
- ✅ **GitGuardian compliant** - No exposed credentials in code
- ✅ **Environment-based configuration** - Secure for all deployments
- ✅ **Direct HTTPS calls** - No insecure local backends
- ✅ **Production-ready architecture** - Built for scale and security
- ✅ **Real-time data only** - No local demo files or mock data

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