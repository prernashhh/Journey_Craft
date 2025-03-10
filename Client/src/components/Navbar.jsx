import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { Search, MessageSquare } from "lucide-react";
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const getUserInitials = () => {
    if (!user?.name) return '';
    return user.name.split(' ')
      .map(word => word[0])
      .join('')
      .toUpperCase();
  };

  return (
    <nav className="navbar">
      <div className="logo-container" onClick={() => navigate('/dashboard')}>
        <img src="/logo.svg" alt="Journey Craft Logo" className="logo" />
        <h1 className="logo-text">Journey Craft</h1>
      </div>

      <div className="nav-links">
        <a 
          href="#" 
          className="nav-link" 
          onClick={(e) => {
            e.preventDefault();
            navigate('/trips');
          }}
        >
          Trips
        </a>
        <Link 
          to="/events" 
          className="nav-link"
        >
          Events
        </Link>
        <a href="#rewards" className="nav-link">Rewards</a>
      </div>

      <div className="nav-actions">
        <Search size={24} className="nav-icon" />
        <MessageSquare size={24} className="nav-icon" />
        <div 
          className="user-initial-circle" 
          onClick={() => navigate('/profile')}
          title="View Profile"
        >
          {getUserInitials()}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;