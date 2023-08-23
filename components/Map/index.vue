<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { LGeoJson, LMap, LMarker, LPolyline } from '@vue-leaflet/vue-leaflet'
import L from 'leaflet'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCardTitle,
  CCloseButton,
  CContainer,
  CNav,
  CNavItem,
  CNavbar,
} from '@coreui/vue'
import { ref } from 'vue'
import { useCampStore } from '../../stores/camps'
import { centerCampPolyLines, clockPolyLines, streets } from './Streets'
import Accordion from './Accordion/index.vue'
import SearchComponent from './Search/index.vue'

// import geoJson from './BurningMan.json'
import polygons from './Polygons.json'
import toilet from './toilet.png'
import marker from './marker.png'
import '@coreui/coreui/dist/css/coreui.min.css'

const pointerLocation = ref()
const hoverStyle = {
  fillOpacity: 0.9,
  color: '#AA4A44',
}
const center = [40.786400, -119.203500]
const centerCamp = [40.78052685763084, -119.21122602690583]
const greetersGap = [40.773203, -119.220953]
const polyline = {
  latlngs: [
    [40.782814, -119.233566],
    [40.807028, -119.217274],
    [40.802722, -119.181931],
    [40.775857, -119.176407],
    [40.763558, -119.208301],
    [40.782814, -119.233566],
  ],
  color: 'red',
}

const streetColor = 'black'
const centerCampColor = 'blue'

const defaultStyle = {
  fillOpacity: 0.6,
  color: '#961f12',
  fillColor: '#ba5545',
  weight: 0,
}

const selectedStyle = {
  fillOpacity: 0.8,
  fillColor: '#26547C',
}

const toiletIcon = new L.Icon({
  iconUrl: toilet,
  iconSize: [14, 14],
})

const markerIcon = new L.Icon({
  iconUrl: marker,
  iconSize: [14, 14],
})

const selectedCamp = ref()
const blockId = ref({
  id: undefined,
  blockTime: undefined,
  roadLetter: undefined,
})
const showPolygons = ref(true)
const block = ref(undefined)
const map = ref(undefined)
const campStore = useCampStore()
const campList = campStore.campList
const zoom = 14
// const algolia = useAlgoliaRef()

const clearBlock = function () {
  blockId.value = {
    id: undefined,
    blockTime: undefined,
    roadLetter: undefined,
  }
  block.value.setStyle(defaultStyle)
  selectedCamp.value = null
}

const onEachFeature = function (feature: any, layer: any) {
  (() => {
    layer.on('mouseover', () => {
      layer.setStyle(hoverStyle)
      const hoverId = feature.properties.id
    })
    layer.on('mouseout', () => {
      if (feature.properties.id !== blockId.value.id)
        layer.setStyle(defaultStyle)
    })
    layer.on('click', () => {
      console.log('what\'s the id', feature.properties.id)
      console.log('mapDictionary', campStore.mapDictionary)

      if (campStore.mapDictionary) {
        const campId = campStore.formatBlockAddress(feature.properties.blockTime, feature.properties.roadLetter, 0, true)
        console.log('campId', campId)
        const camps = campStore.mapDictionary[campId]

        console.log('camps', camps)
        camps.forEach((camp) => {
          if (camp.locations) {
            const currentLocation = campStore.getMostRecentCampLocation(camp.locations)
            console.log('marker for', camp.name)
            if (currentLocation.gps_latitude && currentLocation.gps_longitude) {
              L.marker([currentLocation.gps_latitude, currentLocation.gps_longitude], {
                icon: markerIcon,
                // YOU CAN'T BE UNDEFINED I HATE YOU AND IT BULDS ANYWAY
              }).addTo(map.value)
            }
          }
        })
      }

      selectedCamp.value = campStore.getCampsAtLocation(campStore.getAllCampLocationOptions(feature.properties.blockTime, feature.properties.roadLetter), campStore.mapDictionary)
      // remove selectedStyle from the previous block
      if (block.value)
        block.value.setStyle(defaultStyle)
      layer.setStyle(selectedStyle)
      block.value = layer
      blockId.value = {
        id: feature.properties.id,
        blockTime: feature.properties.blockTime,
        roadLetter: feature.properties.roadLetter,
      }
      const newCenter = [(layer._bounds._northEast.lat + layer._bounds._southWest.lat) / 2, (layer._bounds._northEast.lng + layer._bounds._southWest.lng) / 2]
      map.value.setView(newCenter, 16)
    })

    const { id } = feature.properties.id
    console.log('what\'s the id', id)
    console.log('mapDictionary', campStore.mapDictionary)

    if (campStore.mapDictionary) {
      const camps = campStore.mapDictionary[id]

      console.log('camps', camps)
      camps.forEach((camp) => {
        if (camp.locations) {
          const currentLocation = campStore.getMostRecentCampLocation(camp.locations)
          console.log('marker for', camp.name)
          if (currentLocation.gps_latitude && currentLocation.gps_longitude) {
            L.marker([currentLocation.gps_latitude, currentLocation.gps_longitude], {
              icon: markerIcon,
            // YOU CAN'T BE UNDEFINED I HATE YOU AND IT BULDS ANYWAY
            }).addTo(map.value)
          }
        }
      })
    }
  })()
}

