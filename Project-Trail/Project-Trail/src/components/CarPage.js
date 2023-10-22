import React, { useState } from 'react';
import CarLogo from './CarLogo'; // Make sure you have CarLogo component
import '../CSS/CarPage.css'
import { Link } from 'react-router-dom';

function CarPage() {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchModelTerm, setSearchModelTerm] = useState('');

  const carBrands = [
    {
      name: 'Audi',
      models: ['A3', 'A4', 'A6', 'Q5', 'Q7']
    },
    {
      name: 'BMW',
      models: ['3 Series', '5 Series', 'X3', 'X5', 'Z4']
    },
    {
      name: 'Chevrolet',
      models: ['Camaro', 'Corvette', 'Equinox', 'Silverado', 'Traverse']
    },
    {
      name: 'Ford',
      models: ['Escape', 'Explorer', 'F-150', 'Mustang', 'Ranger']
    },
    {
      name: 'Honda',
      models: ['Accord', 'Civic', 'CR-V', 'Odyssey', 'Pilot']
    },
    {
      name: 'Hyundai',
      models: ['Elantra', 'Sonata', 'Tucson', 'Santa Fe', 'Kona']
    },
    {
      name: 'Mercedes-Benz',
      models: ['C-Class', 'E-Class', 'GLC-Class', 'GLE-Class', 'S-Class']
    },
    {
      name: 'Nissan',
      models: ['Altima', 'Maxima', 'Rogue', 'Sentra', 'Titan']
    },
    {
      name: 'Toyota',
      models: ['Camry', 'Corolla', 'Highlander', 'Rav4', 'Sienna']
    },
    {
      name: 'Volkswagen',
      models: ['Jetta', 'Passat', 'Tiguan', 'Atlas', 'Golf']
    },
    {
      name: 'Volvo',
      models: ['S60', 'S90', 'XC40', 'XC60', 'XC90']
    },
    {
      name: 'Lexus',
      models: ['IS', 'ES', 'RX', 'NX', 'GX']
    },
    {
      name: 'Mazda',
      models: ['Mazda3', 'Mazda6', 'CX-5', 'CX-9', 'MX-5']
    },
    {
      name: 'Subaru',
      models: ['Impreza', 'Legacy', 'Outback', 'Forester', 'Crosstrek']
    },
    {
      name: 'Kia',
      models: ['Forte', 'Optima', 'Soul', 'Sportage', 'Sorento']
    },
    {
      name: 'Jeep',
      models: ['Cherokee', 'Grand Cherokee', 'Wrangler', 'Renegade', 'Compass']
    }
    // Add more car brands as needed
  ];

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleModelSearchChange = (event) => {
    setSearchModelTerm(event.target.value);
  };

  const filteredCarBrands = carBrands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedBrandObject = carBrands.find(brand => brand.name === selectedBrand);
  const filteredModels = selectedBrandObject ? selectedBrandObject.models.filter(model =>
    model.toLowerCase().includes(searchModelTerm.toLowerCase())
  ) : [];

  return (
    <div className="car-page">
      <h1>Car Brands</h1>
      <div className="search-container">
        <input
          type="text"
          placeholder="Search car brands"
          value={searchTerm}
          onChange={handleSearchChange}
        />
      </div>
      <div className="car-logos-container">
        {filteredCarBrands.map((brand) => (
          //<Link to = {'/'+ brand.name}>

            <CarLogo
              key={brand.name}
              brand={brand.name}
              selected={brand.name === selectedBrand}
              onSelect={handleBrandSelect}
            />
          //</Link>
        ))}
      </div>
      {selectedBrand && (
        <div className="car-models-container">
          <input
            type="text"
            placeholder={`Search ${selectedBrand} models`}
            value={searchModelTerm}
            onChange={handleModelSearchChange}
          />
          <ul>
            {filteredModels.map((model) => (
              <li key={model}>{model}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default CarPage;