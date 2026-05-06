import { forwardRef, type InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
}

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, icon, className, ...props }, ref) => {
    const inputId = props.id || label?.replace(/\s+/g, '-').toLowerCase();

    return (
      // We use flex-col without gap to control margins manually
      <div className={`flex flex-col w-full ${className || ''}`}>
        {label && (
          <label 
            htmlFor={inputId} 
            className="block text-[11px] font-bold text-gray-700 mb-1 ml-1 uppercase tracking-wider"
          >
            {label}
          </label>
        )}
        
        <div className="relative">
          {icon && (
            <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              {icon}
            </div>
          )}
          <input
            ref={ref}
            id={inputId}
            className={`
              block w-full h-auto rounded-xl border p-2 text-sm outline-none transition-all duration-200
              ${error 
                ? 'border-red-500 bg-red-50/30 focus:ring-1 focus:ring-red-500' 
                : 'border-gray-200 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10'}
              ${icon ? 'pl-10' : 'pl-4'}
            `}
            {...props}
          />
        </div>

        <div className="mt-1 mb-2 px-1 min-h-3.5">
          {error && (
            <p className="text-[11px] text-red-500 font-medium leading-none m-0">
              {error}
            </p>
          )}
        </div>
      </div>
    );
  }
);

Input.displayName = 'Input';