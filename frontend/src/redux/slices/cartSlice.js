import { createSlice } from '@reduxjs/toolkit';

const initialCartItems = () => {
  try {
    const saved = localStorage.getItem('yoga_healers_cart');
    return saved ? JSON.parse(saved) : [];
  } catch (err) {
    return [];
  }
};

const initialCartState = {
  cartItems: initialCartItems(),
  isCartOpen: false,
};

const saveCartToStorage = (items) => {
  try {
    localStorage.setItem('yoga_healers_cart', JSON.stringify(items));
  } catch (err) {
    console.error('Error saving cart to localStorage:', err);
  }
};

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialCartState,
  reducers: {
    addToCart: (state, action) => {
      const product = action.payload;
      const existingIndex = state.cartItems.findIndex(
        (item) => item.product.id === product.id || (product._id && item.product._id === product._id)
      );
      if (existingIndex > -1) {
        state.cartItems[existingIndex].quantity += 1;
      } else {
        state.cartItems.push({ product, quantity: 1 });
      }
      saveCartToStorage(state.cartItems);
    },
    updateQuantity: (state, action) => {
      const { productId, newQty } = action.payload;
      if (newQty <= 0) {
        state.cartItems = state.cartItems.filter(
          (item) => item.product.id !== productId && item.product._id !== productId
        );
      } else {
        const item = state.cartItems.find(
          (item) => item.product.id === productId || item.product._id === productId
        );
        if (item) {
          item.quantity = newQty;
        }
      }
      saveCartToStorage(state.cartItems);
    },
    removeCartItem: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(
        (item) => item.product.id !== productId && item.product._id !== productId
      );
      saveCartToStorage(state.cartItems);
    },
    clearCart: (state) => {
      state.cartItems = [];
      saveCartToStorage(state.cartItems);
    },
    setIsCartOpen: (state, action) => {
      state.isCartOpen = action.payload;
    },
  },
});

export const {
  addToCart,
  updateQuantity,
  removeCartItem,
  clearCart,
  setIsCartOpen,
} = cartSlice.actions;

export const selectCartItems = (state) => state.cart.cartItems;
export const selectIsCartOpen = (state) => state.cart.isCartOpen;
export const selectTotalCartCount = (state) =>
  state.cart.cartItems.reduce((sum, item) => sum + item.quantity, 0);

export default cartSlice.reducer;
