import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  addToCart,
  updateQuantity,
  removeCartItem,
  setIsCartOpen,
  clearCart,
  selectCartItems,
  selectIsCartOpen,
  selectTotalCartCount,
} from '../redux/slices/cartSlice';
import { addNotification } from '../redux/slices/uiSlice';

export function useCart() {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const isCartOpen = useAppSelector(selectIsCartOpen);
  const totalCartCount = useAppSelector(selectTotalCartCount);

  const handleAddToCart = (product) => {
    const existing = cartItems.find((item) => item.product.id === product.id);
    dispatch(addToCart(product));
    if (existing) {
      dispatch(addNotification({ message: `Increased quantity for ${product.title} in cart.`, type: 'success' }));
    } else {
      dispatch(addNotification({ message: `${product.title} added to cart.`, type: 'success' }));
    }
  };

  const handleUpdateQuantity = (productId, newQty) => {
    dispatch(updateQuantity({ productId, newQty }));
  };

  const handleRemoveCartItem = (productId) => {
    const removedItem = cartItems.find((item) => item.product.id === productId);
    if (removedItem) {
      dispatch(addNotification({ message: `${removedItem.product.title} removed from cart.`, type: 'success' }));
    }
    dispatch(removeCartItem(productId));
  };

  const handleCheckoutSuccess = () => {
    dispatch(clearCart());
  };

  const openCart = () => dispatch(setIsCartOpen(true));
  const closeCart = () => dispatch(setIsCartOpen(false));
  const toggleCart = (val) => dispatch(setIsCartOpen(typeof val === 'boolean' ? val : !isCartOpen));

  return {
    cartItems,
    isCartOpen,
    setIsCartOpen: toggleCart,
    openCart,
    closeCart,
    totalCartCount,
    handleAddToCart,
    handleUpdateQuantity,
    handleRemoveCartItem,
    handleCheckoutSuccess,
  };
}

export default useCart;
