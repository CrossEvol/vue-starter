<script setup lang="ts">
import Profile from '../components/Profile.vue';
import Task from '../components/Task.vue';
</script>

<template>
  <div class="min-h-screen bg-gray-900 flex">
    <!-- Center the Task component with flex and justify-center -->
    <div class="flex-grow flex justify-center">
      <Task />
    </div>
    <!-- Keep Profile on the right -->
    <div class="w-96 p-8 flex-shrink-0">
      <Profile />
    </div>
  </div>
</template>

<style scoped></style>
