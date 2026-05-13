import { ArrowRight, Download, Search, Smartphone, Briefcase, Phone } from 'lucide-react';
import Logo from '../common/Logo';

const steps = [
  {
    title: 'ऐप डाउनलोड करें',
    description: 'अपने शहर में नजदीकी नौकरी ढूंढना शुरू करें।',
    icon: Download,
    bg: 'bg-amber-100 text-amber-600',
  },
  {
    title: 'काम खोजें',
    description: 'शहर में आपके लिए खुली इलेक्ट्रिशियन, ड्राइवर और मजदूरी की नौकरियाँ।',
    icon: Search,
    bg: 'bg-sky-100 text-sky-600',
  },
  {
    title: 'आवेदन करें',
    description: 'सीधे मोबाइल से भरोसेमंद काम पर जाएँ।',
    icon: Smartphone,
    bg: 'bg-violet-100 text-violet-600',
  },
  {
    title: 'घर के पास काम',
    description: 'नज़दीकी नौकरी पाएँ और रोज़ कमाएँ।',
    icon: Briefcase,
    bg: 'bg-emerald-100 text-emerald-600',
  },
];

const DailyRojgarPromoBanner = () => {
  return (
    <section className="relative overflow-hidden rounded-[2.5rem] bg-white shadow-2xl shadow-slate-900/10 mx-4 lg:mx-0">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(252,211,77,0.35),_transparent_32%),radial-gradient(circle_at_bottom_right,_rgba(15,23,42,0.18),_transparent_28%)] pointer-events-none"></div>
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1800&q=80')] bg-cover bg-center opacity-35 blur-sm"></div>
      <div className="relative z-10 grid gap-10 px-6 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:px-10 lg:py-14">
        

       
      </div>
    </section>
  );
};

export default DailyRojgarPromoBanner;
