<script setup lang="ts">
import { useCampStore } from '../../stores/camps'

const campStore = useCampStore()
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center">
    <div v-if="!campStore.isLoading">
      <AddCampForm :camp-list="campStore.data" />
    </div>
    <div v-else>
      <h2>Loading...</h2>
    </div>
  </div>
</template>
