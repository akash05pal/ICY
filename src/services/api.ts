// API service for YouTube Data API and OpenAI integration
const YOUTUBE_API_KEY = import.meta.env.VITE_YOUTUBE_API_KEY;
const OPENAI_API_KEY = import.meta.env.VITE_OPENAI_API_KEY;

// Check if API keys are available
if (!YOUTUBE_API_KEY) {
  console.warn('YouTube API key not found. Please set VITE_YOUTUBE_API_KEY environment variable.');
}

if (!OPENAI_API_KEY) {
  console.warn('OpenAI API key not found. Please set VITE_OPENAI_API_KEY environment variable.');
}

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
  // New Instagram-specific fields
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

// Mock Instagram data for realistic simulation
const mockInstagramData = [
  {
    handle: 'emma_greenbeauty',
    followers: '45.2K',
    posts: '1,247',
    engagement: '4.8%',
    email: 'emma@greenbeauty.com',
    bio: '🌱 Clean beauty enthusiast | Sustainable living | Skincare tips & reviews | Collab: emma@greenbeauty.com',
    verified: true,
    categories: ['Beauty', 'Skincare', 'Clean Beauty', 'Sustainability'],
    location: 'Los Angeles, CA',
    website: 'https://greenbeauty.com',
    avgLikes: '2,156',
    avgComments: '89',
    storiesCount: '342',
    reelsCount: '156',
    lastActive: '2 hours ago'
  },
  {
    handle: 'sarah_wellness',
    followers: '78.9K',
    posts: '892',
    engagement: '5.2%',
    email: 'sarah@sarahwellness.com',
    bio: '💚 Wellness coach | Natural remedies | Healthy lifestyle | DM for collabs',
    verified: false,
    categories: ['Wellness', 'Health', 'Natural Remedies', 'Lifestyle'],
    location: 'Austin, TX',
    website: 'https://sarahwellness.com',
    avgLikes: '4,123',
    avgComments: '156',
    storiesCount: '567',
    reelsCount: '234',
    lastActive: '1 hour ago'
  },
  {
    handle: 'mike_fitness',
    followers: '125.4K',
    posts: '1,567',
    engagement: '3.9%',
    email: 'mike@mikefitness.com',
    bio: '💪 Fitness coach | Nutrition tips | Workout routines | Collab: mike@mikefitness.com',
    verified: true,
    categories: ['Fitness', 'Health', 'Nutrition', 'Workouts'],
    location: 'Miami, FL',
    website: 'https://mikefitness.com',
    avgLikes: '4,890',
    avgComments: '234',
    storiesCount: '789',
    reelsCount: '445',
    lastActive: '30 minutes ago'
  },
  {
    handle: 'lisa_skincare',
    followers: '32.1K',
    posts: '654',
    engagement: '6.1%',
    email: 'lisa@lisaskincare.com',
    bio: '✨ Skincare specialist | Product reviews | Beauty tips | DM for partnerships',
    verified: false,
    categories: ['Skincare', 'Beauty', 'Product Reviews', 'Self-Care'],
    location: 'Seattle, WA',
    website: 'https://lisaskincare.com',
    avgLikes: '1,956',
    avgComments: '78',
    storiesCount: '234',
    reelsCount: '123',
    lastActive: '3 hours ago'
  },
  {
    handle: 'alex_tech',
    followers: '89.7K',
    posts: '1,123',
    engagement: '4.2%',
    email: 'alex@alextech.com',
    bio: '🚀 Tech enthusiast | Gadget reviews | App recommendations | Collab: alex@alextech.com',
    verified: true,
    categories: ['Technology', 'Gadgets', 'Apps', 'Reviews'],
    location: 'San Francisco, CA',
    website: 'https://alextech.com',
    avgLikes: '3,756',
    avgComments: '145',
    storiesCount: '456',
    reelsCount: '267',
    lastActive: '5 hours ago'
  },
  {
    handle: 'jessica_fashion',
    followers: '156.8K',
    posts: '2,134',
    engagement: '3.8%',
    email: 'jessica@jessicafashion.com',
    bio: '👗 Fashion blogger | Style tips | Outfit inspiration | DM for collabs',
    verified: true,
    categories: ['Fashion', 'Style', 'Lifestyle', 'Outfits'],
    location: 'New York, NY',
    website: 'https://jessicafashion.com',
    avgLikes: '5,967',
    avgComments: '289',
    storiesCount: '892',
    reelsCount: '534',
    lastActive: '1 day ago'
  },
  {
    handle: 'david_food',
    followers: '67.3K',
    posts: '987',
    engagement: '5.7%',
    email: 'david@davidfood.com',
    bio: '🍳 Food blogger | Recipe creator | Restaurant reviews | Collab: david@davidfood.com',
    verified: false,
    categories: ['Food', 'Cooking', 'Recipes', 'Restaurants'],
    location: 'Chicago, IL',
    website: 'https://davidfood.com',
    avgLikes: '3,834',
    avgComments: '167',
    storiesCount: '445',
    reelsCount: '223',
    lastActive: '4 hours ago'
  },
  {
    handle: 'amanda_travel',
    followers: '234.1K',
    posts: '1,789',
    engagement: '3.2%',
    email: 'amanda@amandatravel.com',
    bio: '✈️ Travel blogger | Adventure seeker | Destination guides | DM for partnerships',
    verified: true,
    categories: ['Travel', 'Adventure', 'Lifestyle', 'Photography'],
    location: 'Denver, CO',
    website: 'https://amandatravel.com',
    avgLikes: '7,492',
    avgComments: '345',
    storiesCount: '1,234',
    reelsCount: '678',
    lastActive: '6 hours ago'
  },
  // Famous influencers with large followings
  {
    handle: 'kayla_itsines',
    followers: '15.2M',
    posts: '2,456',
    engagement: '2.8%',
    email: 'kayla@kaylaitsines.com',
    bio: '💪 Fitness trainer | BBG creator | Workout programs | Collab: kayla@kaylaitsines.com',
    verified: true,
    categories: ['Fitness', 'Health', 'Workouts', 'Lifestyle'],
    location: 'Adelaide, Australia',
    website: 'https://kaylaitsines.com',
    avgLikes: '425,600',
    avgComments: '12,340',
    storiesCount: '2,890',
    reelsCount: '1,234',
    lastActive: '1 hour ago'
  },
  {
    handle: 'joe_wickes',
    followers: '8.7M',
    posts: '1,890',
    engagement: '3.1%',
    email: 'joe@joewicks.com',
    bio: '🏃‍♂️ The Body Coach | HIIT workouts | Nutrition tips | Collab: joe@joewicks.com',
    verified: true,
    categories: ['Fitness', 'Health', 'HIIT', 'Nutrition'],
    location: 'London, UK',
    website: 'https://joewicks.com',
    avgLikes: '269,700',
    avgComments: '8,920',
    storiesCount: '1,567',
    reelsCount: '890',
    lastActive: '30 minutes ago'
  },
  {
    handle: 'chloe_ting',
    followers: '12.4M',
    posts: '1,234',
    engagement: '2.9%',
    email: 'chloe@chloeting.com',
    bio: '💪 Fitness YouTuber | Workout challenges | Healthy lifestyle | Collab: chloe@chloeting.com',
    verified: true,
    categories: ['Fitness', 'Workouts', 'Health', 'Lifestyle'],
    location: 'Melbourne, Australia',
    website: 'https://chloeting.com',
    avgLikes: '359,600',
    avgComments: '11,230',
    storiesCount: '2,123',
    reelsCount: '1,456',
    lastActive: '2 hours ago'
  },
  {
    handle: 'pamela_reif',
    followers: '9.1M',
    posts: '1,567',
    engagement: '3.4%',
    email: 'pamela@pamelareif.com',
    bio: '💪 Fitness trainer | Workout videos | Healthy living | Collab: pamela@pamelareif.com',
    verified: true,
    categories: ['Fitness', 'Health', 'Workouts', 'Lifestyle'],
    location: 'Munich, Germany',
    website: 'https://pamelareif.com',
    avgLikes: '309,400',
    avgComments: '10,340',
    storiesCount: '1,890',
    reelsCount: '1,123',
    lastActive: '45 minutes ago'
  },
  {
    handle: 'adidas',
    followers: '45.2M',
    posts: '3,456',
    engagement: '1.2%',
    email: 'partnerships@adidas.com',
    bio: '🏃‍♂️ Official adidas account | Sportswear | Running | Football | Collab: partnerships@adidas.com',
    verified: true,
    categories: ['Sports', 'Fashion', 'Athletics', 'Brand'],
    location: 'Herzogenaurach, Germany',
    website: 'https://adidas.com',
    avgLikes: '542,400',
    avgComments: '15,670',
    storiesCount: '4,567',
    reelsCount: '2,890',
    lastActive: '1 hour ago'
  },
  {
    handle: 'nike',
    followers: '52.8M',
    posts: '4,123',
    engagement: '1.1%',
    email: 'partnerships@nike.com',
    bio: '✅ Just Do It | Official Nike account | Sportswear | Athletics | Collab: partnerships@nike.com',
    verified: true,
    categories: ['Sports', 'Fashion', 'Athletics', 'Brand'],
    location: 'Beaverton, OR',
    website: 'https://nike.com',
    avgLikes: '580,800',
    avgComments: '16,890',
    storiesCount: '5,234',
    reelsCount: '3,456',
    lastActive: '2 hours ago'
  }
];

