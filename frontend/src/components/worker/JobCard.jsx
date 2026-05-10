import { useNavigate } from 'react-router-dom';
import { MapPin, Clock, Hammer, AlertCircle } from 'lucide-react';

const JobCard = ({ job, onApply }) => {
  const navigate = useNavigate();
  const isUrgent = true; // In real app, check if date is today

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-4 active:scale-[0.98] transition-transform">
      <div className="flex justify-between items-start mb-3">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
            <Hammer size={24} />
          </div>
          <div>
            <h3 className="font-bold text-gray-900 text-lg">{job.title}</h3>
            <p className="text-xs text-gray-500 font-medium">Contractor: {job.contractorName || 'Contractor'}</p>
            {job.contractorPhone && (
              <p className="text-xs text-gray-500">Phone: {job.contractorPhone}</p>
            )}
          </div>
        </div>
        {isUrgent && (
          <div className="flex items-center bg-red-50 text-red-600 px-2 py-1 rounded text-xs font-bold">
            <AlertCircle size={12} className="mr-1" />
            Urgent
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 gap-y-2 mb-4">
        <div className="flex items-center text-sm text-gray-600">
          <MapPin size={16} className="mr-1.5 text-gray-400" />
          {job.distance != null ? `${(job.distance / 1000).toFixed(1)} km away` : 'Distance not available'}
        </div>
        <div className="flex items-center text-sm text-gray-600">
          <Clock size={16} className="mr-1.5 text-gray-400" />
          1 Day
        </div>
      </div>

      <div className="flex flex-wrap gap-1.5 mb-4">
        {job.requiredSkills.map(skill => (
          <span key={skill} className="px-2.5 py-1 bg-gray-100 text-gray-700 text-xs rounded-md font-medium">
            {skill}
          </span>
        ))}
      </div>

      <div className="flex flex-col gap-3 pt-3 border-t border-gray-100 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="text-xs text-gray-500 mb-0.5">Wage</p>
          <p className="font-bold text-green-600 text-xl">₹{job.offeredWage}<span className="text-sm font-normal text-gray-500">/day</span></p>
        </div>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => navigate(`/worker-dashboard/jobs/${job._id}`)}
            className="bg-gray-100 text-gray-800 px-4 py-2 rounded-lg font-medium border border-gray-200 hover:bg-gray-200 transition-colors"
          >
            View Details
          </button>
          <button 
            onClick={() => onApply(job._id)}
            className="bg-indigo-600 text-white px-6 py-2.5 rounded-lg font-bold shadow-md shadow-indigo-200 active:bg-indigo-700 transition-colors"
          >
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;