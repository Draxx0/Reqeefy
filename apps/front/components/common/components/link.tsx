import { cn } from '@/lib';import { cva, type VariantProps } from 'class-variance-authority';
import Link from 'next/link';
import { PropsWithChildren } from 'react';

const linkVariants = cva(
  'text-black cursor-pointer transition-all ease-in-out duration-300',
  {
    variants: {
      variant: {
        default: 'hover:text-primary-700',
        underline:
          'relative before:absolute before:-bottom-0 before:transition-all before:ease-in-out before:duration-300 before:rounded-xl before:w-0 before:left-0 before:hover:w-full before:h-0.5 before:bg-primary-700',
        withIcon: 'hover:text-primary-700 flex items-center gap-2',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface LinkProps extends VariantProps<typeof linkVariants> {
  href: string;
  icon?: React.ReactNode;
  target?: string;
  className?: string;
}

export const CustomLink = ({
  href,
  children,
  icon,
  target = '_self',
  className,
  variant,
}: PropsWithChildren<LinkProps>) => {
  if (icon)
    return (
      <CustomLinkWithIcon
        href={href}
        target={target}
        icon={icon}
        variant={variant}
      >
        {children}
      </CustomLinkWithIcon>
    );

  return (
    <Link
      href={href}
      target={target}
      className={cn(linkVariants({ variant, className }))}
    >
      {children}
    </Link>
  );
};

const CustomLinkWithIcon = ({
  href,
  children,
  target,
  icon,
  variant,
  className,
}: PropsWithChildren<LinkProps>) => {
  return (
    <Link
      href={href}
      target={target}
      className={cn(linkVariants({ variant, className }))}
    >
      {icon}

      {children}
    </Link>
  );
};
