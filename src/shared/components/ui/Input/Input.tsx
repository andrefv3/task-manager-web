import { useState, type InputHTMLAttributes, type TextareaHTMLAttributes, type ElementType } from 'react';
import { Eye, EyeOff, Search, Calendar, AlignLeft } from 'lucide-react';

// 1. We separate the shared props from the specific ones of input and textarea
interface SharedProps {
  label?: string;
  error?: string;
  iconType?: 'password' | 'search' | 'calendar' | 'description' | 'none';
  isTextArea?: boolean;
}

// We use a discriminated union to switch between input and textarea props based on isTextArea
type InputProps = SharedProps & InputHTMLAttributes<HTMLInputElement> & { isTextArea?: false };
type TextareaProps = SharedProps & TextareaHTMLAttributes<HTMLTextAreaElement> & { isTextArea: true };

type CombinedProps = InputProps | TextareaProps;

export const Input = ({ 
  label, 
  error, 
  iconType = 'none', 
  isTextArea = false, 
  className, 
  ...props 
}: CombinedProps) => {
  const [showPassword, setShowPassword] = useState(false);
  
  const inputId = props.id || label?.replace(/\s+/g, '-').toLowerCase();
  const isPassword = iconType === 'password';
  
  // Determining the tag type
  const Tag = (isTextArea ? 'textarea' : 'input') as ElementType;
  
  // Only apply finalType if it's NOT a textarea
  const finalType = !isTextArea && isPassword 
    ? (showPassword ? 'text' : 'password') 
    : (props as InputHTMLAttributes<HTMLInputElement>).type;

  const isClickable = iconType === 'calendar' || (!isTextArea && (props as InputHTMLAttributes<HTMLInputElement>).type === 'date');

  // Base styles shared
  const baseStyles = `
    block w-full rounded-2xl border text-sm outline-none transition-all duration-200
    placeholder:text-gray-400 text-gray-800 bg-white/80 border-gray-200 
    focus:border-blue-500 focus:bg-white focus:ring-4 focus:ring-blue-500/10
    ${error ? 'border-red-500 bg-red-50/30 focus:ring-4 focus:ring-red-500/10' : ''}
    ${iconType !== 'none' && iconType !== 'password' ? 'pl-11' : 'pl-5'}
    ${isPassword ? 'pr-12' : 'pr-5'}
    ${isTextArea ? 'py-3 min-h-[120px] resize-none' : 'h-12'}
    ${isClickable ? 'cursor-pointer' : 'cursor-text'}
  `;

  return (
    <div className={`flex flex-col w-full ${className || ''}`}>
      {label && (
        <label 
          htmlFor={inputId} 
          className="block text-[10px] font-bold text-gray-500 mb-1.5 ml-1 uppercase tracking-[0.12em]"
        >
          {label}
        </label>
      )}
      
      <div className="relative group">
        <div className="absolute left-4 top-3.5 text-gray-500 group-focus-within:text-blue-600 transition-colors pointer-events-none">
          {iconType === 'search' && <Search size={16} />}
          {iconType === 'calendar' && <Calendar size={16} />}
          {iconType === 'description' && <AlignLeft size={16} />}
        </div>

        <Tag
          {...props}
          id={inputId}
          type={isTextArea ? undefined : finalType}
          className={baseStyles}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-gray-500 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all active:scale-90 cursor-pointer"
            tabIndex={-1}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        )}

        {iconType === 'search' && !isTextArea && (
          <button 
            type="button"
            className="absolute right-4 top-1/2 -translate-y-1/2 p-1.5 text-gray-400 hover:text-blue-600 cursor-pointer"
          >
            <Search size={18} />
          </button>
        )}
      </div>

      <div className="mt-1 px-1 min-h-3.5 overflow-hidden">
        {error ? (
          <p className="text-[11px] text-red-500 font-medium leading-none animate-in fade-in slide-in-from-top-1 duration-200">
            {error}
          </p>
        ) : (
          <div className="h-0" />
        )}
      </div>
    </div>
  );
};