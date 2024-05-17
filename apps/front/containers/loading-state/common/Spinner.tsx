export const Spinner = () => {
  return (
    <div className="inline-block h-8 w-8 animate-spin rounded-full border-2 border-solid border-primary-700 border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite]">
      <span className="sr-only">Chargement ...</span>
    </div>
  );
};
