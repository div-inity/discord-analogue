import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import './styles/main.scss';
import i18n from '@/plugins/i18n';

import 'tippy.js/dist/tippy.css'
import VueTippy from 'vue-tippy';

//Глобальные компоненты - важно сразу загрузить
import Header from './components/Header.vue'

// Простая проверка при старте
const token = localStorage.getItem('token')
if (token && !store.state.user.user.id) {
  // Если есть токен, но нет пользователя - разлогиниваем
  localStorage.removeItem('token')
  store.commit('user/CLEAR_USER')
}

const app = createApp(App)

app.use(i18n)
app.use(store)
app.use(router)
app.use(VueTippy, {
  directive: 'tippy', // => v-tippy
  component: 'tippy', // => <tippy/>
  componentSingleton: 'tippy-singleton', // => <tippy-singleton/>,
  defaultProps: {
    theme: 'custom',
    placement: 'right', //auto-end
    allowHTML: true,
  }, // => Global default options * see all props
})

store.dispatch('theme/initializeTheme')
app.component('Header', Header)
app.mount('#app')