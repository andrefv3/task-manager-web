export type TaskStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED';
export type Priority = 'LOW' | 'MEDIUM' | 'HIGH';

export interface User {
  id: string;
  name: string;
  lastName: string;
  email: string;
  createdAt: string; 
  updatedAt: string;
}

export interface Task {
  id: string;
  title: string;
  description: string | null; 
  status: TaskStatus;
  priority: Priority;
  dueDate: string | null;   
  userId: string;
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface CreateTaskDto extends Pick<Task, 'title' | 'description' | 'priority' | 'dueDate'> {
  status?: TaskStatus; 
}

export interface UpdateTaskDto extends Partial<CreateTaskDto> {}

export interface LoginCredentials {
  email: string;
  password?: string; 
}

export interface RegisterCredentials extends Required<Pick<LoginCredentials, 'email' | 'password'>> {
  name: string;
  lastName: string;
}