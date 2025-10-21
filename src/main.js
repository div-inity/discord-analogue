import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import './styles/main.scss'
import i18n from '@/plugins/i18n'

//Глобальные компоненты - важно сразу загрузить
import Header from './components/Header.vue'

const app = createApp(App)

app.use(i18n)
app.use(store)
app.use(router)

store.dispatch('theme/initializeTheme')
app.component('Header', Header)
app.mount('#app')