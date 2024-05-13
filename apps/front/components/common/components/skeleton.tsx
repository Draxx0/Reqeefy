import { cn } from '@/lib';

function Skeleton({
  className,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn('animate-pulse rounded-md bg-gray-500', className)}
      {...props}
    />
  );
}

export { Skeleton };
