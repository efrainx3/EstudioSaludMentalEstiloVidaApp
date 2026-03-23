import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Grafica1View from '../views/Grafica1View.vue'
import Grafica2View from '../views/Grafica2View.vue'
import Grafica3View from '../views/Grafica3View.vue'
import Grafica4View from '../views/Grafica4View.vue'
import Grafica5View from '../views/Grafica5View.vue'
import Grafica6View from '../views/Grafica6View.vue'
import TablaDatosView from '../views/TablaDatosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/ChartCard',
      name: 'ChartCard',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/ChartCardView.vue'),
    },
    { path: '/grafica-1', name: 'grafica1', component: Grafica1View },
    { path: '/grafica-2', name: 'grafica2', component: Grafica2View },
    { path: '/grafica-3', name: 'grafica3', component: Grafica3View },
    { path: '/grafica-4', name: 'grafica4', component: Grafica4View },
    { path: '/grafica-5', name: 'grafica5', component: Grafica5View },
    { path: '/grafica-6', name: 'grafica6', component: Grafica6View },
    { path: '/tabla-datos', name: 'tablaDatos', component: TablaDatosView },
  ],
})

export default router
