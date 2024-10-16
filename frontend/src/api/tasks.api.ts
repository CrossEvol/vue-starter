import { httpClient } from '../utils/fetch.client'
import { Task } from '../models'

const BASE_URL = 'http://localhost:3000'

export const tasksApi = {
    getAllTasks: async () => {
        return httpClient.get<Task[]>(`${BASE_URL}/tasks`)
    },

    getTaskById: async (id: number) => {
        return httpClient.get<Task>(`${BASE_URL}/tasks/${id}`)
    },

    createTask: async (task: Pick<Task, 'text'>) => {
        return httpClient.post<Task>(`${BASE_URL}/tasks`, {
            body: JSON.stringify(task),
        })
    },

    updateTask: async (id: number, task: Pick<Task, 'text' | 'done'>) => {
        return httpClient.put<Task>(`${BASE_URL}/tasks/${id}`, {
            body: JSON.stringify(task),
        })
    },

    deleteTask: async (id: number) => {
        return httpClient.delete<Task>(`${BASE_URL}/tasks/${id}`)
    },
}
