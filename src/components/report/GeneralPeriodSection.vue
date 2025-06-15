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
          :modelValue="period"
          date-format="yy/M/dd"
          selection-mode="range"
          show-icon
          input-class="w-full"
          hide-on-range-selection
          :manual-input="false"
          touch-UI
          @update:modelValue="updatePeriod"
        />
      </div>

      <!-- Sección: Actividades Generales -->
      <div class="mb-3">
        <label class="font-bold block mb-2">Actividades Generales</label>

        <ActivityForm @add="($event) => addActivity($event)" />
        <div>
          <DataTable :value="props.activities" resizable-columns>
            <template #empty>
              <div class="flex justify-content-center">
                <span class="text-muted p-3">No hay actividades registradas.</span>
              </div>
            </template>
            <Column field="title" header="Título" />
            <Column field="description" header="Descripción" />
            <Column header="">
              <template #body="slotProps">
                <Button
                  icon="pi pi-trash"
                  class="p-button-danger p-button-outlined"
                  @click="removeActivity(slotProps.index)"
                />
              </template>
            </Column>
          </DataTable>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { Activity } from '@/assets/types'

import ActivityForm from '../ActivityForm.vue'

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
</script>
