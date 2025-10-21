export default {
  namespaced: true,
  state: {
    currentTheme: 'light'
  },

  getters: {
    currentTheme: (state) => state.currentTheme,
    isDarkTheme: (state) => state.currentTheme === 'dark'
  },

  mutations: {
    SET_THEME(state, theme) {
      state.currentTheme = theme
    }
  },

  actions: {
    setTheme({ commit }, theme) {
      if (['light', 'dark'].includes(theme)) {
        commit('SET_THEME', theme)

        // Применяем тему к корневому HTML элементу
        document.documentElement.setAttribute('data-theme', theme)
        localStorage.setItem('theme', theme)

        console.log('Theme applied globally:', theme)
      }
    },

    toggleTheme({ commit, state, dispatch }) {
      const newTheme = state.currentTheme === 'light' ? 'dark' : 'light'
      dispatch('setTheme', newTheme)
    },

    initializeTheme({ dispatch }) {
      const savedTheme = localStorage.getItem('theme') || 'light'
      dispatch('setTheme', savedTheme)
    }
  }
}