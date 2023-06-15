<script setup lang="ts">
import { useMutation } from 'vue-query'
import { useAuth } from '~/composables/auth/useAuth'

const { me, signup } = useAuth()
const router = useRouter()
const formData = ref({
  email: 'me@adnan.io',
  password: 'password',
  confirmPassword: 'password',
})

function useLoginMutation() {
  return useMutation((form: any) => signup(form.email, form.password),
    {
      onSuccess: async (data: any, variables, context) => {
        await me().then(() => {
          router.push('/profile')
        })
      },
      onSettled: (data, error, variables, context) => {
      // I will fire first
      },
    })
}
const { isLoading, isError, error, isSuccess, mutate } = useLoginMutation()

function submitSignup() {
  mutate(formData.value)
}
</script>

<template>
  <div class="flex border p-3">
    <div class="bg-base-100 w-1/2 flex flex-col gap-10 p-10">
      <div class="flex flex-col items-start">
        <p>Sign up</p>
        <p>Welcome</p>
      </div>
      <div>
        <FormKit v-model="formData" type="form" @submit="submitSignup">
          <FormKit
            type="email"
            name="email"
            label="email"
            placeholder="email"
          />
          <FormKit
            type="password"
            name="password"
            label="password"
            placeholder="password"
          />
          <FormKit
            type="password"
            name="confirmPassword"
            label="password"
            placeholder="password"
          />
        </FormKit>
      </div>
    </div>
    <div class="w-1/2 rounded bg-slate-400" />
  </div>
</template>
