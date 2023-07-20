import type { LocationDto } from './location'

export interface CampDto {
  name: string
  year: number
  description?: string
  website?: string
  url?: string
  contact_email?: string
  hometown?: string
}

export interface CampWithLocationDto extends CampDto {
  locations: LocationDto[]
}
