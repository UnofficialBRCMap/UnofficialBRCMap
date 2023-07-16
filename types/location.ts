export enum LocationType {
  CAMP,
  ART,
}

export interface LocationDto {
  string?: string
  frontage?: string
  intersection?: string
  intersection_type?: string
  dimensions?: string
  hour?: number
  minute?: number
  distance?: number
  category?: string
  gps_latitude?: number
  gps_longitude?: number
}
