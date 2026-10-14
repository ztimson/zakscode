import BusinessCard from '@/views/BusinessCard.vue';
import Layout from '@/views/Layout.vue';
import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/views/Home.vue'

const router = createRouter({
  history: createWebHistory((<any>import.meta).env.BASE_URL),
  routes: [
	  {path: '/', component: Layout, children: [{path: '', component: Home}]},
	  {path: '/card', name: 'home', component: BusinessCard}
  ]
})

export default router
