import { useAuthStore } from '~~/stores/auth'

export function useAuthUser() {
  const authStore = useAuthStore()

  return authStore.user
}
