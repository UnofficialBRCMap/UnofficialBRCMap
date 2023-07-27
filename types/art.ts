import type { LocationDto } from './location'

export interface ArtDto {
  name: string
  year: number
  description?: string
  website?: string
  url?: string
  contact_email?: string
  hometown?: string
}

export interface ArtWithLocationDto extends ArtDto {
  locations: LocationDto[]
}
