export default {
  namespaced: true,
  state: {
    friends: {
      added: [
        {
          id: 1,
          name: "Михаил Шатов",
          nickname: "Thomas_Norris",
          avatar: require('@/assets/img/UserIcon1.jpg'),
          status: 'phone',
        },
        {
          id: 1,
          name: "Vasilevs_1987",
          nickname: "vasilevs_1987",
          avatar: require('@/assets/img/UserIcon2.jpg'),
          status: 'offline',
        },
        {
          id: 1,
          name: "Анна Шатова",
          nickname: "veselaya_devka",
          avatar: require('@/assets/img/UserIcon.jpg'),
          status: 'red',
        },
        {
          id: 1,
          name: "Бдыщь",
          nickname: "bdyshch",
          avatar: require('@/assets/img/UserIcon.jpg'),
          status: 'moon',
        },
        {
          id: 1,
          name: "Карабас-Барабас",
          nickname: "karabas_barabas",
          avatar: require('@/assets/img/Server Icon.svg'),
          status: 'online',
        },
        {
          id: 1,
          name: "Пам пам",
          nickname: "pampam",
          avatar: '',
          status: 'streaming',
        },
      ],
      pending: [
        {
          id: 201,
          name: "Батон",
          nickname: "button",
          avatar: require('@/assets/img/UserIcon3.jpg'),
          status: 'online',
        },
      ],
      blocked: [
        {
          id: 401,
          name: "Johny",
          nickname: "Johny",
          avatar: require('@/assets/img/UserIcon4.jpg'),
          status: 'online',
        },
      ],
    }
  },
  getters: {
  },
  mutations: {},
  actions: {},
}