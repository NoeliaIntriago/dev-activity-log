<template>
  <div class="flex justify-content-end">
    <Button
      v-if="hasSavedData"
      label="Borrar cambios guardados"
      icon="pi pi-trash"
      class="p-button-outlined p-button-danger mr-2"
      @click="deleteSavedData"
    />
    <Button label="Generar PDF" icon="pi pi-file-pdf" class="p-button" @click="generarPdf" />
  </div>
</template>

<script setup lang="ts">
import type { PdfData } from '@/assets/types'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import { computed, inject } from 'vue'
import pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
import { generarPdfDefinition } from '@/utils/pdf/generateDefinition'
import { format } from 'date-fns'

pdfMake.vfs = pdfFonts.vfs

const toast = useToast()
const confirm = useConfirm()

const props = defineProps<{
  data: PdfData
}>()

const hasSavedData = inject<boolean>('hasSavedData')
const clear = inject<() => void>('clear')!

const checkPeriod = computed(() => {
  if (props.data.period === null || props.data.period.length < 2) return []

  return props.data.period
})

const validarDatos = () => {
  if (checkPeriod.value.length < 2) {
    toast.add({ severity: 'error', summary: 'Error', detail: 'Período no definido', life: 3000 })
    return false
  }

  if (checkPeriod.value[0] === checkPeriod.value[1]) {
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

  if (props.data.owner.trim() === '') {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'El responsable no puede estar vacío',
      life: 3000,
    })
    return false
  }

  if (props.data.ruc.trim() === '') {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'El RUC no puede estar vacío',
      life: 3000,
    })
    return false
  }

  return true
}

const generarPdf = () => {
  if (!validarDatos()) return

  const pdfDefinition = generarPdfDefinition(props.data)

  const startDate = format(checkPeriod.value[0], 'yyyy-MM-dd')
  const endDate = format(checkPeriod.value[1], 'yyyy-MM-dd')
  const filename = `reporte_${startDate.replace(/-/g, '_')}_${endDate.replace(/-/g, '_')}.pdf`

  pdfMake.createPdf(pdfDefinition).download(filename)
}

const deleteSavedData = () => {
  confirm.require({
    message: '¿Estás seguro de que deseas borrar los datos guardados?',
    header: 'Confirmación',
    icon: 'pi pi-info-circle',
    rejectLabel: 'Cancelar',
    acceptLabel: 'Borrar',
    rejectClass: 'p-button-secondary p-button-outlined',
    acceptClass: 'p-button-danger',
    accept: () => {
      clear()
      toast.add({
        severity: 'success',
        summary: 'Datos borrados',
        detail: 'Cambios guardados han sido eliminados',
        life: 3000,
      })
    },
    reject: () => {},
  })
}
</script>
