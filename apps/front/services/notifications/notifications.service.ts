import { api } from '../common/api';

const deleteOne = (id: string) => {
  try {
    return api.delete(`/notifications/${id}`);
  } catch (error) {
    throw new Error('An error occurred while deleting the notification');
  }
};

const deleteAll = (id: string) => {
  try {
    return api.delete(`/notifications/users/${id}`);
  } catch (error) {
    throw new Error('An error occurred while deleting all notifications');
  }
};

const markOneAsRead = (id: string) => {
  try {
    return api.put(`/notifications/${id}`);
  } catch (error) {
    throw new Error('An error occurred while marking the notification as read');
  }
};

const markAllAsRead = (id: string) => {
  try {
    return api.put(`/notifications/users/${id}`);
  } catch (error) {
    throw new Error(
      'An error occurred while marking all notifications as read'
    );
  }
};

export const notificationsServices = {
  deleteOne,
  deleteAll,
  markOneAsRead,
  markAllAsRead,
};
