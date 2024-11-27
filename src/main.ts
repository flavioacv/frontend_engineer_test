import './assets/main.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'bootstrap';

import { createPinia } from 'pinia'
import { createApp } from 'vue'

import App from './App.vue'
import './assets/styles/fonts.css'
import router from './router'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')