// Utility function to extract Instagram handles from text
const extractInstagramHandle = (text: string): string | null => {
  if (!text) return null;
  
  // Multiple regex patterns to catch different Instagram link formats
  const patterns = [
    /(?:https?:\/\/)?(?:www\.)?instagram\.com\/([A-Za-z0-9_.]+)/gi,
    /(?:^|\s)@([A-Za-z0-9_.]+)(?:\s|$)/gi,
    /(?:ig|insta|instagram)[\s:]*@?([A-Za-z0-9_.]+)/gi,
    /follow me on instagram[\s:]*@?([A-Za-z0-9_.]+)/gi
  ];
  
  for (const pattern of patterns) {
    const match = pattern.exec(text);
    if (match && match[1]) {
      // Clean up the handle
      const handle = match[1].replace(/[^\w.]/g, '');
      if (handle.length > 2 && handle.length < 30) {
        return handle;
      }
    }
  }
  
  return null;
};

// Function to get mock Instagram data for a handle
const getMockInstagramData = (handle: string) => {
  const mockData = mockInstagramData.find(data => 
    data.handle.toLowerCase() === handle.toLowerCase()
  );
  
  if (mockData) {
    return mockData;
  }
  
  // Generate random mock data if handle not found
  const followers = Math.floor(Math.random() * 200 + 10) + 'K';
  const posts = Math.floor(Math.random() * 2000 + 100).toLocaleString();
  const engagement = (Math.random() * 5 + 2).toFixed(1) + '%';
  const email = `${handle}@${handle}.com`;
  const bio = `Content creator | ${handle} | DM for collaborations`;
  const verified = Math.random() > 0.7;
  const categories = ['Lifestyle', 'Content Creator'];
  const location = 'United States';
  const website = `https://${handle}.com`;
  const avgLikes = Math.floor(Math.random() * 5000 + 500).toLocaleString();
  const avgComments = Math.floor(Math.random() * 200 + 50).toLocaleString();
  const storiesCount = Math.floor(Math.random() * 1000 + 100).toLocaleString();
  const reelsCount = Math.floor(Math.random() * 500 + 50).toLocaleString();
  const lastActive = `${Math.floor(Math.random() * 24 + 1)} hours ago`;
  
  return {
    handle,
    followers,
    posts,
    engagement,
    email,
    bio,
    verified,
    categories,
    location,
    website,
    avgLikes,
    avgComments,
    storiesCount,
    reelsCount,
    lastActive
  };
};

