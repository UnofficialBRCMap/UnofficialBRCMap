<script setup lang="ts">
import { useCampStore } from '../../stores/camps'

const campStore = useCampStore()

const { data, isLoading } = campStore.camps
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center">
    <div v-if="!isLoading">
      <AddCampForm :camp-list="data" />
    </div>
    <div v-else>
      <h2>Loading...</h2>
    </div>
  </div>
</template>
