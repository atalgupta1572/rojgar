import { Bell, MapPin } from 'lucide-react';
import Logo from '../common/Logo';

const Header = ({ userName, location, onNotificationClick, unreadCount = 0 }) => {
  return (
    <div className="sticky top-0 z-50 bg-white border-b border-gray-100 px-4 py-3 flex justify-between items-center shadow-sm">
      <div className="flex flex-col gap-1">
        <Logo iconSize={18} className="scale-90 origin-left mb-1" />
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm">
            {userName?.charAt(0)?.toUpperCase() || 'U'}
          </div>
          <div>
            <h1 className="font-bold text-gray-900 text-sm leading-tight">नमस्ते, {userName || 'User'}!</h1>
            <div className="flex items-center text-xs text-gray-500 mt-0.5">
              <MapPin size={10} className="mr-1 text-indigo-500" />
              <span className="truncate max-w-[120px]">{location || 'Locating...'}</span>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={onNotificationClick}
        className="relative p-2 rounded-full hover:bg-gray-100 transition-colors self-end mb-1"
      >
        <Bell size={24} className="text-gray-700" />
        {unreadCount > 0 && (
          <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-red-500 rounded-full border-2 border-white"></span>
        )}
      </button>
    </div>
  );
};

export default Header;