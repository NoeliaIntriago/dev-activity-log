import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'

// Estilos necesarios
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './assets/styles/index.scss'

const app = createApp(App)

app.use(PrimeVue)

app.mount('#app')
