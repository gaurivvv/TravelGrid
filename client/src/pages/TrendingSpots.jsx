import React, { useState, useEffect } from 'react';
import { MapPin, TrendingUp, Star, Users, Calendar, Heart, Share2 } from 'lucide-react';
import Navbar from '../components/Custom/Navbar';
import { useTheme } from '../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { Heart as HeartFilled } from 'lucide-react';
import { FaSquareWhatsapp, FaSquareXTwitter, FaFacebook } from "react-icons/fa6";
import { SiGmail } from "react-icons/si";
import { Dialog, DialogContent, DialogTitle, IconButton } from '@mui/material';
import { useWishlist } from '@/context/WishlistContext';
import toast from 'react-hot-toast';

const TrendingSpots = () => {
  const [spots, setSpots] = useState([]);
  const [filter, setFilter] = useState('all');
  const [loading, setLoading] = useState(true);
  const [visibleCount, setVisibleCount] = useState(9);
  const [favoriteSpots, setFavoriteSpots] = useState([]);
  const [open, setOpen] = useState(false);

  const { wishlist, addToWishlist } = useWishlist();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  // mock trending data
  const mockTrendingSpots = [/* ... keep your destinations list here ... */];

  useEffect(() => {
    setTimeout(() => {
      setSpots(mockTrendingSpots);
      setLoading(false);
    }, 1000);
  }, []);

  const handleLoadMoreSpots = () => {
    setVisibleCount((prev) => prev + 9);
  };

  const toggleFavorite = (spotId) => {
    setFavoriteSpots((prev) =>
      prev.includes(spotId)
        ? prev.filter((id) => id !== spotId)
        : [...prev, spotId]
    );
  };

  const AddToWishListHandler = (spot) => {
    const inWishlist = wishlist?.some((p) => p.id === spot.id);
    if (!inWishlist) {
      addToWishlist(spot);
      toast.success("Added to wishlist!");
    } else {
      toast("Already in your wishlist");
    }
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const filteredSpots = filter === 'all'
    ? spots
    : spots.filter(spot => spot.category === filter);

  const categories = [
    { key: 'all', label: 'All Spots', icon: TrendingUp },
    { key: 'beach', label: 'Beach', icon: MapPin },
    { key: 'cultural', label: 'Cultural', icon: Star },
    { key: 'nature', label: 'Nature', icon: Calendar },
    { key: 'city', label: 'City', icon: Users },
    { key: 'adventure', label: 'Adventure', icon: Heart }
  ];

  // share options
  const shareUrl = window.location.href;
  const options = [
    {
      icon: <FaSquareWhatsapp
        color="green"
        size={50}
        cursor={'pointer'}
        onClick={() => window.open(`https://wa.me/?text=${encodeURIComponent(shareUrl)}`)}
      />,
      text: "WhatsApp"
    },
    {
      icon: <FaFacebook
        color="blue"
        size={50}
        cursor={'pointer'}
        onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`, "_blank")}
      />,
      text: "Facebook"
    },
    {
      icon: <FaSquareXTwitter
        size={50}
        cursor={'pointer'}
        color="black"
        onClick={() => window.open(`https://twitter.com/intent/tweet?url=${encodeURIComponent(shareUrl)}`)}
      />,
      text: "Twitter"
    },
    {
      icon: <SiGmail
        size={50}
        cursor={'pointer'}
        color="red"
        onClick={() => window.open(`mailto:?subject=${encodeURIComponent("Check out this Trending Spot!")}&body=${encodeURIComponent(`I found this spot, thought you might like it: ${shareUrl}`)}`)}
      />,
      text: "Mail"
    }
  ];

  const handleExploreLocation = (locationId) => {
    navigate(`/location/${locationId}`);
  };

  if (loading) {
    return (
      <div className={`min-h-screen flex items-center justify-center ${isDarkMode ? 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900' : 'bg-gradient-to-br from-rose-300 via-blue-200 to-gray-300'}`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500 mx-auto mb-4"></div>
          <p className={`text-lg ${isDarkMode ? 'text-gray-300' : 'text-gray-600'}`}>Discovering trending destinations...</p>
        </div>
      </div>
    );
  }

  return (
    <div className={`min-h-screen bg-gradient-to-br ${isDarkMode ? ' from-black/70 via-gray-900/60 to-transparent' : 'from-pink-100/60 via-white/40 to-transparent'}`}>
      <Navbar />

      {/* Hero Section */}
      {/* ... keep hero section same ... */}

      {/* Filter Tabs */}
      {/* ... keep filter section same ... */}

      {/* Stats Banner */}
      {/* ... keep stats banner same ... */}

      {/* Spots Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSpots.slice(0, visibleCount).map((spot, index) => (
              <div
                key={spot.id}
                className={`backdrop-blur-md rounded-2xl border transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20 overflow-hidden h-full ${
                  isDarkMode 
                    ? 'bg-white/10 border-white/20 hover:border-pink-500/20' 
                    : 'bg-white/90 border-black/20 hover:border-pink-500/20'
                }`}
              >
                {/* Image Container */}
                {/* ... keep image, buttons, badges ... */}

                {/* Content */}
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span className={`font-semibold ${isDarkMode ? 'text-white' : 'text-gray-900'}`}>
                        {spot.rating}
                      </span>
                      <span className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                        ({spot.recent_reviews} reviews)
                      </span>
                    </div>
                    <div
                      className={`px-2 py-1 rounded-full text-sm font-semibold ${
                        spot.price_range === '$' ? 'bg-green-100 text-green-800' :
                        spot.price_range === '$$' ? 'bg-yellow-200 text-yellow-800' :
                        'bg-red-200 text-red-800'
                      }`}
                    >
                      {spot.price_range}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-4">
                    {spot.highlights.map((highlight, i) => (
                      <div key={i} className={`text-sm ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                        • {highlight}
                      </div>
                    ))}
                  </div>

                  <button
                    onClick={() => handleExploreLocation(spot.id)}
                    className="mt-auto bg-gradient-to-r from-pink-500 to-blue-500 text-white px-4 py-2 rounded-lg font-medium hover:opacity-90 transition"
                  >
                    Explore
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          {visibleCount < filteredSpots.length && (
            <div className="text-center mt-8">
              <button
                onClick={handleLoadMoreSpots}
                className="px-6 py-2 rounded-full bg-gradient-to-r from-pink-500 to-blue-500 text-white font-semibold hover:opacity-90 transition"
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default TrendingSpots;
