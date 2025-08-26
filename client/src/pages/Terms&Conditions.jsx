import React, { useState, useEffect } from "react";
import Navbar from "../components/Custom/Navbar";

export default function TermsAndConditions() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    const systemIsDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    setIsDarkMode(savedTheme ? savedTheme === "dark" : systemIsDark);
  }, []);

  // Theme classes with proper contrast
  const themeClasses = {
    bg: isDarkMode ? "bg-gray-900" : "bg-gray-50",
    text: isDarkMode ? "text-gray-200" : "text-gray-700",
    heading: isDarkMode ? "text-white" : "text-gray-900",
    card: isDarkMode ? "bg-gray-800" : "bg-white",
    border: isDarkMode ? "border-gray-700" : "border-gray-200",
    muted: isDarkMode ? "text-gray-400" : "text-gray-500"
  };

  const sections = [
    {
      title: "Acceptance of Terms",
      content: "By accessing or using the TravelGrid website (the 'Service'), you agree to be bound by these Terms and our Privacy Policy."
    },
    {
      title: "Use of the Service",
      content: "TravelGrid provides an online platform for browsing and booking travel services. You agree to use the Service lawfully and without infringing others' rights.",
      list: [
        "You must be at least 18 years old",
        "Keep your account credentials secure",
        "Provide accurate and current information"
      ],
      highlight: "blue"
    },
    {
      title: "Bookings and Payments",
      content: "When booking, you contract directly with the service provider. TravelGrid acts only as an intermediary.",
      list: [
        "Prices may change until booking is confirmed",
        "Full payment required at booking",
        "Cancellation policies vary by provider"
      ],
      highlight: "orange"
    },
    {
      title: "Intellectual Property",
      content: "All website content is TravelGrid's property or licensed material, protected by copyright. Reproduction or modification without permission is prohibited."
    },
    {
      title: "Disclaimer of Warranties",
      content: "The Service is provided 'as is' and 'as available'. TravelGrid makes no warranties about service operation or content accuracy.",
      highlight: "red"
    },
    {
      title: "Governing Law",
      content: "These Terms are governed by Indian law, without regard to conflict principles."
    }
  ];

  // Highlight colors with proper contrast for both themes
  const highlightColors = {
    blue: {
      bg: isDarkMode ? "bg-blue-900/30" : "bg-blue-50",
      border: "border-blue-500",
      text: isDarkMode ? "text-blue-200" : "text-blue-800"
    },
    orange: {
      bg: isDarkMode ? "bg-amber-900/30" : "bg-amber-50",
      border: "border-amber-500",
      text: isDarkMode ? "text-amber-200" : "text-amber-800"
    },
    red: {
      bg: isDarkMode ? "bg-red-900/30" : "bg-red-50",
      border: "border-red-500",
      text: isDarkMode ? "text-red-200" : "text-red-800"
    }
  };

  return (
    <>
      <Navbar />
      <div className={`min-h-screen ${themeClasses.bg}`} style={{ paddingTop: "70px" }}>
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-12">
            <h1 className={`text-3xl sm:text-4xl font-bold mb-3 ${themeClasses.heading}`}>
              Terms & Conditions
            </h1>
            <p className={themeClasses.muted}>
              Please read these terms carefully before using our services.
            </p>
            <div className="w-20 h-1 bg-blue-500 mx-auto mt-5 rounded"></div>
          </div>

          {/* Sections */}
          <div className="space-y-6">
            {sections.map((section, index) => (
              <div key={index} className={`p-5 sm:p-6 rounded-lg shadow-sm ${themeClasses.card}`}>
                <div className="flex items-start">
                  <div className="w-7 h-7 sm:w-8 sm:h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-semibold text-xs sm:text-sm mr-3 mt-1">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <h2 className={`text-xl font-semibold mb-3 ${themeClasses.heading}`}>
                      {section.title}
                    </h2>

                    <p className={`mb-3 ${themeClasses.text}`}>
                      {section.content}
                    </p>

                    {section.list && (
                      <div className={`p-4 rounded-lg border-l-4 mb-3 ${highlightColors[section.highlight].border} ${highlightColors[section.highlight].bg}`}>
                        <h4 className={`font-semibold mb-2 ${highlightColors[section.highlight].text}`}>
                          {section.highlight === "blue" ? "Requirements:" : "Important:"}
                        </h4>
                        <ul className={`space-y-1 ${highlightColors[section.highlight].text}`}>
                          {section.list.map((item, i) => (
                            <li key={i}>• {item}</li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {section.highlight === "red" && (
                      <div className={`p-4 rounded-lg border-l-4 ${highlightColors.red.border} ${highlightColors.red.bg}`}>
                        <p className={highlightColors.red.text}>
                          The Service is provided{" "}
                          <span className="font-semibold">
                            "as is"
                          </span>{" "}
                          and{" "}
                          <span className="font-semibold">
                            "as available"
                          </span>
                          . TravelGrid makes no warranties about service operation or content accuracy.
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Contact Section */}
          <div className={`mt-10 p-6 sm:p-8 rounded-lg text-center border ${isDarkMode ? "bg-blue-900/20 border-blue-700" : "bg-blue-50 border-blue-200"}`}>
            <h3 className={`font-semibold mb-3 text-lg ${isDarkMode ? "text-blue-100" : "text-blue-900"}`}>
              Have Questions?
            </h3>
            <p className={isDarkMode ? "text-blue-200" : "text-blue-700"}>
              Contact us if you need clarification on these terms.
            </p>
            <a
              href="mailto:legal@travelgrid.com"
              className="inline-flex items-center mt-4 px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Contact Legal Team
            </a>
          </div>

          {/* Footer */}
          <div className={`text-center mt-8 pt-6 border-t ${themeClasses.border}`}>
            <p className={themeClasses.muted}>
              Terms effective from the date above and may be updated periodically.
            </p>
          </div>
        </div>
      </div>
    </>
  );
}