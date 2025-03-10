import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, MessageSquare, Mail } from "lucide-react";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate('/');
    }
  }, [user, navigate]);

  const getUserInitials = () => {
    if (!user?.name) return '';
    return user.name.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo-container">
          <img src="/logo.svg" alt="Journey Craft Logo" className="logo" />
          <h1 className="logo-text">Journey Craft</h1>
        </div>

        <div className="nav-links">
          <a href="#" className="nav-link">My Trips</a>
          <a href="#" className="nav-link">Events</a>
          <a href="#" className="nav-link">Rewards</a>
        </div>

        <div className="nav-actions flex items-center gap-6">
          <Search size={24} className="text-gray-600 hover:text-blue-600 cursor-pointer" />
          <MessageSquare size={24} className="text-gray-600 hover:text-blue-600 cursor-pointer" />
          <div 
            className="user-initial-circle"
            onClick={logout}
            style={{
              width: '40px',
              height: '40px',
              backgroundColor: '#4F46E5',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'white',
              cursor: 'pointer'
            }}
          >
            {getUserInitials()}
          </div>
        </div>
      </nav>

      {/* Rest of the dashboard content similar to Home but personalized */}
      <section className="hero">
        <div className="hero-content">
          <h1 className="hero-title">Welcome back, {user?.name}</h1>
        </div>
      </section>

      {/* Add your personalized dashboard sections here */}
    </div>
  );
}

export default Dashboard;