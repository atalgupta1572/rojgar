import { Home, Briefcase, IndianRupee, User } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router-dom';

const BottomNav = ({ role }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const getNavItems = () => {
    if (role === 'WORKER') {
      return [
        { id: 'home', label: 'Home', icon: Home, path: '/worker-dashboard' },
        { id: 'jobs', label: 'My Jobs', icon: Briefcase, path: '/worker-dashboard/jobs' },
        { id: 'earnings', label: 'Earnings', icon: IndianRupee, path: '/worker-dashboard/earnings' },
        { id: 'profile', label: 'Profile', icon: User, path: '/worker-dashboard/profile' },
      ];
    }
    return [
      { id: 'home', label: 'Home', icon: Home, path: '/contractor-dashboard' },
      { id: 'jobs', label: 'My Jobs', icon: Briefcase, path: '/contractor-dashboard/jobs' },
      { id: 'workers', label: 'Workers', icon: User, path: '/contractor-dashboard/workers' },
      { id: 'profile', label: 'Profile', icon: User, path: '/contractor-dashboard/profile' },
    ];
  };

  const navItems = getNavItems();

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 pb-safe">
      <div className="flex justify-around items-center h-16">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          
          return (
            <button
              key={item.id}
              onClick={() => navigate(item.path)}
              className={`flex flex-col items-center justify-center w-full h-full space-y-1 ${
                isActive ? 'text-indigo-600' : 'text-gray-500 hover:text-gray-900'
              }`}
            >
              <Icon size={24} className={isActive ? 'stroke-[2.5]' : 'stroke-2'} />
              <span className="text-[10px] font-medium">{item.label}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default BottomNav;