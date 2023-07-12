<script>
import 'leaflet/dist/leaflet.css'
import { LGeoJson, LMap } from '@vue-leaflet/vue-leaflet'
import L from 'leaflet'
import geoJson from './BurningMan.json'
import polygons from './Polygons.json'
import toilet from './toilet.png'

const hoverStyle = {
  fillOpacity: 0.9,
}

const defaultStyle = {
  fillOpacity: 0.4,
}

const toiletIcon = new L.Icon({
  iconUrl: toilet,
  iconSize: [17, 17],
})

let hoverId

const onEachFeature = function (feature, layer) {
  // Set the default style into layer
  // Set the highlight style into layer when 'mouseover'
  (function () {
    layer.setStyle(defaultStyle)
    layer.on('mouseover', () => {
      layer.setStyle(hoverStyle)
      hoverId = feature.properties.id
      console.log(feature.properties.id)
    })
    layer.on('mouseout', () => {
      layer.setStyle(defaultStyle)
    })
  })(layer, feature.properties)
}

export default {
  components: {
    LMap,
    LGeoJson,
  },
  data() {
    return {
      geoJson,
      polygons,
      mapStyle: () => ({
        color: '#192841',
        weight: 1,
        opacity: 1,
        fillOpacity: 1,
      }),
      polygonStyle: () => ({
        color: '#AA4A44',
        weight: 1.5,
      }),
      polygonOptions: { onEachFeature },
      mapOptions: {
        pointToLayer(feature, latlng) {
          return L.marker(latlng, {
            icon: toiletIcon,
          })
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
        :options-style="mapStyle"
        :options="mapOptions"
        layer-type="base"
      />
      <LGeoJson
        :geojson="polygons"
        :options-style="polygonStyle"
        :options="polygonOptions"
        :on-each-feature="onEachFeature"
        layer-type="overlay"
      />
    </LMap>
  </div>
</template>
