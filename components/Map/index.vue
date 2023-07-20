<script setup>
import 'leaflet/dist/leaflet.css'
import { LGeoJson, LMap } from '@vue-leaflet/vue-leaflet'
import L from 'leaflet'
import { useCampStore } from '../../stores/camps'
import geoJson from './BurningMan.json'
import polygons from './Polygons.json'
import toilet from './toilet.png'

const pointerLocation = ref()
const selectedCamp = ref()
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

function sillyFix(bt, letter) {
  const n = new Date(0, 0)
  n.setSeconds(+bt * 60 * 60)
  let s = n.toTimeString().slice(0, 5)
  if (s.charAt(0) === '0')
    s = s.slice(1, 5)

  return `${s} & ${letter}`
}

const campStore = useCampStore()
console.log('campStore', campStore.camps.data)

function onEachFeature(feature, layer) {
  // Set the default style into layer
  // Set the highlight style into layer when 'mouseover'
  (function () {
    layer.setStyle(defaultStyle)
    layer.on('mouseover', () => {
      layer.setStyle(hoverStyle)
      hoverId = feature.properties.id
      pointerLocation.value = feature.properties.id
      console.log('pointer', feature.properties.id)
      console.log(campStore.getCampsAtLocation(sillyFix(feature.properties.blockTime, feature.properties.roadLetter)))
    })
    layer.on('click', () => {
      console.log('click', feature.properties.id)
      selectedCamp.value = feature.properties.id
    },
    )
    layer.on('mouseout', () => {
      layer.setStyle(defaultStyle)
    })
  })(layer, feature.properties)
}

const mapStyle = ref({
  color: '#192841',
  weight: 1,
  opacity: 1,
  fillOpacity: 1,
})

const polygonStyle = ref({
  color: '#AA4A44',
  weight: 1.5,
})

const polygonOptions = ref({
  onEachFeature,
})

const mapOptions = ref({
  pointToLayer(feature, latlng) {
    return L.marker(latlng, {
      icon: toiletIcon,
    })
  },
})

watch(campStore.camps, (newUsername) => {
  campStore.getMapDictionary()
  console.log('dict', campStore.locationsMap)
  // Do something with the updated value.
})
</script>

<template>
  <div style="height:600px; width:1000px; margin:auto;">
    {{ pointerLocation }}
    {{ selectedCamp }}
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
