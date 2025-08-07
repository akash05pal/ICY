# 🚀 Deployment Guide for ICY

## Quick Deploy Options

### Option 1: Vercel (Recommended) ⚡

**Step 1: Prepare Your Repository**
```bash
# Make sure all files are committed
git add .
git commit -m "Ready for deployment"
git push origin main
```

**Step 2: Deploy to Vercel**
1. Go to [vercel.com](https://vercel.com)
2. Sign up/Login with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Configure environment variables:
   - `VITE_YOUTUBE_API_KEY` = your YouTube API key
   - `VITE_OPENAI_API_KEY` = your OpenAI API key
6. Click "Deploy"

**Step 3: Get Your Live URL**
- Vercel will give you a URL like: `https://your-project.vercel.app`
- Automatic deployments on every push to main

---

### Option 2: Render 🌐

**Step 1: Prepare Your Repository**
```bash
# Same as Vercel
git add .
git commit -m "Ready for deployment"
git push origin main
```

**Step 2: Deploy to Render**
1. Go to [render.com](https://render.com)
2. Sign up/Login with GitHub
3. Click "New +" → "Static Site"
4. Connect your GitHub repository
5. Configure:
   - **Name**: `icy-influencer-outreach`
   - **Build Command**: `npm run build`
   - **Publish Directory**: `dist`
6. Add environment variables:
   - `VITE_YOUTUBE_API_KEY` = your YouTube API key
   - `VITE_OPENAI_API_KEY` = your OpenAI API key
7. Click "Create Static Site"

**Step 3: Get Your Live URL**
- Render will give you a URL like: `https://icy-influencer-outreach.onrender.com`

---

## 🔑 Getting API Keys

### YouTube Data API Key
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select existing
3. Enable "YouTube Data API v3"
4. Go to "Credentials" → "Create Credentials" → "API Key"
5. Copy the API key

### OpenAI API Key
1. Go to [OpenAI Platform](https://platform.openai.com/)
2. Create an account
3. Go to "API Keys" → "Create new secret key"
4. Add billing information (required for API usage)
5. Copy the API key

---

## 🔧 Environment Variables

Create a `.env` file in your project root:

```env
VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

**Important**: Never commit this file to Git!

---

## 📊 API Usage & Costs

### YouTube Data API (Free Tier)
- **Quota**: 10,000 units/day
- **Search**: ~100 units per search
- **Channel Stats**: ~1 unit per channel
- **Cost**: Free for reasonable usage

### OpenAI API (Paid)
- **Cost**: ~$0.002 per 1K tokens
- **Usage**: ~200-300 tokens per influencer analysis
- **Estimated cost**: $0.01-0.05 per search

---

## 🚨 Troubleshooting

### Common Issues:

1. **"No influencers found"**
   - Check YouTube API key is valid
   - Verify API quota hasn't been exceeded
   - Try broader search terms

2. **"OpenAI API failed"**
   - Check OpenAI API key is valid
   - Verify billing is set up on OpenAI
   - Check API usage limits

3. **Build fails on deployment**
   - Ensure all dependencies are in package.json
   - Check for TypeScript errors
   - Verify environment variables are set

4. **CORS errors**
   - Add your domain to API key restrictions
   - Check API key permissions

---

## 🔒 Security Best Practices

1. **Never commit API keys** to version control
2. **Use environment variables** for all sensitive data
3. **Set API key restrictions** to your domain only
4. **Monitor API usage** to prevent unexpected charges
5. **Use HTTPS** in production

---

## 📈 Performance Tips

1. **Optimize images** before deployment
2. **Enable compression** on your hosting platform
3. **Use CDN** for static assets
4. **Monitor API response times**
5. **Implement caching** for repeated searches

---

## 🎯 Next Steps After Deployment

1. **Test the live site** thoroughly
2. **Monitor API usage** and costs
3. **Set up analytics** (Google Analytics, etc.)
4. **Configure custom domain** if needed
5. **Set up monitoring** for uptime

---

**Your ICY platform will be live and ready to find perfect influencers! 🎉** 