import { acceptHMRUpdate, defineStore } from 'pinia'
import type { LocationDto } from 'types/location'

import { useQuery } from 'vue-query'
import { useCamps } from '~/composables/api/useCamps'

const test: { [name: string]: string } = {}

export const useCampStore = defineStore('camps', () => {
  const campApi = useCamps()

  const { isLoading, refetch, isError, data, error } = useQuery({
    queryKey: ['allCamps'],
    queryFn: campApi.getAll,
  })

  const locationsMap = ref(test)

  const camps = ref({
    data,
    isLoading,
    isError,
    error,
    refetch,
  })

  function getMapDictionary() {
    camps.value.data.forEach((camp: any) => {
      if (camp.locations.length > 0) {
        const mostRecent = getMostRecentCampLocation(camp.locations)
        locationsMap.value[mostRecent.string] = camp.name
      }
    })
  }

  // mostRecentLocation takes an array of locations and returns the most recently created one
  function getMostRecentCampLocation(locations: LocationDto[]) {
    let mostRecent = locations[0]
    locations.forEach((location: LocationDto) => {
      if (location.createdAt && mostRecent.createdAt) {
        if (Date.parse(location.createdAt) > Date.parse(mostRecent.createdAt))
          mostRecent = location
      }
    })
    return mostRecent
  }

  function getCampsAtLocation(location: string) {
    console.log('inside getCampsAtLocation', location)
    const camps = []
    for (const key in locationsMap.value) {
      if (key.includes(location))
        camps.push(locationsMap.value[key])
    }
    return camps
  }

  return {
    camps,
    locationsMap,
    getCampsAtLocation,
    getMostRecentCampLocation,
    getMapDictionary,
  }
},
)

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCampStore as any, import.meta.hot))
