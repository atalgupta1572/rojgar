import BottomNav from '../../components/layout/BottomNav';

const PlaceholderPage = ({ title, role }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 text-center w-full max-w-sm">
        <div className="w-16 h-16 bg-indigo-50 rounded-full flex items-center justify-center mx-auto mb-4">
          <span className="text-2xl">🚧</span>
        </div>
        <h1 className="text-xl font-bold text-gray-900 mb-2">{title}</h1>
        <p className="text-gray-500 text-sm">
          This feature is currently under development for the POC.
        </p>
      </div>
      <BottomNav role={role} />
    </div>
  );
};

export default PlaceholderPage;