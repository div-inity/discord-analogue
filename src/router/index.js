import { createRouter, createWebHashHistory } from "vue-router";
import MainView from "../views/MainView.vue";
import MessagesView from "../views/MessagesView.vue";
import FriendsView from "../views/FriendsView.vue";
import store from '@/store'
import { computed } from 'vue'

const routes = [
  {
    path: "/",
    name: "main",
    component: MainView,
    meta: {
      requiresAuth: true, // Требуется авторизация
    },
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

];


const router = createRouter({
  history: createWebHashHistory(),
  routes,
});

router.beforeEach((to, from, next) => {
  // Проверяем авторизацию
  //console.log("Мне нужно на ", to)
  const isAuthenticated = computed(() => store.getters['user/getUser']).value.id && true; // Булево значение
  //console.log("isAuthenticated: ", isAuthenticated)
  
  // Список публичных страниц
  const publicPages = ['login', 'register']
  
  // Если страница требует авторизации (все кроме login/register)
  if (!publicPages.includes(to.name)) {
    // Если не авторизован - на логин
    if (!isAuthenticated) {
      next({ name: 'login' })
    } else {
      next() // авторизован - пропускаем
    }
  } else {
    // Если авторизован и пытается зайти на login/register - на главную
    if (isAuthenticated) {
      next({ name: 'main' })
    } else {
      next() // не авторизован - пропускаем на login/register
    }
  }
})

export default router;
