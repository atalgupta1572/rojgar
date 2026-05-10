import { Pickaxe } from 'lucide-react';

const Logo = ({ className = '', iconSize = 24, showText = true }) => {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className="bg-gradient-to-br from-indigo-500 to-indigo-700 p-2 rounded-xl shadow-md flex items-center justify-center">
        <Pickaxe size={iconSize} className="text-white" />
      </div>
      {showText && (
        <span className="font-extrabold text-xl tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-gray-900 to-gray-700">
          Daily<span className="text-indigo-600">Rojgar</span>
        </span>
      )}
    </div>
  );
};

export default Logo;