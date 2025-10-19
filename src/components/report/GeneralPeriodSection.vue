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

        <div>
          <DataTable
            :value="props.activities"
            v-model:editing-rows="editingRows"
            column-resize-mode="fit"
            edit-mode="row"
            resizable-columns
            reorderable-columns
            scrollable
            size="small"
            scroll-height="400px"
            :virtual-scroller-options="{ itemSize: 46 }"
            @row-edit-save="onActivityEditComplete"
            @row-reorder="onRowReorder"
          >
            <template #empty>
              <div class="flex justify-content-center">
                <span class="text-muted p-3">No hay actividades registradas.</span>
              </div>
            </template>

            <Column row-reorder header-style="width: 3rem" :reorderable-column="false" />

            <Column field="title" header="Título" style="min-width: 20rem; width: 35rem">
              <template #editor="{ data, field }">
                <InputText
                  v-model="data[field]"
                  type="text"
                  class="w-full"
                  placeholder="Título de la actividad"
                />
              </template>
              <template #body="{ data, field }">
                <span>{{ data[field] }}</span>
              </template>
            </Column>

            <Column field="description" header="Descripción">
              <template #editor="{ data, field }">
                <Textarea
                  v-model="data[field]"
                  rows="2"
                  class="w-full"
                  placeholder="Descripción de la actividad"
                />
              </template>
              <template #body="{ data, field }">
                <span>{{ data[field] }}</span>
              </template>
            </Column>

            <Column
              :row-editor="true"
              style="width: 10%; min-width: 5rem"
              body-style="text-align:center"
            >
              <template #roweditoriniticon>
                <i class="pi pi-pencil" style="color: goldenrod"></i>
              </template>
              <template #roweditorsaveicon>
                <i class="pi pi-save" style="color: green"></i>
              </template>
              <template #roweditorcancelicon>
                <i class="pi pi-times" style="color: red"></i>
              </template>
            </Column>

            <Column style="width: 5rem">
              <template #body="slotProps">
                <Button
                  icon="pi pi-trash"
                  text
                  severity="danger"
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
import type { DataTableRowEditSaveEvent, DataTableRowReorderEvent } from 'primevue/datatable'

import ActivityForm from '../ActivityForm.vue'
import { ref } from 'vue'

const props = defineProps<{
  period: Date[]
  activities: Activity[]
}>()

const emit = defineEmits<{
  (e: 'update:period', value: Date[]): void
  (e: 'update:activities', value: Activity[]): void
}>()

// Estado local para editar las filas de la tabla
const editingRows = ref<Activity[]>([])

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
