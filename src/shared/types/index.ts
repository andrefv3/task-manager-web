export interface User {
  id: string;
  name: string;
  email: string;
  createdAt: string;
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: Priority;
  dueDate?: string;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface CreateTaskDto {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: Priority;
  dueDate?: string;
}

export interface LoginCredentials {
  email: string;
  password?: string;
}

export interface RegisterCredentials extends LoginCredentials {
  name: string;
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {}