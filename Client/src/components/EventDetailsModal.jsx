import { X, Calendar, MapPin, Clock, Users, Tag } from "lucide-react";
import "./EventDetailsModal.css";
import { useState } from "react";
import PaymentModal from './PaymentModal';

function EventDetailsModal({ event, onClose }) {
  const [showPayment, setShowPayment] = useState(false);

  const handleBooking = () => {
    setShowPayment(true);
  };

  const handlePaymentSuccess = () => {
    // Here you would typically update the booking status
    alert('Booking successful!');
  };

  if (!event) return null;

  return (
    <>
      <div className="event-modal-overlay" onClick={onClose}>
        <div className="event-modal-content" onClick={e => e.stopPropagation()}>
          <button className="modal-close-button" onClick={onClose}>
            <X size={24} />
          </button>

          {event.images?.[0] && (
            <div className="modal-image-container">
              <img 
                src={event.images[0].url} 
                alt={event.title} 
                className="modal-image"
              />
            </div>
          )}

          <div className="modal-details">
            <h2 className="modal-title">{event.title}</h2>
            
            <div className="modal-info-grid">
              <div className="info-item">
                <Calendar size={20} />
                <span>{new Date(event.date).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>

              <div className="info-item">
                <MapPin size={20} />
                <span>{event.location.city}, {event.location.country}</span>
              </div>

              <div className="info-item">
                <Clock size={20} />
                <span>{event.duration.hours}h {event.duration.minutes}m</span>
              </div>

              <div className="info-item">
                <Users size={20} />
                <span>{event.capacity} spots available</span>
              </div>
            </div>

            <div className="modal-description">
              <h3>About this event</h3>
              <p>{event.description}</p>
            </div>

            {event.tags && event.tags.length > 0 && (
              <div className="modal-tags">
                {event.tags.map((tag, index) => (
                  <span key={index} className="tag">
                    <Tag size={14} />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <div className="modal-price-section">
              <div className="price-details">
                <span className="price-amount">₹{event.price.amount}</span>
                <span className="price-currency">{event.price.currency}</span>
              </div>
              <button className="book-button" onClick={handleBooking}>Book Now</button>
            </div>
          </div>
        </div>
      </div>

      {showPayment && (
        <PaymentModal 
          event={event}
          onClose={() => setShowPayment(false)}
          onSuccess={handlePaymentSuccess}
        />
      )}
    </>
  );
}

export default EventDetailsModal;