export const searchInfluencers = async (brandData: BrandFormData): Promise<Influencer[]> => {
  try {
    // Build a targeted search query based on form data
    const buildSearchQuery = () => {
      const terms = [];
      
      // Add niche/industry (most important)
      if (brandData.niche.trim()) {
        terms.push(brandData.niche);
      }
      
      // Add target audience interests
      if (brandData.targetAudience.interests.trim()) {
        terms.push(brandData.targetAudience.interests);
      }
      
      // Add product name if provided
      if (brandData.productName.trim()) {
        terms.push(brandData.productName);
      }
      
      // Add gender-specific terms if specified
      if (brandData.targetAudience.gender !== 'all') {
        if (brandData.targetAudience.gender === 'female') {
          terms.push('women', 'female');
        } else if (brandData.targetAudience.gender === 'male') {
          terms.push('men', 'male');
        }
      }
      
      // Add budget-based influencer terms
      if (brandData.budgetRange === 'micro') {
        terms.push('micro influencer');
      } else if (brandData.budgetRange === 'mid') {
        terms.push('mid-tier influencer');
      } else if (brandData.budgetRange === 'macro') {
        terms.push('famous', 'popular');
      }
      
      // Add generic influencer terms
      terms.push('influencer', 'creator', 'youtube');
      
      // Remove duplicates and join
      const uniqueTerms = [...new Set(terms)];
      return uniqueTerms.join(' ');
    };

    const searchQuery = buildSearchQuery();
    console.log('Search Query:', searchQuery); // For debugging

    // Function to perform a search
    const performSearch = async (query: string, maxResults: string = '30') => {
      const searchUrl = 'https://www.googleapis.com/youtube/v3/search';
      const searchParams = new URLSearchParams({
        part: 'snippet',
        type: 'channel',
        q: query,
        maxResults: maxResults,
        key: YOUTUBE_API_KEY,
        order: 'relevance',
        channelType: 'any'
      });

      const searchResponse = await fetch(`${searchUrl}?${searchParams}`);
      
      if (!searchResponse.ok) {
        throw new Error('YouTube API request failed');
      }
      
      return await searchResponse.json();
    };

    // Try the targeted search first
    let searchData = await performSearch(searchQuery);
    
    // If we don't get enough results, try a broader search
    if (!searchData.items || searchData.items.length < 5) {
      console.log('Targeted search returned few results, trying broader search...');
      
      // Fallback to just niche + influencer
      const fallbackQuery = `${brandData.niche} influencer`;
      searchData = await performSearch(fallbackQuery, '50');
      
      // If still not enough, try even broader
      if (!searchData.items || searchData.items.length < 5) {
        console.log('Fallback search returned few results, trying very broad search...');
        searchData = await performSearch('influencer', '50');
      }
    }
    
    const influencers: Influencer[] = [];
    
    for (const item of searchData.items || []) {
      const channelId = item.snippet.channelId;
      const channelName = item.snippet.title;
      const description = item.snippet.description;
      const thumbnailUrl = item.snippet.thumbnails?.default?.url;
      
      // Extract Instagram handle from channel description
      const instagramHandle = extractInstagramHandle(description) || undefined;
      
      // Step 2: Get channel statistics
      const statsUrl = 'https://www.googleapis.com/youtube/v3/channels';
      const statsParams = new URLSearchParams({
        part: 'statistics',
        id: channelId,
        key: YOUTUBE_API_KEY
      });
      
      try {
        const statsResponse = await fetch(`${statsUrl}?${statsParams}`);
        const statsData = await statsResponse.json();
        
        const stats = statsData.items?.[0]?.statistics;
        const subscriberCount = stats?.subscriberCount || '0';
        const viewCount = stats?.viewCount || '0';
        const videoCount = stats?.videoCount || '0';
        
        // Less restrictive filtering - only filter out very small channels
        const subscriberNum = parseInt(subscriberCount);
        if (subscriberNum < 100) {
          continue; // Skip channels with less than 100 subscribers
        }
        
        // Calculate estimated views per video
        let estimatedViews = 'N/A';
        if (viewCount !== '0' && videoCount !== '0' && parseInt(videoCount) > 0) {
          const avgViews = Math.round(parseInt(viewCount) / parseInt(videoCount));
          estimatedViews = avgViews.toLocaleString();
        }
        
        // Get Instagram data if handle exists
        let instagramData = null;
        if (instagramHandle) {
          instagramData = getMockInstagramData(instagramHandle);
        }
        
        // Step 3: Generate AI analysis using OpenAI
        const { fitScore, message, instagramMessage } = await generateInfluencerAnalysis(
          brandData,
          channelName,
          description,
          subscriberCount,
          instagramHandle,
          instagramData
        );
        
        // Determine available platforms
        const platforms = ['youtube'];
        if (instagramHandle) {
          platforms.push('instagram');
        }
        
        const influencer: Influencer = {
          id: channelId,
          name: channelName,
          description: description || 'No description available',
          subscribers: subscriberCount,
          brandFitScore: fitScore,
          message: message,
          instagramHandle: instagramHandle,
          instagramMessage: instagramMessage,
          platforms: platforms,
          thumbnailUrl: thumbnailUrl,
          estimatedViews: estimatedViews,
          engagementRate: Math.floor(Math.random() * 5 + 2).toString() // Simulated engagement rate
        };
        
        // Add Instagram-specific data if available
        if (instagramData) {
          Object.assign(influencer, {
            instagramFollowers: instagramData.followers,
            instagramPosts: instagramData.posts,
            instagramEngagement: instagramData.engagement,
            instagramEmail: instagramData.email,
            instagramBio: instagramData.bio,
            instagramVerified: instagramData.verified,
            instagramCategories: instagramData.categories,
            instagramLocation: instagramData.location,
            instagramWebsite: instagramData.website,
            instagramAvgLikes: instagramData.avgLikes,
            instagramAvgComments: instagramData.avgComments,
            instagramStoriesCount: instagramData.storiesCount,
            instagramReelsCount: instagramData.reelsCount,
            instagramLastActive: instagramData.lastActive
          });
        }
        
        influencers.push(influencer);
      } catch (error) {
        console.error(`Error fetching stats for channel ${channelId}:`, error);
      }
    }
    
    // Sort by brand fit score first, then by subscriber count
    return influencers
      .sort((a, b) => {
        // First sort by brand fit score (descending)
        if (a.brandFitScore !== b.brandFitScore) {
          return b.brandFitScore - a.brandFitScore;
        }
        
        // Then sort by subscriber count (descending)
        const aSubs = parseInt(a.subscribers);
        const bSubs = parseInt(b.subscribers);
        return bSubs - aSubs;
      })
      .slice(0, 10); // Limit to top 10 results
    
  } catch (error) {
    console.error('Error searching influencers:', error);
    throw new Error('Failed to search influencers. Please check your API keys and try again.');
  }
};

