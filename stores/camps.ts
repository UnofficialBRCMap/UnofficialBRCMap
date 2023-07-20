import { acceptHMRUpdate, defineStore } from 'pinia'
import type { CampWithLocationDto } from 'types/camp'
import type { LocationDto } from 'types/location'

import { useQuery } from 'vue-query'
import { useCamps } from '~/composables/api/useCamps'

const mapDictonary: Record<string, string> = {}

export const useCampStore = defineStore('camps', () => {
  const campApi = useCamps()

  const { isLoading, refetch, isError, data, error } = useQuery({
    queryKey: ['allCamps'],
    queryFn: campApi.getAll,
  })

  const locationsMap = ref(mapDictonary)

  const camps = ref({
    data,
    isLoading,
    isError,
    error,
    refetch,
  })

  // mostRecentLocation takes an array of locations and returns the most recently created one
  function getMostRecentCampLocation(locations: LocationDto[]) {
    let mostRecent = locations[0]
    locations.forEach((location: LocationDto) => {
      if (location.createdAt && mostRecent.createdAt) {
        if (location.createdAt > mostRecent.createdAt)
          mostRecent = location
      }
    })
    return mostRecent
  }

  function getCampsAtLocation(location: string) {
    const camps = []
    for (const key in locationsMap.value) {
      console.log('key and location', key, location)
      if (key.includes(location))
        camps.push(locationsMap.value[key])
    }
    return camps
  }

  if (camps.value.data) {
    camps.value.data.forEach((camp: CampWithLocationDto) => {
      if (camp.locations) {
        const mostRecent = getMostRecentCampLocation(camp.locations)
        locationsMap.value[mostRecent.string] = camp.name
      }
    })
  }

  return {
    camps,
    locationsMap,
    getCampsAtLocation,
    getMostRecentCampLocation,
  }
},
)

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCampStore as any, import.meta.hot))
