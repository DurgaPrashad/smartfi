# SmartFi Deployment Guide

## 🚀 Vercel Deployment

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- Gemini API key from Google AI Studio

### Step 1: Environment Variables Setup

Before deploying, set up these environment variables in Vercel:

```bash
VITE_CLERK_PUBLISHABLE_KEY=pk_test_d29ydGh5LXJhY2VyLTc3LmNsZXJrLmFjY291bnRzLmRldiQ
VITE_GEMINI_API_KEY=your_actual_gemini_api_key_here
```

### Step 2: Deploy to Vercel

1. **Via Vercel Dashboard:**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables in settings
   - Deploy

2. **Via Vercel CLI:**
   ```bash
   npm install -g vercel
   vercel login
   vercel --prod
   ```

### Step 3: Configure Environment Variables

In Vercel Dashboard:
1. Go to Project Settings → Environment Variables
2. Add both variables:
   - `VITE_CLERK_PUBLISHABLE_KEY`
   - `VITE_GEMINI_API_KEY`
3. Set them for Production, Preview, and Development

### Step 4: Test Your Deployment

1. Visit your deployed URL
2. Try both authentication methods:
   - Clerk authentication
   - Fi MCP demo login
3. Test financial analysis with demo data
4. Verify all data comes from Railway Fi MCP API

## 🔒 Security Notes

- Never commit API keys to repository
- Use environment variables for all secrets
- The Gemini API key should be kept secure
- Clerk publishable key is safe to expose (it's designed for client-side use)

## 🐛 Troubleshooting

### Build Failures
- Ensure all environment variables are set
- Check that Vite can access the Railway Fi MCP API
- Verify no backend dependencies remain

### API Issues
- Test Railway Fi MCP API directly: `https://fi-mcp-dev-production.up.railway.app`
- Check browser console for CORS errors
- Verify Gemini API key is valid

### Authentication Problems
- Confirm Clerk publishable key is correct
- Test demo login with phone numbers: 2222222222, 7777777777, etc.
- Check browser network tab for API calls

## 📊 Performance Optimization

The app includes several optimizations:
- Vite for fast builds and HMR
- Code splitting with dynamic imports (optional)
- Compressed assets with gzip
- Optimized bundle size

## 🔄 Continuous Deployment

Vercel automatically deploys when you push to your main branch:
1. Push code to GitHub
2. Vercel detects changes
3. Builds and deploys automatically
4. Live site updates in ~30 seconds

## 🌐 Custom Domain (Optional)

To use a custom domain:
1. Go to Vercel Project Settings
2. Add your domain
3. Configure DNS records
4. SSL certificate auto-generates

Your SmartFi app is now live and ready to analyze real financial data! 🎉