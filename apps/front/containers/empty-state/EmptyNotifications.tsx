import Image from 'next/image';

export const EmptyNotifications = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-56 h-56 relative">
        <Image
          src="/assets/images/common/empty-notifications.png"
          className="object-contain object-center"
          fill
          alt="Empty notifications"
          loading="lazy"
        />
      </div>
      <h2 className="text-lg font-bold text-center">
        Vous n&apos;avez aucunes notifications
      </h2>
    </div>
  );
};
