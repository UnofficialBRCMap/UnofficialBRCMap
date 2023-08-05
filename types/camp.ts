import type { LocationDto } from './location'

export interface CampDto {
  uid: string
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

export interface LocationDictionary {
  [location: string]: CampWithLocationDto[]
}
