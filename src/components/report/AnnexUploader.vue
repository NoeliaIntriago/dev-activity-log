<template>
  <div class="grid gap-3 mt-3">
    <div class="col-12">
      <FileUpload
        mode="basic"
        name="images"
        accept="image/*"
        multiple
        :maxFileSize="1000000"
        :auto="true"
        :customUpload="true"
        choose-label="Adjuntar Anexos"
        @select="onSelect"
      />
    </div>

    <!-- Previsualización -->
    <div class="col-12 flex gap-3 flex-wrap">
      <div
        v-for="(img, index) in annexes"
        :key="index"
        class="relative border-round surface-border"
        style="width: 250px"
      >
        <img :src="img" class="w-full border-round" style="max-height: 150px; object-fit: cover" />
        <Button
          icon="pi pi-trash"
          class="p-button-rounded p-button-danger p-button-sm absolute"
          style="top: 4px; right: 4px; width: 40px; height: 40px"
          @click="removeImage(index)"
        />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useClipboardImagePaste } from '@/composables/useClipboardImagePaste'
import { convertToBase64 } from '@/utils/fileHandler'
import type { FileUploadSelectEvent } from 'primevue/fileupload'

const props = defineProps<{ annexes: string[] }>()
const emit = defineEmits<{
  (e: 'update:annexes', value: string[]): void
}>()

const onSelect = async (event: FileUploadSelectEvent) => {
  const files = event.files as File[]
  const base64List = await Promise.all(files.map(convertToBase64))
  const updatedAnnexes = [...props.annexes, ...(base64List as string[])]
  emit('update:annexes', updatedAnnexes)
}

const removeImage = (index: number) => {
  const newAnnexes = [...props.annexes]
  newAnnexes.splice(index, 1)
  emit('update:annexes', newAnnexes)
}

useClipboardImagePaste((base64) => {
  const updated = [...props.annexes, base64]
  emit('update:annexes', updated)
})
</script>
