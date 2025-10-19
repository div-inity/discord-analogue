import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import './styles/main.scss'
import i18n from '@/plugins/i18n' // убедитесь что путь правильный

const app = createApp(App)

app.use(i18n)
app.use(store)
app.use(router)

store.dispatch('theme/initializeTheme')
app.mount('#app')