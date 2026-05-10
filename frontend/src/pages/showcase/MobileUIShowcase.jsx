import React from 'react';
import DailyRojgarMobileUI from '../../components/landing/DailyRojgarMobileUI';
import { Smartphone } from 'lucide-react';

const MobileUIShowcase = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-3 mb-6 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-sm">
            <Smartphone className="w-5 h-5 text-amber-400" />
            <span className="text-sm font-semibold text-amber-400">Mobile Dashboard UI</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
            Daily Rojgar
            <br />
            <span className="bg-gradient-to-r from-amber-400 via-orange-400 to-red-400 bg-clip-text text-transparent">
              Worker Dashboard
            </span>
          </h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            A modern, premium mobile app interface designed for Indian workers and daily wage job seekers. Features real-time job listings, earnings tracking, and a beautiful glassmorphism design.
          </p>
        </div>

        {/* Feature Highlights */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {[
            {
              title: '🎨 Premium Design',
              description: 'Modern UI with gradients, glassmorphism, and smooth animations inspired by Swiggy, Uber, and LinkedIn.'
            },
            {
              title: '📱 Mobile First',
              description: 'Optimized for mobile devices with touch-friendly buttons and responsive layout for rural and semi-urban users.'
            },
            {
              title: '🌐 Bilingual Interface',
              description: 'Full Hindi and English support with culturally relevant design elements and local job categories.'
            },
            {
              title: '💼 Real Job Data',
              description: 'Shows actual job listings with contractors, locations, wages, and urgent hiring badges.'
            },
            {
              title: '⚡ Smart Features',
              description: 'Availability toggle, performance metrics, filter chips, and floating action buttons for easy navigation.'
            },
            {
              title: '🎯 User Focused',
              description: 'Designed specifically for electricians, plumbers, drivers, helpers, and construction workers in India.'
            },
          ].map((feature, idx) => (
            <div key={idx} className="p-6 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm hover:bg-white/15 transition-all">
              <h3 className="text-lg font-bold text-white mb-2">{feature.title}</h3>
              <p className="text-slate-300 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* Mobile UI Display */}
        <div className="flex justify-center mb-16">
          <div className="relative">
            {/* Phone frame glow */}
            <div className="absolute -inset-8 bg-gradient-to-r from-amber-500 to-orange-500 rounded-[3rem] blur-2xl opacity-20"></div>
            <div className="absolute -inset-6 bg-gradient-to-r from-purple-500 to-pink-500 rounded-[3rem] blur-xl opacity-10"></div>
            
            {/* Phone frame */}
            <div className="relative bg-black rounded-[2.5rem] shadow-2xl border-8 border-gray-900 overflow-hidden">
              {/* Phone notch */}
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-32 h-7 bg-black rounded-b-3xl z-50"></div>
              
              {/* Screen content */}
              <div className="overflow-hidden rounded-[2rem]">
                <DailyRojgarMobileUI />
              </div>
            </div>
          </div>
        </div>

        {/* Design Components Section */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <div className="p-8 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4">✨ Key Components</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-amber-400 font-bold">→</span>
                <span><strong className="text-white">Status Card:</strong> Glowing "I am Available" indicator with animation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 font-bold">→</span>
                <span><strong className="text-white">Dashboard Stats:</strong> Earnings, Trust Score, Available Jobs, Completed Jobs</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 font-bold">→</span>
                <span><strong className="text-white">Job Cards:</strong> Premium layout with images, location, wage, and quick apply</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 font-bold">→</span>
                <span><strong className="text-white">Category Filters:</strong> 6 job categories with icons and scrollable chips</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 font-bold">→</span>
                <span><strong className="text-white">Bottom Navigation:</strong> 4 main tabs: Home, Jobs, Earnings, Profile</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-amber-400 font-bold">→</span>
                <span><strong className="text-white">Floating Actions:</strong> Filter and refresh buttons with hover effects</span>
              </li>
            </ul>
          </div>

          <div className="p-8 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm">
            <h3 className="text-xl font-bold text-white mb-4">🎨 Design System</h3>
            <ul className="space-y-3 text-slate-300">
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">◆</span>
                <span><strong className="text-white">Color Palette:</strong> Indigo, Purple, Emerald, Amber, Yellow with gradients</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">◆</span>
                <span><strong className="text-white">Shadows:</strong> Soft shadows on cards, glowing shadows on interactive elements</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">◆</span>
                <span><strong className="text-white">Borders:</strong> Subtle borders with opacity for depth and separation</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">◆</span>
                <span><strong className="text-white">Spacing:</strong> Generous padding and consistent grid layout (4px baseline)</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">◆</span>
                <span><strong className="text-white">Animations:</strong> Smooth transitions, hover effects, and pulse animations</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-purple-400 font-bold">◆</span>
                <span><strong className="text-white">Typography:</strong> Modern sans-serif with clear hierarchy and readability</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Job Categories */}
        <div className="p-8 rounded-2xl bg-white/10 border border-white/20 backdrop-blur-sm mb-16">
          <h3 className="text-2xl font-bold text-white mb-6">📋 Supported Job Categories</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { emoji: '🏗️', label: 'निर्माण (Construction)' },
              { emoji: '⚡', label: 'इलेक्ट्रिशियन (Electrician)' },
              { emoji: '🚗', label: 'ड्राइवर (Driver)' },
              { emoji: '🤝', label: 'हेल्पर (Helper)' },
              { emoji: '🔧', label: 'प्लंबर (Plumber)' },
              { emoji: '📦', label: 'डिलीवरी (Delivery)' },
            ].map((cat, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10 flex items-center gap-3">
                <span className="text-3xl">{cat.emoji}</span>
                <span className="font-semibold text-white text-sm">{cat.label}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="text-center py-8 border-t border-white/10">
          <p className="text-slate-400">
            Built with React, Tailwind CSS, and Lucide Icons. Designed for Daily Rojgar workers in India.
          </p>
          <p className="text-slate-500 text-sm mt-3">
            © 2026 Daily Rojgar. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MobileUIShowcase;
