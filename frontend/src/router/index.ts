import { createRouter, createWebHistory } from 'vue-router'
import Task from '../components/Task.vue'
import SignIn from '../views/SignInView.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Task,
    },
    {
        path: '/sign-in',
        name: 'SignIn',
        // Lazy loading example
        component: SignIn,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
