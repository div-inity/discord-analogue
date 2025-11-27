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
  },
  getters: {
    getUser: (state) => state.user
  },
  mutations: {},
  actions: {},
}