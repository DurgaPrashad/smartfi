# 🔐 Environment Variables Setup Guide

## 🎯 **Required Environment Variables**

For SmartFi to work properly, you need to set these environment variables in your deployment platform:

### **1. Clerk Authentication (Required)**
```bash
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key_here
```
- **How to get**: Visit [clerk.com](https://clerk.com), create account, get publishable key
- **Purpose**: Enables Google OAuth and email/password authentication
- **Security**: Safe to expose (designed for client-side use)

### **2. Google Gemini AI (Optional)**
```bash
VITE_GEMINI_API_KEY=your_gemini_api_key_here
```
- **How to get**: Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
- **Purpose**: Powers AI financial analysis and chat features
- **Fallback**: App works without it (shows basic analysis)

## 🚀 **Platform-Specific Setup**

### **Vercel Deployment**
1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Go to **Settings** → **Environment Variables**
4. Add both variables
5. Deploy

### **Railway Deployment**
1. Go to [railway.app](https://railway.app)
2. Connect your GitHub repository
3. Go to **Variables** tab
4. Add both variables
5. Deploy

### **Local Development**
1. Create `.env.local` file in project root
2. Add your environment variables
3. **Never commit this file** (already in .gitignore)

## 🔍 **How to Get API Keys**

### **Clerk Publishable Key**
1. Visit [clerk.com](https://clerk.com)
2. Sign up/login to your account
3. Create a new application
4. Copy the publishable key (starts with `pk_test_`)
5. This key is safe to expose publicly

### **Google Gemini API Key**
1. Visit [Google AI Studio](https://makersuite.google.com/app/apikey)
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the generated key (starts with `AIza`)
5. **Keep this key secure** - don't expose publicly

## ✅ **Verification Steps**

### **Test Clerk Authentication**
1. Deploy with Clerk key set
2. Visit your app
3. Try "Sign In" → should show Clerk OAuth options
4. Test Google login functionality

### **Test Fi MCP Integration**
1. Visit your deployed app
2. Try "Fi MCP Demo" option
3. Select phone number: `2222222222`
4. Should show financial dashboard with real data

### **Test Gemini AI (if configured)**
1. Navigate to Chat tab
2. Ask: "Analyze my portfolio performance"
3. Should get AI-powered financial insights
4. Without Gemini: Shows basic fallback analysis

## 🛡️ **Security Best Practices**

### **✅ Do:**
- Use environment variables for all secrets
- Set variables in deployment platform dashboards
- Use different keys for development/production
- Regularly rotate API keys

### **❌ Don't:**
- Commit `.env` files to git
- Hardcode API keys in source code
- Share API keys in documentation
- Use production keys in development

## 🚨 **Troubleshooting**

### **Clerk Not Working**
- Check if `VITE_CLERK_PUBLISHABLE_KEY` is set correctly
- Verify the key starts with `pk_test_` or `pk_live_`
- Check browser console for authentication errors

### **Gemini AI Not Working**
- Check if `VITE_GEMINI_API_KEY` is set
- Verify the key starts with `AIza`
- App will use fallback analysis if Gemini fails

### **Fi MCP Demo Not Working**
- This doesn't require environment variables
- Check if Railway Fi MCP server is running
- Try different demo phone numbers

## 📋 **Environment Variables Template**

Create this in your deployment platform:

```bash
# Required
VITE_CLERK_PUBLISHABLE_KEY=pk_test_your_clerk_key_here

# Optional (for AI features)
VITE_GEMINI_API_KEY=AIza_your_gemini_key_here
```

## 🎊 **Success Indicators**

When properly configured, your SmartFi app will have:
- ✅ Working authentication (Clerk + Fi MCP demo)
- ✅ Beautiful financial dashboard with real data
- ✅ AI-powered chat responses (if Gemini configured)
- ✅ Mobile-responsive design
- ✅ Secure, production-ready deployment

**🔐 Keep your API keys secure and never commit them to version control!**