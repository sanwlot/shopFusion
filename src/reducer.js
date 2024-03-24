export const initialState = {
  cart: [],
  user: null,
};

export default function reducer(state, action) {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cart: [...state.cart, action.item],
      };

    case "REMOVE_FROM_CART": {
      // first we find index of the item we clicked for delete from cart
      const index = state.cart.findIndex(
        (cartItem) => cartItem.id === action.id
      );

      // copy the cart array to 'newCart'
      let newCart = [...state.cart];

      // if index found then delete that item
      if (index >= 0) {
        newCart.splice(index, 1);
      } else {
        console.warn(
          `Can't remove the product (id: ${action.id}) as it's not in the cart!`
        );
      }

      // return the updated state while not affecting previous state
      return {
        ...state,
        cart: newCart,
      };
    }
    case "EMPTY_CART":
      return {
        ...state,
        cart: [],
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user,
      };
    default:
      return state;
  }
}

// utility functions
export const getCartTotal = (cart) =>
  cart?.reduce((accumulator, currentVal) => currentVal.price + accumulator, 0);
