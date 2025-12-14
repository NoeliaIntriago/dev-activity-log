<template>
  <Card>
    <template #header>
      <h2>Información General</h2>
      <p>Selecciona el período y registra las actividades generales del reporte.</p>
    </template>

    <template #content>
      <!-- Sección: Período -->
      <div class="mb-4">
        <label class="font-bold mb-2 block">Período de Reporte</label>
        <Calendar
          class="w-full"
          :model-value="period"
          date-format="yy/M/dd"
          selection-mode="range"
          show-icon
          input-class="w-full"
          hide-on-range-selection
          :manual-input="false"
          touch-UI
          @update:model-value="updatePeriod"
        />
      </div>

      <!-- Sección: Actividades Generales -->
      <div class="mb-3">
        <label class="font-bold block mb-2">Actividades Generales</label>
        <ActivityForm @add="($event) => addActivity($event)" />
      </div>
      <div class="w-100" style="overflow-x: auto">
        <ActivityDataTable
          :activities="props.activities"
          @row-edit-save="onActivityEditComplete"
          @row-reorder="onRowReorder"
          @remove-activity="removeActivity"
        />
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { Activity } from '@/assets/types'
import type { DataTableRowEditSaveEvent, DataTableRowReorderEvent } from 'primevue/datatable'

import ActivityForm from '../ActivityForm.vue'
import ActivityDataTable from '../ActivityDataTable.vue'

const props = defineProps<{
  period: Date[]
  activities: Activity[]
}>()

const emit = defineEmits<{
  (e: 'update:period', value: Date[]): void
  (e: 'update:activities', value: Activity[]): void
}>()

const updatePeriod = (value: string | Date | Date[] | string[] | undefined) => {
  emit('update:period', value as Date[])
}

const addActivity = (activity: Activity) => {
  const updatedActivities = [...props.activities, activity]
  emit('update:activities', updatedActivities)
}

const removeActivity = (index: number) => {
  const updatedActivities = [...props.activities]
  updatedActivities.splice(index, 1)
  emit('update:activities', updatedActivities)
}

const onActivityEditComplete = (event: DataTableRowEditSaveEvent) => {
  const { newData, index } = event

  const updatedActivities = [...props.activities]
  updatedActivities[index] = newData
  emit('update:activities', updatedActivities)
}

const onRowReorder = (event: DataTableRowReorderEvent) => {
  const updatedActivities = event.value
  emit('update:activities', updatedActivities)
}
</script>
