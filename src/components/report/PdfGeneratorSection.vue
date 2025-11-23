<template>
  <div class="flex justify-content-end">
    <SplitButton label="Modificar Datos" :model="options" class="mr-2" outlined @click="() => {}" />
    <Button label="Generar PDF" icon="pi pi-file-pdf" class="p-button" @click="generarPdf" />

    <FileUpload
      ref="fileUploadRef"
      mode="basic"
      accept="application/json"
      :maxFileSize="5000000"
      chooseLabel="Importar datos"
      chooseIcon="pi pi-upload"
      style="display: none"
      :auto="true"
      :customUpload="true"
      @uploader="cargarDatos"
    />
  </div>
</template>

<script setup lang="ts">
import type { Extras, PdfData } from '@/assets/types'
import { useToast } from 'primevue/usetoast'
import { useConfirm } from 'primevue/useconfirm'
import { computed, inject, ref, type Ref } from 'vue'
import pdfMake from 'pdfmake/build/pdfmake'
import * as pdfFonts from 'pdfmake/build/vfs_fonts'
import { generarPdfDefinition } from '@/utils/pdf/generateDefinition'
import { format } from 'date-fns'
import type { FileUploadUploaderEvent } from 'primevue/fileupload'

pdfMake.vfs = pdfFonts.vfs

const toast = useToast()
const confirm = useConfirm()
const fileUploadRef = ref()

const props = defineProps<{
  data: PdfData
}>()
const emit = defineEmits<{
  (e: 'update:data', value: PdfData): void
}>()

const options = [
  { label: 'Exportar datos', icon: 'pi pi-download', command: () => exportarDatos() },
  { label: 'Importar datos', icon: 'pi pi-upload', command: () => triggerFileUpload() },
  { label: 'Borrar cambios guardados', icon: 'pi pi-trash', command: () => deleteSavedData() },
]

const triggerFileUpload = () => {
  fileUploadRef.value?.$el.querySelector('input[type="file"]')?.click()
}

const hasSavedData = inject<Ref<boolean>>('hasSavedData')!
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

  const startDate = format(checkPeriod.value[0], 'yyyy_MMM_dd')
  const endDate = format(checkPeriod.value[1], 'yyyy_MMM_dd')
  const filename = `reporte_${startDate}_${endDate}.pdf`

  pdfMake.createPdf(pdfDefinition).download(filename)
}

const deleteSavedData = () => {
  if (!hasSavedData.value) {
    toast.add({
      severity: 'info',
      summary: 'Hey',
      detail: 'No hay datos para borrar',
      life: 3000,
    })
    return
  }

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

const exportarDatos = () => {
  try {
    // Convertir los datos a JSON
    const jsonData = JSON.stringify(props.data, null, 2)

    // Crear un blob con el contenido JSON
    const blob = new Blob([jsonData], { type: 'application/json' })

    // Crear un enlace temporal para descargar
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.href = url

    // Generar nombre del archivo con las fechas
    const startDate =
      checkPeriod.value.length > 0 ? format(checkPeriod.value[0], 'yyyy_MMM_dd') : ''
    const endDate = checkPeriod.value.length > 1 ? format(checkPeriod.value[1], 'yyyy_MMM_dd') : ''

    link.download = `datos_${startDate}_${endDate}.json`

    // Simular click para descargar
    document.body.appendChild(link)
    link.click()

    // Limpiar
    document.body.removeChild(link)
    URL.revokeObjectURL(url)

    toast.add({
      severity: 'success',
      summary: 'Datos exportados',
      detail: 'El archivo JSON se ha descargado correctamente',
      life: 3000,
    })
  } catch (error) {
    console.error(error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo exportar los datos',
      life: 3000,
    })
  }
}

const cargarDatos = async (event: FileUploadUploaderEvent) => {
  const file = (event.files as File[])[0]

  if (!file) {
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se seleccionó ningún archivo',
      life: 3000,
    })
    return
  }

  try {
    const text = await file.text()
    const jsonData = JSON.parse(text)

    if (jsonData.period && Array.isArray(jsonData.period)) {
      jsonData.period = jsonData.period.map((date: string) => new Date(date))
    }

    if (jsonData.extras && Array.isArray(jsonData.extras)) {
      jsonData.extras = jsonData.extras.map((extra: Extras) => ({
        ...extra,
      }))
    }

    emit('update:data', jsonData)

    toast.add({
      severity: 'success',
      summary: 'Datos importados',
      detail: 'Los datos se han cargado correctamente',
      life: 3000,
    })
  } catch (error) {
    console.error(error)
    toast.add({
      severity: 'error',
      summary: 'Error',
      detail: 'No se pudo leer el archivo JSON. Verifica que el formato sea correcto.',
      life: 3000,
    })
  }
}
</script>
