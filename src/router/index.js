import { createRouter, createWebHistory } from 'vue-router'
import Inicio from '../views/ClientesView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'listado-clientes',
      component: Inicio,
      props: {
        titulo: 'Listado de Clientes',
      },
    },
    {
      path: '/agregar-cliente',
      name: 'agregar-cliente',
      component: () => import('../views/NuevoClienteView.vue'),
      props: {
        titulo: 'Agregar Cliente',
      },
    },
    {
      path: '/editar-cliente/:id', // Con ':id' le estamos diciendo a Vue que es un parámetro dinámico
      name: 'editar-cliente',
      component: () => import('../views/EditarCliente.vue'),
      props: {
        titulo: 'Editar Cliente',
      },
    },
  ],
});

export default router
