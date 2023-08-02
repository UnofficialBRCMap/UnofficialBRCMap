import { acceptHMRUpdate, defineStore } from 'pinia'
import type { CampWithLocationDto } from 'types/camp'
import type { LocationDto } from 'types/location'

import { useQuery } from 'vue-query'
import { useCamps } from '~/composables/api/useCamps'

const locationType: { [location: string]: CampWithLocationDto[] } = {}

export const useCampStore = defineStore('camps', () => {
  const campApi = useCamps()

  const locationsMap = ref(locationType)

  const { isLoading, refetch, isError, data, error } = useQuery({
    queryKey: ['allCamps'],
    queryFn: campApi.getAll,
  })

  const mapDictionary = computed(() => {
    if (data.value)
      return getMapDictionary(data.value)
  },
  )

  function getMapDictionary(campData: CampWithLocationDto[]) {
    campData.forEach((camp: CampWithLocationDto) => {
      if (camp.locations.length > 0) {
        const mostRecent = getMostRecentCampLocation(camp.locations)
        if (typeof locationsMap.value[mostRecent.string] === 'undefined')
          locationsMap.value[mostRecent.string] = []
        locationsMap.value[mostRecent.string].push(camp)
      }
    })
    return locationsMap.value
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

  function getCampsAtLocation(locations: string[], mapDictionary: any) {
    const dict: { [local: string]: CampWithLocationDto[] } = {}

    for (const location of locations) {
      console.log('location to search for', location)
      if (location) {
        if (Object.hasOwn(mapDictionary, location)) {
          for (const camp of mapDictionary[location]) {
            if (typeof dict[location] === 'undefined')
              dict[location] = [camp]
            else
              dict[location].push(camp)
          }
        }
      }
    }
    console.log('finished dict', dict)
    return dict
  }

  return {
    isLoading,
    isError,
    data,
    locationsMap,
    mapDictionary,
    getCampsAtLocation,
    getMostRecentCampLocation,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCampStore as any, import.meta.hot))
