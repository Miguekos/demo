
const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Indexcopy.vue') },
      { path: '/registro', component: () => import('pages/Registro/Index.vue') },
      { path: '/detallecs', component: () => import('pages/Admin/DetallesConSintomas.vue') },
      { path: '/detalles', component: () => import('pages/Admin/DetallesSanos.vue') },
      { path: '/login', component: () => import('pages/Login/Index.vue') },
      { path: '/dashboard', component: () => import('pages/Index.vue') }
    ]
  }
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
}

export default routes
