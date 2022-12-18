import Vue from 'vue'
import VueRouter from 'vue-router'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/certificado',
    name: 'certificado',
    component: () => import('../views/Certificados.vue')
  },
  {
    path: '/funcionario',
    name: 'funcionario',
    component: () => import('../views/FuncionarioView.vue')
  },
  {
    path: '/eventos',
    name: 'eventos',
    component: () => import('../views/Eventos.vue')
  },
  {
    path: '/participantes',
    name: 'participantes',
    component: () => import('../views/Participantes.vue')
  },
  {
    path: '/filtros',
    name: 'filtros',
    component: () => import('../views/Filtros.vue')
  },
  {
    path: '/estadisticas',
    name: 'estadisticas',
    component: () => import('../views/Estadisticas.vue')
  },
  {
    path: '/carnet',
    name: 'carnet',
    component: () => import('../views/Carnet.vue')
  },
  {
    path: '/olvido',
    name: 'olvido',
    component: () => import('../views/Olvido.vue')
  }
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
