<script>
import 'leaflet/dist/leaflet.css'
import { LGeoJson, LMap } from '@vue-leaflet/vue-leaflet'
import geoJson from './BurningMan.json'

const geojsonMarkerOptions = {
  radius: 4,
  fillColor: '#ADD8E6',
  color: '#ADD8E6',
  weight: 1,
  opacity: 1,
  fillOpacity: 0.8,
}

export default {
  components: {
    LMap,
    LGeoJson,
  },
  data() {
    return {
      geoJson,
      myStyle: {
        color: '#192841',
        weight: 2,
        opacity: 1,
        fillOpacity: 1,
      },
      options: {
        pointToLayer(feature, latlng) {
          return L.circleMarker(latlng, geojsonMarkerOptions)
        },
      },
    }
  },
}
</script>

<template>
  <div style="height:600px; width:1000px; margin:auto;">
    <LMap
      ref="map"
      :zoom="13.5"
      :center="[40.787030, -119.202740]"
      :max-bounds="[[40.787030 + .03, -119.202740 + .05], [40.787030 - .03, -119.202740 - .05]]"
      :max-zoom="17"
      :min-zoom="13"
    >
      <LGeoJson
        :geojson="geoJson"
        :options-style="myStyle"
        :options="options"
        layer-type="base"
      />
    </LMap>
  </div>
</template>
