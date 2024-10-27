import { createRouter, createWebHistory } from 'vue-router'
import SignInView from '../views/SignInView.vue'
import TaskView from '../views/TaskView.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: TaskView,
    },
    {
        path: '/sign-in',
        name: 'SignIn',
        // Lazy loading example
        component: SignInView,
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

export default router
