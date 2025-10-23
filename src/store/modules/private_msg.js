export default {
  namespaced: true,
  state: {
    messages: [
      {
        id: 101, // userId
        name: "Анна Шатова",
        missed_messages: 1,
        last_message: "2025-21-03 10:08:15",
        avatar: require('@/assets/img/User Icon.jpg'),
      },
      {
        id: 2,
        name: "Михаил Шатов",
        missed_messages: 2,
        last_message: "2025-21-03 15:03:15",
        avatar: require('@/assets/img/User Icon1.jpg'),
      },
      {
        id: 35,
        name: "Василий Николаев",
        missed_messages: 5,
        last_message: "2025-21-03 15:03:16",
        avatar: require('@/assets/img/User Icon2.jpg'),
      },
      {
        id: 28,
        name: "Карабас-Барабас",
        missed_messages: 1,
        last_message: "2025-21-03 15:03:16",
        avatar: require('@/assets/img/Server Icon.svg'),
      }
    ]
  },
  getters: {
    //getUser: (state) => state.user
  },
  mutations: {},
  actions: {},
}