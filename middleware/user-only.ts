import { useAuthStore } from '~~/stores/auth'

export default defineNuxtRouteMiddleware(async (_to, _from) => {
  const authStore = useAuthStore()
  if (!authStore.user.id) {
    // console.log('no user id, returning to login')
    return navigateTo({ name: 'login' })
  }
})
