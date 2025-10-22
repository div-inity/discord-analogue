import { createStore } from 'vuex'

import theme from './modules/theme.js'
import user from './modules/user.js'
import servers from './modules/servers.js'
import private_msg from './modules/private_msg.js'

export default createStore({
  modules: {
    user,
    theme,
    servers,
    private_msg,
  }
})
