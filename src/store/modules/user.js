export default {
  namespaced: true,
  state: {
    user: {
      id: 1,
    },
    //user: null
  },
  getters: {
    getUser: (state) => state.user
  },
  mutations: {},
  actions: {},
}