import React, { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { Menu, X, User, LogOut, LogIn, ChevronDown } from "lucide-react";
import { useWishlist } from '../../context/WishlistContext'; // path may vary


const Navbar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [expanded, setExpanded] = useState(null);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const { user, logout, isAuthenticated } = useAuth();

  // mobile group toggle
  const toggleGroup = (item) => {
    setExpanded((prev) => (prev === item ? null : item));
  };

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Trending Spots", path: "/trending-spots" },
    {
      name: "Booking",
      subitems: [
        { label: "Ticket", path: "/ticket" },
        { label: "Hotels", path: "/hotels" },
        { label: "Packages", path: "/packages" },
      ],
    },
    {
      name: "Support",
      subitems: [
        { label: "Travel Plans", path: "/travel-plan-generator" },
        { label: "Guide", path: "/guides" },
        { label: "Contact", path: "/contact" },
        { label: "Hotel / Flight Review Summarizer", path: "/Summarizer" },
      ],
    },
    {
      name: "Tools",
      subitems: [
        { label: "Trip Expense Calculator", path: "/trip-calculator" },
        { label: "Packing Checklist", path: "/packing-checklist" },
        { label: "Travel Recommendations", path: "/recommendation" },
        { label: "Feedback", path: "/feedback" },
      ],
    },

    { name: "Wishlist", path: "/wishlist" },
];
  

  const handleLogout = async () => {
    try {
      await logout();
    } catch (e) {
      console.error("Logout failed", e);
    }
    setIsSidebarOpen(false);
  };

  const handleScroll = () => {
    setIsScrolled(window.scrollY > 0);
  };



  const { wishlist } = useWishlist();



  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkBaseClasses =
    "py-1.5 px-4 text-md font-medium rounded-sm hover:text-pink-500 hover:shadow-sm transition-all duration-300";

  return (
    <>
      <nav
        className={`box-border w-full fixed top-0 left-0 z-50 h-20 backdrop-blur-md border-b border-white/10 bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a] to-[#2c1a31] shadow-md px-4 sm:px-6 transition-colors duration-200 ${
          isScrolled ? "shadow-xl" : ""
        }`}
      >
        <div className="w-full max-w-full mx-auto flex justify-between items-center gap-4 px-2 py-6">
          <NavLink
            to="/"
            onClick={() =>
              typeof window !== "undefined" &&
              window.scrollTo({ top: 0, behavior: "smooth" })
            }
            className="text-2xl font-bold tracking-tight bg-gradient-to-br from-pink-400 to-pink-600 bg-clip-text text-transparent transition-colors duration-200"
          >
            TravelGrid
          </NavLink>

          <div className="hidden md:flex items-center gap-4 text-gray-200 font-medium flex-1 justify-center">
            {navLinks.map((link) =>
              link.subitems ? (
                <div className="relative group" key={link.name}>
                  <button
                    className="py-1 px-2 text-md rounded-sm hover:text-pink-500 hover:shadow-lg transition-all duration-300 flex items-center gap-1"
                    aria-haspopup="menu"
                    aria-expanded="false"
                  >
                    {link.name} <ChevronDown fontSize={16} />
                  </button>
                  <div className="absolute left-0 mt-0 opacity-0 min-w-[180px] text-white rounded-lg bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a] to-[#2c1a31] shadow-md group-hover:opacity-100 group-hover:translate-y-2 transition-all duration-300 z-50 p-2">
                    {link.subitems.map((item) => (
                      <NavLink
                        key={item.label}
                        to={item.path}
                        className={({ isActive }) =>
                          `py-2 px-4 text-md hover:bg-gradient-to-r from-pink-500 to-pink-600 hover:text-white block transition-all rounded-md duration-200 ${
                            isActive
                              ? "bg-gradient-to-r from-pink-700 to-pink-500 text-white"
                              : ""
                          }`
                        }
                      >
                        {item.label}
                      </NavLink>
                    ))}
                  </div>
                </div>
              ) : (
                <NavLink
                  key={link.name}
                  to={link.path}
                  end
                  className={({ isActive }) =>
                    `${linkBaseClasses} ${
                      isActive
                        ? "bg-gradient-to-r from-pink-700 to-pink-500 shadow-md text-white"
                        : ""
                    }`
                  }
                >
                  {link.name}
                </NavLink>
              )
            )}
          </div>
  

          <div className="hidden md:flex gap-4 items-center text-pink-500 font-medium">
            {isAuthenticated ? (
              <>
                <NavLink
                  to="/dashboard"
                  className="hover:text-white flex items-center gap-1 transition-colors duration-200"
                >
                  <User size={18} /> Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="hover:text-pink-500 flex items-center gap-1 transition-colors duration-200"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="bg-gradient-to-r from-pink-600 to-pink-500 text-white px-4 py-2 rounded-md font-semibold hover:scale-105 transition-all"
                >
                  Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="bg-gradient-to-r from-pink-600 to-pink-500 text-white px-4 py-2 rounded-md font-semibold hover:scale-105 transition-all"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>

          <button
            onClick={() => setIsSidebarOpen((prev) => !prev)}
            aria-label={isSidebarOpen ? "Close menu" : "Open menu"}
            aria-expanded={isSidebarOpen}
            className="md:hidden text-pink-400 hover:text-pink-500 transition-colors duration-200 p-1 rounded-md hover:bg-pink-500/20 cursor-pointer"
          >
            {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <div
        className={`fixed inset-0 bg-black/10 z-40 transition-opacity duration-300 md:hidden ${
          isSidebarOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsSidebarOpen(false)}
      />

      <div
        className={`fixed top-0 right-0 h-full w-[80vw] sm:w-[60vw] max-w-[320px] bg-gradient-to-r from-[#1a1a1a] via-[#1a1a1a] to-[#2c1a31] z-[1002] transition-transform duration-300 ease-in-out transform ${
          isSidebarOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="p-5 flex flex-col h-full text-gray-300">
          <div className="flex justify-end items-center mb-6 p-2 border-b border-gray-600">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="text-pink-500 hover:text-pink-400 transition-colors duration-200 p-1 rounded-md justify-end hover:bg-pink-500/10 cursor-pointer"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex flex-col gap-4">
            {navLinks.map((link) =>
              link.subitems ? (
                <div
                  key={link.name}
                  className="flex flex-col justify-between items-start"
                >
                  <button
                    className="py-1 px-2 rounded hover:bg-pink-500 transition-all duration-200 w-full flex justify-between items-center"
                    onClick={() => toggleGroup(link.name)}
                    aria-expanded={expanded === link.name}
                  >
                    <span className="text-gray-100 font-medium">{link.name}</span>
                    <span className="text-white text-xl p-1 cursor-pointer">
                      {expanded === link.name ? "-" : "+"}
                    </span>
                  </button>
                  {expanded === link.name && (
                    <div className="w-full flex flex-col px-4 py-2 bg-[#2c1a31] rounded-md mt-2 border border-pink-800 shadow-md">


                      {link.subitems.map((item) => (
                        <NavLink
                          key={item.label}
                          to={item.path}
                          className="w-full px-3 py-2 text-white font-medium rounded hover:bg-pink-600 transition-all duration-200"
>

                        
                          {item.label}
                        </NavLink>
                      ))}
                    </div>
                  )}
     
                </div>
              ) : (
                <NavLink
                  key={link.name}
                  to={link.path}
                  className="py-2 px-3 font-medium rounded hover:bg-pink-500 transition-all duration-200"
                >
                  {link.name}
                </NavLink>
              )
            )}

            {isAuthenticated ? (
              <>
                <NavLink
                  to="/dashboard"
                  className="flex gap-2 items-center py-2 px-3 rounded hover:bg-pink-500/30 transition-all duration-200"
                >
                  <User size={18} /> Dashboard
                </NavLink>
                <button
                  onClick={handleLogout}
                  className="flex gap-2 items-center text-red-400 py-2 px-3 hover:bg-red-500/10"
                >
                  <LogOut size={18} /> Logout
                </button>
              </>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className="flex gap-2 items-center py-2 px-3 rounded font-medium hover:bg-pink-500 transition-all duration-200"
                >
                  <LogIn size={18} /> Login
                </NavLink>
                <NavLink
                  to="/signup"
                  className="bg-gradient-to-b from-pink-600 to-pink-500 hover:from-pink-500 hover:to-pink-600 text-white py-2 rounded font-medium text-center mt-2 transition-all duration-200 hover:shadow-lg hover:scale-105"
                >
                  Sign Up
                </NavLink>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;