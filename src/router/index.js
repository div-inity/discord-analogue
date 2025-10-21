import { createRouter, createWebHashHistory } from "vue-router";
import MainView from "../views/MainView.vue";
import MessagesView from "../views/MessagesView.vue";
import FriendsView from "../views/FriendsView.vue";

const routes = [
  {
    path: "/",
    name: "main",
    component: MainView,
    children: [
      {
        path: "/messages",
        name: "messages",
        component: MessagesView,
      },
      {
        path: "/friends",
        name: "friends",
        component: FriendsView,
      },
      {
        path: "/auth",
        name: "auth",
        component: () =>
          import(/* webpackChunkName: "auth" */ "../views/AuthView.vue"),
      },
      {
        path: "/user-settings",
        name: "user-settings",
        component: () =>
          import(/* webpackChunkName: "user-settings" */ "../views/UserSettingsView.vue"),
      },
      {
        path: "/server-settings",
        name: "server-settings",
        component: () =>
          import(/* webpackChunkName: "server-settings" */ "../views/ServerSettingsView.vue"),
      },
    ]
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/AboutView.vue"),
  },

];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

export default router;
