import * as React from 'react';

import { cn } from '@/lib';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <div>
        <input
          type={type}
          className={cn(
            'bg-white p-2 placeholder:text-gray-700 placeholder:focus:opacity-0 placeholder:focus:scale-95 transition-all ease-in-out duration-300 placeholder:transition placeholder:ease-in-out placeholder:duration-300 border-2 border-gray-700 rounded-md outline-none font-bold focus:ring-2 focus:ring-offset-2 focus:ring-primary-700 disabled:pointer-events-none disabled:opacity-30 disabled:select-none',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
