import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Search, MessageSquare, Calendar, MapPin, Clock } from "lucide-react";
import axios from 'axios';
import './Dashboard.css';
import EventDetailsModal from '../components/EventDetailsModal';
import ItineraryDetailsModal from '../components/ItineraryDetailsModal';
import Navbar from '../components/Navbar';
import TravelBooking from './TravelBooking'; // Add this import

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [itineraries, setItineraries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [selectedItinerary, setSelectedItinerary] = useState(null);

  useEffect(() => {
    // Check for user and token first
    if (!user) {
      navigate('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // Check if token exists
        if (!token) {
          logout(); // Call logout to clear auth context
          navigate('/login');
          return;
        }

        const headers = { 
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json'
        };

        const [eventsRes, itinerariesRes] = await Promise.all([
          axios.get('http://localhost:5000/api/events', { headers }),
          axios.get('http://localhost:5000/api/itineraries', { headers })
        ]);

        setEvents(eventsRes.data);
        setItineraries(itinerariesRes.data);
        setError(null);

      } catch (err) {
        console.error('Error fetching data:', err);
        
        // Handle different error scenarios
        if (err.response?.status === 401) {
          setError('Session expired. Please login again.');
          logout();
          navigate('/login');
        } else {
          setError('Failed to load dashboard data. Please try again.');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [user, navigate, logout]);

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{error}</div>;

  return (
    <div className="dashboard">
      <Navbar />
      <div className="navbar-spacer"></div>
      
      <main className="dashboard-content">
        <section className="booking-section">
          <TravelBooking />
        </section>

        <section id="events" className="dashboard-section">
          <h2>Upcoming Events</h2>
          <div className="events-grid">
            {events.map(event => (
              <div 
                key={event._id} 
                className="event-card" 
                onClick={() => setSelectedEvent(event)}
              >
                {/* Image display temporarily removed
                {event.images?.[0] && (
                  <img 
                    src={event.images[0].url} 
                    alt={event.title} 
                    className="event-image"
                  />
                )}
                */}
                <div className="event-details">
                  <h3>{event.title}</h3>
                  <p className="event-description">{event.description}</p>
                  <div className="event-info">
                    <span><Calendar size={16} /> {new Date(event.date).toLocaleDateString()}</span>
                    <span><MapPin size={16} /> {event.location.city}, {event.location.country}</span>
                    <span><Clock size={16} /> {event.duration.hours}h {event.duration.minutes}m</span>
                  </div>
                  <div className="event-price">
                    ₹{event.price.amount} {event.price.currency}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="itineraries" className="dashboard-section">
          <h2>Your Itineraries</h2>
          <div className="itineraries-grid">
            {itineraries.map(itinerary => (
              <div 
                key={itinerary._id} 
                className="itinerary-card"
                onClick={() => setSelectedItinerary(itinerary)}
              >
                <div className="itinerary-details">
                  <h3>{itinerary.title}</h3>
                  <p className="itinerary-description">{itinerary.description}</p>
                  <div className="itinerary-info">
                    <div className="itinerary-stats">
                      <span>{itinerary.days} Days</span>
                      <span>{itinerary.nights} Nights</span>
                      <span>₹{itinerary.price}</span>
                    </div>
                    <div className="itinerary-destinations">
                      {itinerary.destinations.map((dest, index) => (
                        <span key={index} className="destination-tag">
                          <MapPin size={14} /> {dest.location}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="itinerary-status">
                    Status: {itinerary.status}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>
      {selectedEvent && (
        <EventDetailsModal 
          event={selectedEvent} 
          onClose={() => setSelectedEvent(null)} 
        />
      )}
      {selectedItinerary && (
        <ItineraryDetailsModal 
          itinerary={selectedItinerary} 
          onClose={() => setSelectedItinerary(null)} 
        />
      )}
    </div>
  );
}

export default Dashboard;