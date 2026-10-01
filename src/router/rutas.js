import { createRouter, createWebHistory } from 'vue-router'
import InicioView from '../views/InicioView.vue'
import ListaLibros from '../views/ListaLibros.vue'
import DetalleLibro from '../views/DetalleLibro.vue'
import NotFound from '../views/NotFound.vue' 

const routes = [
  {
    path: '/',
    name: 'Inicio',
    component: InicioView
  },
  {
    path: '/usuarios',
    name: 'usuarios',
    component: () => import('@/views/UsuariosView.vue')
  },
  {
    path: '/libros',
    name: 'ListaLibros',
    component: ListaLibros
  },
  {
    path: '/libros/:id',
    name: 'DetalleLibro',
    component: DetalleLibro,
    props: true
  },
  {
    path: '/autor/:id',
    redirect: to => `/libros/${to.params.id}`
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
