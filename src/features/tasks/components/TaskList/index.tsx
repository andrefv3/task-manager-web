import { TaskItem } from './TaskItem';
import type { Task } from '@/shared/types';

interface Props {
  tasks: Task[];
  isLoading: boolean;
}

export const TaskList = ({ tasks, isLoading }: Props) => {
  // Filtrar solo las tareas en progreso para esta sección
  const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS');

  if (isLoading) {
    return (
      <div className="flex flex-col gap-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="h-20 bg-slate-100 animate-pulse rounded-2xl" />
        ))}
      </div>
    );
  }

  if (inProgressTasks.length === 0) {
    return (
      <div className="py-10 text-center bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
        <p className="text-gray-400 text-sm italic">No tasks in progress at the moment.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {inProgressTasks.map((task) => (
        <TaskItem key={task.id} task={task} />
      ))}
    </div>
  );
};