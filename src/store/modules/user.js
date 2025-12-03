export default {
  namespaced: true,
  state: {
    user: {
      id: 1,
      name: 'Discord User',
      nikname: 'veselaya_devka',
      //avatar: require('@/assets/img/ava.jpg'),
      status: 'online',
      info: 'Playing Counter-Strike 2',
    },
    //user: null
    friends: [
      {
        id: 1,
        name: "Михаил Шатов",
        nikname: "Thomas_Norris",
        avatar: require('@/assets/img/UserIcon1.jpg'),
        status: 'phone',
      },
      {
        id: 1,
        name: "Vasilevs_1987",
        nikname: "vasilevs_1987",
        avatar: require('@/assets/img/UserIcon2.jpg'),
        status: 'offline',
      },
      {
        id: 1,
        name: "Анна Шатова",
        nikname: "veselaya_devka",
        avatar: require('@/assets/img/UserIcon.jpg'),
        status: 'red',
      },
      {
        id: 1,
        name: "Бдыщь",
        nikname: "bdyshch",
        avatar: require('@/assets/img/UserIcon.jpg'),
        status: 'moon',
      },
      {
        id: 1,
        name: "Карабас-Барабас",
        nikname: "karabas_barabas",
        avatar: require('@/assets/img/Server Icon.svg'),
        status: 'online',
      },
      {
        id: 1,
        name: "Пам пам",
        nikname: "pampam",
        avatar: '',
        status: 'streaming',
      },
    ]
  },
  getters: {
    getUser: (state) => state.user
  },
  mutations: {},
  actions: {},
}