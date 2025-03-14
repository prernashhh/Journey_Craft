import React, { useState, useEffect } from "react";
import { X, MapPin, Calendar, Clock, Star, Heart } from "lucide-react";
import axios from "axios";
import "./ItineraryDetailsModal.css";

function ItineraryDetailsModal({ itinerary, onClose }) {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkWishlistStatus = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) return;

        const response = await axios.get(
          `http://localhost:5000/api/wishlist/check/itinerary/${itinerary._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        setIsInWishlist(response.data.inWishlist);
      } catch (error) {
        console.error('Error checking wishlist status:', error);
      }
    };

    checkWishlistStatus();
  }, [itinerary._id]);

  const toggleWishlist = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      if (!token) {
        alert('Please login to add to wishlist');
        return;
      }

      if (isInWishlist) {
        await axios.delete(
          `http://localhost:5000/api/wishlist/itineraries/${itinerary._id}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
      } else {
        await axios.post(
          'http://localhost:5000/api/wishlist/itineraries',
          { itineraryId: itinerary._id },
          { headers: { Authorization: `Bearer ${token}` } }
        );
      }
      setIsInWishlist(!isInWishlist);
    } catch (error) {
      console.error('Error updating wishlist:', error);
      alert('Failed to update wishlist');
    } finally {
      setLoading(false);
    }
  };

  if (!itinerary) return null;

  return (
    <div className="itinerary-modal-overlay" onClick={onClose}>
      <div className="itinerary-modal-content" onClick={e => e.stopPropagation()}>
        <button className="modal-close-button" onClick={onClose}>
          <X size={24} />
        </button>

        <div className="modal-details">
          <h2 className="modal-title">{itinerary.title}</h2>
          
          <div className="modal-info-grid">
            <div className="info-item">
              <Calendar size={20} />
              <span>{itinerary.days} Days, {itinerary.nights} Nights</span>
            </div>

            <div className="info-item">
              <Star size={20} />
              <span>{itinerary.rewardPoints} Reward Points</span>
            </div>
          </div>

          <div className="modal-description">
            <h3>About this Trip</h3>
            <p>{itinerary.description}</p>
          </div>

          <div className="destinations-section">
            <h3>Destinations</h3>
            <div className="destinations-timeline">
              {itinerary.destinations.map((dest, index) => (
                <div key={index} className="destination-item">
                  <div className="destination-marker"></div>
                  <div className="destination-details">
                    <h4>
                      <MapPin size={16} />
                      {dest.location}
                    </h4>
                    <div className="destination-dates">
                      <p>
                        <Clock size={14} />
                        Arrival: {new Date(dest.arrivalDate).toLocaleDateString()}
                      </p>
                      <p>
                        <Clock size={14} />
                        Departure: {new Date(dest.departureDate).toLocaleDateString()}
                      </p>
                    </div>
                    {dest.accommodation && (
                      <p className="accommodation">
                        Stay: {dest.accommodation}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {itinerary.events && itinerary.events.length > 0 && (
            <div className="events-section">
              <h3>Planned Events</h3>
              <div className="events-list">
                {itinerary.events.map((event, index) => (
                  <div key={index} className="planned-event">
                    <h4>{event.name}</h4>
                    <p>{event.description}</p>
                    <div className="event-meta">
                      <span>
                        <Calendar size={14} />
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                      <span>
                        <MapPin size={14} />
                        {event.location}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="modal-price-section">
            <div className="price-details">
              <span className="price-amount">₹{itinerary.price}</span>
            </div>
            <div className="action-buttons">
              <button 
                className={`wishlist-button ${isInWishlist ? 'in-wishlist' : ''}`} 
                onClick={toggleWishlist}
                disabled={loading}
              >
                <Heart size={20} fill={isInWishlist ? "#ef4444" : "none"} />
                {isInWishlist ? 'Saved' : 'Save'}
              </button>
              <button className="book-button">Book Now</button>
              <div className="status-badge" data-status={itinerary.status.toLowerCase()}>
                {itinerary.status}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ItineraryDetailsModal;