<template>
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
</template>

<script setup lang="ts">
import type { Activity } from './types'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'

const toast = useToast()

const activity = ref<Activity>({
  title: '',
  description: '',
})

const emit = defineEmits<{
  (e: 'add', activity: Activity): void
}>()

const addActivity = () => {
  if (activity.value.title.trim() === '' || activity.value.description.trim() === '') {
    toast.add({
      severity: 'warn',
      summary: 'Atención',
      detail: 'Déjate de vainas, el título o la descripción están vacíos',
      life: 3000,
    })
    return
  }

  emit('add', { ...activity.value })
  activity.value = { title: '', description: '' } // Reset the form
}
</script>
