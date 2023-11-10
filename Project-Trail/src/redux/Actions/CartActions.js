// cartActions.js
export const setCartItems = (cartItems) => ({
    type: 'SET_CART_ITEMS',
    payload: cartItems,
  });
  
  export const setTotalPrice = (totalPrice) => ({
    type: 'SET_TOTAL_PRICE',
    payload: totalPrice,
  });
  
  export const setDiscount = (discount) => ({
    type: 'SET_DISCOUNT',
    payload: discount,
  });
  
  export const setAmount = (amount) => ({
    type: 'SET_AMOUNT',
    payload: amount,
  });
  
  export const setDeliveryType = (deliveryType) => ({
    type: 'SET_DELIVERY_TYPE',
    payload: deliveryType,
  });
  