import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import Home from '../views/Home.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  // Board pasándole propiedades que le indiquemos
  {
    path: '/board/:id',
    name: 'Board',
    // Cargamos completo
    // component: Board,
    // Lo cargamos dinámico
    component: () => import('../views/Board.vue'),
    props: true,
  },
  // Ruta por defecto si no se encuentra el Path
  {
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: Home,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
