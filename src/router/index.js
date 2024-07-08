import { createRouter, createWebHistory } from "vue-router";
import Dashboard from "../views/DashboardH.vue";
import Telcel from "../views/TelcelAlgolia.vue";
import Servicios from "../views/ServiciosNube.vue";

const routes = [
  { path: "/", name: "dashboard", component: Dashboard },
  { path: "/telcel", name: "telcel", component: Telcel },
  { path: "/servicios", name: "servicios", component: Servicios },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
