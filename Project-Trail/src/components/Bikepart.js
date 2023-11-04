import React from 'react';
import '../CSS/BikeParts.css';

const parts = [
  {
    id: 1,
    name: 'Brake Discs',
    description: 'High-quality brake discs for efficient braking.',
    image: 'brake_discs.jpg',
    rating: 4.7,
  },
  {
    id: 2,
    name: 'Tires',
    description: 'Durable tires for a smooth and safe ride.',
    image: 'tires.jpg',
    rating: 4.5,
  },
  {
    id: 3,
    name: 'Exhaust System',
    description: 'Performance exhaust system for better engine output.',
    image: 'exhaust_system.jpg',
    rating: 4.8,
  },
  {
    id: 4,
    name: 'Chain and Sprocket Kit',
    description: 'High-quality chain and sprocket kit for smooth transmission.',
    image: 'chain_sprocket.jpg',
    rating: 4.6,
  },
  {
    id: 5,
    name: 'Oils and Lubricants',
    description: 'Quality oils and lubricants for optimal performance.',
    image: 'oils_lubricants.jpg',
    rating: 4.4,
  },
  {
    id: 6,
    name: 'Air Filters',
    description: 'Efficient air filters for clean and improved airflow.',
    image: 'air_filters.jpg',
    rating: 4.5,
  },
];

function BikeParts() {
  return (
    <div>
      <h1>Bike Parts</h1>
      <div className="part-boxes">
        {parts.map((part, index) => (
          <div key={part.id} className={`bike-part-box part-${index + 1}`}>
            <img src={part.image} alt={part.name} />
            <h2>{part.name}</h2>
            <p>{part.description}</p>
            <div className="rating">
              Rating: {part.rating} <span role="img" aria-label="star">⭐</span>
            </div>
            <div className="button-container">
              <button className="add-to-cart">Add to Cart</button>
              <button className="Buy-now">Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
export default BikeParts;
