import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAlertStore = defineStore('alert', () => {
  const alert = ref({
    message: '',
    color: '',
  })

  function setAlert(message: string, color: string) {
    alert.value.message = message
    alert.value.color = color
    setTimeout(clearAlert, 1000)
  }

  function clearAlert() {
    alert.value = {
      message: '',
      color: '',
    }
  }

  return {
    setAlert,
    alert,
  }
},
)

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useAlertStore as any, import.meta.hot))
