import type { CampDto } from '~~/types/camp'
import type { LocationDto } from '~~/types/location'

const config = useRuntimeConfig()

export function useCamps() {
  const create = async (
    payload: CampDto,
  ) => {
    try {
      const data: any = await $fetch(`${config.public.apiBase}/camps`, {
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
      const data: any = await $fetch(`${config.public.apiBase}/camps`, {
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
      const data: any = await $fetch(`${config.public.apiBase}/camps/${id}`, {
        method: 'GET',
        credentials: 'include',
      })
      return data
    }
    catch (error) {
      window.console.log(error)
    }
  }

  const addLocationByCampId = async (id: number, payload: LocationDto) => {
    try {
      const data: any = await $fetch(`${config.public.apiBase}/camps/${id}/location`, {
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
    payload: CampDto,
  ) => {
    const data: any = await $fetch(`${config.public.apiBase}/camps/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      body: payload,
    })
    return data
  }

  const deleteById = async (id: number) => {
    try {
      const data: any = await $fetch(`${config.public.apiBase}/camps/${id}`, {
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
    addLocationByCampId,
    update,
    deleteById,
  }
}
