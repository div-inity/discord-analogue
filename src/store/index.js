import { createStore } from 'vuex'

import theme from './modules/theme.js'
import user from './modules/user.js'

export default createStore({
  modules: {
    user,
    theme
  }
})
