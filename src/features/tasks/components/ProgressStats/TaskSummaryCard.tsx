import type { Task } from '@/shared/types';
import { CircularProgress } from './CircularProgress';

interface Props {
  tasks: Task[];
  isLoading: boolean;
}

export const TaskSummaryCard = ({ tasks, isLoading }: Props) => {
  // Skeleton Loader while React Query fetches data from Vercel
  if (isLoading) {
    return <div className="w-full h-44 bg-slate-200 animate-pulse rounded-[2.5rem]" />;
  }

  // Calculation of progress Staff-Level
  const total = tasks.length;
  const completed = tasks.filter(t => t.status === 'COMPLETED').length;
  const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="w-full bg-indigo-600 rounded-[2.5rem] p-8 text-white flex items-center justify-between shadow-xl shadow-indigo-100">
      <div className="flex flex-col gap-6">
        <h3 className="text-xl font-semibold leading-tight max-w-45">
          {percentage >= 80 ? "Your today's task almost done!" : "Keep up the great work!"}
        </h3>
        <button className="bg-white text-indigo-600 px-6 py-3 rounded-2xl font-bold text-sm hover:bg-indigo-50 active:scale-95 transition-all">
          View Task
        </button>
      </div>

      <CircularProgress percentage={percentage} />
    </div>
  );
};