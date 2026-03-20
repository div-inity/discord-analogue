export default {
  namespaced: true,
  state: {
    user: {
      /* id: 1,
      name: 'Discord User',
      nickname: 'veselaya_devka',
      //avatar: require('@/assets/img/ava.jpg'),
      status: 'online',
      info: 'Playing Counter-Strike 2', */
      id: null,
      name: '',
      nickname: '',
      status: '',
      info: '',
      email: '',
      birthdate: '',
      status: 'online', // default
      info: 'Playing Counter-Strike 2', // default
    },
    friendListMode: "online",
  },
  getters: {
    getUser: (state) => state.user,
    getUserName: (state) => state.user.name,
    isAuthenticated: (state) => !!state.user.id,
    getFriendListMode: (state) => state.friendListMode,
  },
  mutations: {
    SET_USER(state, userData) {
      state.user = { ...state.user, ...userData }
    },
    
    UPDATE_USER_FIELD(state, { field, value }) {
      if (field in state.user) {
        state.user[field] = value
      }
    },
    
    CLEAR_USER(state) {
      state.user = {
      id: null,
      name: '',
      nickname: '',
      status: '',
      info: '',
      email: '',
      birthdate: '',
      }
    },
    SET_FRIEND_LIST_MODE(state, mode) {
      state.friendListMode = mode;
    }
  },
  actions: {
    /* async updateUser({ commit, state }, updates) {
      try {
        // Отправка обновлений на сервер
        const response = await fetch(`/api/users/${state.user.id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates)
        })
        
        const updatedUser = await response.json()
        commit('SET_USER', updatedUser)
        return updatedUser
      } catch (error) {
        console.error('Ошибка обновления:', error)
        throw error
      }
    } */
  },
}