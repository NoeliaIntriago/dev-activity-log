<template>
  <div class="flex justify-center">
    <Button
      label="Generar PDF"
      icon="pi pi-file-pdf"
      class="p-button-outlined"
      @click="generarPdf"
    />
  </div>
</template>

<script setup lang="ts">
import type { PdfData } from '@/types'
import { useToast } from 'primevue/usetoast'
import moment from 'moment'
import { computed } from 'vue'
import pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
import { generarPdfDefinition } from '@/utils/pdfGenerator'

pdfMake.vfs = pdfFonts.vfs

const toast = useToast()

const props = defineProps<{
  data: PdfData
}>()

const formattedPeriod = computed(() => {
  if (props.data.period === null || props.data.period.length < 2) return []

  return [
    moment(props.data.period[0]).format('YYYY-MM-DD'),
    moment(props.data.period[1]).format('YYYY-MM-DD'),
  ]
})

const validarDatos = () => {
  if (formattedPeriod.value < 2) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Período no definido', life: 3000 })
    return false
  }

  if (formattedPeriod.value[0] === formattedPeriod.value[1]) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'El período no puede ser el mismo día',
      life: 3000,
    })
    return false
  }

  if (props.data.activities.length === 0) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No hay actividades para generar el PDF',
      life: 3000,
    })
    return false
  }

  if (
    props.data.extras.length > 0 &&
    props.data.extras.some((extra) => extra.activities.length === 0)
  ) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'Las fechas adicionales deben tener al menos una actividad',
      life: 3000,
    })
    return false
  }

  return true
}

const generarPdf = () => {
  if (!validarDatos()) return

  const pdfData = {
    ...props.data,
    period: formattedPeriod.value,
  }

  const pdfDefinition = generarPdfDefinition(pdfData, 'Noelia Intriago')
  pdfMake.createPdf(pdfDefinition).download(`reporte_${pdfData.period[0]}_${pdfData.period[1]}.pdf`)
}
</script>
