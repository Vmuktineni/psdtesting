import React, { useState, useEffect } from 'react';

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [discount, setDiscount] = useState(0);
  const [amount, setAmount] = useState(0);
  const [deliveryType, setDeliveryType] = useState('');

  useEffect(() => {
    
    fetch('http://localhost:5000/prepareShoppingCart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: 13,  
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.issuccess) {
          setCartItems(data.shoppingCart.sparesInfo);
          setTotalPrice(data.shoppingCart.price);
          setDiscount(data.shoppingCart.discount);
          setAmount(data.shoppingCart.amount);
        } else {
          console.error(data.message);
        }
      })
      .catch(error => console.error('Error:', error));

    
    fetch('http://localhost:5000/deliveryType', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: 13,  
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.issuccess) {
          setDeliveryType(data.delivery_type);
        } else {
          console.error(data.message);
        }
      })
      .catch(error => console.error('Error:', error));
  }, []); 

  const removeFromCart = (itemId) => {
    
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
  };

  const handleDeliveryTypeChange = (selectedType) => {
    fetch('http://localhost:5000/deliveryType', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user_id: 13,
        delivery_type: selectedType,
      }),
    })
      .then(response => response.json())
      .then(data => {
        if (data.issuccess) {
          setDeliveryType(selectedType);
        } else {
          console.error(data.message);
        }
      })
      .catch(error => console.error('Error:', error));
  };

  return (
    <div className="cart-container">
      <h3>Shopping Cart</h3>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - ${item.price}
            <button onClick={() => removeFromCart(item.id)}>Remove</button>
          </li>
        ))}
      </ul>

      <div>
        <p>Total Price: ${totalPrice}</p>
        <p>Discount: ${discount}</p>
        <p>Amount: ${amount}</p>
        <p>Delivery Type: {deliveryType}</p>

        <div>
          <p>Choose Delivery Type:</p>
          <button onClick={() => handleDeliveryTypeChange('Home')}>Home</button>
          <button onClick={() => handleDeliveryTypeChange('Store')}>Store</button>
        </div>
      </div>
    </div>
  );
}

export default Cart;
