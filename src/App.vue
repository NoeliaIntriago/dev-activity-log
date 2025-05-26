<script setup lang="ts">
import type { PdfData, Activity } from './types'

import { ref } from 'vue'
import PeriodSelector from './components/report/PeriodSelector.vue'
import GeneralActivitySection from './components/report/GeneralActivitySection.vue'

const data = ref<PdfData>({
  startDate: '',
  endDate: '',
  activities: [],
  extras: [],
})

const setDates = (dates: string[]) => {
  data.value.startDate = dates[0]
  data.value.endDate = dates[1] || ''
}

const addNewGeneralActivity = (activities: Activity) => {
  data.value.activities.push(activities)
}

const removeActivity = (index: number) => {
  data.value.activities.splice(index, 1)
}
</script>

<template>
  <header>
    <img alt="App logo" class="logo" src="./assets/logo.png" width="125" height="125" />

    <div class="wrapper">
      <h1>Dev Activity Log</h1>
      <p>
        Una aplicación para registrar y generar reporte de actividades de desarrollo de software.
        <br />
        <strong>Desarrollada con Vue 3, Vite y TypeScript.</strong>
      </p>
    </div>
  </header>

  <main class="content">
    <period-selector @update-period="setDates" />
    <general-activity-section
      :activities="data.activities"
      @add-activity="addNewGeneralActivity"
      @remove-activity="removeActivity"
    />
  </main>

  <Toast />
  <footer class="footer">
    <p>
      © {{ new Date().getFullYear() }} <strong>DevActivityLog</strong> — Todos los derechos
      reservados.
    </p>
    <p class="legal">
      Desarrollado con 💻 por
      <a
        href="https://github.com/NoeliaIntriago"
        target="_blank"
        rel="noopener noreferrer"
        class="github-link"
      >
        NoeliaIntriago
      </a>
    </p>
    <p class="legal">
      Código fuente disponible en
      <a
        href="https://github.com/NoeliaIntriago/DevActivityLog"
        target="_blank"
        rel="noopener noreferrer"
        class="github-link"
      >
        GitHub <i class="pi pi-github"></i>
      </a>
    </p>
  </footer>
</template>
