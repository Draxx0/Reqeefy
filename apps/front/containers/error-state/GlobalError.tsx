import Image from 'next/image';

export const GlobalError = () => {
  return (
    <div className="flex flex-col items-center h-full justify-center">
      <div className="w-72 h-72 relative">
        <Image
          src="/assets/images/common/error-global.png"
          className="object-contain object-center"
          fill
          alt="Global error"
          loading="lazy"
        />
      </div>
      <div className="text-center">
        <h2 className="text-lg font-bold text-center">
          Désolé, une erreur s&apos;est glissée.
        </h2>
        <p className="text-gray-900 mt-2">
          Veuillez réessayer dans un instant, merci pour votre compréhension.
        </p>
      </div>
    </div>
  );
};
