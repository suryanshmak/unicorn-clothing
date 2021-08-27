import { ADD_PRODUCT, CLEAR_PRODUCT, SET_QUANTITY } from "../actions/types";

function addProductToCart(cartItems, itemToAdd) {
  if (cartItems.find((item) => item.name === itemToAdd.name)) {
    return cartItems.map((item) =>
      item.name === itemToAdd.name
        ? { ...item, quantity: item.quantity + 1 }
        : item
    );
  } else {
    return [...cartItems, { ...itemToAdd, quantity: 1 }];
  }
}

export default function cartReducer(state = { cartItems: [] }, action) {
  switch (action.type) {
    case ADD_PRODUCT:
      return {
        ...state,
        cartItems: addProductToCart(state.cartItems, action.payload),
      };
    case CLEAR_PRODUCT:
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (item) => item.name !== action.payload.name
        ),
      };
    case SET_QUANTITY:
      return {
        ...state,
        cartItems: state.cartItems.map((item) =>
          item.name === action.payload.product.name
            ? {
                ...item,
                quantity: action.payload.quantity,
              }
            : item
        ),
      };
    default:
      return state;
  }
}
