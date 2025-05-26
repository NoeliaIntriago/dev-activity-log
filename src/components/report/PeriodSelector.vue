<template>
  <Card>
    <template #header>
      <h2>Período de Reporte</h2>
      <p>Define el rango de fechas para tu reporte (ej. quincena).</p>
    </template>

    <template #content>
      <div class="flex justify-content-center">
        <Calendar
          v-model="dates"
          date-format="dd/mm/yy"
          selection-mode="range"
          show-icon
          hide-on-range-selection
          :manual-input="false"
          touch-UI
          @hide="() => $emit('update-period', dates)"
        />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const dates = ref<Date[]>([])
</script>
