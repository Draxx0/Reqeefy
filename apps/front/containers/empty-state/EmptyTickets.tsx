import Image from 'next/image';

export const EmptyTickets = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-64 h-64 relative">
        <Image
          src="/assets/images/common/empty-tickets.png"
          className="object-contain object-center"
          fill
          alt="Empty tickets"
          loading="lazy"
        />
      </div>
      <h2 className="text-lg font-bold">Aucune discussions</h2>
    </div>
  );
};
