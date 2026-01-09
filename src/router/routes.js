const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "", component: () => import("pages/Master/MasterCustomer.vue") },
    ],
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/Error404.vue"),
  },
  {
    path: "/Maintenance",
    component: () => import("pages/Maintenance.vue"),
  },
  {
    path: "/Login",
    component: () => import("pages/Login-1.vue"),
  },
];

export default routes;
