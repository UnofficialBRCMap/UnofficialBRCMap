<script setup lang="ts">
import { useAlertStore } from './stores/alert'
import { appName } from '~/constants'

const alertStore = useAlertStore()

useHead({
  title: appName,
})
</script>

<template>
  <VitePwaManifest />
  <NuxtLayout>
    <Transition>
      <div v-if="alertStore.alert.message" class="top-of-the-world w-full flex justify-center">
        <div
          class="relative border rounded px-4 py-3"
          :class="`bg-${alertStore.alert.color}-100 border-${alertStore.alert.color}-500 text-${alertStore.alert.color}-700`"
          role="alert"
        >
          <span class="block sm:inline">{{ alertStore.alert.message }}</span>
          <span class="absolute bottom-0 right-0 top-0 px-4 py-3">
            <svg class="h-6 w-6 fill-current text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z" /></svg>
          </span>
        </div>
      </div>
    </Transition>
    <NuxtPage />
  </NuxtLayout>
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}

html.dark {
  background: #222;
  color: white;
}
</style>
