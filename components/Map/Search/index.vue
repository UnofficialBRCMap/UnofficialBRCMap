<script lang="ts">
import { computed, ref } from 'vue'
import { useCampStore } from '../../../stores/camps'

export default {
  name: 'SearchComponent',
  setup() {
    const campStore = useCampStore()
    const query = ref('')
    const campList = campStore.campList

    const filteredCamps = computed(() => {
      if (!query.value)
        return campList.value
      return campList.value.filter(obj => obj.name.toLowerCase().includes(query.value.toLowerCase()))
    })

    const search = () => {} // This is just to re-compute the filteredCamps when the input changes.

    return {
      query,
      filteredCamps,
      search,
    }
  },
}
</script>

<template>
  <div>
    <input v-model="query" placeholder="Search by name..." @input="search">
    <ul v-if="filteredCamps.length">
      <li v-for="obj in filteredCamps" :key="obj.id">
        {{ obj.name }} - {{ obj.description }}
      </li>
    </ul>
    <p v-else>
      No results found.
    </p>
  </div>
</template>

  <style scoped>
    input {
      width: 100%;
      padding: 0.5rem;
      border: 1px solid #ccc;
      border-radius: 4px;
      margin-bottom: 0.5rem;
    }
  </style>
