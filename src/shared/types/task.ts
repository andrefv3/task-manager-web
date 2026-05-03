export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface Task {
  id: string;
  title: string;
  description: string | null;
  status: TaskStatus;
  priority: Priority;
  impact: number;
  effort: number;
  priorityScore: number;
  dueDate: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface CreateTaskDto extends Pick<Task, 'title' | 'description' | 'priority' | 'dueDate' | 'impact' | 'effort'> {
  status?: TaskStatus;
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {}