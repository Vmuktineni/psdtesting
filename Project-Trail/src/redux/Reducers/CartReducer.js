// cartReducer.js
const initialState = {
    cartItems: [],
    totalPrice: 0,
    discount: 0,
    amount: 0,
    deliveryType: '',
  };
  
  const cartReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_CART_ITEMS':
        return { ...state, cartItems: action.payload };
      case 'SET_TOTAL_PRICE':
        return { ...state, totalPrice: action.payload };
      case 'SET_DISCOUNT':
        return { ...state, discount: action.payload };
      case 'SET_AMOUNT':
        return { ...state, amount: action.payload };
      case 'SET_DELIVERY_TYPE':
        return { ...state, deliveryType: action.payload };
      default:
        return state;
    }
  };
  
  export default cartReducer;
  