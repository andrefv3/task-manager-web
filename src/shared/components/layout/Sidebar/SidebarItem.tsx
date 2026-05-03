import type { LucideIcon } from 'lucide-react';

interface Props {
  label: string;
  icon: LucideIcon; 
  active?: boolean;
  path?: string;   
  onClick?: () => void; 
}

export const SidebarItem = ({ label, icon: Icon, active, onClick }: Props) => {
  return (
    <button 
      type="button"
      onClick={onClick}
      className={`
        w-full group cursor-pointer flex items-center gap-x-3 rounded-xl p-3 text-sm leading-6 font-semibold transition-all
        ${active 
          ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
          : 'text-gray-500 hover:text-indigo-600 hover:bg-gray-50'
        }
      `}
    >
      <Icon 
        className={`h-5 w-5 shrink-0 ${active ? 'text-indigo-600' : 'text-gray-400 group-hover:text-indigo-600'}`} 
        aria-hidden="true" 
      />
      {label}
    </button>
  );
};