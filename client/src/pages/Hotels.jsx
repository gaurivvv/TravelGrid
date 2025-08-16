import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-hot-toast';
import Navbar from '../components/Custom/Navbar';
import Footer from '../components/Custom/Footer';
import hotels from '../data/hotels';
import { useTheme } from "../context/ThemeContext";
import { config } from '../config';

function Hotels() {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const { isDarkMode } = useTheme();

  const filteredHotels = hotels.filter((hotel) => {
    const q = query.toLowerCase();
    return (
      hotel.name.toLowerCase().includes(q) ||
      hotel.location.toLowerCase().includes(q)
    );
  });

  const handleLike = async (hotel) => {
    const body = {
      placeId: hotel.id,
      name: hotel.name,
      location: hotel.location,
      description: hotel.description,
    };

    try {
      const res = await fetch(`${config.API_BASE_URL}/save/save-place`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include', // ✅ Required for cookie-based auth
        body: JSON.stringify(body),
      });

      const data = await res.json();
      if (res.ok) {
        toast.success('Place saved successfully to dashboard!');
      } else {
        toast.error(data.message || '⚠️ This place is already saved.');
      }
    } catch (err) {
      console.error('Save failed:', err);
      toast.error('🚨 Failed to save place. Please try again.');
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-gradient-to-br from-black to-pink-900 overflow-x-hidden">
      <Navbar lightBackground />

      <main className="flex flex-col flex-1 w-full items-center">
        <section className="w-full py-24 flex flex-col items-center text-center px-4 bg-gradient-to-br from-black to-pink-900">
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Explore World-Class <span className="text-pink-600">Hotels</span>
          </h1>
          <p className="text-lg md:text-xl text-white max-w-2xl mb-8">
            Browse and book from our curated list of the top luxury hotels worldwide.
          </p>
          <div className="w-full max-w-lg">
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search by hotel or destination..."
              className="w-full px-6 py-4 rounded-xl bg-white border-2 border-pink-200 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-pink-500/30 focus:border-pink-500 shadow-lg transition-all"
            />
          </div>
        </section>

        <section className="max-w-7xl w-full pt-12 px-4 pb-16 grid gap-10 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {filteredHotels.map((hotel) => (
            <div
              key={hotel.id}
              className={` ${isDarkMode ?
                "backdrop-blur-sm bg-white/90 dark:bg-gray-800/90 border border-pink-400/20 dark:border-pink-400/30 rounded-2xl shadow-xl hover:bg-white/95 dark:hover:bg-gray-800/95 transition-all duration-300 hover:shadow-2xl cursor-pointer" :
                "backdrop-blur-lg bg-white/95 border border-pink-300/50 rounded-2xl shadow-2xl overflow-hidden flex flex-col hover:shadow-pink-200/30 transition-all duration-300 transform hover:scale-105"}`}
            >
              <img
                src={hotel.image}
                alt={hotel.name}
                className="w-full h-56 object-cover object-center"
              />
              <div className="p-6 flex-1 flex flex-col">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className={`text-2xl font-semibold ${isDarkMode ? "text-gray-800 dark:text-white" : "text-gray-950"}`}>
                    {hotel.name}
                  </h3>
                  {hotel.isPetFriendly && (
                    <div
                      className={`text-xl cursor-pointer ${isDarkMode ? "text-pink-600" : "text-pink-900"}`}
                      title="Pet-friendly hotel"
                    >
                      🐾
                    </div>
                  )}
                </div>

                <span className="text-black dark:text-black font-medium mb-3">
                  {hotel.location}
                </span>
                <p className={`text-sm text-black line-clamp-3 flex-1 ${isDarkMode ? "dark:text-black" : "text-black"}`}>
                  {hotel.description}
                </p>
                <button
                  onClick={() => navigate(`/hotels/${hotel.id}`)}
                  className="mt-4 self-start bg-gradient-to-r from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white px-5 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 cursor-pointer"
                >
                  Book Hotel
                </button>
                <button
                  onClick={() => handleLike(hotel)}
                  className={`mt-2 px-4 py-2 rounded-lg text-sm font-semibold transition cursor-pointer ${isDarkMode ? "bg-pink-100 dark:bg-pink-900/30 hover:bg-pink-200 dark:hover:bg-pink-900/50 text-black dark:text-black" : "bg-pink-400 darl:bg-pink-900/10 hover:bg-pink-500 dark:hover:bg-pink-900/30 text-black"}`}
                >
                  ❤️ Save to Dashboard
                </button>
              </div>
            </div>
          ))}
          {filteredHotels.length === 0 && (
            <p className="col-span-full text-center text-gray-600 dark:text-gray-400 text-lg font-medium">
              No hotels match your search.
            </p>
          )}
        </section>
      </main>
    </div>
  );
}

export default Hotels;
