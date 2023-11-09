import React, { useEffect, useState } from 'react';
import { useCart } from './CartContext';
import '../CSS/CarParts.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { API_URL } from '../Constants';
import { useSelector } from 'react-redux';


function CarParts() {
  const { brand, model } = useParams();
  const [parts,setParts] = useState([]);
  const user_id = useSelector(state => state?.userInfo?.user?.userId);  

  useEffect(() => {
    getBrandModelCarParts();
  },[]);

  const addToCart = (s_id) =>{
    const _addToCart = {
      user_id,
      s_id
    };
    axios.post(`${API_URL}/addToCart`, _addToCart)
      .then((res) =>{
        if (res && res.data && res.data.issuccess) {
          window.alert('added succesfully');
        }
      }).catch((err) => {
        console.error(err);
      });
  }

  const getBrandModelCarParts = () => {
    const _searchParts = {
      brand,
      model
    };
    axios.post(`${API_URL}/getBrandModelCarParts`, _searchParts)
      .then((res) =>{
        if (res && res.data && res.data.length > 0) {
          setParts(res.data);
        }
      }).catch((err) => {
        console.error(err);
      });
  }
  
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
            <div className="rating">
              Price: {part.price}
            </div>

            <div className="button-container">
              <button className="add-to-cart" onClick={()=> addToCart(part.s_id)}>
                Add to Cart
              </button>
              <button className="Buy-now">Buy Now</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarParts;
