import React, { useState, useEffect } from "react";
import { Star, Calendar, Heart } from "lucide-react";

export function ItineraryCard({
  title,
  destination,
  duration,
  price,
  rating,
  image,
  highlights,
  included,
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const itineraryId = title.toLowerCase().replace(/\s+/g, "-");

  useEffect(() => {
    const savedItineraries = localStorage.getItem("favoriteItineraries");
    if (savedItineraries) {
      const favoriteIds = JSON.parse(savedItineraries);
      setIsFavorite(favoriteIds.includes(itineraryId));
    }
  }, [itineraryId]);

  const toggleFavorite = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setIsFavorite(!isFavorite);

    const savedItineraries = localStorage.getItem("favoriteItineraries");
    let favoriteIds = savedItineraries ? JSON.parse(savedItineraries) : [];

    if (isFavorite) {
      favoriteIds = favoriteIds.filter((id) => id !== itineraryId);
    } else {
      favoriteIds.push(itineraryId);
    }

    localStorage.setItem("favoriteItineraries", JSON.stringify(favoriteIds));
  };

  return (
    <div
      className={`itinerary-card ${isHovered ? "hovered" : ""}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="image-container">
        <img src={image || "/placeholder.svg"} alt={title} className="card-img" />
        <div className="img-gradient" />
        <button className="favorite-btn" onClick={toggleFavorite}>
          <Heart className={`heart-icon ${isFavorite ? "active" : ""}`} />
        </button>
        <div className="rating-badge">
          <Star className="star-icon" />
          <span>{rating}</span>
        </div>
      </div>

      <div className="card-content">
        <div className="title-section">
          <h3 className="title">{title}</h3>
          <p className="destination">{destination}</p>
        </div>

        <div className="duration">
          <Calendar className="calendar-icon" />
          <span>{duration}</span>
        </div>

        <div className="info-section">
          <div>
            <h4>Highlights</h4>
            <div className="badge-group">
              {highlights.slice(0, 2).map((highlight, index) => (
                <span key={index} className="badge">{highlight}</span>
              ))}
              {highlights.length > 2 && (
                <span className="badge">+{highlights.length - 2} more</span>
              )}
            </div>
          </div>

          <div>
            <h4>Included</h4>
            <div className="badge-group">
              {included.slice(0, 2).map((item, index) => (
                <span key={index} className="badge">{item}</span>
              ))}
              {included.length > 2 && (
                <span className="badge">+{included.length - 2} more</span>
              )}
            </div>
          </div>
        </div>

        <div className="footer">
          <p className="price">
            ₹{price.toLocaleString()}
            <span className="per-person"> per person</span>
          </p>
          <button className="book-btn">Book Now</button>
        </div>
      </div>
    </div>
  );
}
