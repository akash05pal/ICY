import React, { useState } from 'react';
import { Search, Target, MessageSquare, TrendingUp, Users, DollarSign } from 'lucide-react';

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

interface BrandFormProps {
  onSubmit: (data: BrandFormData) => void;
  loading: boolean;
}

const BrandForm: React.FC<BrandFormProps> = ({ onSubmit, loading }) => {
  const [formData, setFormData] = useState<BrandFormData>({
    productName: '',
    productDescription: '',
    targetAudience: {
      ageRange: '18-25',
      location: '',
      interests: '',
      gender: 'all'
    },
    brandTone: 'friendly',
    campaignGoals: [],
    platformFocus: ['youtube'],
    budgetRange: 'micro',
    niche: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  const handleGoalChange = (goal: string) => {
    setFormData(prev => ({
      ...prev,
      campaignGoals: prev.campaignGoals.includes(goal)
        ? prev.campaignGoals.filter(g => g !== goal)
        : [...prev.campaignGoals, goal]
    }));
  };

  const handlePlatformChange = (platform: string) => {
    setFormData(prev => ({
      ...prev,
      platformFocus: prev.platformFocus.includes(platform)
        ? prev.platformFocus.filter(p => p !== platform)
        : [...prev.platformFocus, platform]
    }));
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Setup Your Campaign</h2>
        <p className="text-gray-600">Tell us about your brand to find perfect influencer matches</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Product Details */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
          <div className="flex items-center mb-4">
            <Target className="h-6 w-6 text-blue-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Product Details</h3>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
              <input
                type="text"
                value={formData.productName}
                onChange={(e) => setFormData(prev => ({ ...prev, productName: e.target.value }))}
                placeholder="e.g., GlowCare Serum"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Niche/Industry</label>
              <input
                type="text"
                value={formData.niche}
                onChange={(e) => setFormData(prev => ({ ...prev, niche: e.target.value }))}
                placeholder="e.g., skincare, fitness, tech"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">Product Description</label>
            <textarea
              value={formData.productDescription}
              onChange={(e) => setFormData(prev => ({ ...prev, productDescription: e.target.value }))}
              placeholder="Describe your product's key features and benefits..."
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
              required
            />
          </div>
        </div>

        {/* Target Audience */}
        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
          <div className="flex items-center mb-4">
            <Users className="h-6 w-6 text-purple-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Target Audience</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Age Range</label>
              <select
                value={formData.targetAudience.ageRange}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  targetAudience: { ...prev.targetAudience, ageRange: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value="13-17">13-17 years</option>
                <option value="18-25">18-25 years</option>
                <option value="26-35">26-35 years</option>
                <option value="36-45">36-45 years</option>
                <option value="46+">46+ years</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
              <select
                value={formData.targetAudience.gender}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  targetAudience: { ...prev.targetAudience, gender: e.target.value }
                }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              >
                <option value="all">All Genders</option>
                <option value="female">Female</option>
                <option value="male">Male</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
              <input
                type="text"
                value={formData.targetAudience.location}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  targetAudience: { ...prev.targetAudience, location: e.target.value }
                }))}
                placeholder="e.g., United States, India, Global"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Interests</label>
              <input
                type="text"
                value={formData.targetAudience.interests}
                onChange={(e) => setFormData(prev => ({
                  ...prev,
                  targetAudience: { ...prev.targetAudience, interests: e.target.value }
                }))}
                placeholder="e.g., wellness, beauty, lifestyle"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all"
              />
            </div>
          </div>
        </div>

        {/* Campaign Settings */}
        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-xl">
          <div className="flex items-center mb-4">
            <TrendingUp className="h-6 w-6 text-teal-600 mr-2" />
            <h3 className="text-xl font-semibold text-gray-900">Campaign Settings</h3>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Brand Tone</label>
              <select
                value={formData.brandTone}
                onChange={(e) => setFormData(prev => ({ ...prev, brandTone: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              >
                <option value="friendly">Friendly & Casual</option>
                <option value="professional">Professional</option>
                <option value="playful">Playful & Fun</option>
                <option value="luxury">Luxury & Premium</option>
                <option value="authentic">Authentic & Real</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Budget Range</label>
              <select
                value={formData.budgetRange}
                onChange={(e) => setFormData(prev => ({ ...prev, budgetRange: e.target.value }))}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent transition-all"
              >
                <option value="micro">Micro (1K-10K followers)</option>
                <option value="mid">Mid-tier (10K-100K followers)</option>
                <option value="macro">Macro (100K+ followers)</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-3">Campaign Goals</label>
            <div className="flex flex-wrap gap-3">
              {['Brand Awareness', 'Product Sales', 'User Generated Content', 'Lead Generation', 'Community Building'].map((goal) => (
                <button
                  key={goal}
                  type="button"
                  onClick={() => handleGoalChange(goal)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                    formData.campaignGoals.includes(goal)
                      ? 'bg-teal-600 text-white shadow-md'
                      : 'bg-white text-gray-700 border border-gray-300 hover:border-teal-500'
                  }`}
                >
                  {goal}
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <button
            type="submit"
            disabled={loading}
            className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center mx-auto"
          >
            {loading ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Finding Influencers...
              </>
            ) : (
              <>
                <Search className="h-5 w-5 mr-2" />
                Find Perfect Influencers
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BrandForm;