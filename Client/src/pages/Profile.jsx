import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Mail, MapPin, Calendar } from "lucide-react";
import axios from 'axios';
import Navbar from '../components/Navbar';
import './Profile.css';

function Profile() {
  const { user, logout } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    location: '',
    joinDate: user?.createdAt || new Date().toISOString()
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      setLoading(true);
      setError(null);
      
      const token = localStorage.getItem('token');
      await axios.put(
        'http://localhost:5000/api/auth/profile',
        profileData,
        {
          headers: { Authorization: `Bearer ${token}` }
        }
      );
      
      setIsEditing(false);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update profile');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="profile-page">
      <Navbar />
      
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-avatar">
            <div className="avatar-placeholder">
              {user?.name?.charAt(0).toUpperCase()}
            </div>
          </div>
          <div className="profile-title">
            <h1>My Profile</h1>
            <p>Manage your personal information and account settings</p>
          </div>
        </div>

        {error && <div className="error-message">{error}</div>}

        <div className="profile-content">
          <div className="profile-section">
            <h2>Personal Information</h2>
            <div className="profile-fields">
              <div className="field-group">
                <label>
                  <User size={16} />
                  Name
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{profileData.name}</p>
                )}
              </div>

              <div className="field-group">
                <label>
                  <Mail size={16} />
                  Email
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={profileData.email}
                    onChange={handleChange}
                  />
                ) : (
                  <p>{profileData.email}</p>
                )}
              </div>

              <div className="field-group">
                <label>
                  <Calendar size={16} />
                  Member Since
                </label>
                <p>{new Date(profileData.joinDate).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <div className="profile-actions">
            {isEditing ? (
              <>
                <button 
                  className="save-button" 
                  onClick={handleSave}
                  disabled={loading}
                >
                  {loading ? 'Saving...' : 'Save Changes'}
                </button>
                <button 
                  className="cancel-button"
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </button>
              </>
            ) : (
              <button className="edit-button" onClick={handleEdit}>
                Edit Profile
              </button>
            )}
            <button className="logout-button" onClick={logout}>
              Logout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;