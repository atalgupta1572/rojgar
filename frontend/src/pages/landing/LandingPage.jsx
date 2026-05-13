import { useNavigate } from 'react-router-dom';
import Logo from '../../components/common/Logo';
import DailyRojgarPromoBanner from '../../components/landing/DailyRojgarPromoBanner';
import { ArrowRight, ShieldCheck, Zap, Users } from 'lucide-react';
import Footer from '../../components/layout/Footer';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-sky-100 selection:text-sky-900">
      {/* Navbar */}
      <nav className="bg-sky-100/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/about')}
              className="text-gray-600 font-medium hover:text-gray-900 transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => navigate('/help')}
              className="text-gray-600 font-medium hover:text-gray-900 transition-colors"
            >
              Help
            </button>
            <button 
              onClick={() => navigate('/auth?type=signup')}
              className="text-gray-600 font-medium hover:text-gray-900 transition-colors"
            >
              Sign Up
            </button>
            <button 
              onClick={() => navigate('/auth')}
              className="bg-sky-600 text-white px-5 py-2 rounded-full font-bold shadow-md shadow-sky-200 hover:bg-sky-700 hover:shadow-lg transition-all active:scale-95"
            >
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1">
        

        {/* How it works */}
        <div className="py-24 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Why choose Daily Rojgar?</h2>
              <p className="text-gray-500 max-w-2xl mx-auto">We've simplified the hiring and job-finding process so you can focus on what matters most.</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                { icon: Zap, title: "Real-Time Matching", desc: "Our smart system connects jobs with nearby available workers instantly using GPS.", color: "text-amber-500", bg: "bg-amber-100" },
                { icon: ShieldCheck, title: "Trusted Platform", desc: "Verified profiles, transparent ratings, and clear wage agreements build mutual trust.", color: "text-green-500", bg: "bg-green-100" },
                { icon: Users, title: "Direct Connection", desc: "No agencies or middlemen cutting into your pay. Talk directly and get the job done.", color: "text-sky-500", bg: "bg-sky-100" }
              ].map((feature, i) => (
                <div key={i} className="bg-white p-8 rounded-3xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
                  <div className={`w-14 h-14 ${feature.bg} ${feature.color} rounded-2xl flex items-center justify-center mb-6`}>
                    <feature.icon size={28} />
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-500 leading-relaxed">{feature.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
};

export default LandingPage;