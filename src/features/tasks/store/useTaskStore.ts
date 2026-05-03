import { create } from 'zustand';
import type { Task, CreateTaskDto } from '@/shared/types';

interface TaskState {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  
  // Actions
  addTask: (taskDto: CreateTaskDto) => void;
  removeTask: (id: string) => void;
  toggleTaskStatus: (id: string) => void;
  
}

export const useTaskStore = create<TaskState>((set) => ({
  tasks: [],
  isLoading: false,
  error: null,

  addTask: (taskDto) => set((state) => {
    // Logic Staff: Calculate the score before adding the task to the list
    const impact = taskDto.impact || 1;
    const effort = taskDto.effort || 1;
    const priorityScore = Number((impact / effort).toFixed(2));

    const newTask: Task = {
      ...taskDto,
      id: crypto.randomUUID(), // Generate a unique ID for the task
      priorityScore,
      status: taskDto.status || 'PENDING',
      description: taskDto.description || null,
      userId: 'current-user-id', // This will come from AuthStore later
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    // Order by priority score (highest first)
    const updatedTasks = [...state.tasks, newTask].sort((a, b) => b.priorityScore - a.priorityScore);
    
    return { tasks: updatedTasks };
  }),

  removeTask: (id) => set((state) => ({
    tasks: state.tasks.filter((t) => t.id !== id)
  })),

  toggleTaskStatus: (id) => set((state) => ({
    tasks: state.tasks.map((t) => 
      t.id === id 
        ? { ...t, status: t.status === 'COMPLETED' ? 'PENDING' : 'COMPLETED' } 
        : t
    )
  }))
}));