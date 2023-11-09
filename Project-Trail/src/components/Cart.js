import React, { useState } from 'react';

function Cart() {
  // Initialize cartItems as an empty array
  const [cartItems, setCartItems] = useState([]);

  const removeFromCart = (itemId) => {
    // Simulated remove from cart action
    const updatedCart = cartItems.filter((item) => item.id !== itemId);
    setCartItems(updatedCart);
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
    </div>
  );
}

export default Cart;
