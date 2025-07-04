<script setup lang="ts">
import type { PdfData } from '@/assets/types'

import { provide, watch } from 'vue'
import { useLocalStorageSync } from '@/composables/useLocalStorageSync'
import SpecificDatesSection from './components/report/SpecificDatesSection.vue'
import ReportSummary from './components/report/ReportSummary.vue'
import PdfGeneratorSection from './components/report/PdfGeneratorSection.vue'
import MetadataInputSection from './components/report/MetadataInputSection.vue'
import AnnexUploader from './components/report/AnnexUploader.vue'
import GeneralPeriodSection from './components/report/GeneralPeriodSection.vue'
import ScrollToTopButton from './components/ScrollToTopButton.vue'

const {
  state: data,
  save,
  clear,
  hasSavedData,
} = useLocalStorageSync<PdfData>(
  'pdfData',
  {
    owner: '',
    ruc: '',
    period: [],
    activities: [],
    extras: [],
    annexes: [],
  },
  {
    parseDates: ['period'], // campos que deben convertirse a Date[]
    ttl: 1000 * 60 * 60 * 24 * 7, // tiempo de vida de los datos en milisegundos (7 días)
  },
)

watch(
  data,
  () => {
    save()
  },
  { deep: true },
)

provide('clear', clear)
provide('hasSavedData', hasSavedData)
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
        <GeneralPeriodSection v-model:period="data.period" v-model:activities="data.activities" />
        <SpecificDatesSection v-model:extras="data.extras" />
      </TabPanel>

      <TabPanel>
        <template #header>
          <div>
            <i class="pi pi-file-pdf mr-2"></i>
            <span class="font-bold">Generación de PDF</span>
          </div>
        </template>
        <div class="grid align-items-center justify-content-between my-4">
          <MetadataInputSection v-model:owner="data.owner" v-model:ruc="data.ruc" />
          <AnnexUploader v-model:annexes="data.annexes" />
        </div>
        <ReportSummary :data="data" />
        <PdfGeneratorSection :data="data" />
      </TabPanel>
    </TabView>
  </main>

  <ScrollToTopButton />
  <Toast />
  <ConfirmDialog></ConfirmDialog>

  <footer class="footer">
    <span>
      © {{ new Date().getFullYear() }} <strong>DevActivityLog</strong> — Todos los derechos
      reservados.
    </span>
    <span>
      Desarrollado con 💻 por
      <a
        href="https://github.com/NoeliaIntriago"
        target="_blank"
        rel="noopener noreferrer"
        class="github-link"
      >
        NoeliaIntriago
      </a>
    </span>
    <span>
      Código fuente disponible en
      <a
        href="https://github.com/NoeliaIntriago/dev-activity-log"
        target="_blank"
        rel="noopener noreferrer"
        class="github-link"
      >
        GitHub <i class="pi pi-github"></i>
      </a>
    </span>
  </footer>
</template>
