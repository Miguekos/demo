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
        component: () => import("pages/Admin/DetallesConSintomas.vue")
      },
      {
        path: "/detalles",
        component: () => import("pages/Admin/DetallesSanos.vue")
      },
      { path: '/usuarios', component: () => import('pages/Users/Index.vue') },
      { path: "/profile/:id", component: () => import("pages/Users/Profile.vue") },
      { path: "/dashboard", component: () => import("pages/Index.vue") }
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
