import Image from 'next/image';

export const EmptyTickets = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-72 h-72 relative">
        <Image
          src="/assets/images/common/empty.png"
          objectFit="cover"
          objectPosition="center"
          fill
          alt="Empty"
        />
      </div>
      <h2 className="text-lg font-bold">Aucune dicussions</h2>
    </div>
  );
};
