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
    console.log('locationsMap', locationsMap.value)
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
    console.log('getCampsAtLocation', locations)
    const dict: { [local: string]: CampWithLocationDto[] } = {}

    for (const location of locations) {
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
    return dict
  }

  function formatBlockDisplayName(bt: any, letter: any) {
    if (!bt)
      return 'Welcome Home'

    if (letter <= 'F')
      return `${formatBlockAddress(bt, letter)} to ${formatBlockAddress(bt, letter, 30)}`
    return `${formatBlockAddress(bt, letter)} to ${formatBlockAddress(bt, letter, 15)}`
  }

  function formatBlockAddress(bt: any, letter: any, subtract: number = 0, inverted: boolean = false) {
    const n = new Date(0, 0)
    n.setSeconds(+bt * 60 * 60)
    n.setMinutes(n.getMinutes() - subtract)
    let s = n.toTimeString().slice(0, 5)
    if (s.charAt(0) === '0')
      s = s.slice(1, 5)

    if (inverted)
      return `${s} & ${letter}`

    return `${letter} & ${s}`
  }

  // getAllCampLocationOptions is a function that takes in a blockTime and roadLetter and returns all three versions for that block
  function getAllCampLocationOptions(blockTime: any, roadLetter: any) {
    if (roadLetter <= 'F') {
      return [
        formatBlockAddress(blockTime, roadLetter, 0, true),
        formatBlockAddress(blockTime, roadLetter),
        formatBlockAddress(blockTime, roadLetter, 15, true),
        formatBlockAddress(blockTime, roadLetter, 15, false),
      ]
    }
    return [
      formatBlockAddress(blockTime, roadLetter),
      formatBlockAddress(blockTime, roadLetter, 0, true),
    ]
  }

  return {
    isLoading,
    isError,
    data,
    locationsMap,
    mapDictionary,
    getCampsAtLocation,
    getMostRecentCampLocation,
    getAllCampLocationOptions,
    formatBlockDisplayName,
  }
})

if (import.meta.hot)
  import.meta.hot.accept(acceptHMRUpdate(useCampStore as any, import.meta.hot))
