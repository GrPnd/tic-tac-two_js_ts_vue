import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap"
import './bll/style.css';

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from "./router/router"

const app = createApp(App)

app.use(createPinia())
app.use(router);
app.mount('#app')
