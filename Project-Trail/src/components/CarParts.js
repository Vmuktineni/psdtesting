import React from 'react';
import '../CSS/CarParts.css'; 

const parts = [
  {
    id: 1,
    name: 'Engine Oil Filter',
    description: 'High-quality engine oil filter for optimal performance.',
    image: 'engine_oil_filter.jpg', 
    rating: 4.8,
  },
  {
    id: 2,
    name: 'Brake Pads',
    description: 'Durable brake pads for smooth and safe braking.',
    image: 'brake_pads.jpg', 
    rating: 4.5,
  },
  {
    id: 3,
    name: 'Air Filter',
    description: 'Efficient air filter for clean and improved airflow.',
    image: 'air_filter.jpg', 
    rating: 4.7,
  },
  {
    id: 4,
    name: 'Spark Plugs',
    description: 'High-performance spark plugs for efficient combustion.',
    image: 'spark_plugs.jpg', 
    rating: 4.6,
  },
  {
    id: 5,
    name: 'Transmission Fluid',
    description: 'Quality transmission fluid for smooth gear shifts.',
    image: 'transmission_fluid.jpg', 
    rating: 4.4,
  },
  {
    id: 6,
    name: 'Fuel Filter',
    description: 'Reliable fuel filter for clean and efficient fuel delivery.',
    image: 'fuel_filter.jpg', 
    rating: 4.5,
  },
];

function CarParts() {
  return (
    <div>
      <h1>Car Parts</h1>
      <div className="car-part-boxes">
        {parts.slice(0, 6).map((part, index) => (
          <div key={part.id} className={`car-part-box part-${index + 1}`}>
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

export default CarParts;
