import { Users, MoreVertical } from 'lucide-react';

const ActiveJobCard = ({ job, onReview }) => {
  return (
    <div className="bg-white border border-gray-100 rounded-xl p-4 shadow-sm">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h3 className="font-bold text-gray-900 text-lg">{job.title}</h3>
          <span className="inline-block mt-1 px-2 py-0.5 bg-yellow-100 text-yellow-800 text-[10px] font-bold rounded-full uppercase tracking-wider">
            {job.status || 'Hiring'}
          </span>
        </div>
        <button className="text-gray-400 p-1">
          <MoreVertical size={20} />
        </button>
      </div>

      <div className="bg-gray-50 rounded-lg p-3 flex justify-between items-center mb-4">
        <div className="flex items-center text-gray-600">
          <Users size={16} className="mr-2 text-indigo-500" />
          <span className="text-sm font-medium">0 / 1 Hired</span>
        </div>
        <div className="text-sm font-bold text-gray-900">₹{job.offeredWage}/day</div>
      </div>

      <button 
        onClick={() => onReview(job)}
        className="w-full bg-indigo-50 text-indigo-700 font-bold py-2.5 rounded-lg border border-indigo-100 active:bg-indigo-100 transition-colors"
      >
        Review Applicants (2)
      </button>
    </div>
  );
};

export default ActiveJobCard;