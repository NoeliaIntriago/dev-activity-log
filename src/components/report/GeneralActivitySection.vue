<template>
  <Card>
    <template #header>
      <h2>Actividades Generales</h2>
      <p>Lista las actividades principales realizadas durante todo el período.</p>
    </template>

    <template #content>
      <ActivityForm @add="($event) => $emit('add-activity', $event)" />
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
                @click="$emit('remove-activity', slotProps.rowIndex)"
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

import ActivityForm from '../ActivityForm.vue'

const props = defineProps<{
  activities: Activity[]
}>()
</script>
