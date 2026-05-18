import { createRouter, createWebHistory } from 'vue-router'
import DashboardView from '@/views/DashboardView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', name: 'dashboard', component: DashboardView },
    { path: '/login', name: 'login', component: () => import('@/views/LoginView.vue') },
    { path: '/catalog', name: 'catalog', component: () => import('@/views/CatalogView.vue') },
    { path: '/orders', name: 'orders', component: () => import('@/views/OrdersView.vue') },
    {
      path: '/orders/:id',
      name: 'order-details',
      component: () => import('@/views/OrderDetailsView.vue'),
    },
    { path: '/cart', name: 'cart', component: () => import('@/views/CartView.vue') },
    { path: '/payment', name: 'payment', component: () => import('@/views/PaymentView.vue') },
  ],
})

export default router
