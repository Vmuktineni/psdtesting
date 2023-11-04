import React from 'react';
import PropTypes from 'prop-types';
import '../CSS/BikeLogo.css';

function BikeLogo({ brand, selected, onSelect }) {
  const handleClick = () => {
    onSelect(brand);
  };

  return (
    <div
      className={`bike-logo ${selected ? 'selected' : ''}`}
      onClick={handleClick}
    >
      <img src={`../images/${brand.toLowerCase()}.jpg`} alt={brand} />
      <span>{brand}</span>
    </div>
  );
}

BikeLogo.propTypes = {
  brand: PropTypes.string.isRequired,
  selected: PropTypes.bool.isRequired,
  onSelect: PropTypes.func.isRequired,
};

export default BikeLogo;
