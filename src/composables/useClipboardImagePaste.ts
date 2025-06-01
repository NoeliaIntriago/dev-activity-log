import { onMounted, onBeforeUnmount } from 'vue'

export function useClipboardImagePaste(pushBase64: (base64: string) => void) {
  const handlePaste = (event: ClipboardEvent) => {
    const items = event.clipboardData?.items
    if (!items) return

    for (const item of items) {
      if (item.type.startsWith('image')) {
        const file = item.getAsFile()
        if (file) {
          const reader = new FileReader()
          reader.onload = () => {
            if (reader.result) pushBase64(reader.result as string)
          }
          reader.readAsDataURL(file)
        }
      }
    }
  }

  onMounted(() => {
    window.addEventListener('paste', handlePaste)
  })

  onBeforeUnmount(() => {
    window.removeEventListener('paste', handlePaste)
  })
}
