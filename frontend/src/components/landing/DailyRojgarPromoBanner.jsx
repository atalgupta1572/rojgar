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
        <div className="flex flex-col justify-between gap-8">
          <div className="flex items-center justify-between gap-4">
            <Logo className="!bg-gradient-to-br from-yellow-400 to-slate-700" iconSize={24} />
            <div className="rounded-3xl bg-white/85 border border-white/80 px-4 py-3 shadow-lg shadow-slate-900/5 backdrop-blur">
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Local Jobs</p>
              <p className="text-sm font-semibold text-slate-900">Daily Rojgar</p>
            </div>
          </div>

          <div className="rounded-[2rem] bg-white/85 border border-white/90 p-8 shadow-2xl shadow-slate-900/5 backdrop-blur">
            <p className="text-5xl font-extrabold tracking-tight text-slate-900 leading-tight">काम पाए, घर के पास!</p>
            <p className="mt-4 text-lg text-slate-600 max-w-xl">हर दिन नया अवसर, आपके ही शहर में</p>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <div key={step.title} className="flex items-start gap-4 rounded-3xl border border-slate-200/80 bg-slate-50/90 p-4 shadow-sm">
                    <div className={`mt-1 flex h-12 w-12 items-center justify-center rounded-2xl ${step.bg}`}>
                      <Icon size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-slate-900">{`0${index + 1}`} {step.title}</p>
                      <p className="mt-1 text-sm text-slate-600">{step.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="rounded-3xl bg-slate-950 px-5 py-4 shadow-xl shadow-slate-950/20">
                <button className="inline-flex items-center gap-3 rounded-full bg-yellow-400 px-6 py-3 text-sm font-bold uppercase tracking-wide text-slate-950 shadow-md shadow-yellow-300/40 hover:bg-yellow-300 transition">
                  <span>अभी डाउनलोड करें</span>
                  <ArrowRight size={18} />
                </button>
              </div>
              <div className="flex items-center gap-4 rounded-3xl bg-white/95 border border-slate-200 px-5 py-4 shadow-sm">
                <div className="rounded-2xl bg-slate-900 px-3 py-2 text-white text-xs uppercase tracking-[0.25em]">Google Play</div>
                <div>
                  <p className="text-sm font-semibold text-slate-900">Get it on</p>
                  <p className="text-sm text-slate-500">Google Play Store</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-[1.75rem] bg-slate-950/95 p-6 text-white shadow-2xl shadow-slate-950/20">
              <p className="text-sm uppercase tracking-[0.25em] text-slate-400">बिना झंझट</p>
              <p className="mt-3 text-2xl font-extrabold">ज़्यादा काम, कम दूरी</p>
              <p className="mt-2 text-sm text-slate-300">नजदीकी रोजगार खोजें और सीधे अपने शहर में आवेदन करें।</p>
            </div>
            <div className="rounded-[1.75rem] bg-white/95 border border-slate-200 p-6 shadow-sm">
              <div className="flex items-center gap-3 text-slate-900">
                <div className="rounded-2xl bg-yellow-100 p-3 text-yellow-700"><Phone size={20} /></div>
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-slate-400">कॉल करें</p>
                  <p className="mt-2 text-lg font-semibold">8423771778</p>
                  <p className="text-lg font-semibold">8400379818</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="relative overflow-hidden rounded-[2rem] border border-white/70 bg-slate-950/80 shadow-2xl shadow-slate-950/30">
          <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/20 via-transparent to-slate-950/20"></div>
          <div className="relative grid h-full items-center gap-6 p-6 lg:p-8">
            <div className="absolute -left-10 top-6 h-48 w-48 rounded-full bg-yellow-400/20 blur-3xl"></div>
            <div className="absolute -right-10 bottom-10 h-56 w-56 rounded-full bg-slate-900/50 blur-3xl"></div>
            <div className="relative rounded-[2rem] bg-slate-950/100 p-5 shadow-2xl shadow-slate-950/40">
              <div className="overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-950/90 shadow-xl shadow-slate-950/40">
                <div className="grid grid-cols-[1.15fr_0.85fr] gap-4 p-5 sm:p-6">
                  <div className="rounded-[1.75rem] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 p-5 text-white shadow-inner shadow-slate-950/40">
                    <div className="flex items-center justify-between gap-3 text-slate-300">
                      <span className="text-xs uppercase tracking-[0.32em]">Daily Rojgar</span>
                      <div className="flex items-center gap-2 rounded-full bg-slate-800/80 px-3 py-2 text-xs text-slate-300">Live</div>
                    </div>
                    <div className="mt-6 rounded-3xl bg-slate-900/90 p-4 shadow-inner shadow-black/20">
                      <p className="text-sm text-amber-300 font-semibold">नज़दीकी नौकरी</p>
                      <p className="mt-2 text-xl font-extrabold text-white">इलेक्ट्रिशियन</p>
                      <p className="mt-1 text-sm text-slate-400">₹ 1200 / दिन</p>
                    </div>
                    <div className="mt-6 space-y-4 text-sm text-slate-300">
                      <div className="rounded-3xl bg-slate-900/80 p-4">
                        <p className="font-semibold">स्थान</p>
                        <p className="mt-1 text-slate-400">जवाहर नगर, दिल्ली</p>
                      </div>
                      <div className="rounded-3xl bg-slate-900/80 p-4">
                        <p className="font-semibold">शिफ्ट</p>
                        <p className="mt-1 text-slate-400">सुबह 9 से शाम 5</p>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col justify-between rounded-[2rem] bg-white/90 p-4 text-slate-950 shadow-inner shadow-slate-900/10">
                    <div className="rounded-3xl bg-slate-950/95 p-4 text-slate-50 shadow-sm">
                      <p className="text-sm uppercase tracking-[0.3em] text-slate-400">आवेदन करें</p>
                      <p className="mt-3 text-lg font-bold">बस एक क्लिक</p>
                    </div>
                    <div className="mt-5 space-y-3">
                      {['रिव्यू', 'लोकेशन', 'तत्काल पेमेन्ट'].map((item) => (
                        <div key={item} className="rounded-3xl bg-slate-100 p-3 text-slate-700">
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="relative isolate overflow-hidden rounded-[2.25rem] bg-white/90 p-5 shadow-2xl shadow-slate-950/20">
              <div className="absolute right-0 top-0 h-24 w-24 rounded-full bg-amber-300/30 blur-3xl"></div>
              <img
                src="https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=650&q=80"
                alt="Smiling Indian laborer"
                className="relative mx-auto h-[420px] w-full max-w-[320px] rounded-[2rem] object-cover shadow-2xl shadow-slate-950/20"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DailyRojgarPromoBanner;
