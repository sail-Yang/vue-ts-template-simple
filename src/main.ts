// import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import ElementPlus from 'element-plus'
import { createPinia } from 'pinia'
import 'element-plus/dist/index.css'
import SvgIcon from '@/components/SvgIcon/index.vue'
import './permission'
const app = createApp(App)

app.use(router)
app.use(ElementPlus)
app.use(createPinia())
app.component('svg-icon', SvgIcon)
app.mount('#app')
