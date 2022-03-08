import { createRouter, createWebHashHistory } from 'vue-router'
import Login from '../views/Login.vue'

const routes = [
  {
    path: '/',
    name: 'Login',
    component: Login
  },

  {
    path: '/UserSelect',
    name: 'UserSelect',
    component: () => import("../views/UserSelect.vue"),
    props: true
  },

  {
    path: '/Home',
    name: 'UserHome',
    component: () => import("../views/Home.vue"),
    props: true
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
