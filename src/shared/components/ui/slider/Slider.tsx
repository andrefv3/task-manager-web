import React from 'react';

interface SliderProps {
  label: string;
  value: number;
  min?: number;
  max?: number;
  step?: number;
  onChange: (value: number) => void;
}

export const Slider = ({ 
  label, 
  value, 
  min = 1, 
  max = 10, 
  step = 1, 
  onChange 
}: SliderProps) => {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="w-full space-y-4">
      <div className="flex justify-between items-center">
        <label className="text-sm font-bold text-slate-500 uppercase tracking-widest">
          {label}
        </label>
        <span className="text-lg font-black text-indigo-600 bg-indigo-50 px-3 py-1 rounded-lg border border-indigo-100">
          {value}
        </span>
      </div>
      
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={handleChange}
        className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-indigo-600 transition-all hover:accent-indigo-500"
      />
      
      <div className="flex justify-between text-[10px] font-black text-slate-400 uppercase tracking-tighter">
        <span>Low</span>
        <span>Medium</span>
        <span>High</span>
      </div>
    </div>
  );
};