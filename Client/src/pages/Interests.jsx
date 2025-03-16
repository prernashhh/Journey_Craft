import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import './Interests.css';

const interestsList = [
  'Adventure & Outdoor',
  'Beaches & Islands',
  'Cultural & Heritage',
  'Food & Culinary Experiences',
  'Luxury & Resorts',
  'Nature & Wildlife',
  'Nightlife & Entertainment',
  'Pilgrimage & Spiritual Journeys',
  'Road Trips & Scenic Drives',
  'Shopping & Fashion',
  'Solo & Backpacking Travel',
  'Sports & Recreational Activities',
  'Sustainable & Eco-Tourism',
  'Urban Exploration & City Tours',
  'Wellness & Retreats'
];

function Interests() {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const navigate = useNavigate();

  const handleInterestToggle = (interest) => {
    setSelectedInterests(prevState =>
      prevState.includes(interest)
        ? prevState.filter(i => i !== interest)
        : [...prevState, interest]
    );
  };

  const handleSubmit = () => {
    // Save selected interests to the user's profile (API call can be added here)
    console.log('Selected Interests:', selectedInterests);
    navigate('/dashboard');
  };

  return (
    <div>
      <Navbar />
      <div className="navbar-spacer"></div>
      <div className="interests-page">
        <h1>Select Your Interests</h1>
        <div className="interests-list">
          {interestsList.map(interest => (
            <div
              key={interest}
              className={`interest-item ${selectedInterests.includes(interest) ? 'selected' : ''}`}
              onClick={() => handleInterestToggle(interest)}
            >
              {interest}
            </div>
          ))}
        </div>
        <button className="submit-btn" onClick={handleSubmit}>
          Save and Continue
        </button>
      </div>
    </div>
  );
}

export default Interests;