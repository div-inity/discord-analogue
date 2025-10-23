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
        activity_type: 'display',
        my_activity: true,
        total_active_users: 3,
        active_users: [
          'https://avatars.mds.yandex.net/get-yapic/47747/VJixqYSY7iFy3XI42H4xUbFeM-1/orig',
          'https://avatars.mds.yandex.net/get-yapic/35885/srMKjfT9weL7jIicQXjiMCrBpVo-1/orig',
        ],
      },
      {
        id: 2,
        name: "Nice cats",
        missed_messages: 1,
        last_message: "2025-21-03 08:09:10",
        avatar: require('@/assets/img/Server Icon1.jpg'),
        activity_type: 'camera',
        active_users: [
          'https://avatars.mds.yandex.net/get-yapic/47747/VJixqYSY7iFy3XI42H4xUbFeM-1/orig',
          'https://avatars.mds.yandex.net/get-yapic/35885/srMKjfT9weL7jIicQXjiMCrBpVo-1/orig',
          'https://i.ytimg.com/vi/2lxyzjJedKw/oar2.jpg?sqp=-oaymwEkCJUDENAFSFqQAgHyq4qpAxMIARUAAAAAJQAAyEI9AICiQ3gB&amp;rs=AOn4CLA8D8TuOlFmBksraGge4gXvrxNfKQ'
        ],
        total_active_users: 10,
      },
      {
        id: 3,
        name: "Help yourself",
        /* missed_messages: 1003, */
        last_message: "2025-10-03 21:30:15",
        avatar: require('@/assets/img/Server Icon2.jpg'),
        activity_type: 'call',
        total_active_users: 2,
        active_users: [
          'https://avatars.mds.yandex.net/get-yapic/47747/VJixqYSY7iFy3XI42H4xUbFeM-1/orig',
        ],
      },
      {
        id: 3,
        name: "Бастион ненависти",
        /* missed_messages: 1003, */
        last_message: "2025-10-03 21:32:15",
        avatar: require('@/assets/img/Server Icon1.svg'),
      },
    ],
  },
  getters: {
    //getUser: (state) => state.user
  },
  mutations: {},
  actions: {},
}