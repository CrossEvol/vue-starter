<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { Task } from '../models';
import { useTaskStore } from '../stores/taskStore';

const taskStore = useTaskStore()
const searchQuery = ref('')

onMounted(() => {
  taskStore.fetchTasks()
})

const toggleTaskStatus = (task: Task) => {
  taskStore.updateTask({ ...task, done: !task.done })
}

const searchTasks = () => {
  taskStore.filterTasks(searchQuery.value)
}
</script>

<template>
  <div class="min-h-screen bg-gray-900 flex flex-col items-center pt-16 px-4">
    <h1 class="text-2xl font-bold text-white mb-8">Sample Todo app using Vue</h1>

    <div class="w-full max-w-md">
      <div class="flex mb-4">
        <input v-model="taskStore.newTask" @keyup.enter="taskStore.addTask" type="text"
          placeholder="Type an item to add" class="flex-grow px-4 py-2 rounded-l-lg focus:outline-none" />
        <button @click="taskStore.addTask" class="bg-yellow-500 text-white px-4 py-2 font-semibold">
          Add
        </button>
      </div>

      <div class="flex mb-4">
        <input v-model="searchQuery" @keyup.enter="searchTasks" type="text" placeholder="Search tasks"
          class="flex-grow px-4 py-2 rounded-l-lg focus:outline-none" />
        <button @click="searchTasks" class="bg-yellow-500 text-white px-4 py-2 font-semibold rounded-r-lg">
          Search
        </button>
      </div>

      <div v-if="taskStore.isLoading" class="text-white text-center">Loading...</div>
      <div v-else-if="taskStore.error" class="text-red-500 text-center">{{ taskStore.error }}</div>
      <div v-else class="bg-white rounded-lg shadow-md">
        <ul>
          <li v-for="todo in taskStore.tasks" :key="todo.id"
            class="flex items-center px-4 py-3 border-b last:border-b-0">
            <input type="checkbox" :checked="todo.done" @change="toggleTaskStatus(todo)"
              class="mr-3 form-checkbox h-5 w-5 text-blue-600" />
            <span class="flex-grow" :class="{ 'line-through': todo.done }">{{ todo.text }}</span>
            <button @click="taskStore.removeTask(todo.id)" class="text-gray-400 hover:text-gray-600">
              &#x2715;
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
