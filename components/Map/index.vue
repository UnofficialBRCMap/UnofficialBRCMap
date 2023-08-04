<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { LGeoJson, LMap } from '@vue-leaflet/vue-leaflet'
import L from 'leaflet'
import {
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCardTitle,
  CCloseButton,
  CContainer,
  CNav,
  CNavItem,
  CNavbar,
} from '@coreui/vue'
import { ref } from 'vue'
import { AisInstantSearch, AisSearchBox } from 'vue-instantsearch/vue3/es'
import { useCampStore } from '../../stores/camps'
import Accordion from './Accordion/index.vue'
import geoJson from './BurningMan.json'
import polygons from './Polygons.json'
import toilet from './toilet.png'
import '@coreui/coreui/dist/css/coreui.min.css'

const pointerLocation = ref()
const selectedCamp = ref()
const hoverStyle = {
  fillOpacity: 0.9,
  color: '#AA4A44',
}

const defaultStyle = {
  fillOpacity: 0.6,
  color: '#961f12',
  fillColor: '#ba5545',
  weight: 0,
}

const selectedStyle = {
  fillOpacity: 0.8,
  fillColor: '#FFBF00',
}

const toiletIcon = new L.Icon({
  iconUrl: toilet,
  iconSize: [14, 14],
})

const blockId = ref(undefined)
const showPolygons = ref(true)
const block = ref(undefined)
const map = ref(undefined)
const campStore = useCampStore()
const center = [40.787030, -119.202740]
const zoom = 13.5
const algolia = useAlgoliaRef()
const searchString = ref('')

const clearBlock = function () {
  blockId.value = undefined
  block.value.setStyle(defaultStyle)
}

const onEachFeature = function (feature: any, layer: any) {
  (function () {
    layer.on('mouseover', () => {
      layer.setStyle(hoverStyle)
      const hoverId = feature.properties.id
    })
    layer.on('mouseout', () => {
      if (feature.properties.id !== blockId.value)
        layer.setStyle(defaultStyle)
    })
    layer.on('click', () => {
      selectedCamp.value = campStore.getCampsAtLocation(campStore.getAllCampLocationOptions(feature.properties.blockTime, feature.properties.roadLetter), campStore.mapDictionary)
      // remove selectedStyle from the previous block
      if (block.value)
        block.value.setStyle(defaultStyle)
      layer.setStyle(selectedStyle)
      block.value = layer
      blockId.value = feature.properties.id
      const newCenter = [(layer._bounds._northEast.lat + layer._bounds._southWest.lat) / 2, (layer._bounds._northEast.lng + layer._bounds._southWest.lng) / 2]
      map.value.setView(newCenter, 16)
    })
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
  <CContainer md>
    <CCardGroup style="height:600px">
      <CCard style="height:600px;max-width: 1000px;">
        <CNavbar expand="lg">
          <div>
            <AisInstantSearch index-name="camps" :search-client="algolia">
              <AisSearchBox
                placeholder="search for a camp by name, or a word in the description"
                show-loading-indicator
              />
              <!-- <AisHits /> -->
            </AisInstantSearch>
          </div>
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
          <LGeoJson
            :visible="showPolygons"
            :geojson="polygons"
            :options-style="defaultStyle"
            :options="polygonOptions"
            :on-each-feature="onEachFeature"
            layer-type="overlay"
          />
          <LGeoJson
            :geojson="geoJson"
            :options-style="mapStyle"
            :options="mapOptions"
            layer-type="base"
          />
        </LMap>
      </CCard>
      <CCard v-if="blockId" style="max-width: 300px;">
        <CCardHeader>
          <CNav class="justify-content-start">
            <CNavItem>
              <CCloseButton
                :on-click="clearBlock"
              />
            </CNavItem>
          </CNav>
        </CCardHeader>
        <CCardBody>
          <CCardTitle>{{ blockId }}</CCardTitle>
          <Accordion :block="blockId" :camps="selectedCamp" />
        </CCardBody>
      </CCard>
    </CCardGroup>
  </CContainer>
</template>
