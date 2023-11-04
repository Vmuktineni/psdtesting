import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CarLogo from './CarLogo';
import Header from './Header';
import Footer from './Footer';
import '../CSS/Carpage.css';

function CarPage() {
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedModel, setSelectedModel] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchModelTerm, setSearchModelTerm] = useState('');
  const [error, setError] = useState(null);

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

  const navigate = useNavigate();

  const handleBrandSelect = (brand) => {
    setSelectedBrand(brand);
    setSearchModelTerm('');
    setSelectedModel(null);
  };

  const handleModelSelect = (model) => {
    setSelectedModel(model);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setSelectedBrand(null);
    setSelectedModel(null);
  };

  const handleModelSearchChange = (event) => {
    setSearchModelTerm(event.target.value);
  };

  const showError = (message) => {
    setError(message);
    setTimeout(() => {
      setError(null);
    }, 3000);
  };

  const handleGoClick = () => {
    if (selectedBrand && selectedModel) {
      const isModelAvailable = carBrands
        .find((brand) => brand.name === selectedBrand)
        .models.includes(selectedModel);
  
      if (isModelAvailable) {
        navigate(`/CarParts/${selectedBrand}/${selectedModel}`);
      } else {
        showError(`We don't have the ${selectedModel} model right now!`);
      }
    } else {
      showError('Enter a valid model to search!');
    }
  };

  const filteredCarBrands = carBrands.filter((brand) =>
    brand.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredCarModels = selectedBrand
    ? carBrands
        .find((brand) => brand.name === selectedBrand)
        .models.filter((model) =>
          model.toLowerCase().includes(searchModelTerm.toLowerCase())
        )
    : [];

  return (
    <div>
      <Header />
      {error && <ErrorPopup message={error} />}
      <div className="carpage-container">
        <h1>Car Brands</h1>
        <div className="search-container">
          <div className="search-input">
            <input
              type="text"
              placeholder="Search car brands"
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
        </div>
        <div className="car-logos-container">
          {filteredCarBrands.map((brand) => (
            <CarLogo
              key={brand.name}
              brand={brand.name}
              selected={brand.name === selectedBrand}
              onSelect={handleBrandSelect}
            />
          ))}
        </div>
        {selectedBrand && (
          <div className="car-models-container">
            <div className="search-model-container">
              <input
                type="text"
                placeholder={`Enter your ${selectedBrand} model`}
                value={searchModelTerm}
                onChange={handleModelSearchChange}
              />
              <button className="search-button" onClick={handleGoClick}>
                Search
              </button>
              {searchModelTerm && (
                <div className="model-suggestions">
                  {filteredCarModels.map((model) => (
                    <div
                      key={model}
                      onClick={() => handleModelSelect(model)}
                      className="model-suggestion"
                    >
                      {model}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}

const ErrorPopup = ({ message }) => {
  return (
    <div className="error-popup">
      <p>{message}</p>
    </div>
  );
};

export default CarPage;