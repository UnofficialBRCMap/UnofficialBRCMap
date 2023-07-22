import { acceptHMRUpdate, defineStore } from 'pinia'
import type { CampWithLocationDto } from 'types/camp'
import type { LocationDto } from 'types/location'

import { useQuery } from 'vue-query'
import { useCamps } from '~/composables/api/useCamps'

const test: { [location: string]: CampWithLocationDto[] } = {}

export const useCampStore = defineStore('camps', () => {
  const campApi = useCamps()

  const { isLoading, refetch, isError, data, error } = useQuery({
    queryKey: ['allCamps'],
    queryFn: campApi.getAll,
  })

  const locationsMap = ref(test)

  function getMapDictionary() {
    data.value.data.forEach((camp: CampWithLocationDto) => {
      if (camp.locations.length > 0) {
        const mostRecent = getMostRecentCampLocation(camp.locations)
        if (typeof locationsMap.value[mostRecent.string] === 'undefined')
          locationsMap.value[mostRecent.string] = []
        locationsMap.value[mostRecent.string].push(camp)
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
    const camps: any[] = []
    for (const key in locationsMap.value) {
      if (key.includes(location))
        camps.push(locationsMap.value[key])
    }
    return camps
  }

  return {
    refetch,
    isError,
    data,
    error,
    isLoading,
    locationsMap,
    getCampsAtLocation,
    getMostRecentCampLocation,
    getMapDictionary,
  }
},
)

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCampStore as any, import.meta.hot))
