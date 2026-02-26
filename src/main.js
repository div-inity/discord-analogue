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