import { useAppDispatch, useAppSelector } from '../redux/hooks';
import {
  addNotification as addNotifAction,
  removeNotification as removeNotifAction,
  selectNotifications,
} from '../redux/slices/uiSlice';

export function useNotification() {
  const dispatch = useAppDispatch();
  const notifications = useAppSelector(selectNotifications);

  const addNotification = (message, type = 'success') => {
    dispatch(addNotifAction({ message, type }));
  };

  const removeNotification = (id) => {
    dispatch(removeNotifAction(id));
  };

  return {
    notifications,
    addNotification,
    removeNotification,
  };
}

export default useNotification;
