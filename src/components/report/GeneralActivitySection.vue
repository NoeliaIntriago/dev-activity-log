<template>
  <Card>
    <template #header>
      <h2>Actividades Generales</h2>
      <p>Lista las actividades principales realizadas durante todo el período.</p>
    </template>

    <template #content>
      <div class="grid">
        <div class="col-12 lg:col-4">
          <InputText
            id="descripcion"
            v-model="activity.title"
            type="text"
            class="w-full"
            placeholder="Título de la actividad"
          />
        </div>
        <div class="col-12 lg:col-8">
          <Textarea
            v-model="activity.description"
            rows="5"
            class="w-full"
            placeholder="Descripción de la actividad"
          />
        </div>
      </div>
      <div class="flex justify-content-end mb-2">
        <Button label="Agregar" icon="pi pi-plus" class="p-button-outlined" @click="addActivity" />
      </div>
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
                @click="emit('remove-activity', slotProps.rowIndex)"
              />
            </template>
          </Column>
        </DataTable>
      </div>
    </template>
  </Card>
</template>

<script setup lang="ts">
import type { Activity } from './types'
import { ref } from 'vue'

const activity = ref<Activity>({
  title: '',
  description: '',
})

const props = defineProps<{
  activities: Activity[]
}>()
const emit = defineEmits<{
  (e: 'add-activity', activity: Activity): void
  (e: 'remove-activity', index: number): void
}>()

const addActivity = () => {
  if (activity.value.title && activity.value.description) {
    // Emit the activity to the parent component
    emit('add-activity', { ...activity.value })
    // Reset the activity object
    activity.value = { title: '', description: '' }
  } else {
    alert('Por favor completa todos los campos.')
  }
}
</script>
