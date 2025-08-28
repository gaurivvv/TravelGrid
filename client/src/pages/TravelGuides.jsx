// client/src/pages/TravelGuides.jsx
import { Card, CardContent } from "../components/ui/card";
import { useTheme } from "../context/ThemeContext";

const guides = [
  {
    city: "Jaipur",
    state: "Rajasthan",
    description: "The Pink City, famous for forts and palaces.",
    topThings: [
      "Visit Amer Fort",
      "Explore City Palace",
      "See Hawa Mahal",
      "Shop at Johari Bazaar",
      "Try Rajasthani cuisine",
    ],
  },
  {
    city: "Goa",
    state: "Goa",
    description: "Beach paradise with vibrant nightlife.",
    topThings: [
      "Relax at Baga Beach",
      "Party at Tito’s",
      "Water sports at Calangute",
      "Visit Aguada Fort",
      "Enjoy Goan seafood",
    ],
  },
  {
    city: "Manali",
    state: "Himachal Pradesh",
    description: "A hill station surrounded by snow-capped mountains.",
    topThings: [
      "Visit Solang Valley",
      "Explore Rohtang Pass",
      "Shop at Mall Road",
      "Try river rafting",
      "Relax in hot springs",
    ],
  },
  {
    city: "Munnar",
    state: "Kerala",
    description: "Scenic hill town with tea plantations and waterfalls.",
    topThings: [
      "Tour tea gardens",
      "Visit Eravikulam National Park",
      "See Attukal Waterfalls",
      "Take a spice plantation tour",
      "Enjoy Kerala cuisine",
    ],
  },
  {
    city: "Rishikesh",
    state: "Uttarakhand",
    description: "Yoga capital of the world, on the banks of the Ganges.",
    topThings: [
      "Experience Ganga Aarti at Triveni Ghat",
      "Try river rafting in the Ganges",
      "Visit Laxman Jhula and Ram Jhula",
      "Meditate at the Beatles Ashram",
      "Explore yoga and wellness retreats",
    ],
  },
  {
    city: "Jammu",
    state: "Jammu & Kashmir",
    description: "Gateway to Vaishno Devi, with rich cultural heritage.",
    topThings: [
      "Visit Vaishno Devi Temple",
      "Explore Raghunath Temple",
      "Walk around Mubarak Mandi Palace",
      "Enjoy Bahu Fort and Gardens",
      "Taste authentic Dogra cuisine",
    ],
  },
];

export default function TravelGuides() {
  const { isDarkMode } = useTheme();

  return (
    <main className="content-below-navbar px-6 py-10 bg-[var(--gradient-primary)] min-h-screen">
      {/* Page Heading */}
      <h1
        className={`text-6xl font-bold text-center mb-20 mt-10 ${
          isDarkMode ? "text-gray-200" : "text-black"
        }`}
      >
        Travel <span className="text-pink-500">Guides</span>
      </h1>

      {/* Guides Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {guides.map((guide, idx) => (
          <Card
            key={idx}
            className={`rounded-2xl shadow-md theme-transition border-2 
              ${
                isDarkMode
                  ? "bg-transparent border-gray-300 text-gray-100"
                  : "bg-[var(--card-bgg)] border-[var(--card-borderr)] text-[var(--text-primary)]"
              }
              hover:shadow-[0_10px_15px_rgba(236,72,153,0.5)]
            `}
          >
            <CardContent className="p-6">
              <h2
                className={`text-2xl font-bold text-center mb-4 ${
                  isDarkMode ? "text-white" : "text-[var(--text-primary)]"
                }`}
              >
                {guide.city}, {guide.state}
              </h2>
              <p
                className={`text-center mb-4 ${
                  isDarkMode ? "text-gray-300" : "text-[var(--text-secondary)]"
                }`}
              >
                {guide.description}
              </p>

              <ul
                className={`list-disc pl-5 space-y-1 mt-8 marker:text-pink-700 ${
                  isDarkMode ? "text-gray-200" : "text-[var(--text-primary)]"
                }`}
              >
                {guide.topThings.map((item, i) => (
                  <li key={i}>{item}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </div>
    </main>
  );
}
