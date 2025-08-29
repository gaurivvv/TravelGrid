import React, { useState, useEffect } from 'react';
import { MapPin, TrendingUp, Star, Users, Calendar, Heart, Share2, Eye, Filter, Search, Globe, Clock, Award } from 'lucide-react';
import Navbar from '../components/Custom/Navbar';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { Heart as HeartFilled } from "lucide-react";
import { motion, AnimatePresence } from 'framer-motion';

const TrendingSpots = () => {
  const [spots, setSpots] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(9);
  const [favoriteSpots, setFavoriteSpots] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('trending');
  
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  // Enhanced mock data with more realistic trending spots
  const mockTrendingSpots = [
    {
      id: 1,
      name: "Santorini, Greece",
      country: "Greece",
      image: "https://images.unsplash.com/photo-1613395877344-13d4a8e0d49e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 4.8,
      trending_score: 95,
      visitors_count: "2.3M",
      category: "beach",
      price_range: "$$",
      best_time: "Apr-Oct",
      highlights: ["Stunning sunsets", "White architecture", "Wine tours"],
      recent_reviews: 1250,
      growth_percentage: 23,
      description: "Iconic Greek island known for its dramatic views, stunning sunsets, and white-washed buildings."
    },
    {
      id: 2,
      name: "Kyoto, Japan",
      country: "Japan",
      image: "https://images.unsplash.com/photo-1545569341-9eb8b30979d9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 4.9,
      trending_score: 92,
      visitors_count: "1.8M",
      category: "cultural",
      price_range: "$",
      best_time: "Mar-May, Sep-Nov",
      highlights: ["Ancient temples", "Cherry blossoms", "Traditional culture"],
      recent_reviews: 2100,
      growth_percentage: 18,
      description: "Japan's cultural heart with over 1,600 Buddhist temples and 400 Shinto shrines."
    },
    {
      id: 3,
      name: "Banff National Park",
      country: "Canada",
      image: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 4.7,
      trending_score: 89,
      visitors_count: "4.2M",
      category: "nature",
      price_range: "$",
      best_time: "Jun-Sep",
      highlights: ["Mountain lakes", "Wildlife viewing", "Hiking trails"],
      recent_reviews: 890,
      growth_percentage: 31,
      description: "Canada's first national park featuring turquoise lakes and snow-capped peaks."
    },
    {
      id: 4,
      name: "Dubai, UAE",
      country: "United Arab Emirates",
      image: "https://images.unsplash.com/photo-1518684079-3c830dcef090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 4.6,
      trending_score: 87,
      visitors_count: "16.7M",
      category: "city",
      price_range: "$$",
      best_time: "Nov-Mar",
      highlights: ["Luxury shopping", "Modern architecture", "Desert safari"],
      recent_reviews: 3200,
      growth_percentage: 15,
      description: "Ultra-modern city known for luxury shopping, futuristic architecture, and desert landscapes."
    },
    {
      id: 5,
      name: "Tulum, Mexico",
      country: "Mexico",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 4.5,
      trending_score: 85,
      visitors_count: "800K",
      category: "beach",
      price_range: "$$",
      best_time: "Dec-Apr",
      highlights: ["Mayan ruins", "Cenotes", "Bohemian vibes"],
      recent_reviews: 670,
      growth_percentage: 42,
      description: "Bohemian beach town with ancient Mayan ruins and crystal-clear cenotes."
    },
    {
      id: 6,
      name: "Reykjavik, Iceland",
      country: "Iceland",
      image: "https://images.unsplash.com/photo-1606130503037-6a8ef67c9d2d?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 4.8,
      trending_score: 83,
      visitors_count: "1.2M",
      category: "nature",
      price_range: "$$",
      best_time: "Jun-Aug, Sep-Mar",
      highlights: ["Northern lights", "Blue lagoon", "Unique landscapes"],
      recent_reviews: 540,
      growth_percentage: 28,
      description: "World's northernmost capital with geothermal hot springs and northern lights."
    },
    {
      id: 7,
      name: "Maldives",
      country: "Maldives",
      image: "https://images.unsplash.com/photo-1573843981267-be1999ff37cd?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 4.9,
      trending_score: 91,
      visitors_count: "1.7M",
      category: "beach",
      price_range: "$$",
      best_time: "Nov-Apr",
      highlights: ["Overwater villas", "Crystal clear water", "Luxury resorts"],
      recent_reviews: 980,
      growth_percentage: 35,
      description: "Tropical paradise with overwater bungalows and pristine coral reefs."
    },
    {
      id: 8,
      name: "Machu Picchu, Peru",
      country: "Peru",
      image: "https://images.unsplash.com/photo-1587595431973-160d0d94add1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 4.8,
      trending_score: 88,
      visitors_count: "1.5M",
      category: "cultural",
      price_range: "$",
      best_time: "May-Sep",
      highlights: ["Ancient Inca ruins", "Mountain hiking", "Sacred valley"],
      recent_reviews: 1150,
      growth_percentage: 22,
      description: "Ancient Incan citadel set high in the Andes Mountains."
    },
    {
      id: 9,
      name: "Bali, Indonesia",
      country: "Indonesia",
      image: "https://images.unsplash.com/photo-1537953773345-d172ccf13cf1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 4.6,
      trending_score: 86,
      visitors_count: "6.3M",
      category: "beach",
      price_range: "$",
      best_time: "Apr-Oct",
      highlights: ["Rice terraces", "Temples", "Beach clubs"],
      recent_reviews: 2800,
      growth_percentage: 29,
      description: "Island of the Gods with spiritual temples and lush rice terraces."
    },
    {
      id: 10,
      name: "Swiss Alps",
      country: "Switzerland",
      image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 4.9,
      trending_score: 90,
      visitors_count: "3.1M",
      category: "nature",
      price_range: "$$",
      best_time: "Jun-Sep, Dec-Mar",
      highlights: ["Mountain peaks", "Skiing", "Alpine villages"],
      recent_reviews: 750,
      growth_percentage: 19,
      description: "Majestic mountain range offering world-class skiing and hiking."
    },
    {
      id: 11,
      name: "Paris, France",
      country: "France",
      image: "https://images.unsplash.com/photo-1712647016816-7072674bd83f?fm=jpg&q=60&w=3000&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 4.7,
      trending_score: 84,
      visitors_count: "38M",
      category: "city",
      price_range: "$$",
      best_time: "Apr-Jun, Sep-Oct",
      highlights: ["Eiffel Tower", "Art museums", "French cuisine"],
      recent_reviews: 4200,
      growth_percentage: 12,
      description: "City of Light with iconic landmarks and world-class art museums."
    },
    {
      id: 12,
      name: "New York City, USA",
      country: "United States",
      image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      rating: 4.5,
      trending_score: 82,
      visitors_count: "65M",
      category: "city",
      price_range: "$$",
      best_time: "Apr-Jun, Sep-Nov",
      highlights: ["Broadway shows", "Central Park", "Museums"],
      recent_reviews: 5800,
      growth_percentage: 8,
      description: "The Big Apple with iconic skyscrapers and endless entertainment."
    }
  ];

  useEffect(() => {
    setTimeout(() => {
      setSpots(mockTrendingSpots);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLoadMoreSpots = () => {
    setVisibleCount((prev) => prev + 9);
  }

  const toggleFavorite = (spotId) => {
    setFavoriteSpots((prev) =>
      prev.includes(spotId)
        ? prev.filter((id) => id !== spotId)
        : [...prev, spotId]
    );
  };

  const filteredSpots = spots.filter(spot => {
    const matchesFilter = filter === 'all' || spot.category === filter;
    const matchesSearch = spot.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         spot.country.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const sortedSpots = [...filteredSpots].sort((a, b) => {
    switch (sortBy) {
      case 'trending':
        return b.trending_score - a.trending_score;
      case 'rating':
        return b.rating - a.rating;
      case 'growth':
        return b.growth_percentage - a.growth_percentage;
      case 'visitors':
        return parseInt(b.visitors_count.replace(/[^0-9]/g, '')) - parseInt(a.visitors_count.replace(/[^0-9]/g, ''));
      default:
        return b.trending_score - a.trending_score;
    }
  });

  const categories = [
    { key: 'all', label: 'All Spots', icon: TrendingUp, color: 'from-pink-500 to-purple-500' },
    { key: 'beach', label: 'Beach', icon: '🏖️', color: 'from-blue-400 to-cyan-400' },
    { key: 'cultural', label: 'Cultural', icon: '🏛️', color: 'from-orange-400 to-red-400' },
    { key: 'nature', label: 'Nature', icon: '🏔️', color: 'from-green-400 to-emerald-400' },
    { key: 'city', label: 'City', icon: '🏙️', color: 'from-purple-400 to-pink-400' },
    { key: 'adventure', label: 'Adventure', icon: '🏕️', color: 'from-yellow-400 to-orange-400' }
  ];

  const handleExploreLocation = (locationId) => {
    navigate(`/location/${locationId}`);
  }

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-gray-50 to-pink-50'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Discovering trending destinations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-gray-50 via-pink-50 to-purple-50'}`}>
      <Navbar />
      
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative py-20 md:py-32 overflow-hidden"
        style={{ marginTop: '5rem' }}
      >
        {/* Animated Background */}
        <div className="absolute inset-0">
          <div className={`absolute inset-0 ${isDarkMode ? 'bg-gradient-to-br from-black/40 via-pink-900/30 to-purple-900/40' : 'bg-gradient-to-br from-pink-200/40 via-purple-200/30 to-blue-200/40'}`} />
          <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Ccircle cx="30" cy="30" r="2"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-20" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-pink-500/10 border border-pink-500/20 mb-6"
            >
              <TrendingUp className="h-5 w-5 text-pink-500 mr-2" />
              <span className="text-pink-500 font-medium">Live Trending Data</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className={`text-5xl md:text-7xl font-bold mb-6 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}
            >
              Trending <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">Spots</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}
            >
              Discover the world's most popular destinations, updated in real-time based on millions of traveler insights
            </motion.p>

            {/* Search Bar */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="max-w-2xl mx-auto relative"
            >
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search destinations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`w-full pl-12 pr-4 py-4 rounded-2xl border-2 focus:outline-none focus:ring-2 focus:ring-pink-500 transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-black/20 border-white/20 text-white placeholder-gray-400 focus:border-pink-500' 
                      : 'bg-white/80 border-gray-200 text-gray-900 placeholder-gray-500 focus:border-pink-500'
                  }`}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Stats Banner */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { icon: Globe, label: 'Destinations', value: `${spots.length}+`, color: 'text-blue-400' },
              { icon: TrendingUp, label: 'Avg Growth', value: '23%', color: 'text-green-400' },
              { icon: Users, label: 'Travelers', value: '150M+', color: 'text-purple-400' },
              { icon: Star, label: 'Avg Rating', value: '4.7★', color: 'text-yellow-400' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.7 + index * 0.1 }}
                className={`backdrop-blur-md rounded-2xl p-6 border transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20 ${
                  isDarkMode 
                    ? 'bg-black/20 border-white/20 hover:border-white/40' 
                    : 'bg-white/20 border-gray-200/50 hover:border-gray-300/70'
                }`}
              >
                <div className="text-center">
                  <stat.icon className={`h-8 w-8 mx-auto mb-2 ${stat.color}`} />
                  <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                  <div className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Filter and Sort Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="py-6 sticky top-20 z-20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`backdrop-blur-md rounded-2xl p-4 border ${
            isDarkMode 
              ? 'bg-black/20 border-white/20' 
              : 'bg-white/20 border-gray-200/50'
          }`}>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Category Filters */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category.key}
                    onClick={() => setFilter(category.key)}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-300 ${
                      filter === category.key
                        ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                        : `${
                            isDarkMode 
                              ? 'bg-black/30 border border-white/20 text-gray-300 hover:bg-white/10' 
                              : 'bg-white/50 border border-gray-200 text-gray-700 hover:bg-white/80'
                          }`
                    }`}
                  >
                    {typeof category.icon === 'string' ? (
                      <span className="text-lg">{category.icon}</span>
                    ) : (
                      <category.icon className="h-4 w-4" />
                    )}
                    <span className="font-medium">{category.label}</span>
                  </button>
                ))}
              </div>

              {/* Sort Options */}
              <div className="flex items-center space-x-4">
                <span className={`text-sm font-medium ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className={`px-3 py-2 rounded-lg border transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-black/30 border-white/20 text-white focus:border-pink-500' 
                      : 'bg-white/50 border-gray-200 text-gray-700 focus:border-pink-500'
                  }`}
                >
                  <option value="trending">Trending Score</option>
                  <option value="rating">Rating</option>
                  <option value="growth">Growth</option>
                  <option value="visitors">Visitors</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Spots Grid */}
      <motion.section
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="py-8"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatePresence>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {sortedSpots.slice(0, visibleCount).map((spot, index) => (
                <motion.div
                  key={spot.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ delay: index * 0.1 }}
                  className="group relative"
                >
                  <div className={`backdrop-blur-md rounded-2xl border transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20 overflow-hidden h-full ${
                    isDarkMode 
                      ? 'bg-black/20 border-white/20 hover:border-white/40' 
                      : 'bg-white/20 border-gray-200/50 hover:border-gray-300/70'
                  }`}>
                    {/* Image Container */}
                    <div className="relative h-64 overflow-hidden">
                      <img
                        src={spot.image}
                        alt={spot.name}
                        loading="lazy"
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                      
                      {/* Trending Badge */}
                      <div className="absolute top-4 left-4">
                        <div className="px-3 py-1 rounded-full bg-gradient-to-r from-pink-500 to-purple-500 text-white text-sm font-semibold flex items-center space-x-1">
                          <TrendingUp className="h-3 w-3" />
                          <span>#{index + 1}</span>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <div className="absolute top-4 right-4 flex space-x-2">
                        <button
                          onClick={() => toggleFavorite(spot.id)}
                          className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                            isDarkMode ? 'bg-black/50 text-white' : 'bg-white/80 text-gray-700'
                          }`}
                        >
                          {favoriteSpots.includes(spot.id) ? (
                            <HeartFilled className="h-4 w-4 text-red-500" />
                          ) : (
                            <Heart className="h-4 w-4" />
                          )}
                        </button>
                        <button className={`p-2 rounded-full transition-all duration-300 hover:scale-110 ${
                          isDarkMode ? 'bg-black/50 text-white' : 'bg-white/80 text-gray-700'
                        }`}>
                          <Share2 className="h-4 w-4" />
                        </button>
                      </div>

                      {/* Growth Badge */}
                      <div className="absolute bottom-4 right-4">
                        <div className="px-2 py-1 rounded-full bg-green-500 text-white text-xs font-semibold">
                          +{spot.growth_percentage}%
                        </div>
                      </div>

                      {/* Location Info Overlay */}
                      <div className="absolute bottom-4 left-4">
                        <h3 className={`text-xl font-bold mb-1 ${isDarkMode ? 'text-white' : 'text-white'}`}>
                          {spot.name}
                        </h3>
                        <div className="flex items-center text-sm text-gray-200">
                          <MapPin className="h-3 w-3 mr-1" />
                          {spot.country}
                        </div>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Rating and Price */}
                      <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center">
                            <Star className="h-4 w-4 text-yellow-400 fill-current" />
                            <span className={`ml-1 font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                              {spot.rating}
                            </span>
                          </div>
                          <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                            ({spot.recent_reviews} reviews)
                          </span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-sm font-semibold ${
                          spot.price_range === '$' ? 'bg-green-100 text-green-800' :
                          spot.price_range === '$$' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {spot.price_range}
                        </div>
                      </div>

                      {/* Description */}
                      <p className={`text-sm mb-4 line-clamp-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                        {spot.description}
                      </p>

                      {/* Stats */}
                      <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="flex items-center space-x-2">
                          <Users className="h-4 w-4 text-pink-500" />
                          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {spot.visitors_count}
                          </span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="h-4 w-4 text-pink-500" />
                          <span className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            {spot.best_time}
                          </span>
                        </div>
                      </div>

                      {/* Highlights */}
                      <div className="mb-4">
                        <div className="flex flex-wrap gap-2">
                          {spot.highlights.slice(0, 2).map((highlight, idx) => (
                            <span
                              key={idx}
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                isDarkMode 
                                  ? 'bg-pink-500/20 text-pink-300 border border-pink-500/30' 
                                  : 'bg-pink-100 text-pink-700'
                              }`}
                            >
                              {highlight}
                            </span>
                          ))}
                          {spot.highlights.length > 2 && (
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              isDarkMode 
                                ? 'bg-purple-500/20 text-purple-300 border border-purple-500/30' 
                                : 'bg-purple-100 text-purple-700'
                            }`}>
                              +{spot.highlights.length - 2} more
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Trending Score */}
                      <div className="flex items-center justify-between pt-4 border-t border-gray-200/20">
                        <div className="flex items-center space-x-2">
                          <Award className="h-4 w-4 text-pink-500" />
                          <span className={`text-sm font-semibold ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                            Trending Score
                          </span>
                        </div>
                        <div className="text-lg font-bold text-pink-500">
                          {spot.trending_score}
                        </div>
                      </div>

                      {/* CTA Button */}
                      <button
                        onClick={() => handleExploreLocation(spot.id)}
                        className="w-full mt-4 bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white py-3 px-6 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg"
                      >
                        Explore {spot.name}
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </AnimatePresence>

          {/* Load More Button */}
          {visibleCount < sortedSpots.length && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mt-12"
            >
              <button
                onClick={handleLoadMoreSpots}
                className="bg-gradient-to-r from-pink-500 to-purple-500 hover:from-pink-600 hover:to-purple-600 text-white px-8 py-4 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-xl"
              >
                Load More Trending Spots
              </button>
            </motion.div>
          )}

          {/* No Results */}
          {sortedSpots.length === 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-16"
            >
              <div className={`text-6xl mb-4 ${isDarkMode ? 'text-gray-600' : 'text-gray-400'}`}>🌍</div>
              <h3 className={`text-xl font-semibold mb-2 ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                No destinations found
              </h3>
              <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                Try adjusting your search or filter criteria
              </p>
            </motion.div>
          )}
        </div>
      </motion.section>
    </div>
  );
};

export default TrendingSpots;
