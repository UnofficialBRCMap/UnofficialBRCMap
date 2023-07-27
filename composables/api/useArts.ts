import type { ArtDto } from '~~/types/art'
import type { LocationDto } from '~~/types/location'

const config = useRuntimeConfig()

export function useArts() {
  const create = async (
    payload: ArtDto,
  ) => {
    try {
      const data: any = await $fetch(`${config.public.apiBase}/arts`, {
        method: 'POST',
        credentials: 'include',
        body: payload,
      })
      return data
    }
    catch (error) {
      window.console.log(error)
    }
  }

  const getAll = async () => {
    try {
      const data: any = await $fetch(`${config.public.apiBase}/arts`, {
        method: 'GET',
        credentials: 'include',
      })
      return data
    }
    catch (error) {
      window.console.log(error)
    }
  }

  const getById = async (id: number) => {
    try {
      const data: any = await $fetch(`${config.public.apiBase}/arts/${id}`, {
        method: 'GET',
        credentials: 'include',
      })
      return data
    }
    catch (error) {
      window.console.log(error)
    }
  }

  const addLocationByArtId = async (id: number, payload: LocationDto) => {
    try {
      const data: any = await $fetch(`${config.public.apiBase}/arts/${id}/location`, {
        method: 'POST',
        body: payload,
      })
      return data
    }
    catch (error) {
      window.console.log(error)
    }
  }

  const update = async (
    id: number,
    payload: ArtDto,
  ) => {
    const data: any = await $fetch(`${config.public.apiBase}/arts/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      body: payload,
    })
    return data
  }

  const deleteById = async (id: number) => {
    try {
      const data: any = await $fetch(`${config.public.apiBase}/arts/${id}`, {
        method: 'DELETE',
        credentials: 'include',
      })
      return data
    }
    catch (error) {
      window.console.log(error)
    }
  }

  return {
    create,
    getAll,
    getById,
    addLocationByArtId,
    update,
    deleteById,
  }
}
