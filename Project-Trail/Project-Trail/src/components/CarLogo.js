import React from 'react';
import PropTypes from 'prop-types';
import '../CSS/CarLogo.css'


function CarLogo({ brand, selected, onSelect }) {
  const handleClick = () => {
    onSelect(brand);
  };

  return (
    <div
      className={`car-logo ${selected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      <img src={`../images/${brand.toLowerCase()}.jpg`} alt={brand} />
      <span>{brand}</span>
    </div>
  );
}

CarLogo.propTypes = {
  brand: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default CarLogo;