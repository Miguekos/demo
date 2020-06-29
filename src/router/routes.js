const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Indexcopy.vue") },
      {
        path: "/registro",
        component: () => import("pages/Registro/Index.vue")
      },
      {
        path: "/detallecs",
        component: () => import("pages/Control/DetallesConSintomas.vue")
      },
      {
        path: "/detalles",
        component: () => import("pages/Control/DetallesSanos.vue")
      },
      {
        path: "/misregistros",
        component: () => import("pages/Control/MisRegistros.vue")
      },
      { path: '/usuarios', component: () => import('pages/Users/Index.vue') },
      { path: '/seguimiento', component: () => import('pages/Seguimiento/Index.vue') },
      { path: '/asistencia', component: () => import('pages/Asistencia/Index.vue') },
      { path: "/profile/:id", component: () => import("pages/Users/Profile.vue") },
      { path: "/dashboard", component: () => import("pages/Control/Index.vue") },
      { path: "/grafica", component: () => import("components/ApexCharts") }
    ]
  },
  {
    path: "/auth",
    component: () => import("pages/Auth/PageAuth.vue")
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
