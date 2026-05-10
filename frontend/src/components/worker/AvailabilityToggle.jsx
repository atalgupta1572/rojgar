import { CheckCircle2, XCircle } from 'lucide-react';

const AvailabilityToggle = ({ isAvailable, onToggle }) => {
  return (
    <button 
      onClick={onToggle}
      className={`w-full p-4 rounded-xl flex items-center justify-center gap-3 transition-all duration-200 shadow-sm ${
        isAvailable 
          ? 'bg-green-100 border-2 border-green-500 text-green-800' 
          : 'bg-gray-100 border-2 border-transparent text-gray-500'
      }`}
    >
      {isAvailable ? (
        <>
          <CheckCircle2 size={24} className="text-green-600" />
          <span className="font-bold text-lg">I am Available (उपलब्ध हूँ)</span>
        </>
      ) : (
        <>
          <XCircle size={24} />
          <span className="font-medium text-lg">Not Available (उपलब्ध नहीं)</span>
        </>
      )}
    </button>
  );
};

export default AvailabilityToggle;