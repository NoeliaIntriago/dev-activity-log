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
            date-format="dd/mm/yy"
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
      </div>
      <div>
        <Accordion expandIcon="pi pi-plus" collapseIcon="pi pi-minus">
          <AccordionTab v-for="(extra, index) in props.extras" :key="index">
            <template #header>
              <Badge :value="moment(extra.date).format('YYYY/MMM/DD')" severity="secondary" />
              <span class="ml-2">{{ extra.activities.length }} actividades</span>

              <Button
                icon="pi pi-trash"
                class="p-button-danger p-button-outlined ml-auto"
                @click="removeExtra(index)"
              />
            </template>

            <ActivityForm @add="($event) => addActivity(index, $event)" />

            <div class="mt-2">
              <DataTable :value="extra.activities" resizable-columns>
                <template #empty>
                  <div class="flex justify-content-center">
                    <span class="text-muted p-3"
                      >No hay actividades registradas para esta fecha.</span
                    >
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
          </AccordionTab>
        </Accordion>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { Extras, Activity } from '@/assets/types'
import { ref, computed } from 'vue'

import ActivityForm from '../ActivityForm.vue'
import moment from 'moment'

const props = defineProps<{
  extras: Extras[]
}>()

const date = ref<Date | null>(null)
const emit = defineEmits<{
  (e: 'update:extras', newData: Extras[]): void
}>()

const disabledDates = computed(() => {
  return props.extras.map((extra) => new Date(extra.date))
})

const addExtra = () => {
  if (!date.value) {
    return
  }

  const updatedExtras = [...props.extras]
  updatedExtras.push({
    date: date.value,
    activities: [],
  })
  emit('update:extras', updatedExtras)
  date.value = null // Reset the date picker after adding
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

const removeActivity = (index: number) => {
  const updatedExtras = [...props.extras]
  updatedExtras.splice(index, 1)
  emit('update:extras', updatedExtras)
}
</script>
