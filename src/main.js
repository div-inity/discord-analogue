import { createApp } from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import './styles/main.scss'

const app = createApp(App)

app.use(store)

store.dispatch('theme/initializeTheme')
app.use(router)
app.mount('#app')