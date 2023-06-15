import { useAuthStore } from '~~/stores/auth'

// const alertStore = useAlertStore()

const config = useRuntimeConfig()

export function useAuth() {
  const authStore = useAuthStore()

  const setUser = (user: any) => {
    authStore.user = user
  }

  const login = async (
    email: string,
    password: string,
  ) => {
    const data: any = await $fetch(`${config.public.apiBase}/auth/signin`, {
      method: 'POST',
      credentials: 'include',
      body: {
        email,
        password,
      },
    })
    return authStore.user
  }

  const verify = async (
    verificationCode: string,
  ) => {
    const data: any = await $fetch(`${config.public.apiBase}/auth/email/verify/${verificationCode}`, {
      method: 'GET',
      credentials: 'include',
    })
    return authStore.user
  }

  const signup = async (
    email: string,
    password: string,
  ) => {
    // console.log(email)
    const data: any = await $fetch(`${config.public.apiBase}/auth/signup`, {
      method: 'POST',
      credentials: 'include',
      body: {
        email,
        password,
      },
    })
    return authStore.user
  }

  const resetPassword = async (
    email: string,
    newPassword: string,
    newPasswordToken: string,
  ) => {
    const data: any = await $fetch(`${config.public.apiBase}/auth/email/reset-password`, {
      method: 'POST',
      credentials: 'include',
      body: {
        email,
        newPassword,
        newPasswordToken,
      },
    })
    return data
  }

  const requestReset = async (
    email: string,
  ) => {
    const data: any = await $fetch(`${config.public.apiBase}/auth/email/forgot-password/${email}`, {
      method: 'GET',
      credentials: 'include',
    })
    return data
  }

  const logout = async () => {
    authStore.user = {}
    window.location.reload()
  }

  const me = async () => {
    try {
      const data: any = await $fetch(`${config.public.apiBase}/user/me`, {
        method: 'GET',
        credentials: 'include',
      })
      await setUser(data)
    }
    catch (error) {
      window.console.log(error)
    //   alertStore.setAlert(error as string, 'bg-error')
    }

    return authStore.user
  }

  return {
    login,
    logout,
    signup,
    me,
    verify,
    resetPassword,
    requestReset,
  }
}
