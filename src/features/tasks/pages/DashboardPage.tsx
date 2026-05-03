import { useTasks } from '../hooks/useTasksHook';
import { DashboardHeader } from '../components/DashboardHeader';
import { TaskSummaryCard } from '../components/ProgressStats/TaskSummaryCard';
import { TaskList } from '../components/TaskList';
import { MainLayout } from '@/shared/components/layout/MainLayout';

export const DashboardPage = () => {
  // We consume the hook. React Query handles the loading state for us.
  const { data: tasks = [], isLoading, isError } = useTasks();

  // State for Error (Defensive Design)
  if (isError) {
    return (
      <div className="p-6 text-center text-red-500 font-bold">
        Error loading your tasks. Please try again later.
      </div>
    );
  }

  return (
    <MainLayout >
      <DashboardHeader />
      <TaskSummaryCard tasks={tasks} isLoading={isLoading} />
      <section className="flex flex-col gap-4">
        <div className="flex items-center gap-2">
          <h2 className="text-xl font-bold text-slate-800">In Progress</h2>
          <span className="bg-indigo-100 text-indigo-600 px-2.5 py-0.5 rounded-full text-xs font-black">
            {tasks.filter(t => t.status === 'IN_PROGRESS').length}
          </span>
        </div>

        <TaskList tasks={tasks} isLoading={isLoading} />
      </section>
    </MainLayout>
  );
};