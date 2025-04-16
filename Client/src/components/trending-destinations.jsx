import React, { useState } from 'react';

const destinations = [
  {
    id: "shimla",
    name: "Shimla, Himachal",
    location: "Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1626621341517-bbf3d9990a23?auto=format&fit=crop&w=800&q=80",
    description: "Experience the colonial charm and breathtaking mountain views in the Queen of Hills.",
    highlights: ["Mall Road", "Ridge", "Jakhu Temple", "Toy Train"],
    price: "From ₹15,999",
    rating: 4.7,
  },
  {
    id: "manali",
    name: "Manali, Himachal",
    location: "Himachal Pradesh",
    image: "https://images.unsplash.com/photo-1593181629936-11c609b8db9b?auto=format&fit=crop&w=800&q=80",
    description: "Adventure paradise with snow-capped mountains and lush valleys.",
    highlights: ["Solang Valley", "Rohtang Pass", "Hadimba Temple", "Old Manali"],
    price: "From ₹14,999",
    rating: 4.8,
  },
  {
    id: "goa",
    name: "Goa",
    location: "Western India",
    image: "https://images.unsplash.com/photo-1512343879784-a960bf40e7f2?auto=format&fit=crop&w=800&q=80",
    description: "Sun, sand, and sea with vibrant nightlife and Portuguese heritage.",
    highlights: ["Calangute Beach", "Fort Aguada", "Dudhsagar Falls", "Basilica of Bom Jesus"],
    price: "From ₹12,999",
    rating: 4.9,
  },
  {
    id: "kerala",
    name: "Kerala",
    location: "Southern India",
    image: "https://images.unsplash.com/photo-1609340442497-dee4a8e3ad42?auto=format&fit=crop&w=800&q=80",
    description: "God's Own Country with serene backwaters and lush greenery.",
    highlights: ["Alleppey Backwaters", "Munnar", "Kovalam Beach", "Wayanad"],
    price: "From ₹16,999",
    rating: 4.8,
  }
];

export default function TrendingDestinations() {
  const [selectedDestination, setSelectedDestination] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = (destination) => {
    setSelectedDestination(destination);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center text-[#1E3A8A] mb-12">
          Trending Destinations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {destinations.map((destination) => (
            <div 
              key={destination.id}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-1"
              onClick={() => openModal(destination)}
            >
              <div className="relative h-48">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 text-white">
                  <h3 className="text-xl font-semibold">{destination.name}</h3>
                  <p className="text-sm opacity-90">{destination.location}</p>
                </div>
              </div>
              <div className="p-4">
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {destination.description}
                </p>
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <span className="text-yellow-400">★</span>
                    <span className="ml-1 text-gray-600">{destination.rating}</span>
                  </div>
                  <span className="text-[#1E3A8A] font-semibold">
                    {destination.price}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {isModalOpen && selectedDestination && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={closeModal}
        >
          <div 
            className="bg-white rounded-lg max-w-2xl w-full m-4 p-6"
            onClick={e => e.stopPropagation()}
          >
            <div className="relative h-64 mb-4">
              <img
                src={selectedDestination.image}
                alt={selectedDestination.name}
                className="w-full h-full object-cover rounded-lg"
              />
            </div>
            <h3 className="text-2xl font-bold mb-2">{selectedDestination.name}</h3>
            <p className="text-gray-600 mb-4">{selectedDestination.description}</p>
            <div className="mb-4">
              <h4 className="font-semibold mb-2">Highlights:</h4>
              <ul className="grid grid-cols-2 gap-2">
                {selectedDestination.highlights.map((highlight, index) => (
                  <li key={index} className="flex items-center">
                    <span className="mr-2">•</span>
                    {highlight}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                <span>{selectedDestination.rating}</span>
              </div>
              <span className="text-[#1E3A8A] font-bold text-xl">
                {selectedDestination.price}
              </span>
            </div>
            <button
              className="mt-6 w-full bg-[#1E3A8A] text-white py-2 rounded-lg hover:bg-[#1E3A8A]/90 transition-colors"
              onClick={closeModal}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}