import React, { useState, useRef } from 'react';

interface TooltipProps {
  children: React.ReactNode;
  text: string;
}

export const Tooltip = ({ children, text }: TooltipProps) => {
  const [isVisible, setIsVisible] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const showTooltip = () => {
    // Delay to 400ms before to show (Industry Standard)
    timeoutRef.current = setTimeout(() => {
      setIsVisible(true);
    }, 400);
  };

  const hideTooltip = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setIsVisible(false);
  };

  return (
    <div 
      className="relative flex flex-col items-center"
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip}
    >
      {children}
      
      {isVisible && (
        <div 
          role="tooltip"
          className="
            absolute bottom-full mb-3 flex flex-col items-center z-50
            animate-in fade-in zoom-in-95 slide-in-from-bottom-2 duration-200 ease-out
          "
        >
          <div className="
            px-3 py-1.5 text-[11px] font-medium text-white 
            bg-gray-900/95 backdrop-blur-md rounded-lg shadow-xl whitespace-nowrap
          ">
            {text}
          </div>
          <div className="w-2 h-2 -mt-1 rotate-45 bg-gray-900/95"></div>
        </div>
      )}
    </div>
  );
};