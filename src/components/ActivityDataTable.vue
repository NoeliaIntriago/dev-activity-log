<template>
  <div>
    <DataTable
      :value="activities"
      v-model:editing-rows="editingRows"
      column-resize-mode="fit"
      edit-mode="row"
      resizable-columns
      reorderable-columns
      scrollable
      size="small"
      scroll-height="400px"
      :virtual-scroller-options="{ itemSize: 46 }"
      @row-edit-save="(event) => $emit('row-edit-save', event)"
      @row-reorder="(event) => $emit('row-reorder', event)"
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

      <Column :row-editor="true" style="width: 10%; min-width: 5rem" body-style="text-align:center">
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
            @click="$emit('remove-activity', slotProps.index)"
          />
        </template>
      </Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import type { Activity } from '@/assets/types'
import { ref } from 'vue'

const { activities } = defineProps<{
  activities: Activity[]
}>()

const editingRows = ref<Activity[]>([])
</script>
