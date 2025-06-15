import { createApp } from 'vue'
import App from './App.vue'

import PrimeVue from 'primevue/config'
import ToastService from 'primevue/toastservice'
import Toast from 'primevue/toast'
import ConfirmDialog from 'primevue/confirmdialog'
import ConfirmationService from 'primevue/confirmationservice'

// Estilos necesarios
import 'primeicons/primeicons.css'
import 'primeflex/primeflex.css'
import './assets/styles/index.scss'
import 'primevue/resources/themes/lara-light-teal/theme.css'

const app = createApp(App)

app.use(PrimeVue)
app.use(ToastService)
app.use(ConfirmationService)
// eslint-disable-next-line vue/multi-word-component-names
app.component('Toast', Toast)
app.component('ConfirmDialog', ConfirmDialog)

app.mount('#app')
