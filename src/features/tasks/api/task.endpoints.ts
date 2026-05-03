export const TASK_ENDPOINTS = {
  GET_ALL_TASKS: '/tasks',
  CREATE_TASK: '/tasks',
  // We use a function to generate the route with the actual ID
  UPDATE_TASK: (id: string | number) => `/tasks/${id}`,
  DELETE_TASK: (id: string | number) => `/tasks/${id}`,
} as const;