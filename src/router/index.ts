import AddSubcategory from '@/views/AddSubcategoryView.vue'
import { createRouter, createWebHistory } from 'vue-router'
import AddCategory from '../views/AddCategoryView.vue'
import Category from '../views/CategoryView.vue'


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
      path: '/add-subcategory',
      name: 'AddSubcategory',
      component: AddSubcategory,
    },
  ],
})

export default router
