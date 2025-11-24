export default {
  namespaced: true,
  state: {
    missed_messages: [
      {
        id: 12,
        names: ["Василий Николаев"],
        avatars: [require('@/assets/img/UserIcon2.jpg')],
        missed: 1,
      },
      {
        id: 35,
        names: ["Василий Николаев", "Михаил Шатов"],
        avatars: [require('@/assets/img/UserIcon2.jpg'), require('@/assets/img/UserIcon1.jpg')],
        missed: 2,
      },
    ],
    dialogs: [
      {
        id: 2,
        names: ["Михаил Шатов"],
        avatars: [require('@/assets/img/UserIcon1.jpg'),],
      },
      {
        id: 12,
        names: ["Василий Николаев"],
        avatars: [require('@/assets/img/UserIcon2.jpg')],
      },
      {
        id: 28,
        names: ["Карабас-Барабас"],
        avatars: [require('@/assets/img/Server Icon.svg')],
      },
      {
        id: 35,
        names: ["Василий Николаев", "Михаил Шатов"],
        avatars: [require('@/assets/img/UserIcon2.jpg'), require('@/assets/img/UserIcon1.jpg')],
      },
      {
        id: 101, // userId
        names: ["Анна Шатова"],
        avatars: [require('@/assets/img/UserIcon.jpg')],
      },
    ],
  },
  getters: {
    //getUser: (state) => state.user
  },
  mutations: {},
  actions: {},
}