function handleZoom(zoom: any) {
  showPolygons.value = zoom < 17
}

const mapOptions = {
  pointToLayer(__: any, latlng: any) {
    return L.marker(latlng, {
      icon: toiletIcon,
    })
  },
}

const mapStyle = ({
  color: '#192841',
  weight: 1.5,
  opacity: 1,
  fillOpacity: 1,
})

const polygonOptions = { onEachFeature }

const { result, search } = useAlgoliaSearch('camps') // pass your index name as param
onMounted(async () => {
  await search({ query: 'burning globe' })
})
</script>

<template>
  <!-- <pre>
    {{ result.hits }}
  </pre> -->
  <CContainer md class="inline w-[60vw]">
    <div class="h-[60vh] w-full md:flex">
      <div style="width: 100vw;" :class="selectedCamp ? 'h-[50vh]' : 'h-[90vh] md:h-[50vh]'">
        <CNavbar expand="lg" class="inline">
          <template>
            <div id="app">
              <SearchComponent />
            </div>
          </template>
        </CNavbar>
        <LMap
          :zoom="zoom"
          :center="center"
          :max-bounds="[[40.787030 + .03, -119.202740 + .05], [40.787030 - .03, -119.202740 - .05]]"
          :max-zoom="18"
          :min-zoom="13"
          @ready="(a) => map = a"
          @update:zoom="handleZoom"
        >
          <LPolyline :lat-lngs="polyline.latlngs" :color="polyline.color" :weight="1" />
          <LMarker :lat-lng="center" />
          <LMarker :lat-lng="centerCamp" />
          <LMarker :lat-lng="greetersGap" />
          <LPolyline v-for="street in centerCampPolyLines" :key="street" :lat-lngs="street" :color="centerCampColor" :weight="1" />
          <LPolyline v-for="street in clockPolyLines" :key="street" :lat-lngs="street" color="black" :weight="1" />
          <LGeoJson
            :visible="showPolygons"
            :geojson="polygons"
            :options-style="defaultStyle"
            :options="polygonOptions"
            :on-each-feature="onEachFeature"
            layer-type="overlay"
          />
          <LPolyline v-for="street in streets" :key="street" :lat-lngs="street" :color="streetColor" :weight="1" />
        </LMap>
      </div>
      <CCard v-if="blockId" class="mt-4 w-[90vw] overflow-y-scroll md:w-[30vw]">
        <CCardHeader>
          <CNav class="justify-content-start">
            <CNavItem>
              <CCloseButton
                @click="clearBlock"
              />
            </CNavItem>
          </CNav>
        </CCardHeader>
        <CCardBody>
          <CCardTitle>{{ campStore.formatBlockDisplayName(blockId.blockTime, blockId.roadLetter) }}</CCardTitle>
          <Accordion :camps="selectedCamp" />
        </CCardBody>
      </CCard>
    </div>
  </CContainer>
</template>
