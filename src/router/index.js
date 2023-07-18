import { createRouter, createWebHistory } from "vue-router";
import LoginPage from "../views/LoginPage.vue";

const routes = [
  {
    path: "/",
    name: "login",
    component: LoginPage,
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import("../views/NotFound.vue"),
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/HomePage.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
