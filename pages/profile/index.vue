<script setup lang="ts">
import { useAuthStore } from '../../stores/auth'

const authStore = useAuthStore()
definePageMeta({
  middleware: ['user-only'],
})
const currentUser = authStore.user
</script>

<template>
  <h2>Congrats! You made it!</h2>
  <pre>
    {{ currentUser }}
  </pre>
</template>
