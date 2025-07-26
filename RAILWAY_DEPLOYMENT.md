# 🚄 Railway Deployment Guide for SmartFi

## 🎯 **Overview**

Deploy your SmartFi application on Railway to work seamlessly with the existing Fi MCP server at `https://fi-mcp-dev-production.up.railway.app/`.

## 🔧 **Railway Configuration**

### **Project Information**
- **Fi MCP Server**: `https://fi-mcp-dev-production.up.railway.app/`
- **Project ID**: `6f4fe9db-e618-4b7f-babd-cdf99f7f17dd`
- **Runtime**: V2
- **Builder**: NIXPACKS

### **Architecture**
```
┌─────────────────────────────────────────┐
│        SmartFi Frontend                 │
│      (Your Railway Deployment)         │
│                                         │
│  🎨 Features:                           │
│  • Beautiful dashboard UI              │
│  • Clerk authentication                │
│  • Google Gemini AI analysis           │
│  • Responsive design                   │
└─────────────────────────────────────────┘
                    │
                    │ HTTPS API Calls
                    ▼
┌─────────────────────────────────────────┐
│        Fi MCP Server                    │
│  https://fi-mcp-dev-production...       │
│  (Project: 6f4fe9db-e618-4b7f...)      │
│                                         │
│  📊 Provides:                           │
│  • Real financial data                 │
│  • 16 demo scenarios                   │
│  • Live calculations                   │
│  • Authentication flow                 │
└─────────────────────────────────────────┘
```

## 🚀 **Deployment Steps**

### **1. Connect to Railway**
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login to Railway
railway login

# Link to your project (or create new)
railway link
```

### **2. Environment Variables**
Set these in Railway dashboard or via CLI:

```bash
# Required
railway variables set VITE_CLERK_PUBLISHABLE_KEY=pk_test_d29ydGh5LXJhY2VyLTc3LmNsZXJrLmFjY291bnRzLmRldiQ

# Optional (for AI features)
railway variables set VITE_GEMINI_API_KEY=AIzaSyCKxef2OEUNjIeH3XMD5nXbMJ-cUVYE_PI

# System variables (automatically set by Railway)
railway variables set PORT=8080
railway variables set NODE_ENV=production
```

### **3. Deploy**
```bash
# Deploy to Railway
railway up

# Or deploy from GitHub (recommended)
# Connect your GitHub repo in Railway dashboard
# Enable auto-deploys on push to main branch
```

## 📊 **What You Get**

### **Your SmartFi Deployment Will Provide:**

#### **🔐 Authentication Options**
1. **Clerk OAuth**: Google login, email/password
2. **Fi MCP Demo**: Direct access with phone numbers

#### **📱 Demo Phone Numbers** (from Railway Fi MCP):
- `2222222222`: Complete portfolio (₹6.6L net worth, 752 credit)
- `7777777777`: Debt-heavy profile (financial challenges)
- `9999999999`: Fixed income focus (conservative investing)
- `1313131313`: Balanced growth (diversified portfolio)
- `2525252525`: High spender (lifestyle focus)

#### **🤖 AI Features**
- **Financial Analysis**: Powered by Google Gemini 2.0 Flash
- **Smart Recommendations**: Based on real Fi MCP data
- **Interactive Chat**: Natural language queries
- **Fallback Analysis**: Works even without Gemini API

#### **🎨 User Experience**
- **Beautiful Dashboard**: Modern glassmorphism design
- **Responsive Layout**: Perfect on all devices
- **Real-time Data**: Live updates from Fi MCP API
- **Interactive Charts**: Dynamic visualizations

## 🌐 **Integration with Fi MCP Server**

Your SmartFi app automatically connects to:
- **Base URL**: `https://fi-mcp-dev-production.up.railway.app`
- **Endpoints**:
  - `/mockWebPage`: Demo login page
  - `/login`: Authentication endpoint
  - `/mcp/stream`: Fi MCP API calls

### **API Calls Made by SmartFi**:
```javascript
// Demo login
POST /login
{
  "sessionId": "mcp-session-{uuid}",
  "phoneNumber": "2222222222",
  "otp": "demo"
}

// Fetch financial data
POST /mcp/stream
{
  "jsonrpc": "2.0",
  "id": 1,
  "method": "tools/call",
  "params": {
    "name": "fetch_net_worth",
    "arguments": {}
  }
}
```

## 🧪 **Testing Your Deployment**

### **1. Verify Deployment**
```bash
# Check deployment status
railway status

# View logs
railway logs

# Open in browser
railway open
```

### **2. Test Authentication Flows**
1. Visit your Railway URL
2. Try Clerk authentication (Google OAuth)
3. Try Fi MCP demo with phone: `2222222222`
4. Verify dashboard loads with real data

### **3. Test AI Features**
1. Navigate to Chat tab
2. Ask: "Analyze my portfolio performance"
3. Verify Gemini AI responds with financial insights
4. Test fallback if Gemini API unavailable

## 📋 **Environment Variables Summary**

| Variable | Required | Purpose | Example |
|----------|----------|---------|---------|
| `VITE_CLERK_PUBLISHABLE_KEY` | ✅ Yes | Clerk authentication | `pk_test_...` |
| `VITE_GEMINI_API_KEY` | ❌ Optional | AI analysis | `AIzaSy...` |
| `PORT` | ✅ Auto | Railway port | `8080` |
| `NODE_ENV` | ✅ Auto | Environment | `production` |

## 🔍 **Troubleshooting**

### **Common Issues:**

1. **Build Fails**
   ```bash
   # Check logs
   railway logs --deployment
   
   # Verify Node.js version
   # Uses 18.x as specified in nixpacks.toml
   ```

2. **Environment Variables Missing**
   ```bash
   # List current variables
   railway variables

   # Set missing variables
   railway variables set KEY=value
   ```

3. **Fi MCP Connection Issues**
   ```bash
   # Test Fi MCP API directly
   curl -X POST https://fi-mcp-dev-production.up.railway.app/mcp/stream \
     -H "Content-Type: application/json" \
     -H "Mcp-Session-Id: mcp-session-test" \
     -d '{"jsonrpc":"2.0","id":1,"method":"tools/list"}'
   ```

## ✨ **Success Indicators**

### **Deployment Success:**
- ✅ Railway build completes without errors
- ✅ App accessible via Railway URL
- ✅ Authentication flows work (Clerk + Fi MCP demo)
- ✅ Dashboard loads with real Fi MCP data
- ✅ AI chat responds to financial queries
- ✅ Mobile responsive design works

### **Performance Metrics:**
- ✅ Load time < 3 seconds
- ✅ API responses < 2 seconds
- ✅ Bundle size optimized (956KB)
- ✅ Interactive and responsive

## 🎊 **Final Result**

Your Railway deployment will provide:
- **Professional financial dashboard** with real data
- **Dual authentication system** (Clerk + Fi MCP)
- **AI-powered financial insights** 
- **16 demo financial scenarios** for testing
- **Beautiful, responsive design** that works everywhere
- **Production-ready security** and performance

**🚄 Deploy on Railway and get a live, working SmartFi application integrated with your Fi MCP server!**