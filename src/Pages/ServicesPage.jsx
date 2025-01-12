import { Brain, Heart } from "lucide-react";
import { FaFemale } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen justify-center items-between">
      <div className="container mx-auto px-4 py-8 sm:py-16">
        <h1 className="text-3xl font-bold text-center mb-8">
          Our Healthcare Services
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <Link to="/mental-health" className="block">
            <Section
              title="Mental Health"
              icon={<Brain className="w-12 h-12 text-blue-500" />}
              description="Comprehensive care for your mental well-being"
              items={[
                "Depression Treatment",
                "Anxiety Disorders",
                "Stress Management",
                "Cognitive Behavioral Therapy",
                "Addiction Recovery",
              ]}
            />
          </Link>
          <Link to="/physical-health" className="block">
            <Section
              title="Physical Health"
              icon={<Heart className="w-12 h-12 text-red-500" />}
              description="Expert care for your body's fitness and nutrition needs"
              items={[
                "Personalized Diet Plans",
                "Customized Workout Routines",
                "Nutritional Guidance",
                "Fitness Goal Setting",
                "Progress Tracking",
              ]}
            />
          </Link>
          <Link to="/womens-health" className="block">
            <Section
              title="Women's Health"
              icon={<FaFemale className="w-12 h-12 text-purple-500" />}
              description="Specialized care for women's unique health needs"
              items={[
                "Daily Exercise Routines",
                "PCOD/PCOS Prediction",
                "Hormonal Health Analysis",
                "Reproductive Health Care",
                "Women's Fitness Programs",
              ]}
            />
          </Link>
        </div>
      </div>
    </div>
  );
}

function Section({ title, icon, description, items }) {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6 transition-transform hover:scale-105 h-full">
      <div className="flex items-center mb-4">
        {icon}
        <h2 className="text-2xl font-semibold ml-4">{title}</h2>
      </div>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            <svg
              className="w-4 h-4 mr-2 text-green-500"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M5 13l4 4L19 7"></path>
            </svg>
            {item}
          </li>
        ))}
      </ul>
    </div>
  );
}
