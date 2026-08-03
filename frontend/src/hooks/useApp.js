import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useCart } from './useCart';
import { useAuth } from './useAuth';
import { useNotification } from './useNotification';
import {
  setView as setViewAction,
  setIsCheckoutOpen as setIsCheckoutOpenAction,
  setViewingWorkshop as setViewingWorkshopAction,
  selectView,
  selectIsCheckoutOpen,
  selectViewingWorkshop,
} from '../redux/slices/uiSlice';

export function useApp() {
  const dispatch = useAppDispatch();
  const view = useAppSelector(selectView);
  const isCheckoutOpen = useAppSelector(selectIsCheckoutOpen);
  const viewingWorkshop = useAppSelector(selectViewingWorkshop);

  const cart = useCart();
  const auth = useAuth();
  const notification = useNotification();

  const setView = (v) => dispatch(setViewAction(v));
  const setIsCheckoutOpen = (val) => dispatch(setIsCheckoutOpenAction(val));
  const setViewingWorkshop = (w) => dispatch(setViewingWorkshopAction(w));

  return {
    ...cart,
    ...auth,
    ...notification,
    view,
    setView,
    isCheckoutOpen,
    setIsCheckoutOpen,
    viewingWorkshop,
    setViewingWorkshop,
  };
}

export default useApp;
