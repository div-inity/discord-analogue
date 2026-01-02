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
        meta: {
          private_msg: true,
        },
        children: [
          {
            path: ":id",
            name: "message",
            meta: {
              private_msg: true,
            },
            component: () =>
              import(/* webpackChunkName: "message" */ "../views/MessageView.vue"),
          }
        ],
      },
      {
        path: "/server/:id",
        name: "server",
        component: () =>
          import(/* webpackChunkName: "server" */ "../views/ServerView.vue"),
      },
      {
        path: "/friends",
        name: "friends",
        meta: {
          private_msg: true,
        },
        component: FriendsView,

      },
      {
        path: "/nitro",
        name: "nitro",
        meta: {
          private_msg: true,
        },
        component: () =>
          import(/* webpackChunkName: "nitro" */ "../views/NitroView.vue"),
      },
      {
        path: "/store",
        name: "store",
        meta: {
          private_msg: true,
        },
        component: () =>
          import(/* webpackChunkName: "store" */ "../views/StoreView.vue"),
      },
      {
        path: "/tasks",
        name: "tasks",
        meta: {
          private_msg: true,
        },
        component: () =>
          import(/* webpackChunkName: "tasks" */ "../views/TasksView.vue"),
      },
      {
        path: "/login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "login" */ "../views/AuthView.vue"),
      },
      {
        path: "/register",
        name: "register",
        component: () =>
          import(/* webpackChunkName: "register" */ "../views/RegisterView.vue"),
      },
      {
        path: "/add-server",
        name: "add-server",
        component: () =>
          import(/* webpackChunkName: "add-server" */ "../views/AddServerView.vue"),
      },
      {
        path: "/discovery",
        name: "discovery",
        component: () =>
          import(/* webpackChunkName: "discovery" */ "../views/DiscoveryView.vue"),
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
