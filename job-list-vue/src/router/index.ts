import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import JobView from '@/views/JobView.vue'
import AddJobView from '@/views/AddJobView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/jobs',
      name: 'jobs',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/JobsView.vue'),
    },
    {
      path: '/add-job',
      name: 'add-job',
      component: AddJobView,
    },
    {
      path: '/job/:id',
      name: 'job',
      component: JobView,
    },
    {
      path: '/job/edit/:id',
      name: 'Edit',
      component: AddJobView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: NotFoundView,
    },
  ],
})

export default router
