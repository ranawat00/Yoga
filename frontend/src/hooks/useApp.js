import { useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { useAuth } from './useAuth';
import { useNotification } from './useNotification';
import {
  setView as setViewAction,
  setIsCheckoutOpen as setIsCheckoutOpenAction,
  setViewingWorkshop as setViewingWorkshopAction,
  setViewingBlog as setViewingBlogAction,
  selectView,
  selectIsCheckoutOpen,
  selectViewingWorkshop,
  selectViewingBlog,
} from '../redux/slices/uiSlice';

export function useApp() {
  const dispatch = useAppDispatch();
  const view = useAppSelector(selectView);
  const isCheckoutOpen = useAppSelector(selectIsCheckoutOpen);
  const viewingWorkshop = useAppSelector(selectViewingWorkshop);
  const viewingBlog = useAppSelector(selectViewingBlog);

  const auth = useAuth();
  const notification = useNotification();

  const setView = useCallback((v) => dispatch(setViewAction(v)), [dispatch]);
  const setIsCheckoutOpen = useCallback((val) => dispatch(setIsCheckoutOpenAction(val)), [dispatch]);
  const setViewingWorkshop = useCallback((w) => dispatch(setViewingWorkshopAction(w)), [dispatch]);
  const setViewingBlog = useCallback((b) => dispatch(setViewingBlogAction(b)), [dispatch]);

  return {
    ...auth,
    ...notification,
    view,
    setView,
    isCheckoutOpen,
    setIsCheckoutOpen,
    viewingWorkshop,
    setViewingWorkshop,
    viewingBlog,
    setViewingBlog,
  };
}

export default useApp;
