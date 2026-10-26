import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axiosInstance from './axiosCalls/axios';

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axiosInstance.get('/users/me')
      .then(() => setIsAuthenticated(true))
      .catch(() => setIsAuthenticated(false))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Checking login...</p>;

  if (!isAuthenticated) {
    return (
      <div className="p-8 text-center">
        <h2 className="text-2xl font-bold">Login or Sign Up Required</h2>
        <p className="my-3">Please log in to continue to TripZy.</p>
        <button
          onClick={() => navigate('/login')}
          className="mr-3 rounded-lg bg-emerald-700 px-4 py-2 text-white"
        >
          Login
        </button>
        <button
          onClick={() => navigate('/register')}
          className="rounded-lg border px-4 py-2"
        >
          Sign Up
        </button>
      </div>
    );
  }

  return children;
}

export default ProtectedRoute;