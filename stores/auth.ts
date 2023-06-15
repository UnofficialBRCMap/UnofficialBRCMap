import { acceptHMRUpdate, defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', () => {
  /**
   * Current name of the user.
   */
  const user = ref<any>({})

  function setToken(authToken: string) {
  }

  return {
    setToken,
    user,
  }
},
)

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useUserStore as any, import.meta.hot))
