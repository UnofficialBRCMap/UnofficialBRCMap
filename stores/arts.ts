import { acceptHMRUpdate, defineStore } from 'pinia'
import type { ArtWithLocationDto } from 'types/art'
import type { LocationDto } from 'types/location'

import { useQuery } from 'vue-query'
import { useArts } from '~/composables/api/useArts'

const test: { [location: string]: ArtWithLocationDto[] } = {}

export const useArtStore = defineStore('arts', () => {
  const artApi = useArts()

  const { isLoading, refetch, isError, data, error } = useQuery({
    queryKey: ['allArts'],
    queryFn: artApi.getAll,
  })

  const locationsMap = ref(test)

  function getMapDictionary() {
    data.value.data.forEach((art: ArtWithLocationDto) => {
      if (art.locations.length > 0) {
        const mostRecent = getMostRecentArtLocation(art.locations)
        if (typeof locationsMap.value[mostRecent.string] === 'undefined')
          locationsMap.value[mostRecent.string] = []
        locationsMap.value[mostRecent.string].push(art)
      }
    })
  }

  // mostRecentLocation takes an array of locations and returns the most recently created one
  function getMostRecentArtLocation(locations: LocationDto[]) {
    let mostRecent = locations[0]
    locations.forEach((location: LocationDto) => {
      if (location.createdAt && mostRecent.createdAt) {
        if (Date.parse(location.createdAt) > Date.parse(mostRecent.createdAt))
          mostRecent = location
      }
    })
    return mostRecent
  }

  function getArtsAtLocation(location: string) {
    const arts: any[] = []
    for (const key in locationsMap.value) {
      if (key.includes(location))
        arts.push(locationsMap.value[key])
    }
    return arts
  }

  return {
    refetch,
    isError,
    data,
    error,
    isLoading,
    locationsMap,
    getArtsAtLocation,
    getMostRecentArtLocation,
    getMapDictionary,
  }
},
)

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useArtStore as any, import.meta.hot))
