import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
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

  const auth = useAuth();
  const notification = useNotification();

  const setView = useCallback((v) => dispatch(setViewAction(v)), [dispatch]);
  const setIsCheckoutOpen = useCallback((val) => dispatch(setIsCheckoutOpenAction(val)), [dispatch]);
  const setViewingWorkshop = useCallback((w) => dispatch(setViewingWorkshopAction(w)), [dispatch]);

  return {
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
