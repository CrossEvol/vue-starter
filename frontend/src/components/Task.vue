<script setup lang="ts">
import { useTodoStore } from '../stores/todoStore'

const todoStore = useTodoStore()
</script>

<template>
  <div class="min-h-screen bg-gray-900 flex flex-col items-center pt-16 px-4">
    <h1 class="text-2xl font-bold text-white mb-8">Sample Todo app using Vue</h1>

    <div class="w-full max-w-md">
      <div class="flex mb-4">
        <input v-model="todoStore.newTodo" @keyup.enter="todoStore.addTodo" type="text" placeholder="Type an item to add or search"
          class="flex-grow px-4 py-2 rounded-l-lg focus:outline-none" />
        <button @click="todoStore.addTodo" class="bg-yellow-500 text-white px-4 py-2 font-semibold">
          Add
        </button>
        <button class="bg-yellow-500 text-white px-4 py-2 font-semibold rounded-r-lg">
          Search
        </button>
      </div>

      <div class="bg-white rounded-lg shadow-md">
        <ul>
          <li v-for="(todo, index) in todoStore.todos" :key="index" class="flex items-center px-4 py-3 border-b last:border-b-0">
            <input type="checkbox" class="mr-3 form-checkbox h-5 w-5 text-blue-600" />
            <span class="flex-grow">{{ todo }}</span>
            <button @click="todoStore.removeTodo(index)" class="text-gray-400 hover:text-gray-600">
              &#x2715;
            </button>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<style scoped>
</style>
