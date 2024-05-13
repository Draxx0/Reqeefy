'use client';
import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib';
import { Plus } from 'lucide-react';

const attachmentButtonVariants = cva(
  'inline-flex items-center justify-center p-2  border-2 active:translate-y-1 hover:shadow-md transition-all ease-in-out duration-300 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default:
          'bg-white text-black rounded-xl border-gray-700 hover:bg-primary-500 hover:border-primary-700 hover:text-white',
        circle:
          'bg-white text-black rounded-full border-gray-700 hover:bg-primary-500 hover:border-primary-700 hover:text-white',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface AttachmentButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof attachmentButtonVariants> {
  onClick: () => void;
}

const AttachmentButton = React.forwardRef<
  HTMLButtonElement,
  AttachmentButtonProps
>(({ className, variant, onClick }, ref) => {
  return (
    <button
      className={cn(
        attachmentButtonVariants({
          variant,
          className,
        })
      )}
      onClick={onClick}
      type="button"
      ref={ref}
    >
      <Plus />
    </button>
  );
});

AttachmentButton.displayName = 'AttachmentButton';

// Attachment Area

export interface AttachmentAreaProps {
  onClick: () => void;
}

const AttachmentArea = ({ onClick }: AttachmentAreaProps) => {
  return (
    <button
      className="px-12 py-6 transition-all ease-in-out duration-300 border-2 border-dashed border-gray-700 rounded-lg group hover:border-primary-700"
      onClick={onClick}
    >
      <div className="bg-white text-black rounded-full group-active:translate-y-1 border-gray-700 transition-all ease-in-out duration-300 group-hover:bg-primary-500 group-hover:border-primary-700 group-hover:text-white inline-flex items-center justify-center p-1 border-2 hover:shadow-md disabled:pointer-events-none disabled:opacity-50">
        <Plus />
      </div>
    </button>
  );
};

export { AttachmentButton, AttachmentArea };
