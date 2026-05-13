import { Search, MapPin } from 'lucide-react';

const JobSearch = () => {
  return (
    <div className="bg-gray-50 -mt-12 sm:-mt-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
          <form className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <label htmlFor="job-title" className="sr-only">Job title</label>
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                id="job-title"
                placeholder="Job title"
                className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500 transition-shadow"
              />
            </div>
            <div className="relative flex-grow">
              <label htmlFor="location" className="sr-only">City, state, zip code</label>
              <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                id="location"
                placeholder="City, state, zip code"
                className="w-full h-12 pl-10 pr-4 border border-gray-300 rounded-md focus:ring-sky-500 focus:border-sky-500 transition-shadow"
              />
            </div>
            <button
              type="submit"
              className="bg-sky-600 text-white px-8 py-3 rounded-md font-bold hover:bg-sky-700 transition-all active:scale-95 shadow-md hover:shadow-lg"
            >
              Find Jobs
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default JobSearch;
