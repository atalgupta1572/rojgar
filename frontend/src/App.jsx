import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from './pages/landing/LandingPage';
import AuthPage from './pages/auth/Auth';
import WorkerDashboard from './pages/dashboard/WorkerDashboard';
import ContractorDashboard from './pages/dashboard/ContractorDashboard';
import JobDetailsPage from './pages/dashboard/JobDetailsPage';
import PlaceholderPage from './pages/dashboard/PlaceholderPage';
import ProfilePage from './pages/dashboard/ProfilePage';
import MobileUIShowcase from './pages/showcase/MobileUIShowcase';
import useAuthStore from './store/useAuthStore';

const ProtectedRoute = ({ children, allowedRole }) => {
  const { user, token } = useAuthStore();
  if (!token) return <Navigate to='/auth' replace />;
  if (allowedRole && user.role !== allowedRole) return <Navigate to='/auth' replace />;
  return children;
};

function App() {
  const { user } = useAuthStore();
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={user ? <Navigate to={user.role === 'WORKER' ? '/worker-dashboard' : '/contractor-dashboard'} /> : <LandingPage />} />
        <Route path='/auth' element={user ? <Navigate to={user.role === 'WORKER' ? '/worker-dashboard' : '/contractor-dashboard'} /> : <AuthPage />} />
        <Route path='/showcase/mobile-ui' element={<MobileUIShowcase />} />
        
        {/* Worker Routes */}
        <Route path='/worker-dashboard' element={<ProtectedRoute allowedRole='WORKER'><WorkerDashboard /></ProtectedRoute>} />
        <Route path='/worker-dashboard/jobs' element={<ProtectedRoute allowedRole='WORKER'><PlaceholderPage title="My Jobs" role="WORKER" /></ProtectedRoute>} />
        <Route path='/worker-dashboard/jobs/:jobId' element={<ProtectedRoute allowedRole='WORKER'><JobDetailsPage /></ProtectedRoute>} />
        <Route path='/worker-dashboard/earnings' element={<ProtectedRoute allowedRole='WORKER'><PlaceholderPage title="Earnings" role="WORKER" /></ProtectedRoute>} />
        <Route path='/worker-dashboard/profile' element={<ProtectedRoute allowedRole='WORKER'><ProfilePage role="WORKER" /></ProtectedRoute>} />

        {/* Contractor Routes */}
        <Route path='/contractor-dashboard' element={<ProtectedRoute allowedRole='CONTRACTOR'><ContractorDashboard /></ProtectedRoute>} />
        <Route path='/contractor-dashboard/jobs' element={<ProtectedRoute allowedRole='CONTRACTOR'><PlaceholderPage title="My Jobs" role="CONTRACTOR" /></ProtectedRoute>} />
        <Route path='/contractor-dashboard/workers' element={<ProtectedRoute allowedRole='CONTRACTOR'><PlaceholderPage title="Saved Workers" role="CONTRACTOR" /></ProtectedRoute>} />
        <Route path='/contractor-dashboard/profile' element={<ProtectedRoute allowedRole='CONTRACTOR'><ProfilePage role="CONTRACTOR" /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