const generateInfluencerAnalysis = async (
  brandData: BrandFormData,
  channelName: string,
  description: string,
  subscriberCount: string,
  instagramHandle: string | undefined,
  instagramData?: any
): Promise<{ fitScore: number; message: string; instagramMessage?: string }> => {
  try {
    const instagramInfo = instagramData ? `
INSTAGRAM DATA:
- Followers: ${instagramData.followers}
- Posts: ${instagramData.posts}
- Engagement: ${instagramData.engagement}
- Bio: ${instagramData.bio}
- Categories: ${instagramData.categories.join(', ')}
- Location: ${instagramData.location}
- Verified: ${instagramData.verified ? 'Yes' : 'No'}
- Email: ${instagramData.email}
- Avg Likes: ${instagramData.avgLikes}
- Avg Comments: ${instagramData.avgComments}
- Stories: ${instagramData.storiesCount}
- Reels: ${instagramData.reelsCount}
- Last Active: ${instagramData.lastActive}
` : '';

    // Build targeted analysis criteria based on form data
    const buildAnalysisCriteria = () => {
      const criteria = [];
      
      // Product-specific criteria
      if (brandData.productName) {
        criteria.push(`- Product relevance: How well does this influencer's content align with ${brandData.productName}?`);
      }
      
      // Niche-specific criteria
      if (brandData.niche) {
        criteria.push(`- Niche alignment: Does this influencer create content in the ${brandData.niche} space?`);
      }
      
      // Target audience criteria
      const ageRange = brandData.targetAudience.ageRange;
      const gender = brandData.targetAudience.gender;
      const interests = brandData.targetAudience.interests;
      
      if (ageRange) {
        criteria.push(`- Age demographic: Does this influencer's audience match the ${ageRange} age range?`);
      }
      
      if (gender !== 'all') {
        criteria.push(`- Gender demographic: Does this influencer's audience align with ${gender} audience?`);
      }
      
      if (interests) {
        criteria.push(`- Interest alignment: Does this influencer create content about ${interests}?`);
      }
      
      // Budget criteria
      const subscriberNum = parseInt(subscriberCount);
      if (brandData.budgetRange === 'micro' && subscriberNum <= 10000) {
        criteria.push(`- Budget fit: This is a micro influencer (${subscriberNum.toLocaleString()} subscribers) - perfect for micro budget campaigns`);
      } else if (brandData.budgetRange === 'mid' && subscriberNum > 10000 && subscriberNum <= 100000) {
        criteria.push(`- Budget fit: This is a mid-tier influencer (${subscriberNum.toLocaleString()} subscribers) - perfect for mid-tier budget campaigns`);
      } else if (brandData.budgetRange === 'macro' && subscriberNum > 100000) {
        criteria.push(`- Budget fit: This is a macro influencer (${subscriberNum.toLocaleString()} subscribers) - perfect for macro budget campaigns`);
      }
      
      // Campaign goal criteria
      if (brandData.campaignGoals.includes('Product Sales')) {
        criteria.push(`- Sales potential: Does this influencer have a history of product reviews or sponsored content?`);
      }
      if (brandData.campaignGoals.includes('Brand Awareness')) {
        criteria.push(`- Awareness potential: Does this influencer have broad reach and engagement?`);
      }
      if (brandData.campaignGoals.includes('User Generated Content')) {
        criteria.push(`- Content creation: Does this influencer create high-quality, shareable content?`);
      }
      
      return criteria.join('\n');
    };

    const analysisCriteria = buildAnalysisCriteria();

    const prompt = `You are an AI influencer marketing analyst. Analyze this influencer for brand fit and generate personalized outreach messages for both YouTube and Instagram.

BRAND INFORMATION:
- Product: ${brandData.productName}
- Description: ${brandData.productDescription}
- Target Audience: ${brandData.targetAudience.ageRange} years old, ${brandData.targetAudience.gender}, located in ${brandData.targetAudience.location || 'global'}, interested in ${brandData.targetAudience.interests}
- Brand Tone: ${brandData.brandTone}
- Campaign Goals: ${brandData.campaignGoals.join(', ')}
- Budget Range: ${brandData.budgetRange} influencers
- Niche: ${brandData.niche}

INFLUENCER INFORMATION:
- Channel Name: ${channelName}
- Description: ${description}
- Subscribers: ${subscriberCount}
- Instagram Handle: ${instagramHandle || 'Not found'}
${instagramInfo}

ANALYSIS CRITERIA:
${analysisCriteria}

TASKS:
1. Rate brand fit from 0-100 based on the specific criteria above, considering:
   - Content relevance to the specific product and niche
   - Audience alignment with the exact target demographics
   - Budget appropriateness for the campaign
   - Campaign goal alignment
   - Channel quality and authenticity

2. Generate a personalized YouTube outreach message that:
   - References the specific product: ${brandData.productName}
   - Mentions the specific niche: ${brandData.niche}
   - Matches the brand tone: ${brandData.brandTone}
   - Aligns with campaign goals: ${brandData.campaignGoals.join(', ')}
   - References specific content or channel elements
   - Proposes a clear collaboration opportunity
   - Is professional but engaging
   - Keeps it concise (2-3 sentences max)

3. ${instagramHandle ? `Generate a separate Instagram DM message that:
   - References the specific product: ${brandData.productName}
   - Is more casual and Instagram-appropriate
   - References their cross-platform presence
   - Includes relevant emojis
   - Keeps it under 2 sentences
   - Mentions their Instagram engagement or content` : 'Skip Instagram message as no handle found'}

FORMAT YOUR RESPONSE EXACTLY AS:
Brand Fit Score: [number]
YouTube Message: [your personalized YouTube message]${instagramHandle ? '\nInstagram Message: [your personalized Instagram message]' : ''}`;

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${OPENAI_API_KEY}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: prompt
          }
        ],
        max_tokens: 400,
        temperature: 0.7
      })
    });

    if (!response.ok) {
      throw new Error('OpenAI API request failed');
    }

    const data = await response.json();
    const content = data.choices[0].message.content;
    
    // Parse the response
    const fitScoreMatch = content.match(/Brand Fit Score:\s*(\d+)/);
    const youtubeMessageMatch = content.match(/YouTube Message:\s*(.+?)(?=\nInstagram Message:|$)/s);
    const instagramMessageMatch = content.match(/Instagram Message:\s*(.+)/s);
    
    const fitScore = fitScoreMatch ? parseInt(fitScoreMatch[1]) : Math.floor(Math.random() * 40 + 50);
    const message = youtubeMessageMatch ? youtubeMessageMatch[1].trim() : `Hi ${channelName}! We love your content in the ${brandData.niche} space and think your audience would be perfect for ${brandData.productName}. Would you be interested in a collaboration?`;
    
    let instagramMessage;
    if (instagramHandle) {
      instagramMessage = instagramMessageMatch ? instagramMessageMatch[1].trim() : `Hey @${instagramHandle}! 👋 Love your content! Think ${brandData.productName} would be perfect for your audience. Interested in collaborating? 💫`;
    }
    
    return { fitScore, message, instagramMessage };
    
  } catch (error) {
    console.error('Error generating AI analysis:', error);
    
    // Fallback response
    const fallbackScore = Math.floor(Math.random() * 40 + 50);
    const fallbackMessage = `Hi ${channelName}! We discovered your amazing content and think your audience would love ${brandData.productName}. Let's explore a potential partnership!`;
    const fallbackInstagramMessage = instagramHandle ? `Hey! 👋 Love your content across platforms! Think ${brandData.productName} would be perfect for your audience 💫` : undefined;
    
    return { fitScore: fallbackScore, message: fallbackMessage, instagramMessage: fallbackInstagramMessage };
  }
};