<template>
  <Message :closable="false" severity="info" class="mb-4">
    <span class="font-bold">Resumen de Actividades</span>
    <ul>
      <li><strong>Período:</strong> {{ period }}</li>
      <li><strong>Total de Actividades:</strong> {{ data.activities.length }}</li>
      <li><strong>Fechas Adicionales:</strong> {{ data.extras.length }}</li>
      <li>
        <strong>Total Actividades Adicionales:</strong>
        {{ data.extras.reduce((sum, extra) => sum + extra.activities.length, 0) }}
      </li>
    </ul>
  </Message>
</template>

<script setup lang="ts">
import type { PdfData } from '@/assets/types'
import { format } from 'date-fns'

import { computed } from 'vue'

const props = defineProps<{
  data: PdfData
}>()

const period = computed(() => {
  if (props.data.period === null || props.data.period.length < 2) return 'No definido'
  return `${format(props.data.period[0], 'yyyy-MM-dd')} - ${format(props.data.period[1], 'yyyy-MM-dd')}`
})
</script>
