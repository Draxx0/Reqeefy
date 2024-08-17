import Image from 'next/image';

export const EmptyProjects = () => {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="w-72 h-72 relative">
        <Image
          src="/assets/images/common/empty-projects.png"
          className="object-contain object-center"
          fill
          alt="Empty projects"
          loading="lazy"
        />
      </div>
      <h2 className="text-lg font-bold text-center">Aucun projet</h2>
    </div>
  );
};
