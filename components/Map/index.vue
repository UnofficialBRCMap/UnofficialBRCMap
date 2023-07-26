<script setup lang="ts">
import 'leaflet/dist/leaflet.css'
import { LGeoJson, LMap } from '@vue-leaflet/vue-leaflet'
import L from 'leaflet'
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCardHeader,
  CCardTitle,
  CCloseButton,
  CContainer,
  CForm,
  CFormInput,
  CNav,
  CNavItem,
  CNavbar,
} from '@coreui/vue'
import { ref } from 'vue'
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
  weight: 1,
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

function sillyFix(bt: any, letter: any) {
  const n = new Date(0, 0)
  n.setSeconds(+bt * 60 * 60)
  let s = n.toTimeString().slice(0, 5)
  if (s.charAt(0) === '0')
    s = s.slice(1, 5)

  return `${s} & ${letter}`
}

const campStore = useCampStore()

const center = [40.787030, -119.202740]
const zoom = 13.5

const clearBlock = function () {
  blockId.value = undefined
  block.value.setStyle(defaultStyle)
}

const onEachFeature = function (feature: any, layer: any) {
  (function () {
    layer
    layer.on('mouseover', () => {
      layer.setStyle(hoverStyle)
      const hoverId = feature.properties.id
      console.log(feature.properties.id)
      console.log(feature.coordinates)
    })
    layer.on('mouseout', () => {
      if (feature.properties.id !== blockId.value)
        layer.setStyle(defaultStyle)
    })
    layer.on('click', () => {
      console.log('click', feature.properties.id)
      selectedCamp.value = campStore.getCampsAtLocation(sillyFix(feature.properties.blockTime, feature.properties.roadLetter), campStore.mapDictionary)
      console.log('selectedCamp', selectedCamp.value)
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
</script>

<template>
  <CContainer md>
    <CCardGroup style="height:600px">
      <CCard style="height:600px;max-width: 1000px;">
        <CNavbar expand="lg">
          <CForm class="d-flex">
            <CFormInput type="search" class="me-2" placeholder="Search" />
            <CButton type="submit" color="success" variant="outline">
              Search
            </CButton>
          </CForm>
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
          <Accordion :camps="selectedCamp" />
        </CCardBody>
      </CCard>
    </CCardGroup>
  </CContainer>
</template>
