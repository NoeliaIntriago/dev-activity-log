<template>
  <div class="col-12 lg:col-6">
    <label for="ownerName" class="font-bold"> Nombre del Responsable: </label>
    <InputText
      id="ownerName"
      :modelValue="owner"
      class="w-full"
      placeholder="Ingrese el nombre del responsable del reporte"
      @update:modelValue="$emit('update:owner', ($event || '').trim())"
    />
  </div>
  <div class="col-12 lg:col-6">
    <label for="ruc" class="font-bold"> RUC: </label>
    <InputText
      id="ruc"
      :modelValue="ruc"
      class="w-full"
      placeholder="Ingrese el RUC del responsable del reporte"
      @update:modelValue="$emit('update:ruc', ($event || '').trim())"
    />
  </div>
</template>

<script setup lang="ts">
defineProps<{
  owner: string
  ruc: string
}>()
</script>
