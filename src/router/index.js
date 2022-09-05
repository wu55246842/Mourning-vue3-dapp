import { createRouter, createWebHashHistory } from "vue-router"
import Container from '../views/layout/Container'

const routes = [{
    path: "/",
    name: "Home",
    redirect: '/home',
    component: Container,
    children: [
        {
            path: '/docs',
            name: 'docs',
            component: () => import('../views/Docs.vue'),
            meta: { title: 'docs', keepAlive: false }
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('../views/Index.vue'),
            meta: { title: 'home', keepAlive: false }
        },
        {
            path: '/publish',
            name: 'publish',
            component: () => import('../views/Publish.vue'),
            meta: { title: 'publish', keepAlive: false }
        },
        {
            path: '/categories',
            name: 'Blog Categories',
            component: () => import('../views/Categories.vue'),
            meta: { title: 'Blog Categories', keepAlive: false }
        },
        {
            path: '/read/:tokenId',
            name: 'Detail',
            component: () => import('../views/Read.vue'),
            meta: { title: 'Blog Detail', keepAlive: false }
        },
        {
            path: '/your_blogs',
            name: 'Your Blogs',
            component: () => import('../views/YourBlogs.vue'),
            meta: { title: 'Your Blogs', keepAlive: false }
        },
        {
            path: '/about',
            name: 'About',
            component: () => import('../views/About.vue'),
            meta: { title: 'About', keepAlive: false }
        }
    ]
}]

const router = createRouter({
    history: createWebHashHistory(),
    routes: routes
})
export default router
