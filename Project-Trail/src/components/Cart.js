import React from 'react';
import { FaShoppingCart } from 'react-icons/fa';

function Cart() {
  return (
    <div className="cart-container">
      {/* Display the cart icon */}
      <FaShoppingCart size={30} color="black" />
    </div>
  );
}

export default Cart;
