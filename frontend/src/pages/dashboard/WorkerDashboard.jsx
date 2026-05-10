import { useEffect, useState } from 'react';
import useAuthStore from '../../store/useAuthStore';
import { socket } from '../../services/socket';
import api from '../../services/api';
import BottomNav from '../../components/layout/BottomNav';
import Header from '../../components/layout/Header';
import AvailabilityToggle from '../../components/worker/AvailabilityToggle';
import JobCard from '../../components/worker/JobCard';

const WorkerDashboard = () => {
  const { user } = useAuthStore();
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAvailable, setIsAvailable] = useState(
    user.workerProfile?.availabilityStatus === 'AVAILABLE'
  );

  useEffect(() => {
    socket.connect();
    socket.emit('join_user_room', user._id);

    socket.on('job_created', (data) => {
      // Haptic feedback if available
      if (navigator.vibrate) navigator.vibrate(200);
      fetchJobs();
    });

    return () => socket.disconnect();
  }, [user._id]);

  useEffect(() => {
    fetchJobs();
  }, [isAvailable]);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      console.log('Fetching jobs for worker...');
      console.log('Worker availability:', isAvailable);
      console.log('Worker profile:', user?.workerProfile);
      console.log('User object:', user);

      const res = await api.get('/jobs/nearby');
      console.log('Fetched jobs response:', res.data);
      console.log('Number of jobs:', res.data.data.length);
      setJobs(res.data.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
      const statusCode = error.response?.status || 'No status';
      console.error(`Job fetch error (${statusCode}): ${errorMessage}`);
      // Don't show alert for fetch errors, just log them
    } finally {
      setLoading(false);
    }
  };

  const handleApply = async (jobId) => {
    if (navigator.vibrate) navigator.vibrate(100);
    try {
      await api.post('/jobs/apply', { jobId });
      alert('Applied successfully!');
      fetchJobs(); // remove or update the applied job from list
    } catch (error) {
      alert(error.response?.data?.message || 'Failed to apply');
    }
  };

  const handleAddDemoJob = async () => {
    if (navigator.vibrate) navigator.vibrate(100);
    try {
      await api.post('/jobs/seed-demo');
      alert('Demo job added. Refreshing jobs list.');
      fetchJobs();
    } catch (error) {
      alert(error.response?.data?.message || 'Unable to add a demo job');
    }
  };

  const handleSeedWorkerProfile = async () => {
    try {
      await api.post('/jobs/seed-worker-profile');
      alert('Worker profile seeded! Refresh the page to see changes.');
    } catch (error) {
      console.error('Error seeding worker profile:', error);
      alert('Error seeding worker profile: ' + (error.response?.data?.message || error.message));
    }
  };

  const handleCheckUser = () => {
    const token = localStorage.getItem('accessToken');
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    console.log('Current user status:', { hasToken: !!token, user });
    alert(`User: ${user.name || 'No user'}, Role: ${user.role || 'No role'}, Token: ${token ? 'Present' : 'Missing'}`);
  };

  const handleCheckAllJobs = async () => {
    try {
      console.log('Checking all jobs...');
      const res = await api.get('/jobs/all/open');
      console.log('All open jobs:', res.data);
      alert(`Found ${res.data.data.length} open jobs in database. Check console for details.`);
    } catch (error) {
      console.error('Error checking jobs:', error);
      const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
      const statusCode = error.response?.status || 'No status';
      alert(`Error checking jobs (${statusCode}): ${errorMessage}`);
    }
  };

  const toggleAvailability = async () => {
    if (navigator.vibrate) navigator.vibrate([50, 50]);
    const newState = !isAvailable;
    setIsAvailable(newState);
    try {
      await api.put('/user/profile', {
        workerProfile: {
          availabilityStatus: newState ? 'AVAILABLE' : 'OFFLINE'
        }
      });
    } catch (error) {
      setIsAvailable(!newState); // revert on error
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header 
        userName={user.name || user.phone} 
        location="Delhi (5km)" 
        unreadCount={2} 
      />

      <div className="px-4 py-4 space-y-6">
        <AvailabilityToggle 
          isAvailable={isAvailable} 
          onToggle={toggleAvailability} 
        />

        {/* Quick Stats Widget */}
        <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
          <div className="flex-none w-[140px] bg-indigo-50 rounded-xl p-3 border border-indigo-100">
            <p className="text-xs text-indigo-600 font-bold uppercase tracking-wide">Earnings</p>
            <p className="text-xl font-bold text-gray-900 mt-1">₹3,500</p>
          </div>
          <div className="flex-none w-[140px] bg-yellow-50 rounded-xl p-3 border border-yellow-100">
            <p className="text-xs text-yellow-700 font-bold uppercase tracking-wide">Trust Score</p>
            <div className="flex items-center mt-1">
              <span className="text-xl font-bold text-gray-900">4.8</span>
              <span className="text-yellow-500 ml-1 text-lg">★</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-gray-200">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-5">
            <div>
              <h2 className="text-xl font-bold text-gray-900">Nearby Jobs</h2>
              <p className="text-sm text-gray-500 mt-1">Jobs close to your current profile location.</p>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={fetchJobs}
                className="text-indigo-600 text-sm font-medium bg-indigo-50 px-3 py-1 rounded-lg"
              >
                Refresh
              </button>
              <button className="text-indigo-600 text-sm font-medium bg-indigo-50 px-3 py-1 rounded-lg">
                Filter
              </button>
            </div>
          </div>

          <div className="flex flex-col gap-3 mb-5 sm:flex-row sm:items-center sm:justify-between">
            <div className="rounded-2xl bg-indigo-50 px-4 py-3">
              <p className="text-xs uppercase text-indigo-600 font-semibold">Available Jobs</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{jobs.length}</p>
            </div>
            <div className="rounded-2xl bg-gray-50 px-4 py-3">
              <p className="text-xs uppercase text-gray-500 font-semibold">Status</p>
              <p className={`text-lg font-semibold ${isAvailable ? 'text-green-600' : 'text-red-600'}`}>
                {isAvailable ? 'Available' : 'Offline'}
              </p>
            </div>
          </div>

          {loading ? (
            <div className="space-y-4">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-48 bg-gray-200 rounded-xl animate-pulse"></div>
              ))}
            </div>
          ) : jobs.length === 0 ? (
            <div className="bg-indigo-50 rounded-xl p-8 text-center border border-indigo-100 space-y-4">
              <p className="text-indigo-800 font-medium">No nearby jobs found right now.</p>
              <p className="text-sm text-gray-500">Try refreshing or update your availability and profile location.</p>
              <div className="flex flex-wrap justify-center gap-2">
                <button
                  onClick={handleAddDemoJob}
                  className="bg-white text-indigo-700 border border-indigo-200 px-4 py-3 rounded-xl font-semibold shadow-sm hover:bg-indigo-50 transition"
                >
                  Add a sample job
                </button>
                <button
                  onClick={() => fetchJobs()}
                  className="bg-green-100 text-green-700 border border-green-200 px-4 py-3 rounded-xl font-semibold shadow-sm hover:bg-green-50 transition"
                >
                  Refresh jobs
                </button>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {jobs.map(job => (
                <JobCard key={job._id} job={job} onApply={handleApply} />
              ))}
            </div>
          )}

          {!isAvailable && jobs.length > 0 && (
            <div className="mt-5 rounded-2xl bg-yellow-50 border border-yellow-100 p-4 text-sm text-yellow-700">
              You are currently offline, so job applications are disabled. Toggle availability to apply for these nearby jobs.
            </div>
          )}
        </div>
      </div>

      <BottomNav role="WORKER" />
    </div>
  );
};

export default WorkerDashboard;