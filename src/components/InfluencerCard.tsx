import React from 'react';
import { Users, Eye, MessageCircle, Star, ExternalLink, Copy, CheckCircle, Instagram, Youtube, Mail, MapPin, Globe, Clock, Heart, MessageSquare } from 'lucide-react';

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

interface InfluencerCardProps {
  influencer: Influencer;
}

const InfluencerCard: React.FC<InfluencerCardProps> = ({ influencer }) => {
  const [messageCopied, setMessageCopied] = React.useState(false);
  const [instagramMessageCopied, setInstagramMessageCopied] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'youtube' | 'instagram'>('youtube');
  const [showInstagramDetails, setShowInstagramDetails] = React.useState(false);

  const copyMessage = () => {
    navigator.clipboard.writeText(influencer.message);
    setMessageCopied(true);
    setTimeout(() => setMessageCopied(false), 2000);
  };

  const copyInstagramMessage = () => {
    if (influencer.instagramMessage) {
      navigator.clipboard.writeText(influencer.instagramMessage);
      setInstagramMessageCopied(true);
      setTimeout(() => setInstagramMessageCopied(false), 2000);
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-blue-600 bg-blue-100';
    if (score >= 50) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 90) return 'Excellent Match';
    if (score >= 70) return 'Good Match';
    if (score >= 50) return 'Fair Match';
    return 'Low Match';
  };

  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 overflow-hidden">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
            {influencer.thumbnailUrl && (
              <img
                src={influencer.thumbnailUrl}
                alt={influencer.name}
                className="w-12 h-12 rounded-full border-2 border-white"
              />
            )}
            <div>
              <h3 className="text-xl font-bold">{influencer.name}</h3>
              <div className="flex items-center text-blue-100">
                <Users className="h-4 w-4 mr-1" />
                <span>{parseInt(influencer.subscribers).toLocaleString()} subscribers</span>
              </div>
              {influencer.instagramHandle && (
                <div className="flex items-center text-blue-100 mt-1">
                  <Instagram className="h-4 w-4 mr-1" />
                  <span>@{influencer.instagramHandle}</span>
                  {influencer.instagramVerified && (
                    <span className="ml-1 text-blue-200">✓</span>
                  )}
                </div>
              )}
            </div>
          </div>
          
          <div className={`px-4 py-2 rounded-full ${getScoreColor(influencer.brandFitScore)}`}>
            <div className="flex items-center">
              <Star className="h-4 w-4 mr-1" />
              <span className="font-bold">{influencer.brandFitScore}</span>
            </div>
          </div>
        </div>

        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${getScoreColor(influencer.brandFitScore)}`}>
          {getScoreLabel(influencer.brandFitScore)}
        </div>
        
        {/* Platform indicators */}
        <div className="flex items-center space-x-2 mt-3">
          <span className="text-blue-100 text-sm">Available on:</span>
          {influencer.platforms.includes('youtube') && (
            <div className="bg-red-500 p-1 rounded">
              <Youtube className="h-3 w-3 text-white" />
            </div>
          )}
          {influencer.platforms.includes('instagram') && (
            <div className="bg-pink-500 p-1 rounded">
              <Instagram className="h-3 w-3 text-white" />
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Stats */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          {influencer.estimatedViews && (
            <div className="flex items-center text-gray-600">
              <Eye className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-sm">{influencer.estimatedViews} avg views</span>
            </div>
          )}
          {influencer.engagementRate && (
            <div className="flex items-center text-gray-600">
              <MessageCircle className="h-4 w-4 mr-2 text-gray-400" />
              <span className="text-sm">{influencer.engagementRate}% engagement</span>
            </div>
          )}
        </div>

        {/* Instagram Details Toggle */}
        {influencer.instagramHandle && influencer.instagramFollowers && (
          <div className="mb-6">
            <button
              onClick={() => setShowInstagramDetails(!showInstagramDetails)}
              className="flex items-center justify-between w-full p-4 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl hover:from-pink-100 hover:to-purple-100 transition-colors"
            >
              <div className="flex items-center">
                <Instagram className="h-5 w-5 text-pink-600 mr-2" />
                <span className="font-semibold text-gray-900">Instagram Analytics</span>
              </div>
              <span className="text-sm text-gray-600">
                {showInstagramDetails ? 'Hide' : 'Show'} Details
              </span>
            </button>
            
            {showInstagramDetails && (
              <div className="mt-4 p-4 bg-pink-50 rounded-xl">
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="flex items-center text-gray-700">
                    <Users className="h-4 w-4 mr-2 text-pink-500" />
                    <span className="text-sm font-medium">{influencer.instagramFollowers} followers</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MessageSquare className="h-4 w-4 mr-2 text-pink-500" />
                    <span className="text-sm font-medium">{influencer.instagramPosts} posts</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <Heart className="h-4 w-4 mr-2 text-pink-500" />
                    <span className="text-sm font-medium">{influencer.instagramAvgLikes} avg likes</span>
                  </div>
                  <div className="flex items-center text-gray-700">
                    <MessageCircle className="h-4 w-4 mr-2 text-pink-500" />
                    <span className="text-sm font-medium">{influencer.instagramAvgComments} avg comments</span>
                  </div>
                </div>
                
                {influencer.instagramBio && (
                  <div className="mb-3">
                    <span className="text-xs font-medium text-gray-600">Bio:</span>
                    <p className="text-sm text-gray-700 mt-1">{influencer.instagramBio}</p>
                  </div>
                )}
                
                <div className="grid grid-cols-2 gap-4 text-xs">
                  {influencer.instagramLocation && (
                    <div className="flex items-center text-gray-600">
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{influencer.instagramLocation}</span>
                    </div>
                  )}
                  {influencer.instagramLastActive && (
                    <div className="flex items-center text-gray-600">
                      <Clock className="h-3 w-3 mr-1" />
                      <span>Active {influencer.instagramLastActive}</span>
                    </div>
                  )}
                  {influencer.instagramEmail && (
                    <div className="flex items-center text-gray-600">
                      <Mail className="h-3 w-3 mr-1" />
                      <span>{influencer.instagramEmail}</span>
                    </div>
                  )}
                  {influencer.instagramWebsite && (
                    <div className="flex items-center text-gray-600">
                      <Globe className="h-3 w-3 mr-1" />
                      <span>Website</span>
                    </div>
                  )}
                </div>
                
                {influencer.instagramCategories && (
                  <div className="mt-3">
                    <span className="text-xs font-medium text-gray-600">Categories:</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {influencer.instagramCategories.map((category, index) => (
                        <span key={index} className="px-2 py-1 bg-pink-200 text-pink-700 text-xs rounded-full">
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        )}

        {/* Description */}
        <div className="mb-6">
          <h4 className="font-semibold text-gray-900 mb-2">Channel Description</h4>
          <p className="text-gray-600 text-sm leading-relaxed">{influencer.description}</p>
        </div>

        {/* AI Generated Message */}
        <div className="mb-4">
          <h4 className="font-semibold text-gray-900 mb-3">AI-Generated Outreach</h4>
          
          {/* Platform tabs */}
          {influencer.platforms.length > 1 && (
            <div className="flex space-x-1 mb-3">
              <button
                onClick={() => setActiveTab('youtube')}
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                  activeTab === 'youtube'
                    ? 'bg-red-100 text-red-700'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                <Youtube className="h-4 w-4 mr-1" />
                YouTube
              </button>
              {influencer.instagramHandle && (
                <button
                  onClick={() => setActiveTab('instagram')}
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    activeTab === 'instagram'
                      ? 'bg-pink-100 text-pink-700'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  <Instagram className="h-4 w-4 mr-1" />
                  Instagram
                </button>
              )}
            </div>
          )}
          
          {/* Message content */}
          <div className={`p-4 rounded-xl ${
            activeTab === 'youtube' 
              ? 'bg-gradient-to-r from-red-50 to-orange-50' 
              : 'bg-gradient-to-r from-pink-50 to-purple-50'
          }`}>
            <div className="flex items-center justify-between mb-2">
              <span className={`text-sm font-medium ${
                activeTab === 'youtube' ? 'text-red-700' : 'text-pink-700'
              }`}>
                {activeTab === 'youtube' ? 'YouTube Message' : 'Instagram DM'}
              </span>
              <button
                onClick={activeTab === 'youtube' ? copyMessage : copyInstagramMessage}
                className={`flex items-center text-sm font-medium transition-colors ${
                  activeTab === 'youtube' 
                    ? 'text-red-600 hover:text-red-700' 
                    : 'text-pink-600 hover:text-pink-700'
                }`}
              >
                {(activeTab === 'youtube' ? messageCopied : instagramMessageCopied) ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-1" />
                    Copied!
                  </>
                ) : (
                  <>
                    <Copy className="h-4 w-4 mr-1" />
                    Copy
                  </>
                )}
              </button>
            </div>
            <p className="text-gray-700 text-sm leading-relaxed italic">
              "{activeTab === 'youtube' ? influencer.message : influencer.instagramMessage}"
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex space-x-3">
          <button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-3 rounded-xl font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 flex items-center justify-center">
            <MessageCircle className="h-4 w-4 mr-2" />
            Contact on {activeTab === 'youtube' ? 'YouTube' : 'Instagram'}
          </button>
          {influencer.instagramHandle && (
            <a
              href={`https://instagram.com/${influencer.instagramHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="px-4 py-3 bg-pink-100 text-pink-600 rounded-xl hover:bg-pink-200 transition-colors flex items-center justify-center"
            >
              <Instagram className="h-4 w-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  );
};

export default InfluencerCard;