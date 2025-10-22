export default {
  namespaced: true,
  state: {
    servers: [
      {
        id: 1,
        name: "Test",
        missed_messages: 71,
        last_message: "2025-21-04 15:20:03",
        avatar: require('@/assets/img/Server Icon.jpg'),
        mentions: 1,
      },
      {
        id: 2,
        name: "Nice cats",
        missed_messages: 1,
        last_message: "2025-21-03 08:09:10",
        avatar: require('@/assets/img/Server Icon1.jpg'),
      },
      {
        id: 3,
        name: "Help yourself",
        /* missed_messages: 1003, */
        last_message: "2025-10-03 21:30:15",
        avatar: require('@/assets/img/Server Icon2.jpg'),
      },
    ],
  },
  getters: {
    //getUser: (state) => state.user
  },
  mutations: {},
  actions: {},
}