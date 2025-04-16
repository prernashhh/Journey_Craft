import React, { useState } from "react";
import { Calendar, MapPin, Hotel, Plane, Train, Bus, Car, Mountain, Utensils, Umbrella, Check, ChevronRight, Clock } from "lucide-react";
import axios from "axios";
import "./custom-itinerary.css";

export function CustomItinerary() {
  const [currentStep, setCurrentStep] = useState(1);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [formData, setFormData] = useState({
    destination: "",
    dateRange: {
      from: new Date(),
      to: new Date(new Date().setDate(new Date().getDate() + 5)),
    },
    hotelRating: "4-star",
    travelMode: "flight",
    specialRequirements: [],
    selectedHotels: [],
    selectedTransport: [],
    selectedAttractions: [],
    additionalNotes: "",
  });

  // Sample data
  const hotels = [
    {
      id: "hotel1",
      name: "Grand Plaza Hotel",
      rating: "5-star",
      price: 12000,
      image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "hotel2",
      name: "Comfort Inn",
      rating: "4-star",
      price: 8000,
      image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&w=800&q=80",
    },
    {
      id: "hotel3",
      name: "Budget Stay",
      rating: "3-star",
      price: 5000,
      image: "https://images.unsplash.com/photo-1512918728675-ed5a9ecdebfd?auto=format&fit=crop&w=800&q=80",
    },
  ];

  const transport = [
    { id: "transport1", type: "Flight", name: "IndiGo Airlines", time: "06:00 - 08:30", price: 5500 },
    { id: "transport2", type: "Train", name: "Rajdhani Express", time: "16:00 - 08:00", price: 2200 },
    { id: "transport3", type: "Bus", name: "Volvo A/C Sleeper", time: "20:00 - 08:00", price: 1800 },
  ];

  const attractions = [
    { id: "attr1", name: "Heritage Walking Tour", type: "Cultural", price: 1200, duration: "3 hours" },
    { id: "attr2", name: "Adventure Park", type: "Adventure", price: 2000, duration: "Full day" },
    { id: "attr3", name: "Local Food Tour", type: "Culinary", price: 1500, duration: "4 hours" },
  ];

  const events = [
    { id: "event1", name: "Local Music Festival", date: "Next Saturday", price: 1500, type: "Entertainment" },
    { id: "event2", name: "Cultural Exhibition", date: "This Weekend", price: 500, type: "Cultural" },
    { id: "event3", name: "Food & Wine Festival", date: "Next Month", price: 2000, type: "Culinary" },
  ];

  const handleNext = () => {
    if (currentStep < 5) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = async () => {
    try {
      const token = localStorage.getItem('token');
      
      const itineraryData = {
        ...formData,
        status: "Pending Review",
        estimatedPrice: "₹25,000 - ₹35,000",
      };

      await axios.post('http://localhost:5000/api/itineraries/custom', itineraryData, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setShowConfirmation(true);
      setCurrentStep(1);
      // Reset form
      setFormData({
        destination: "",
        dateRange: {
          from: new Date(),
          to: new Date(new Date().setDate(new Date().getDate() + 5)),
        },
        hotelRating: "4-star",
        travelMode: "flight",
        specialRequirements: [],
        selectedHotels: [],
        selectedTransport: [],
        selectedAttractions: [],
        additionalNotes: "",
      });
    } catch (error) {
      console.error('Error submitting itinerary:', error);
      alert('Failed to submit itinerary. Please try again.');
    }
  };

  const toggleSelection = (type, id) => {
    setFormData(prev => ({
      ...prev,
      [type]: prev[type].includes(id) 
        ? prev[type].filter(item => item !== id)
        : [...prev[type], id]
    }));
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="step-content">
            <h2>Where would you like to go?</h2>
            <p className="step-description">Select your dream destination</p>
            <div className="input-group">
              <input
                type="text"
                placeholder="Search for a city or region"
                value={formData.destination}
                onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                className="destination-input"
              />
            </div>
            {formData.destination && (
              <div className="selection-preview">
                <MapPin className="icon" />
                <span>{formData.destination}</span>
              </div>
            )}
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <h2>When are you planning to travel?</h2>
            <p className="step-description">Select your travel dates</p>
            <div className="date-inputs">
              <div className="input-group">
                <label>Start Date</label>
                <input
                  type="date"
                  value={formData.dateRange.from.toISOString().split('T')[0]}
                  onChange={(e) => setFormData({
                    ...formData,
                    dateRange: { ...formData.dateRange, from: new Date(e.target.value) }
                  })}
                />
              </div>
              <div className="input-group">
                <label>End Date</label>
                <input
                  type="date"
                  value={formData.dateRange.to.toISOString().split('T')[0]}
                  onChange={(e) => setFormData({
                    ...formData,
                    dateRange: { ...formData.dateRange, to: new Date(e.target.value) }
                  })}
                />
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <h2>What are your preferences?</h2>
            <p className="step-description">Customize your trip experience</p>
            
            <div className="preferences-section">
              <div className="preference-group">
                <h3>Hotel Rating</h3>
                <div className="radio-group">
                  {["3-star", "4-star", "5-star"].map((rating) => (
                    <label key={rating} className="radio-label">
                      <input
                        type="radio"
                        name="hotelRating"
                        value={rating}
                        checked={formData.hotelRating === rating}
                        onChange={(e) => setFormData({ ...formData, hotelRating: e.target.value })}
                      />
                      {rating}
                    </label>
                  ))}
                </div>
              </div>

              <div className="preference-group">
                <h3>Travel Mode</h3>
                <div className="radio-group">
                  {[
                    { value: "flight", icon: <Plane size={16} /> },
                    { value: "train", icon: <Train size={16} /> },
                    { value: "bus", icon: <Bus size={16} /> },
                    { value: "cab", icon: <Car size={16} /> },
                  ].map((mode) => (
                    <label key={mode.value} className="radio-label">
                      <input
                        type="radio"
                        name="travelMode"
                        value={mode.value}
                        checked={formData.travelMode === mode.value}
                        onChange={(e) => setFormData({ ...formData, travelMode: e.target.value })}
                      />
                      {mode.icon}
                      {mode.value}
                    </label>
                  ))}
                </div>
              </div>

              <div className="preference-group">
                <h3>Special Requirements</h3>
                <div className="checkbox-group">
                  {[
                    { value: "vegetarian", icon: <Utensils size={16} />, label: "Vegetarian Meals" },
                    { value: "adventure", icon: <Mountain size={16} />, label: "Adventure Activities" },
                    { value: "family", icon: <Umbrella size={16} />, label: "Family-Friendly" },
                  ].map((req) => (
                    <label key={req.value} className="checkbox-label">
                      <input
                        type="checkbox"
                        value={req.value}
                        checked={formData.specialRequirements.includes(req.value)}
                        onChange={() => toggleSelection("specialRequirements", req.value)}
                      />
                      {req.icon}
                      {req.label}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="step-content">
            <h2>Add to your itinerary</h2>
            <p className="step-description">Select hotels, transport, and attractions</p>

            <div className="selection-sections">
              {/* Hotels Section */}
              <div className="selection-section">
                <h3><Hotel size={20} /> Hotels</h3>
                <div className="cards-grid">
                  {hotels.map((hotel) => (
                    <div
                      key={hotel.id}
                      className={`selection-card ${formData.selectedHotels.includes(hotel.id) ? 'selected' : ''}`}
                      onClick={() => toggleSelection("selectedHotels", hotel.id)}
                    >
                      <img src={hotel.image} alt={hotel.name} />
                      <div className="card-content">
                        <h4>{hotel.name}</h4>
                        <span className="badge">{hotel.rating}</span>
                        <p className="price">₹{hotel.price}/night</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Transport Section */}
              <div className="selection-section">
                <h3><Plane size={20} /> Transport</h3>
                <div className="cards-grid">
                  {transport.map((item) => (
                    <div
                      key={item.id}
                      className={`selection-card ${formData.selectedTransport.includes(item.id) ? 'selected' : ''}`}
                      onClick={() => toggleSelection("selectedTransport", item.id)}
                    >
                      <div className="card-content">
                        <h4>{item.name}</h4>
                        <span className="badge">{item.type}</span>
                        <div className="time">
                          <Clock size={16} />
                          {item.time}
                        </div>
                        <p className="price">₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Attractions Section */}
              <div className="selection-section">
                <h3><Mountain size={20} /> Attractions & Events</h3>
                <div className="cards-grid">
                  {[...attractions, ...events].map((item) => (
                    <div
                      key={item.id}
                      className={`selection-card ${formData.selectedAttractions.includes(item.id) ? 'selected' : ''}`}
                      onClick={() => toggleSelection("selectedAttractions", item.id)}
                    >
                      <div className="card-content">
                        <h4>{item.name}</h4>
                        <span className="badge">{item.type}</span>
                        {item.duration && <p className="duration">{item.duration}</p>}
                        {item.date && <p className="date">{item.date}</p>}
                        <p className="price">₹{item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );

      case 5:
        return (
          <div className="step-content">
            <h2>Review Your Itinerary</h2>
            <p className="step-description">Check all details before submitting</p>

            <div className="review-section">
              <div className="review-item">
                <h3>Trip Details</h3>
                <p><strong>Destination:</strong> {formData.destination}</p>
                <p><strong>Dates:</strong> {formData.dateRange.from.toLocaleDateString()} - {formData.dateRange.to.toLocaleDateString()}</p>
                <p><strong>Duration:</strong> {Math.ceil((formData.dateRange.to - formData.dateRange.from) / (1000 * 60 * 60 * 24))} days</p>
              </div>

              <div className="review-item">
                <h3>Preferences</h3>
                <p><strong>Hotel Rating:</strong> {formData.hotelRating}</p>
                <p><strong>Travel Mode:</strong> {formData.travelMode}</p>
                {formData.specialRequirements.length > 0 && (
                  <div>
                    <strong>Special Requirements:</strong>
                    <ul>
                      {formData.specialRequirements.map(req => (
                        <li key={req}>{req}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Add more review sections for selected items */}
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="custom-itinerary-container">
      {/* Progress Steps */}
      <div className="progress-steps">
        {[1, 2, 3, 4, 5].map((step) => (
          <div key={step} className={`step ${currentStep === step ? 'active' : ''} ${currentStep > step ? 'completed' : ''}`}>
            <div className="step-number">
              {currentStep > step ? <Check size={20} /> : step}
            </div>
            <span className="step-label">
              {step === 1 && "Destination"}
              {step === 2 && "Dates"}
              {step === 3 && "Preferences"}
              {step === 4 && "Add Items"}
              {step === 5 && "Review"}
            </span>
          </div>
        ))}
      </div>

      <div className="form-content">
        {renderStepContent()}
      </div>

      {/* Navigation Buttons */}
      <div className="navigation-buttons">
        {currentStep > 1 && (
          <button className="back-button" onClick={handleBack}>
            Back
          </button>
        )}
        
        {currentStep < 5 ? (
          <button 
            className="next-button"
            onClick={handleNext}
            disabled={
              (currentStep === 1 && !formData.destination) ||
              (currentStep === 2 && (!formData.dateRange.from || !formData.dateRange.to))
            }
          >
            Continue
            <ChevronRight size={20} />
          </button>
        ) : (
          <button className="submit-button" onClick={handleSubmit}>
            Submit Itinerary
          </button>
        )}
      </div>

      {/* Confirmation Modal */}
      {showConfirmation && (
        <div className="confirmation-modal">
          <div className="modal-content">
            <h2>Itinerary Submitted Successfully! 🎉</h2>
            <p>
              Our team will review your preferences and get back to you with the final price,
              detailed itinerary, and all booking arrangements.
            </p>
            <button onClick={() => setShowConfirmation(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
