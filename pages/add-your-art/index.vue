<script setup lang="ts">
import { useCampStore } from '../../stores/camps'

const campStore = useCampStore()
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center">
    <div class="flex flex-col">
      <h2>Coming Soon!!</h2>
      <p>Thank you for being patient as we build a new Unofficial BRC Map</p>
    </div>
    <!-- <div v-if="!campStore.isLoading">
      <AddCampForm :camp-list="campStore.data" />
    </div>
    <div v-else>
      <h2>Loading...</h2>
    </div> -->
  </div>
</template>
