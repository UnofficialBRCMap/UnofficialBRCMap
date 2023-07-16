<script setup lang="ts">
import { useQuery } from 'vue-query'
import { useCamps } from '~/composables/api/useCamps'

const { getAll } = useCamps()

const { isLoading, refetch, isError, data, error } = useQuery({
  queryKey: ['allCamps'],
  queryFn: getAll,
})
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
