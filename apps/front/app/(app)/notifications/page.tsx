import { PageHeader } from '@/components/server.index';
import { NotificationsList } from '@/containers';

export default async function NotificationsPage() {
  return (
    <section className="space-y-12">
      <PageHeader
        title="Notifications"
        description="
        Consulter toutes les notifications relatives à votre compte.
      "
        hasSeparator
      />

      <NotificationsList />
    </section>
  );
}
