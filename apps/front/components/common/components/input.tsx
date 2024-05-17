import * as React from 'react';

import { cn } from '@/lib';
import { Search } from 'lucide-react';

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  searchInput?: boolean;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, searchInput = false, ...props }, ref) => {
    return !searchInput ? (
      <div>
        <input
          type={type}
          className={cn(
            'bg-white py-1 px-2 placeholder:text-gray-700 text-sm placeholder:focus:opacity-0 placeholder:focus:scale-95 transition-all ease-in-out duration-300 placeholder:transition placeholder:ease-in-out placeholder:duration-300 border-2 border-gray-700 rounded-md outline-none font-normal focus:ring-2 focus:ring-offset-2 focus:ring-primary-700 disabled:pointer-events-none disabled:opacity-30 disabled:select-none',
            className
          )}
          ref={ref}
          {...props}
        />
      </div>
    ) : (
      <div className="bg-white w-fit transition-all ease-in-out duration-300 flex items-center justify-center py-1 px-2  border-2 border-gray-700 rounded-md outline-none font-bold focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-primary-700 focus-disabled:pointer-events-none focus-disabled:opacity-30 focus-disabled:select-none">
        <input
          type={type}
          className={cn(
            'outline-none placeholder:text-gray-700 text-sm placeholder:focus:opacity-0 placeholder:focus:scale-95 transition-all ease-in-out duration-300 placeholder:transition placeholder:ease-in-out placeholder:duration-300',
            className
          )}
          ref={ref}
          {...props}
        />
        <Search className="w-4 h-4 text-primary-700" />
      </div>
    );
  }
);
Input.displayName = 'Input';

export { Input };
