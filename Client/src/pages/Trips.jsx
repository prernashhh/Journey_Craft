import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Star } from "lucide-react";
import axios from 'axios';
import './Trips.css';
import ItineraryDetailsModal from '../components/ItineraryDetailsModal';
import Navbar from '../components/Navbar';

function Trips() {
  const [itineraries, setItineraries] = useState([]);
  const [filteredItineraries, setFilteredItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItinerary, setSelectedItinerary] = useState(null);

  useEffect(() => {
    const fetchItineraries = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:5000/api/itineraries', {
          headers: { Authorization: `Bearer ${token}` }
        });
        setItineraries(response.data);
        setFilteredItineraries(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching itineraries:', err);
        setError('Failed to load itineraries');
        setLoading(false);
      }
    };

    fetchItineraries();
  }, []);

  // Update the handleSearch function
  const handleSearch = (e) => {
    const query = e.target.value.toLowerCase();
    setSearchQuery(query);
    
    const filtered = itineraries.filter(itinerary => {
      // Check title match
      const titleMatch = itinerary.title.toLowerCase().includes(query);
      
      // Check destinations match
      const destinationMatch = itinerary.destinations.some(dest => 
        dest.location.toLowerCase().includes(query)
      );

      // Return true if either title or any destination matches
      return titleMatch || destinationMatch;
    });
    
    setFilteredItineraries(filtered);
  };

  if (loading) return <div className="loading">Loading itineraries...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div>
      <Navbar />
      
      <div className="trips-page">
        <div className="trips-header">
          <h1>Explore Trips</h1>
          <div className="search-container">
            <Search className="search-icon" size={20} />
            <input
              type="text"
              placeholder="Search trips by name, description, or destination..."
              value={searchQuery}
              onChange={handleSearch}
              className="search-input"
            />
          </div>
        </div>

        <div className="itineraries-grid">
          {filteredItineraries.map(itinerary => (
            <div 
              key={itinerary._id}
              className="itinerary-card"
              onClick={() => setSelectedItinerary(itinerary)}
            >
              <div className="itinerary-details">
                <h2 className="itinerary-title">{itinerary.title}</h2>
                
                <div className="itinerary-meta">
                  <span className="duration">
                    <Calendar size={16} />
                    {itinerary.days} Days, {itinerary.nights} Nights
                  </span>
                  <span className="reward-points">
                    <Star size={16} />
                    {itinerary.rewardPoints} Points
                  </span>
                </div>

                <div className="destinations">
                  {itinerary.destinations.map((dest, index) => (
                    <span key={index} className="destination-tag">
                      <MapPin size={14} />
                      {dest.location}
                    </span>
                  ))}
                </div>

                <p className="itinerary-description">
                  {itinerary.description}
                </p>

                <div className="itinerary-footer">
                  <span className="price">₹{itinerary.price}</span>
                  <span className={`status-badge ${itinerary.status.toLowerCase()}`}>
                    {itinerary.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {selectedItinerary && (
        <ItineraryDetailsModal
          itinerary={selectedItinerary}
          onClose={() => setSelectedItinerary(null)}
        />
      )}
    </div>
  );
}

export default Trips;