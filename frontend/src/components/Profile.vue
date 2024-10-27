<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';
import { UserProfile } from '../models';
import { usersApi } from '../api/users.api';

const router = useRouter();
const profile = ref<UserProfile | null>(null);
const error = ref('');

onMounted(async () => {
    try {
        const data = await usersApi.getProfile();
        profile.value = data;
    } catch (err) {
        error.value = 'Failed to load profile';
    }
});

const handleLogout = async () => {
    try {
        await usersApi.logout();
        alert('Logout successful');
        router.push('/sign-in');
    } catch (err) {
        error.value = 'Failed to logout';
    }
};
</script>

<template>
    <div class="bg-white rounded-lg shadow-md p-6 w-full max-w-sm">
        <div v-if="error" class="text-red-500 mb-4">{{ error }}</div>
        <div v-else-if="profile" class="space-y-4">
            <div class="flex items-center space-x-4">
                <div>
                    <h2 class="text-xl font-semibold">{{ profile.name }}</h2>
                    <p class="text-gray-600">{{ profile.email }}</p>
                </div>
            </div>

            <button @click="handleLogout"
                class="w-full bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors">
                Logout
            </button>
        </div>
        <div v-else class="text-center text-gray-600">Loading profile...</div>
    </div>
</template>
