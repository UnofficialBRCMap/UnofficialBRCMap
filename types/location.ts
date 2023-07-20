// I think location type is not required

export enum LocationType {
  CAMP,
  ART,
}

export interface LocationDto {
  campId?: string
  category?: string
  createdAt?: string
  dimensions?: string
  distance?: number
  frontage?: string
  gps_latitude?: number
  gps_longitude?: number
  hour?: number
  intersection?: string
  intersection_type?: string
  minute?: number
  string: string
  uid?: string
  updatedAt?: string
}
