import { useEffect, useState } from 'react';
import useAuthStore from '../../store/useAuthStore';
import { socket } from '../../services/socket';
import api from '../../services/api';
import BottomNav from '../../components/layout/BottomNav';
import Header from '../../components/layout/Header';
import CreateJobModal from '../../components/contractor/CreateJobModal';
import ActiveJobCard from '../../components/contractor/ActiveJobCard';

const ContractorDashboard = () => {
  const { user } = useAuthStore();
  const [showModal, setShowModal] = useState(false);
  const [activeJobs, setActiveJobs] = useState([
    { _id: '1', title: 'Need Plumber for 2 days', status: 'OPEN', offeredWage: 800 } // Mock data for UI
  ]);
  
  const [formData, setFormData] = useState({
    title: '',
    description: 'General work',
    requiredSkills: '',
    offeredWage: '600',
    lng: '77.2090',
    lat: '28.6139'
  });

  useEffect(() => {
    socket.connect();
    socket.emit('join_user_room', user._id);

    socket.on('new_application', (data) => {
      if(navigator.vibrate) navigator.vibrate([100, 50, 100]);
      alert(`New worker applied!`);
    });

    return () => socket.disconnect();
  }, [user._id]);

  const handleCreateJob = async (e) => {
    e.preventDefault();
    if (!formData.requiredSkills) {
      alert('Please select the type of worker you need before posting.');
      return;
    }

    try {
      const payload = {
        title: formData.title || 'General Work',
        description: formData.description,
        requiredSkills: [formData.requiredSkills],
        offeredWage: Number(formData.offeredWage),
        jobDate: new Date(),
        location: {
          type: 'Point',
          coordinates: [Number(formData.lng), Number(formData.lat)],
          address: 'Sector 14, Delhi'
        }
      };

      const res = await api.post('/jobs', payload);
      alert('Job posted! Workers notified.');
      setActiveJobs([res.data.data, ...activeJobs]);
      setShowModal(false);
    } catch (error) {
      console.error('Create job failed:', error);
      alert(error.response?.data?.message || error.message || 'Error creating job');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header 
        userName={user.contractorProfile?.companyName || user.phone} 
        location="Site: Sector 14, Delhi" 
        unreadCount={5} 
      />

      {/* Primary Action Hero */}
      <div className="bg-indigo-600 px-4 pt-6 pb-8 rounded-b-3xl shadow-md">
        <h2 className="text-indigo-100 text-sm font-medium mb-1">Looking for workers?</h2>
        <h1 className="text-white text-2xl font-bold mb-6">Find skilled labor instantly.</h1>
        
        <button 
          onClick={() => {
            if(navigator.vibrate) navigator.vibrate(50);
            setShowModal(true);
          }}
          className="w-full bg-white text-indigo-700 font-bold text-lg py-4 rounded-xl shadow-lg flex justify-center items-center gap-2 active:scale-95 transition-transform"
        >
          <span className="text-2xl leading-none mb-1">+</span> Post a New Job
        </button>
      </div>

      <div className="px-4 py-6 space-y-6">
        {/* Quick Stats Widget */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm text-center">
            <p className="text-2xl font-bold text-gray-900">{activeJobs.length}</p>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide mt-1">Active Jobs</p>
          </div>
          <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm text-center relative">
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full border-2 border-white"></span>
            <p className="text-2xl font-bold text-gray-900">12</p>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide mt-1">Applicants</p>
          </div>
          <div className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm text-center">
            <p className="text-2xl font-bold text-green-600">8</p>
            <p className="text-[10px] text-gray-500 font-bold uppercase tracking-wide mt-1">On Site</p>
          </div>
        </div>

        {/* Active Jobs List */}
        <div>
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-xl font-bold text-gray-900">Ongoing Jobs</h2>
            <button className="text-indigo-600 text-sm font-medium">View All</button>
          </div>

          <div className="space-y-4">
            {activeJobs.map(job => (
              <ActiveJobCard key={job._id} job={job} onReview={() => alert('Opening review panel...')} />
            ))}
          </div>
        </div>
      </div>

      <CreateJobModal 
        isOpen={showModal} 
        onClose={() => setShowModal(false)}
        onSubmit={handleCreateJob}
        formData={formData}
        setFormData={setFormData}
      />

      <BottomNav role="CONTRACTOR" />
    </div>
  );
};

export default ContractorDashboard;