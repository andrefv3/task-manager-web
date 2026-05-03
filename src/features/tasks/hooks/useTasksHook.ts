import { useQuery } from '@tanstack/react-query';
import type { Task } from '@/shared/types';
import { tasksService } from '../api/tasks.service';

export const useTasks = () => {
  return useQuery<Task[]>({
    queryKey: ['tasks'],
    queryFn: tasksService.getTasks,
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    refetchOnWindowFocus: true, // Sync on tab focus
  });
};