'use client';

import {
  Notification,
  NotificationUtilsButton,
} from '@/components/client.index';
import { useGetProfile } from '@/hooks';
import { useAuthStore } from '@/stores';
import { EmptyNotifications } from '../empty-state';

export const NotificationsList = () => {
  const user = useAuthStore((state) => state.user);
  const { fetchUser } = useGetProfile();

  if (!user) return null;

  return (
    <div className="space-y-8">
      {user.notifications.length > 0 ? (
        <>
          <NotificationUtilsButton refetchUser={fetchUser} user={user} />
          {user.notifications
            .sort(
              (a, b) =>
                new Date(b.created_at).getTime() -
                new Date(a.created_at).getTime()
            )
            .map((notification) => (
              <Notification
                refetchUser={fetchUser}
                key={notification.id}
                notification={notification}
              />
            ))}
        </>
      ) : (
        <EmptyNotifications />
      )}
    </div>
  );
};
