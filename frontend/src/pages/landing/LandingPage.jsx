import { useNavigate } from 'react-router-dom';
import Logo from '../../components/common/Logo';
import DailyRojgarPromoBanner from '../../components/landing/DailyRojgarPromoBanner';
import { ArrowRight, ShieldCheck, Zap, Users } from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Navbar */}
      <nav className="bg-white/80 backdrop-blur-md sticky top-0 z-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Logo />
          <div className="flex items-center gap-4">
            <button 
              onClick={() => navigate('/auth')}
              className="text-gray-600 font-medium hover:text-gray-900 transition-colors hidden sm:block"
            >
              Log in
            </button>
            <button 
              onClick={() => navigate('/auth')}
              className="bg-indigo-600 text-white px-5 py-2 rounded-full font-bold shadow-md shadow-indigo-200 hover:bg-indigo-700 hover:shadow-lg transition-all active:scale-95"
            >
              Join Now
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-1">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-16">
          
        </div>

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
                { icon: Users, title: "Direct Connection", desc: "No agencies or middlemen cutting into your pay. Talk directly and get the job done.", color: "text-indigo-500", bg: "bg-indigo-100" }
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

      {/* Footer */}
      <footer className="bg-gray-900 text-gray-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <div className="col-span-2 lg:col-span-1">
              <Logo showText={true} className="grayscale brightness-200" />
              <p className="text-sm text-gray-500 mt-4 max-w-xs">
                Empowering India's unorganized workforce through technology.
              </p>
            </div>

            <div className="text-sm">
              <h3 className="font-bold text-white tracking-wider uppercase mb-4">For Workers</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">Find Jobs</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Create Profile</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Trust Score</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Benefits</a></li>
              </ul>
            </div>

            <div className="text-sm">
              <h3 className="font-bold text-white tracking-wider uppercase mb-4">For Contractors</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">Post a Job</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Find Workers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Guidelines</a></li>
              </ul>
            </div>

            <div className="text-sm">
              <h3 className="font-bold text-white tracking-wider uppercase mb-4">Company</h3>
              <ul className="space-y-3">
                <li><a href="#" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Careers</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Support</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contact</a></li>
              </ul>
            </div>
            
            <div className="col-span-2 md:col-span-4 lg:col-span-1 text-sm">
                <h3 className="font-bold text-white tracking-wider uppercase mb-4">Stay Updated</h3>
                <p className="mb-4">Get the latest news and job alerts directly in your inbox.</p>
                <form className="flex">
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="bg-gray-800 border border-gray-700 rounded-l-md px-4 py-2 text-white w-full focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button className="bg-indigo-600 text-white px-4 py-2 rounded-r-md font-bold hover:bg-indigo-700 transition-colors">
                        Go
                    </button>
                </form>
            </div>
          </div>

          <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col sm:flex-row justify-between items-center text-sm">
            <p className="text-gray-500 order-2 sm:order-1 mt-4 sm:mt-0">
              &copy; {new Date().getFullYear()} Daily Rojgar. All Rights Reserved.
            </p>
            <div className="order-1 sm:order-2 flex space-x-6">
                <a href="#" className="hover:text-white"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg></a>
                <a href="#" className="hover:text-white"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg></a>
                <a href="#" className="hover:text-white"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.024.06 1.378.06 3.808s-.012 2.784-.06 3.808c-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.024.048-1.378.06-3.808.06s-2.784-.013-3.808-.06c-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.048-1.024-.06-1.378-.06-3.808s.012-2.784.06-3.808c.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 016.345 4.22c.636-.247 1.363-.416 2.427-.465C9.795 2.013 10.148 2 12.315 2zm-1.163 4.84c-3.404 0-6.162 2.758-6.162 6.162s2.758 6.162 6.162 6.162 6.162-2.758 6.162-6.162-2.758-6.162-6.162-6.162zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm4.448-7.846a1.26 1.26 0 111.782 1.782 1.26 1.26 0 01-1.782-1.782z" clipRule="evenodd" /></svg></a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;