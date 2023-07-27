<script setup lang="ts">
import { useArtStore } from '../../stores/arts'

const artStore = useArtStore()
</script>

<template>
  <div class="min-h-[80vh] flex items-center justify-center">
    <div v-if="!artStore.isLoading">
      <AddArtForm :art-list="artStore.data" />
    </div>
    <div v-else>
      <h2>Loading...</h2>
    </div>
  </div>
</template>
