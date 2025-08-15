import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../context/ThemeContext";
import CustomCarousel from "../Custom/CustomCarousel";
import { useState } from "react";
const guides = [
  {
    name: "Aarav Mehta",
    expertise: "Himalayan Treks",
    bio: "Certified mountain guide with 10+ years of experience leading treks in the Indian Himalayas.",
    image: "https://randomuser.me/api/portraits/men/51.jpg",
  },
  {
    name: "Sofia Rossi",
    expertise: "Italian Cities & Culture",
    bio: "Passionate about art, food, and history. Fluent in English and Italian. Rome-based.",
    image: "https://randomuser.me/api/portraits/women/65.jpg",
  },
  {
    name: "James Carter",
    expertise: "African Safaris",
    bio: "Wildlife expert and safari guide, specializing in Kenya and Tanzania national parks.",
    image: "https://randomuser.me/api/portraits/men/34.jpg",
  },
  // added all 3 pet guides for home page
  {
    name: "Snowy Kat",
    expertise: "🐾 Mountain Treks & Pet Adventures",
    bio: "Passionate about guiding pet parents through scenic mountain trails and nature escapes. Specialist in safe trekking experiences for dogs and cats.",
    image: "https://randomuser.me/api/portraits/men/17.jpg",
  },
  {
    name: "Mei Lin",
    expertise: "East Asia Tours",
    bio: "Licensed guide for Japan, China, and South Korea. Loves sharing local traditions and cuisine.",
    image: "https://randomuser.me/api/portraits/women/43.jpg",
  },
  {
    name: "Ayushi Uniyal",
    expertise: "🐾 Pet Travel & Coastal Getaways",
    bio: "Loves helping travelers explore India’s beaches with their furry companions. Expert in pet-friendly accommodations and transport.",
    image: "https://randomuser.me/api/portraits/women/17.jpg",
  },
  {
    name: "Weddy Brown",
    expertise: "🐾 Urban Travel with Pets",
    bio: "Amsterdam-based guide specializing in navigating cities with pets. Knows every pet-friendly park, café, and stay in the area.",
    image: "https://randomuser.me/api/portraits/men/74.jpg"
  }
];

const TravelGuides = () => {
  const [index, setIndex] = useState(0);
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleguide = (guideName) => {
    navigate("/guides", { state: { selectedGuideId: guideName } });
  };

  return (
    <section className="w-full py-20">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <div className="mb-16">
          <h2
            className={`text-3xl md:text-4xl font-medium mb-6 transition-all duration-300 ${
              isDarkMode ? "text-white" : "text-gray-900"
            }`}
          >
            Meet Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-400 to-purple-400">
              Top Travel Guides
            </span>
          </h2>
          <p
            className={`text-lg max-w-2xl mx-auto leading-relaxed transition-all duration-300 ${
              isDarkMode ? "text-gray-300" : "text-gray-600"
            }`}
          >
            Connect with experienced local guides who will make your journey truly unforgettable.
          </p>
        </div>

        {/* Only CustomCarousel component here */}
        <CustomCarousel guides={guides} viewprofilehandle={handleguide} isHome={true} />
      </div>
    </section>
  );
};

export default TravelGuides;
