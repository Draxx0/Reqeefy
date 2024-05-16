import Image from 'next/image';

export const EmptyTickets = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-48 h-48 relative">
        <Image
          src="/assets/images/common/empty-tickets.png"
          objectFit="cover"
          objectPosition="center"
          fill
          alt="Empty tickets"
          loading="lazy"
        />
      </div>
      <h2 className="text-lg font-bold">Aucune discussions</h2>
    </div>
  );
};
