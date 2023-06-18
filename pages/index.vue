<script setup lang="ts">
const online = useOnline()
const router = useRouter()
</script>

<template>
  <div>
    <h2>Home</h2>
    <div class="flex justify-center">
      <button class="p-4" @click="router.push('/signup')">
        Sign Up
      </button>
      <button class="p-4" @click="router.push('/login')">
        Login
      </button>
      <button class="p-4" @click="router.push('/addYourCamp')">
        Add Your Camp
      </button>
    </div>
  </div>
</template>
