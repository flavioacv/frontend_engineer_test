import { createRouter, createWebHistory } from 'vue-router'
import AddCategory from '../views/AddCategory.vue'
import Category from '../views/Category.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Category',
      component: Category,
    },
    {
      path: '/add-category',
      name: 'AddCategory',
      component: AddCategory,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
  ],
})

export default router
