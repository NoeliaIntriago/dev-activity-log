<template>
  <Card>
    <template #header>
      <h2>Fechas Adicionales</h2>
      <p>Agrega feriados, fines de semana u otras fechas con actividades específicas.</p>
    </template>

    <template #content>
      <div class="grid">
        <div class="col-12 lg:col-8">
          <Calendar
            v-model="date"
            date-format="yy/M/dd"
            class="w-full"
            show-icon
            :manual-input="false"
            :disabled-dates="disabledDates"
            touch-UI
          />
        </div>
        <div class="col-12 lg:col-4">
          <Button
            label="Agregar Fecha"
            icon="pi pi-plus"
            :disabled="date === null"
            class="p-button-outlined w-full"
            @click="addExtra"
          />
        </div>
      </div>

      <div>
        <h5>Fechas registradas: {{ props.extras.length }}</h5>
        <p class="text-sm text-muted" v-if="props.extras.length > 1">
          <i class="pi pi-info-circle"></i> Arrastra las tarjetas por el ícono
          <i class="pi pi-bars"></i> para reordenarlas
        </p>
      </div>

      <div class="drag-container">
        <VueDraggableNext
          v-model="draggableExtras"
          handle=".drag-handle"
          animation="200"
          class="flex flex-column gap-3"
        >
          <Card v-for="(extra, index) in draggableExtras" :key="extra.date" class="extra-card">
            <template #header>
              <div
                class="accordion-header flex align-items-center gap-3 cursor-pointer"
                @click="toggleCard(index)"
              >
                <i class="pi pi-bars drag-handle" style="cursor: grab" @click.stop></i>
                <Button
                  :icon="isExpanded(index) ? 'pi pi-chevron-down' : 'pi pi-chevron-right'"
                  text
                  rounded
                  size="small"
                  class="toggle-button"
                />
                <Badge :value="extra.date" severity="secondary" />
                <span class="ml-2" style="font-weight: 500"
                  >{{ extra.activities.length }} actividad(es)</span
                >
                <Button
                  icon="pi pi-trash"
                  text
                  rounded
                  size="small"
                  class="p-button-danger ml-auto"
                  @click.stop="removeExtra(index)"
                />
              </div>
            </template>

            <template #content>
              <div v-show="isExpanded(index)" class="card-content-wrapper">
                <div class="mb-3">
                  <ActivityForm @add="($event) => addActivity(index, $event)" />
                </div>

                <ActivityDataTable
                  :key="`table-${index}-${extra.activities.length}`"
                  :activities="extra.activities"
                  @row-edit-save="onActivityEditComplete"
                  @row-reorder="onRowReorder"
                  @remove-activity="removeActivity"
                />
              </div>
            </template>
          </Card>
        </VueDraggableNext>

        <div v-if="props.extras.length === 0" class="text-center py-5 text-muted">
          <i class="pi pi-calendar-plus" style="font-size: 3rem; opacity: 0.3"></i>
          <p class="mt-3">No hay fechas adicionales registradas.</p>
          <p class="text-sm">Usa el calendario arriba para agregar fechas.</p>
        </div>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { Extras, Activity } from '@/assets/types'
import type { DataTableRowEditSaveEvent, DataTableRowReorderEvent } from 'primevue/datatable'
import { ref, computed } from 'vue'

import { VueDraggableNext } from 'vue-draggable-next'

import ActivityForm from '../ActivityForm.vue'
import ActivityDataTable from '../ActivityDataTable.vue'
import { format } from 'date-fns'

const props = defineProps<{
  extras: Extras[]
}>()

const date = ref<Date | null>(null)
const expandedCards = ref<Set<number>>(new Set())

const emit = defineEmits<{
  (e: 'update:extras', newData: Extras[]): void
}>()

// Variable local para el draggable
const draggableExtras = computed({
  get: () => props.extras,
  set: (value) => emit('update:extras', value),
})

const toggleCard = (index: number) => {
  if (expandedCards.value.has(index)) {
    expandedCards.value.delete(index)
  } else {
    expandedCards.value.add(index)
  }
}

const isExpanded = (index: number) => {
  return expandedCards.value.has(index)
}

const disabledDates = computed(() => {
  return props.extras.map((extra) => new Date(extra.date))
})

const addExtra = () => {
  if (!date.value) {
    return
  }

  const updatedExtras = [...props.extras]
  updatedExtras.push({
    date: format(date.value, 'yyyy/MMM/dd'),
    activities: [],
  })
  emit('update:extras', updatedExtras)
  date.value = null
}

const removeExtra = (index: number) => {
  const updatedExtras = [...props.extras]
  updatedExtras.splice(index, 1)
  emit('update:extras', updatedExtras)
}

const addActivity = (index: number, activity: Activity) => {
  const updatedExtras = [...props.extras]
  updatedExtras[index] = {
    ...updatedExtras[index],
    activities: [...updatedExtras[index].activities, activity],
  }

  emit('update:extras', updatedExtras)
}

const removeActivity = (extraIndex: number, activityIndex: number) => {
  const updatedExtras = [...props.extras]
  updatedExtras[extraIndex] = {
    ...updatedExtras[extraIndex],
    activities: updatedExtras[extraIndex].activities.filter((_, i) => i !== activityIndex),
  }
  emit('update:extras', updatedExtras)
}

const onActivityEditComplete = (extraIndex: number, event: DataTableRowEditSaveEvent) => {
  const { newData, index } = event

  const updatedExtras = [...props.extras]
  updatedExtras[extraIndex] = {
    ...updatedExtras[extraIndex],
    activities: updatedExtras[extraIndex].activities.map((activity, i) =>
      i === index ? newData : activity,
    ),
  }
  emit('update:extras', updatedExtras)
}

const onRowReorder = (extraIndex: number, event: DataTableRowReorderEvent) => {
  const updatedExtras = [...props.extras]
  updatedExtras[extraIndex] = {
    ...updatedExtras[extraIndex],
    activities: event.value,
  }
  emit('update:extras', updatedExtras)
}
</script>

<style scoped>
.drag-container {
  min-height: 200px;
}

.extra-card {
  transition: all 0.2s ease;
  border: 1px solid #e5e7eb;
  margin-bottom: 0;
  padding: 0;
}

.extra-card:hover {
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
}

/* Estilo del header similar al acordeón */
.accordion-header {
  padding: 1rem 1.25rem;
  background-color: #f8f9fa;
  border-bottom: 1px solid #e5e7eb;
  transition: background-color 0.2s;
  user-select: none;
}

.accordion-header:hover {
  background-color: #e9ecef;
}

.drag-handle {
  color: #6c757d;
  font-size: 1rem;
  transition: color 0.2s;
  padding: 0.5rem;
}

.drag-handle:hover {
  color: #495057;
}

.drag-handle:active {
  cursor: grabbing !important;
}

.toggle-button {
  color: #6c757d;
  width: 2rem;
  height: 2rem;
}

.cursor-pointer {
  cursor: pointer;
}

/* Ajuste del contenido de la card */
.extra-card :deep(.p-card-body) {
  padding: 0;
}

.extra-card :deep(.p-card-content) {
  padding: 1.25rem;
}

.extra-card :deep(.p-card-header) {
  padding: 0;
}

.card-content-wrapper {
  animation: fadeIn 0.3s ease;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>
