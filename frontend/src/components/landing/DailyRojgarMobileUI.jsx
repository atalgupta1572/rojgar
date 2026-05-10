import React, { useState, useEffect } from 'react';
import {
  MapPin,
  Bell,
  TrendingUp,
  Star,
  Briefcase,
  CheckCircle2,
  Zap,
  MapPinned,
  Clock,
  IndianRupee,
  AlertCircle,
  Users,
  ArrowRight,
  Home,
  Briefcase as JobIcon,
  Wallet,
  User,
  Filter,
  RefreshCw,
  GripVertical,
} from 'lucide-react';

const DailyRojgarMobileUI = () => {
  const [isAvailable, setIsAvailable] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('home');
  const [pulseAnimation, setPulseAnimation] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setPulseAnimation(!pulseAnimation);
    }, 2000);
    return () => clearInterval(interval);
  }, [pulseAnimation]);

  const categories = [
    { id: 'construction', label: 'निर्माण', icon: '🏗️' },
    { id: 'electrician', label: 'इलेक्ट्रिशियन', icon: '⚡' },
    { id: 'driver', label: 'ड्राइवर', icon: '🚗' },
    { id: 'helper', label: 'हेल्पर', icon: '🤝' },
    { id: 'plumber', label: 'प्लंबर', icon: '🔧' },
    { id: 'delivery', label: 'डिलीवरी', icon: '📦' },
  ];

  const nearbyJobs = [
    {
      id: 1,
      title: 'इलेक्ट्रिशियन (Electrician)',
      contractor: 'राज कंस्ट्रक्शन',
      location: 'जवाहर नगर, दिल्ली',
      distance: '0.8 km',
      wage: 1200,
      duration: '8 घंटे',
      urgent: true,
      category: 'electrician',
      workers: 3,
      image: 'https://images.unsplash.com/photo-1572522159219-acf6f7ce6b1d?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 2,
      title: 'मजदूरी (Construction Helper)',
      contractor: 'सिल्वर हिल्स डेवलपमेंट',
      location: 'लाजपत नगर, दिल्ली',
      distance: '1.2 km',
      wage: 800,
      duration: '10 घंटे',
      urgent: false,
      category: 'helper',
      workers: 5,
      image: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 3,
      title: 'ड्राइवर (Auto Driver)',
      contractor: 'ग्रीन ट्रांसपोर्ट्स',
      location: 'कश्मीरी गेट, दिल्ली',
      distance: '0.5 km',
      wage: 1500,
      duration: '12 घंटे',
      urgent: true,
      category: 'driver',
      workers: 2,
      image: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe3e?auto=format&fit=crop&w=300&q=80',
    },
    {
      id: 4,
      title: 'प्लंबर (Plumber)',
      contractor: 'फिक्सिट सर्विसेज',
      location: 'नई दिल्ली',
      distance: '1.5 km',
      wage: 950,
      duration: '6 घंटे',
      urgent: false,
      category: 'plumber',
      workers: 1,
      image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=300&q=80',
    },
  ];

  const stats = [
    {
      title: 'कुल आय',
      value: '₹12,450',
      subtitle: 'इस महीने',
      icon: IndianRupee,
      gradient: 'from-emerald-400 to-teal-600',
      bgGradient: 'from-emerald-50 to-teal-50',
      trend: '+12%',
    },
    {
      title: 'विश्वास स्कोर',
      value: '4.8',
      subtitle: '/5.0',
      icon: Star,
      gradient: 'from-amber-400 to-orange-600',
      bgGradient: 'from-amber-50 to-orange-50',
      trend: '+0.2',
    },
    {
      title: 'उपलब्ध नौकरी',
      value: '24',
      subtitle: 'आपके पास',
      icon: Briefcase,
      gradient: 'from-blue-400 to-indigo-600',
      bgGradient: 'from-blue-50 to-indigo-50',
      trend: '+8',
    },
    {
      title: 'पूरी नौकरी',
      value: '47',
      subtitle: 'कुल में',
      icon: CheckCircle2,
      gradient: 'from-violet-400 to-purple-600',
      bgGradient: 'from-violet-50 to-purple-50',
      trend: '+3',
    },
  ];

  return (
    <div className="relative w-full max-w-md mx-auto bg-gradient-to-b from-slate-50 to-slate-100 min-h-screen flex flex-col">
      {/* Status Bar */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white px-4 py-1.5 text-xs flex justify-between items-center">
        <span>9:41</span>
        <div className="flex gap-1">
          <div className="w-4 h-3 border border-white rounded-[2px]"></div>
          <span>📶</span>
          <span>🔋</span>
        </div>
      </div>

      {/* Header */}
      <div className="bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-700 px-4 py-5 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/asfalt-light.png')] opacity-10"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 flex items-center justify-center font-bold text-slate-900 shadow-lg">
                राज
              </div>
              <div>
                <p className="text-xs text-indigo-100">सुप्रभात!</p>
                <p className="font-bold text-sm">राज कुमार</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="relative">
                <Bell className="w-6 h-6" />
                <div className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-400 rounded-full animate-pulse"></div>
              </div>
              <MapPin className="w-5 h-5" />
            </div>
          </div>
          <div className="flex items-center gap-1.5 text-sm bg-white/10 px-3 py-1.5 rounded-full w-fit backdrop-blur-sm border border-white/20">
            <MapPinned size={14} />
            <span>जवाहर नगर, दिल्ली</span>
          </div>
        </div>
      </div>

      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto pb-24">
        {/* Availability Status Card */}
        <div className="px-4 pt-5 pb-3">
          <div className={`relative overflow-hidden rounded-2xl px-5 py-4 transition-all ${
            isAvailable
              ? 'bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-500 shadow-xl shadow-teal-200'
              : 'bg-gradient-to-br from-slate-400 to-slate-600 shadow-lg'
          }`}>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/subtle-white-feathers.png')] opacity-20"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/30 rounded-full blur-3xl"></div>

            <div className="relative z-10 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-white transition-all ${
                    isAvailable ? 'bg-white/30 backdrop-blur-md' : 'bg-white/20'
                  }`}>
                    {isAvailable ? '✓' : '✕'}
                  </div>
                  {isAvailable && (
                    <div className="absolute inset-0 rounded-full border-2 border-white/50 animate-pulse"></div>
                  )}
                </div>
                <div>
                  <p className="text-xs font-semibold text-white/80 uppercase tracking-wide">स्थिति</p>
                  <p className="text-lg font-extrabold text-white">
                    {isAvailable ? 'उपलब्ध हूँ' : 'व्यस्त हूँ'}
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsAvailable(!isAvailable)}
                className="px-4 py-2 rounded-full bg-white/30 backdrop-blur-md border border-white/50 text-white font-semibold text-sm hover:bg-white/40 transition-all"
              >
                {isAvailable ? 'बदलें' : 'जाना'}
              </button>
            </div>
          </div>
        </div>

        {/* Daily Performance */}
        <div className="px-4 py-2">
          <div className="rounded-2xl bg-gradient-to-br from-amber-50 to-orange-50 border border-amber-100 p-4 shadow-sm">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Zap className="w-5 h-5 text-amber-600" />
                <h3 className="font-bold text-slate-900">आज का प्रदर्शन</h3>
              </div>
              <span className="text-xs font-semibold bg-amber-200 text-amber-800 px-2.5 py-1 rounded-full">
                +45%
              </span>
            </div>
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-slate-600">औसत रेटिंग</span>
                <span className="font-bold text-amber-700">4.9 / 5</span>
              </div>
              <div className="w-full bg-amber-100 rounded-full h-2 overflow-hidden">
                <div className="h-full bg-gradient-to-r from-amber-400 to-orange-500 rounded-full" style={{ width: '98%' }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Statistics Cards */}
        <div className="px-4 py-4">
          <h3 className="font-bold text-slate-900 mb-3 text-sm uppercase tracking-wide">आपकी आँकड़े</h3>
          <div className="grid grid-cols-2 gap-3">
            {stats.map((stat, idx) => {
              const Icon = stat.icon;
              return (
                <div
                  key={idx}
                  className={`rounded-2xl bg-gradient-to-br ${stat.bgGradient} border border-white/60 p-4 shadow-sm hover:shadow-md transition-all`}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div
                      className={`w-10 h-10 rounded-xl bg-gradient-to-br ${stat.gradient} flex items-center justify-center text-white`}
                    >
                      <Icon size={20} />
                    </div>
                    <span className="text-xs font-bold text-green-600 bg-green-50 px-2 py-1 rounded-full">
                      {stat.trend}
                    </span>
                  </div>
                  <p className="text-2xl font-extrabold text-slate-900 mb-1">{stat.value}</p>
                  <div>
                    <p className="text-xs font-medium text-slate-600">{stat.title}</p>
                    <p className="text-xs text-slate-500">{stat.subtitle}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Nearby Jobs Section */}
        <div className="px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-slate-900 text-sm uppercase tracking-wide">नजदीकी नौकरी</h3>
            <button className="flex items-center gap-2 text-indigo-600 font-semibold text-xs hover:text-indigo-700 transition-colors">
              <RefreshCw size={14} />
              रीफ्रेश
            </button>
          </div>

          {/* Category Filter Chips */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-semibold text-sm whitespace-nowrap transition-all ${
                  selectedCategory === cat.id || selectedCategory === 'all'
                    ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-200'
                    : 'bg-white border border-slate-200 text-slate-700 hover:border-indigo-300'
                }`}
              >
                <span>{cat.icon}</span>
                {cat.label}
              </button>
            ))}
          </div>

          {/* Job Cards */}
          <div className="space-y-3">
            {nearbyJobs.map((job) => (
              <div
                key={job.id}
                className="rounded-2xl bg-white border border-slate-100 overflow-hidden shadow-sm hover:shadow-lg transition-all hover:-translate-y-1 group"
              >
                {/* Job Card Header with Image */}
                <div className="relative h-32 overflow-hidden bg-gradient-to-br from-slate-200 to-slate-300">
                  <img
                    src={job.image}
                    alt={job.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                  <div className="absolute bottom-3 left-3 right-3 flex items-end justify-between text-white">
                    <div>
                      <p className="font-bold text-lg">{job.title}</p>
                      <p className="text-xs opacity-90">{job.contractor}</p>
                    </div>
                    {job.urgent && (
                      <div className="flex items-center gap-1 bg-red-500 px-2.5 py-1 rounded-full text-xs font-bold animate-pulse">
                        <AlertCircle size={12} />
                        तुरंत
                      </div>
                    )}
                  </div>
                </div>

                {/* Job Card Body */}
                <div className="p-4">
                  <div className="space-y-3">
                    {/* Location and Distance */}
                    <div className="flex items-start gap-2 pb-3 border-b border-slate-100">
                      <MapPinned size={16} className="text-indigo-600 mt-0.5 flex-shrink-0" />
                      <div className="flex-1">
                        <p className="font-semibold text-sm text-slate-900">{job.location}</p>
                        <p className="text-xs text-slate-500">{job.distance}</p>
                      </div>
                    </div>

                    {/* Duration, Wage, Workers */}
                    <div className="grid grid-cols-3 gap-3 pb-3 border-b border-slate-100">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center text-blue-600">
                          <Clock size={16} />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">समय</p>
                          <p className="text-sm font-bold text-slate-900">{job.duration}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-green-100 flex items-center justify-center text-green-600">
                          <IndianRupee size={16} />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">दैनिक</p>
                          <p className="text-sm font-bold text-slate-900">₹{job.wage}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-purple-100 flex items-center justify-center text-purple-600">
                          <Users size={16} />
                        </div>
                        <div>
                          <p className="text-xs text-slate-500">पद</p>
                          <p className="text-sm font-bold text-slate-900">{job.workers}</p>
                        </div>
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex gap-3">
                      <button className="flex-1 px-4 py-2.5 rounded-xl bg-gradient-to-r from-indigo-500 to-purple-600 text-white font-bold text-sm shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group">
                        <span>अभी आवेदन करें</span>
                        <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                      </button>
                      <button className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition-all">
                        विवरण
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More */}
          <button className="w-full py-3 mt-4 rounded-xl border-2 border-dashed border-indigo-300 text-indigo-600 font-bold text-sm hover:bg-indigo-50 transition-all">
            और नौकरी देखें
          </button>
        </div>
      </div>

      {/* Floating Action Buttons */}
      <div className="absolute bottom-24 right-4 z-40 flex flex-col gap-3">
        <button className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 text-white shadow-lg flex items-center justify-center hover:shadow-xl hover:scale-110 transition-all">
          <Filter size={20} />
        </button>
        <button className="w-12 h-12 rounded-full bg-white border-2 border-indigo-500 text-indigo-600 shadow-lg flex items-center justify-center hover:shadow-xl hover:scale-110 transition-all">
          <RefreshCw size={20} />
        </button>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-slate-100 px-2 py-2 shadow-2xl shadow-slate-900/20 flex justify-around">
        {[
          { id: 'home', label: 'होम', icon: Home },
          { id: 'jobs', label: 'नौकरी', icon: JobIcon },
          { id: 'earnings', label: 'आय', icon: Wallet },
          { id: 'profile', label: 'प्रोफाइल', icon: User },
        ].map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all ${
                activeTab === tab.id
                  ? 'bg-gradient-to-br from-indigo-100 to-purple-100 text-indigo-600'
                  : 'text-slate-500 hover:text-slate-700'
              }`}
            >
              <Icon size={20} />
              <span className={`text-xs font-bold ${activeTab === tab.id ? 'text-indigo-600' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default DailyRojgarMobileUI;
