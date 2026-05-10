import useAuthStore from '../../store/useAuthStore';
import BottomNav from '../../components/layout/BottomNav';
import { LogOut, User } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProfilePage = ({ role }) => {
  const { user, logout } = useAuthStore();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-indigo-600 px-4 pt-12 pb-8 text-center rounded-b-3xl shadow-md">
        <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <User size={40} className="text-indigo-600" />
        </div>
        <h1 className="text-white text-2xl font-bold">{user?.name || user?.phone || 'User'}</h1>
        <p className="text-indigo-100 mt-1 uppercase tracking-wider text-sm font-medium">{role}</p>
      </div>

      <div className="px-4 py-8 space-y-4">
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4">
           <h3 className="font-bold text-gray-900 mb-2">Account Details</h3>
           <p className="text-gray-600 text-sm mb-1"><strong>Phone:</strong> {user?.phone}</p>
           <p className="text-gray-600 text-sm"><strong>Status:</strong> {user?.status || 'ACTIVE'}</p>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full bg-white border-2 border-red-100 text-red-600 font-bold text-lg py-4 rounded-xl shadow-sm flex justify-center items-center gap-2 active:bg-red-50 transition-colors mt-8"
        >
          <LogOut size={24} />
          Log Out
        </button>
      </div>
      <BottomNav role={role} />
    </div>
  );
};

export default ProfilePage;