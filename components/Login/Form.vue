<script setup lang="ts">
import { useMutation } from 'vue-query'
import { useAuth } from '~/composables/auth/useAuth'

const router = useRouter()
const { me, login } = useAuth()

const credentials = ref({})

function useAddTodoMutation() {
  return useMutation((newTodo: any) => login(newTodo.email, newTodo.password),
    {
      onSuccess: (data: any, variables, context) => {
        me().then(() => {
          router.push('/profile')
        })
      },
      onSettled: (data, error, variables, context) => {
      // I will fire first
      },
    })
}

const { isLoading, isError, error, isSuccess, mutate } = useAddTodoMutation()

function addTodo() {
  mutate(credentials.value)
}
</script>

<template>
  <div class="flex flex-col">
    <FormKit v-model="credentials" type="form" @submit="addTodo">
      <h2 class="mx-4">
        Sign In!
      </h2>
      <FormKit
        type="email"
        name="email"
        label="Email address"
        validation="email"
        validation-visibility="live"
      />
      <FormKit
        type="password"
        name="password"
        label="Password"
        validation="required|?length:4"
        :validation-messages="{
          length: 'Try to make your password longer!',
        }"
      />
    </FormKit>
    <NuxtLink to="/forgot">
      <h4>Forgot password? Click Here</h4>
    </NuxtLink>
  </div>
  <span v-if="isLoading">Signing In...</span>
  <span v-else-if="isError">An error occurred: {{ error }}</span>
  <span v-else-if="isSuccess">Signed In!</span>
</template>
