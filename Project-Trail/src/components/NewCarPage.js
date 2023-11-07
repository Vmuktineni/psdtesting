import React, { useEffect, useState } from "react";
import axios from "axios";
import { API_URL } from "../Constants";
import { Link } from "react-router-dom";
import '../CSS/Carpage.css';

const NewCarPage = () => {
  const [brand, setBrand] = useState('');
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [model, setModel] = useState('');
  const [models, setModels] = useState([]);

  

  useEffect(() => {
    if (brand.length <= 2) {
      return;
    }
    getBrands();
  }, [brand]);

  useEffect(() => {
    getModels();
  }, [selectedBrand]);

  const getBrands = () => {
    const _searchBrand = {
      brand
    };
    axios.post(`${API_URL}/getBrands`, _searchBrand)
      .then((res) => {
        if (res && res.data && res.data.length > 0) {
          setBrands(res.data);
        }
      }).catch((err) => {
        console.error(err);
      });
  }

  const getModels = () => {
    const _searchBrand = {
      brand: selectedBrand // Use selectedBrand instead of brand
    };
    axios.post(`${API_URL}/getModelsByBrand`, _searchBrand)
      .then((res) => {
        if (res && res.data && res.data.length > 0) {
          setModels(res.data);
        }
      }).catch((err) => {
        console.error(err);
      });
  }

  return (
    <div>
      <div className="carpage-container">
        <h1>Car Brands</h1>
        
        <div className="search-container">
          <div className="search-input">
            <input
              type="text"
              placeholder="Search car brands"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
            {brands.length > 0 && brands.map((eachBrand) => (
              <p
                onClick={() => {
                  setBrand(eachBrand);
                  setSelectedBrand(eachBrand);
                }}
                className={eachBrand === selectedBrand ? "highlighted-brand" : ""}
              >
                {eachBrand}
              </p>
            ))}
          </div>
        </div>
        {selectedBrand && (
          <div className="car-models-container">
            <div className="search-model-container">
              <input
                type="text"
                placeholder={`Enter your ${selectedBrand} model`}
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
              {models.length > 0 && (
                <div className="model-suggestions">
                  {models
                    .filter((eachModel) =>
                      eachModel.toLowerCase().includes(model.toLowerCase())
                    )
                    .map((filteredModel) => (
                      <Link
                        to={`/CarSpares/${selectedBrand}/${filteredModel}`}
                        key={filteredModel}
                      >
                        <div className="model-suggestion">{filteredModel}</div>
                      </Link>
                    ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* {selectedBrand && (
          <div className="car-models-container">
            <div className="search-model-container">
              <input
                type="text"
                placeholder={`Enter your ${selectedBrand} model`}
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
              {models.length > 0 && (
                <div className="model-suggestions">
                  {models.map((eachModel) => (
                    <Link to={`/CarSpares/${selectedBrand}/${eachModel}`} key={eachModel}>
                      <div className="model-suggestion">
                        {eachModel}
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>
        )} */}
      </div>
    </div>
  );
}

export default NewCarPage;
