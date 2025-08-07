import React, { useState } from 'react';
import { Zap, Target, MessageSquare, TrendingUp, Instagram, Youtube } from 'lucide-react';
import BrandForm from './components/BrandForm';
import InfluencerCard from './components/InfluencerCard';
import Dashboard from './components/Dashboard';
import { searchInfluencers } from './services/api';

interface BrandFormData {
  productName: string;
  productDescription: string;
  targetAudience: {
    ageRange: string;
    location: string;
    interests: string;
    gender: string;
  };
  brandTone: string;
  campaignGoals: string[];
  platformFocus: string[];
  budgetRange: string;
  niche: string;
}

interface Influencer {
  id: string;
  name: string;
  description: string;
  subscribers: string;
  brandFitScore: number;
  message: string;
  thumbnailUrl?: string;
  estimatedViews?: string;
  engagementRate?: string;
  instagramHandle?: string;
  instagramMessage?: string;
  platforms: string[];
  // Instagram-specific fields
  instagramFollowers?: string;
  instagramPosts?: string;
  instagramEngagement?: string;
  instagramEmail?: string;
  instagramBio?: string;
  instagramVerified?: boolean;
  instagramCategories?: string[];
  instagramLocation?: string;
  instagramWebsite?: string;
  instagramAvgLikes?: string;
  instagramAvgComments?: string;
  instagramStoriesCount?: string;
  instagramReelsCount?: string;
  instagramLastActive?: string;
}

function App() {
  const [currentStep, setCurrentStep] = useState<'setup' | 'results'>('setup');
  const [loading, setLoading] = useState(false);
  const [influencers, setInfluencers] = useState<Influencer[]>([]);
  const [error, setError] = useState<string | null>(null);

  const handleBrandSubmit = async (brandData: BrandFormData) => {
    setLoading(true);
    setError(null);
    
    try {
      const results = await searchInfluencers(brandData);
      setInfluencers(results);
      setCurrentStep('results');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleStartOver = () => {
    setCurrentStep('setup');
    setInfluencers([]);
    setError(null);
  };

  const calculateStats = () => {
    const influencersFound = influencers.length;
    const messagesGenerated = influencers.length;
    const instagramHandlesFound = influencers.filter(inf => inf.instagramHandle).length;
    const crossPlatformInfluencers = influencers.filter(inf => inf.platforms.length > 1).length;
    const averageFitScore = influencers.length > 0 
      ? Math.round(influencers.reduce((acc, inf) => acc + inf.brandFitScore, 0) / influencers.length)
      : 0;
    const topMatches = influencers.filter(inf => inf.brandFitScore >= 80).length;

    return { 
      influencersFound, 
      messagesGenerated, 
      averageFitScore, 
      topMatches,
      instagramHandlesFound,
      crossPlatformInfluencers
    };
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-2 rounded-xl">
                <Zap className="h-8 w-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">ICY</h1>
                <p className="text-gray-600">AI Influencer Outreach Agent</p>
              </div>
            </div>
            
            {currentStep === 'results' && (
              <button
                onClick={handleStartOver}
                className="px-6 py-2 bg-white border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors"
              >
                New Campaign
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentStep === 'setup' && (
          <>
            {/* Hero Section */}
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-gray-900 mb-4">
                Turn Influencer Marketing Into
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent"> Data-Driven Success</span>
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
                ICY finds perfect influencers across YouTube and Instagram, analyzes their content for authenticity, and generates personalized outreach messages for each platform automatically.
              </p>
              
              <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto mb-12">
                <div className="text-center">
                  <div className="bg-blue-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <Target className="h-8 w-8 text-blue-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Cross-Platform Discovery</h3>
                  <p className="text-gray-600 text-sm">Find relevant influencers across YouTube and extract their Instagram handles automatically</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-purple-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <TrendingUp className="h-8 w-8 text-purple-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Brand Fit Analysis</h3>
                  <p className="text-gray-600 text-sm">AI analyzes content to score brand alignment and authenticity</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-teal-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                    <MessageSquare className="h-8 w-8 text-teal-600" />
                  </div>
                  <h3 className="font-semibold text-gray-900 mb-2">Multi-Platform Outreach</h3>
                  <p className="text-gray-600 text-sm">Generate custom messages for both YouTube and Instagram that match each platform's style</p>
                </div>
              </div>
            </div>

            <BrandForm onSubmit={handleBrandSubmit} loading={loading} />
            
            {error && (
              <div className="mt-8 max-w-4xl mx-auto">
                <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl">
                  <p className="font-medium">Error: {error}</p>
                  <p className="text-sm mt-1">Please check your API configuration and try again.</p>
                </div>
              </div>
            )}
          </>
        )}

        {currentStep === 'results' && (
          <>
            <Dashboard stats={calculateStats()} />
            
            {influencers.length > 0 && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <h2 className="text-2xl font-bold text-gray-900">
                    Found {influencers.length} Perfect Matches
                    <span className="text-lg font-normal text-gray-600 ml-2">
                      ({influencers.filter(inf => inf.instagramHandle).length} with Instagram)
                    </span>
                  </h2>
                  <div className="text-sm text-gray-600">
                    Sorted by brand fit score
                  </div>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
                  {influencers.map((influencer) => (
                    <InfluencerCard key={influencer.id} influencer={influencer} />
                  ))}
                </div>
              </div>
            )}

            {influencers.length === 0 && !loading && (
              <div className="text-center py-12">
                <div className="bg-gray-100 p-4 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Target className="h-8 w-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">No influencers found</h3>
                <p className="text-gray-600">Try adjusting your search criteria or niche. We search across YouTube and automatically detect Instagram handles.</p>
              </div>
            )}
          </>
        )}
      </main>
    </div>
  );
}

export default App;