import { defineStore } from 'pinia'

export const useTodoStore = defineStore('todo', {
    state: () => ({
        todos: [
            'Pasta',
            'move it',
            'win it',
            'John Wick',
            'pay your power bill',
        ],
        newTodo: '',
    }),
    actions: {
        addTodo() {
            if (this.newTodo.trim()) {
                this.todos.push(this.newTodo.trim())
                this.newTodo = ''
            }
        },
        removeTodo(index: number) {
            this.todos.splice(index, 1)
        },
    },
})
