import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import MelView from '../views/MelView.vue'
import StatisticView from '../views/StatisticView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/mel',
      name: 'Mel-Spectogram',
      component: MelView
    },
    {
      path: '/statistics',
      name: 'statistics',
      component: StatisticView
    },
  ]
})

export default router
