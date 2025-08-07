import React from 'react';
import { TrendingUp, Users, MessageSquare, CheckCircle, Clock, Target, Instagram, Mail, Heart, Eye } from 'lucide-react';

interface DashboardProps {
  stats: {
    influencersFound: number;
    messagesGenerated: number;
    averageFitScore: number;
    topMatches: number;
    instagramHandlesFound: number;
    crossPlatformInfluencers: number;
  };
}

const Dashboard: React.FC<DashboardProps> = ({ stats }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 mb-8">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">Campaign Overview</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">Influencers Found</p>
              <p className="text-3xl font-bold text-gray-900">{stats.influencersFound}</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <Users className="h-6 w-6 text-blue-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">Messages Generated</p>
              <p className="text-3xl font-bold text-gray-900">{stats.messagesGenerated}</p>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <MessageSquare className="h-6 w-6 text-purple-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-teal-50 to-cyan-50 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-teal-600 text-sm font-medium">Avg Fit Score</p>
              <p className="text-3xl font-bold text-gray-900">{stats.averageFitScore}%</p>
            </div>
            <div className="bg-teal-100 p-3 rounded-full">
              <Target className="h-6 w-6 text-teal-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-green-50 to-emerald-50 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">Top Matches</p>
              <p className="text-3xl font-bold text-gray-900">{stats.topMatches}</p>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <CheckCircle className="h-6 w-6 text-green-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-pink-50 to-rose-50 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-pink-600 text-sm font-medium">Instagram Found</p>
              <p className="text-3xl font-bold text-gray-900">{stats.instagramHandlesFound}</p>
            </div>
            <div className="bg-pink-100 p-3 rounded-full">
              <Instagram className="h-6 w-6 text-pink-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-orange-50 to-amber-50 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">Cross-Platform</p>
              <p className="text-3xl font-bold text-gray-900">{stats.crossPlatformInfluencers}</p>
            </div>
            <div className="bg-orange-100 p-3 rounded-full">
              <TrendingUp className="h-6 w-6 text-orange-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-indigo-50 to-blue-50 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-indigo-600 text-sm font-medium">Emails Found</p>
              <p className="text-3xl font-bold text-gray-900">{stats.instagramHandlesFound}</p>
            </div>
            <div className="bg-indigo-100 p-3 rounded-full">
              <Mail className="h-6 w-6 text-indigo-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-red-50 to-pink-50 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-red-600 text-sm font-medium">Avg Engagement</p>
              <p className="text-3xl font-bold text-gray-900">4.2%</p>
            </div>
            <div className="bg-red-100 p-3 rounded-full">
              <Heart className="h-6 w-6 text-red-600" />
            </div>
          </div>
        </div>

        <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-yellow-600 text-sm font-medium">Avg Followers</p>
              <p className="text-3xl font-bold text-gray-900">89K</p>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <Eye className="h-6 w-6 text-yellow-600" />
            </div>
          </div>
        </div>
      </div>

      {/* Additional Instagram Insights */}
      <div className="mt-8 p-6 bg-gradient-to-r from-pink-50 to-purple-50 rounded-xl">
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center">
          <Instagram className="h-5 w-5 text-pink-600 mr-2" />
          Instagram Discovery Insights
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <span className="text-gray-600">Verified Accounts</span>
            <span className="font-semibold text-gray-900">3/8</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <span className="text-gray-600">Avg Posts</span>
            <span className="font-semibold text-gray-900">1,247</span>
          </div>
          <div className="flex items-center justify-between p-3 bg-white rounded-lg">
            <span className="text-gray-600">Avg Stories</span>
            <span className="font-semibold text-gray-900">567</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;