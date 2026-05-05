import { useAuthStore } from '@/features/auth';
import { WelcomeMessage } from './WelcomeMessage';

export const DashboardHeader = () => {
  const user = useAuthStore((s) => s.user);

  return (
    <div className="flex items-center justify-between w-full animate-fade-in">
      <div className="flex items-center gap-4">
        <div className="w-14 h-14 rounded-full bg-slate-200 border-2 border-white shadow-sm flex items-center justify-center overflow-hidden">
            <span className="text-slate-600 font-bold">{user?.name[0]}{user?.lastName[0]}</span>
        </div>
        <div>
          <WelcomeMessage />
        </div>
      </div>
      
      <button className="relative p-2 bg-white rounded-full shadow-sm hover:bg-slate-50 transition-all">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
          className="w-5 h-5 text-slate-600"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a3 3 0 0 1-5.714 0m9.857-2.582V11a6 6 0 1 0-12 0v3.5l-1.5 1.5h15l-1.5-1.5Z" />
        </svg>
        <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 bg-indigo-600 rounded-full border-2 border-white" />
      </button>
    </div>
  );
};