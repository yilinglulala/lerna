import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'

import './assets/style/index.css'
import 'element-plus/dist/index.css'
import './assets/style/app.scss'

const pinia = createPinia()
const app = createApp(App)
app.use(ElementPlus)
app.use(pinia)
app.use(router).mount('#app')
