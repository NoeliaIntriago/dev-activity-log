<template>
  <div class="col-12 lg:col-6">
    <label for="ownerName" class="font-bold"> Nombre del Responsable: </label>
    <InputText
      id="ownerName"
      v-model="ownerName"
      class="w-full"
      placeholder="Ingrese el nombre del responsable del reporte"
      @blur="$emit('update:owner', ownerName.trim())"
    />
  </div>
  <div class="col-12 lg:col-6">
    <label for="ruc" class="font-bold"> RUC: </label>
    <InputText
      id="ruc"
      v-model="ownerRuc"
      class="w-full"
      placeholder="Ingrese el RUC del responsable del reporte"
      @blur="$emit('update:ruc', ownerRuc.trim())"
    />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

defineProps<{
  owner: string
  ruc: string
}>()

const ownerName = ref<string>('')
const ownerRuc = ref<string>('')
</script>
