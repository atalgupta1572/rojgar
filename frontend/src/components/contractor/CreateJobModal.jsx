import { MapPin, Users, Hammer, Paintbrush, Zap } from 'lucide-react';

const TRADES = [
  { id: 'helper', label: 'Helper', icon: Users },
  { id: 'mason', label: 'Mason', icon: Hammer },
  { id: 'painter', label: 'Painter', icon: Paintbrush },
  { id: 'electrician', label: 'Electrician', icon: Zap },
];

const CreateJobModal = ({ isOpen, onClose, onSubmit, formData, setFormData }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 z-[100] flex flex-col justify-end">
      <div className="bg-white w-full rounded-t-3xl p-5 pb-8 animate-slide-up">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-bold text-gray-900">Post a Job (नया काम)</h2>
          <button onClick={onClose} className="p-2 bg-gray-100 rounded-full text-gray-600">✕</button>
        </div>

        <form onSubmit={onSubmit} className="space-y-6">
          {/* Quick Trade Selection */}
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-3">Who do you need?</label>
            <div className="grid grid-cols-4 gap-3">
              {TRADES.map(trade => {
                const Icon = trade.icon;
                const isSelected = formData.requiredSkills === trade.id;
                return (
                  <button
                    key={trade.id}
                    type="button"
                    onClick={() => {
                      setFormData({ 
                        ...formData, 
                        requiredSkills: trade.id,
                        title: `Need ${trade.label}`
                      });
                      if(navigator.vibrate) navigator.vibrate(50);
                    }}
                    className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 transition-all ${
                      isSelected 
                        ? 'border-indigo-600 bg-indigo-50 text-indigo-700' 
                        : 'border-gray-100 bg-gray-50 text-gray-500'
                    }`}
                  >
                    <Icon size={24} className="mb-1" />
                    <span className="text-[10px] font-bold">{trade.label}</span>
                  </button>
                )
              })}
            </div>
            {!formData.requiredSkills && (
              <p className="mt-2 text-xs text-red-600">Please select the worker type before posting.</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Wage / Day (₹)</label>
              <input 
                type="number" 
                required
                className="w-full bg-gray-50 border border-gray-200 p-3 rounded-xl font-bold text-lg focus:ring-2 focus:ring-indigo-500 outline-none"
                value={formData.offeredWage}
                onChange={e => setFormData({...formData, offeredWage: e.target.value})}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Workers needed</label>
              <div className="flex items-center justify-between bg-gray-50 border border-gray-200 p-2 rounded-xl">
                <button type="button" className="w-8 h-8 rounded-lg bg-white shadow-sm font-bold text-xl">-</button>
                <span className="font-bold text-lg">1</span>
                <button type="button" className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-700 font-bold text-xl">+</button>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            className="w-full bg-indigo-600 text-white font-bold text-lg py-4 rounded-xl shadow-lg shadow-indigo-200 active:scale-95 transition-transform"
          >
            Post Job & Notify Workers
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateJobModal;