import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'

// Estilos necesarios
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './assets/styles/index.scss'
import 'primevue/resources/themes/lara-light-teal/theme.css'

const app = createApp(App)

app.use(PrimeVue)
app.use(ToastService)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Toast', Toast)

app.mount('#app')
