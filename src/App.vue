<script setup lang="ts">
import type { PdfData } from './types'

import { ref } from 'vue'
import PeriodSelector from './components/report/PeriodSelector.vue'
import GeneralActivitySection from './components/report/GeneralActivitySection.vue'
import SpecificDatesSection from './components/report/SpecificDatesSection.vue'

const data = ref<PdfData>({
  period: [],
  activities: [],
  extras: [],
})
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
    <TabView>
      <TabPanel>
        <template #header>
          <div>
            <i class="pi pi-file mr-2"></i>
            <span class="font-bold">Ingreso de Actividades</span>
          </div>
        </template>
        <PeriodSelector v-model:period="data.period" />
        <GeneralActivitySection v-model:activities="data.activities" />
        <SpecificDatesSection v-model:extras="data.extras" />
      </TabPanel>

      <TabPanel>
        <template #header>
          <div>
            <i class="pi pi-file-pdf mr-2"></i>
            <span class="font-bold">Generación de PDF</span>
          </div>
        </template>
      </TabPanel>
    </TabView>
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
