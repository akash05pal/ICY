# ICY - AI Influencer Outreach Agent

A powerful AI platform that finds perfect influencers for your brand, analyzes their content for authenticity, and generates personalized outreach messages automatically.

## 🚀 Features

- **Cross-Platform Discovery**: Find influencers across YouTube and Instagram
- **AI-Powered Analysis**: Smart brand fit scoring and content analysis
- **Personalized Outreach**: Generate custom messages for each platform
- **Real-Time Data**: Live YouTube API integration with mock Instagram data
- **Modern UI**: Beautiful, responsive design with excellent UX

## 🛠️ Tech Stack

- **Frontend**: React 18 + TypeScript + Vite
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **APIs**: YouTube Data API + OpenAI GPT-3.5-turbo
- **Deployment**: Vercel/Render ready

## 📦 Installation

```bash
# Clone the repository
git clone https://github.com/akash05pal/ICY.git
cd ICY

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔧 Environment Variables

**IMPORTANT**: Create a `.env` file in the root directory with your API keys:

```env
VITE_YOUTUBE_API_KEY=your_youtube_api_key_here
VITE_OPENAI_API_KEY=your_openai_api_key_here
```

### Getting API Keys

1. **YouTube Data API Key**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create a new project or select existing
   - Enable YouTube Data API v3
   - Create credentials (API Key)

2. **OpenAI API Key**:
   - Go to [OpenAI Platform](https://platform.openai.com/)
   - Create an account and get your API key
   - Add billing information for API usage

## 🚀 Deployment

### Option 1: Deploy to Vercel (Recommended)

1. **Push to GitHub**:
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy to Vercel**:
   - Go to [Vercel](https://vercel.com)
   - Sign up/Login with GitHub
   - Click "New Project"
   - Import your GitHub repository
   - Add environment variables:
     - `VITE_YOUTUBE_API_KEY`
     - `VITE_OPENAI_API_KEY`
   - Click "Deploy"

3. **Automatic Deployments**:
   - Vercel will automatically deploy on every push to main
   - Preview deployments for pull requests

### Option 2: Deploy to Render

1. **Push to GitHub** (same as above)

2. **Deploy to Render**:
   - Go to [Render](https://render.com)
   - Sign up/Login with GitHub
   - Click "New +" → "Static Site"
   - Connect your GitHub repository
   - Configure:
     - **Name**: `icy-influencer-outreach`
     - **Build Command**: `npm run build`
     - **Publish Directory**: `dist`
   - Add environment variables:
     - `VITE_YOUTUBE_API_KEY`
     - `VITE_OPENAI_API_KEY`
   - Click "Create Static Site"

## 🔒 Security Notes

- **API Keys**: Never commit API keys to version control
- **Environment Variables**: Use environment variables for all sensitive data
- **CORS**: Configure CORS if needed for your domain
- **Rate Limiting**: Consider implementing rate limiting for production

## 📊 API Usage

### YouTube Data API
- **Quota**: 10,000 units/day (free tier)
- **Search**: ~100 units per search
- **Channel Stats**: ~1 unit per channel

### OpenAI API
- **Cost**: ~$0.002 per 1K tokens
- **Usage**: ~200-300 tokens per influencer analysis

## 🎯 Usage Guide

1. **Setup Campaign**:
   - Fill in product details and target audience
   - Specify brand tone and campaign goals
   - Choose budget range and platforms

2. **Find Influencers**:
   - AI searches YouTube for relevant channels
   - Extracts Instagram handles automatically
   - Analyzes content for brand fit

3. **Review Results**:
   - View brand fit scores and analytics
   - See personalized outreach messages
   - Copy messages for manual outreach

## 🛠️ Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Lint code
npm run lint
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── BrandForm.tsx   # Campaign setup form
│   ├── Dashboard.tsx   # Analytics dashboard
│   └── InfluencerCard.tsx # Influencer profile cards
├── services/           # API services
│   └── api.ts         # YouTube & OpenAI integration
├── App.tsx            # Main application
└── main.tsx           # Entry point
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For issues and questions:
- Create an issue on GitHub
- Check the documentation
- Review API quotas and limits

---

**Built with ❤️ using React, TypeScript, and AI** 