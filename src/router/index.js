import { createRouter, createWebHistory } from "vue-router";
import { getUserItem } from "@/helpers/user.js";
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
    meta: { requiresAuth: true },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  const loggedIn = getUserItem("user") ?? false;
  const { name } = to;

  if (name === "login" && loggedIn) next("/home");

  if (to.matched.some((record) => record.meta.requiresAuth) && !loggedIn) {
    next("/");
  } else {
    next();
  }
});

export default router;
