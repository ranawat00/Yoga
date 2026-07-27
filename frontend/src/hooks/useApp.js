import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useCart } from './useCart';
import { useAuth } from './useAuth';
import { useNotification } from './useNotification';
import {
  setView as setViewAction,
  setIsCheckoutOpen as setIsCheckoutOpenAction,
  selectView,
  selectIsCheckoutOpen,
} from '../redux/slices/uiSlice';

export function useApp() {
  const dispatch = useAppDispatch();
  const view = useAppSelector(selectView);
  const isCheckoutOpen = useAppSelector(selectIsCheckoutOpen);

  const cart = useCart();
  const auth = useAuth();
  const notification = useNotification();

  const setView = (v) => dispatch(setViewAction(v));
  const setIsCheckoutOpen = (val) => dispatch(setIsCheckoutOpenAction(val));

  return {
    ...cart,
    ...auth,
    ...notification,
    view,
    setView,
    isCheckoutOpen,
    setIsCheckoutOpen,
  };
}

export default useApp;
