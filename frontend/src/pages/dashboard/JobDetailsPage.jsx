import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, Clock, Phone, Mail, Briefcase, Info, CheckCircle } from 'lucide-react';
import api from '../../services/api';
import Header from '../../components/layout/Header';
import BottomNav from '../../components/layout/BottomNav';

const JobDetailsPage = () => {
  const { jobId } = useParams();
  const navigate = useNavigate();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJob = async () => {
      setLoading(true);
      try {
        const res = await api.get(`/jobs/${jobId}`);
        setJob(res.data.data);
      } catch (error) {
        console.error(error);
        alert(error.response?.data?.message || 'Unable to load job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJob();
  }, [jobId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header userName="Loading..." location="Loading" unreadCount={0} />
        <div className="px-4 py-8 space-y-4">
          <div className="h-6 w-32 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="h-5 w-40 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="space-y-3">
            {[1, 2, 3, 4].map((item) => (
              <div key={item} className="h-20 bg-gray-200 rounded-xl animate-pulse"></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="min-h-screen bg-gray-50 pb-20">
        <Header userName="Worker" location="Unknown" unreadCount={0} />
        <div className="px-4 py-10 text-center">
          <p className="text-gray-600">Job details could not be loaded.</p>
          <button
            onClick={() => navigate(-1)}
            className="mt-4 bg-indigo-600 text-white px-5 py-3 rounded-xl"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  const {
    title,
    description,
    tasks,
    requiredSkills,
    duration,
    paymentType,
    offeredWage,
    totalPayment,
    contact,
    employerDetails,
    location,
    jobDate,
    additionalInstructions,
    contractor,
    status
  } = job;

  const formattedDate = jobDate ? new Date(jobDate).toLocaleDateString() : 'Not specified';
  const formattedAddress = location?.address || (location?.coordinates ? `Lat ${location.coordinates[1]}, Lng ${location.coordinates[0]}` : 'Location not available');

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <Header userName={job?.contractor?.name || 'Worker'} location={formattedAddress} unreadCount={0} />

      <div className="px-4 py-5 space-y-6">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 text-indigo-700 font-medium"
        >
          <ArrowLeft size={18} /> Back to Jobs
        </button>

        <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-sm text-gray-500 uppercase font-semibold tracking-wide">Job Title</p>
                <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
              </div>
              <span className="text-xs font-semibold uppercase px-3 py-2 rounded-full bg-green-50 text-green-700">
                {status || 'OPEN'}
              </span>
            </div>

            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-indigo-50 p-4">
                <p className="text-xs text-indigo-600 uppercase font-bold">Work Date</p>
                <p className="mt-1 text-sm text-gray-800">{formattedDate}</p>
              </div>
              <div className="rounded-2xl bg-orange-50 p-4">
                <p className="text-xs text-orange-600 uppercase font-bold">Duration</p>
                <p className="mt-1 text-sm text-gray-800">{duration || '1 day assignment'}</p>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center gap-2 text-gray-600">
                <MapPin size={18} />
                <span>{formattedAddress}</span>
              </div>
              <div className="flex items-center gap-2 text-gray-600">
                <Clock size={18} />
                <span>{paymentType ? `${paymentType.charAt(0) + paymentType.slice(1).toLowerCase()} pay` : 'Daily pay'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="grid gap-4 lg:grid-cols-[1.5fr_1fr]">
          <div className="space-y-5">
            <section className="bg-white rounded-3xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Job Description</h2>
              <p className="text-gray-700 leading-7">{description || 'The worker will support the team with on-site tasks and follow instructions from the site supervisor.'}</p>
            </section>

            <section className="bg-white rounded-3xl border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-3">
                <h2 className="text-lg font-bold text-gray-900">Assigned Tasks / Responsibilities</h2>
                <Info size={18} className="text-gray-400" />
              </div>
              <ul className="space-y-2 text-gray-700">
                {(tasks && tasks.length > 0 ? tasks : [
                  'Carry and organize work materials',
                  'Help with loading and unloading supplies',
                  'Maintain a clean and safe work area',
                  'Assist skilled workers with basic labor tasks',
                  'Report any safety issues immediately'
                ]).map((task, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <span className="mt-1 text-green-600"><CheckCircle size={16} /></span>
                    <span>{task}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-white rounded-3xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-3">Additional Instructions</h2>
              <p className="text-gray-700 leading-7">{additionalInstructions || 'Please arrive 15 minutes before the shift, bring a valid ID, and follow all safety instructions on site.'}</p>
            </section>
          </div>

          <div className="space-y-4">
            <section className="bg-white rounded-3xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Payment Details</h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex justify-between items-center">
                  <span className="font-medium">Offered Wage</span>
                  <span className="font-bold text-green-700">₹{offeredWage || 0}{paymentType === 'HOURLY' ? '/hr' : paymentType === 'DAILY' ? '/day' : ''}</span>
                </div>
                {totalPayment && (
                  <div className="flex justify-between items-center">
                    <span className="font-medium">Total Payment</span>
                    <span className="font-bold text-gray-900">₹{totalPayment}</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <span className="font-medium">Payment Type</span>
                  <span className="text-gray-600">{paymentType ? paymentType.toLowerCase() : 'daily'}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="font-medium">Job Status</span>
                  <span className="text-gray-600">{status || 'OPEN'}</span>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-3xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Contact Information</h2>
              <div className="space-y-3 text-gray-700">
                <div className="flex items-center gap-2">
                  <Phone size={18} className="text-indigo-600" />
                  <span>{contact?.phone || job.contractor?.phone || 'Not available'}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail size={18} className="text-indigo-600" />
                  <span>{contact?.email || `${job.contractor?.name?.replaceAll(' ', '.').toLowerCase() || 'contact'}@example.com`}</span>
                </div>
              </div>
            </section>

            <section className="bg-white rounded-3xl border border-gray-100 p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Employer / Hiring Person</h2>
              <div className="space-y-2 text-gray-700">
                <div>
                  <p className="text-sm text-gray-500">Name</p>
                  <p className="font-semibold text-gray-900">{employerDetails?.name || job.contractor?.name || 'Company representative'}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Company</p>
                  <p className="font-semibold text-gray-900">{employerDetails?.company || job.contractor?.companyName || 'Not specified'}</p>
                </div>
              </div>
            </section>
          </div>
        </div>
      </div>

      <BottomNav role="WORKER" />
    </div>
  );
};

export default JobDetailsPage;
