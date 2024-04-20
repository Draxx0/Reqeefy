'use client';

import * as React from 'react';
import ClipLoader from 'react-spinners/ClipLoader';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap active:translate-y-1 rounded-lg font-bold border-2 ring-offset-background transition-all ease-in-out duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-primary-700 text-white border-primary-500 hover:shadow-md ',
        destructive:
          'bg-primary-900 text-white border-primary-700 hover:shadow-md',
        disabled:
          'bg-primary-500 text-white border-primary-700/30 cursor-not-allowed',
        outline:
          'bg-white text-black border-gray-700 hover:bg-gray-500 hover:shadow-md',
      },
      size: {
        default: 'h-10 px-4 py-3',
        sm: 'h-9 rounded-md px-3',
        lg: 'h-11 rounded-md px-8',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  children?: React.ReactNode;
  isLoading?: boolean;
  onClick: () => void;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, isLoading, ...props }, ref) => {
    return (
      <button
        className={cn([
          buttonVariants({
            variant,
            size,
            className,
          }),
          isLoading &&
            'hover:translate-y-0 animate-fade-in select-none pointer-events-none',
        ])}
        onClick={props.onClick}
        ref={ref}
      >
        {!isLoading ? (
          props.children
        ) : (
          <div className="flex gap-2">
            <ClipLoader
              color={'white'}
              cssOverride={{
                display: 'block',
                margin: 'auto',
                height: '24px',
                width: '24px',
              }}
              loading={true}
            />
            <span>Chargement</span>
          </div>
        )}
      </button>
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
