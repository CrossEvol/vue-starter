import { defineStore } from 'pinia'
import { tasksApi } from '../api/tasks.api'
import { Task } from '../models'

export const useTaskStore = defineStore('task', {
    state: () => ({
        tasks: [] as Task[],
        newTask: '',
        isLoading: false,
        error: null as string | null,
    }),
    actions: {
        async fetchTasks() {
            this.isLoading = true
            this.error = null
            try {
                const result = await tasksApi.getAllTasks()
                this.tasks = result
            } catch (error) {
                this.error = 'Failed to fetch todos'
                console.error(error)
            } finally {
                this.isLoading = false
            }
        },

        async addTask() {
            if (this.newTask.trim()) {
                this.isLoading = true
                this.error = null
                try {
                    const newTask = await tasksApi.createTask({
                        text: this.newTask.trim(),
                    })
                    this.tasks.push(newTask)
                    this.newTask = ''
                } catch (error) {
                    this.error = 'Failed to add todo'
                    console.error(error)
                } finally {
                    this.isLoading = false
                }
            }
        },

        async removeTask(id: number) {
            this.isLoading = true
            this.error = null
            try {
                await tasksApi.deleteTask(id)
                this.tasks = this.tasks.filter((todo) => todo.id !== id)
            } catch (error) {
                this.error = 'Failed to remove todo'
                console.error(error)
            } finally {
                this.isLoading = false
            }
        },

        async updateTask(updatedTask: Task) {
            const { id } = updatedTask
            this.isLoading = true
            this.error = null
            try {
                const result = await tasksApi.updateTask(id, updatedTask)
                const index = this.tasks.findIndex((task) => task.id === id)
                if (index !== -1) {
                    this.tasks[index] = result
                }
            } catch (error) {
                this.error = 'Failed to update todo'
                console.error(error)
            } finally {
                this.isLoading = false
            }
        },

        filterTasks(query: string) {
            if (query.trim() === '') {
                return
            } else {
                this.tasks = this.tasks.filter((task) =>
                    task.text.toLowerCase().includes(query.toLowerCase()),
                )
            }
        },
    },
})
