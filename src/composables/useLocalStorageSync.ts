import { ref, watch, onMounted } from 'vue'

interface StoredItem<T> {
  data: T
  expiresAt?: number
}

export function useLocalStorageSync<T extends object>(
  key: string,
  defaultValue: T,
  options?: {
    parseDates?: (keyof T)[]
    ttl?: number // en milisegundos
  },
) {
  const state = ref<T>(structuredClone(defaultValue))
  const hasSavedData = ref(false)

  const save = () => {
    const rawData = JSON.parse(JSON.stringify(state.value)) // limpiar proxies
    const payload: StoredItem<T> = {
      data: rawData,
      expiresAt: options?.ttl ? Date.now() + options.ttl : undefined,
    }

    localStorage.setItem(key, JSON.stringify(payload))
    hasSavedData.value = true
  }

  const clear = () => {
    localStorage.removeItem(key)
    hasSavedData.value = false
    state.value = structuredClone(defaultValue)
  }

  const load = () => {
    const raw = localStorage.getItem(key)
    if (!raw) return

    try {
      const parsed = JSON.parse(raw)

      // 🔒 Verifica que tenga .data y no esté vencido
      const isValid =
        typeof parsed === 'object' &&
        parsed !== null &&
        'data' in parsed &&
        (!parsed.expiresAt || Date.now() <= parsed.expiresAt)

      if (!isValid) {
        clear()
        return
      }

      const rawData = parsed.data

      // 🧠 Parsear fechas si se indicó
      if (options?.parseDates) {
        for (const field of options.parseDates) {
          const val = rawData[field]
          if (Array.isArray(val)) {
            rawData[field] = val.map((v: string) => new Date(v)) as T[keyof T]
          }
        }
      }

      state.value = rawData
      hasSavedData.value = true
    } catch (e) {
      console.error('Error al parsear localStorageSync:', e)
      clear()
    }
  }

  onMounted(load)
  watch(state, save, { deep: true })

  return {
    state,
    save,
    clear,
    load,
    hasSavedData,
  }
}
