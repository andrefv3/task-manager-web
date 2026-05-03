import api from "@/shared/lib/api/axios";
import { TASK_ENDPOINTS } from "./task.endpoints";
import type { Task } from "@/shared/types"; 

export const tasksService = {
  getTasks: async () => {
    const { data } = await api.get<Task[]>(TASK_ENDPOINTS.GET_ALL_TASKS);
    return data;
  },

  createTask: async (taskData: Omit<Task, 'id'>) => {
    const { data } = await api.post<Task>(TASK_ENDPOINTS.CREATE_TASK, taskData);
    return data;
  },

  updateTask: async (id: string | number, taskData: Partial<Task>) => {
    const { data } = await api.patch<Task>(TASK_ENDPOINTS.UPDATE_TASK(id), taskData);
    return data;
  },

  deleteTask: async (id: string | number) => {
    await api.delete(TASK_ENDPOINTS.DELETE_TASK(id));
  }
};