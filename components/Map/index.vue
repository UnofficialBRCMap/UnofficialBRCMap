<script>
import 'leaflet/dist/leaflet.css'
import { LGeoJson, LMap } from '@vue-leaflet/vue-leaflet'
import L from 'leaflet'
import { CCard, CCardBody, CCardGroup, CCardHeader, CCardTitle, CCloseButton, CContainer, CNav, CNavItem,
  CFormInput,
    CNavbar,
    CForm,
    CButton,
  } from '@coreui/vue'
import { ref } from 'vue'
import Sidebar from './Sidebar'
import geoJson from './BurningMan.json'
import polygons from './Polygons.json'
import toilet from './toilet.png'
import '@coreui/coreui/dist/css/coreui.min.css'

const hoverStyle = {
  fillOpacity: 0.9,
  color: '#AA4A44',
}

const defaultStyle = {
  fillOpacity: 0.4,
  color: '#AA4A44',
  fillColor: '#ff0033',
  weight: 2,
  padding: 10,
}

const clickedStyle = {
  fillOpacity: 0.8,
  color: '#FFBF00',
  fillColor: '#FFBF00',
}

const toiletIcon = new L.Icon({
  iconUrl: toilet,
  iconSize: [17, 17],
})

const blockId = ref(undefined)
const showPolygons = ref(true)
const block = ref(undefined)

const clearBlock = function () {
  blockId.value = undefined
}

const onEachFeature = function (feature, layer) {
  (function () {
    layer.on('mouseover', () => {
      layer.setStyle(hoverStyle)
    })
    layer.on('mouseout', () => {
      if (feature.properties.id !== blockId.value)
        layer.setStyle(defaultStyle)
    })
    layer.on('click', () => {
      layer.setStyle(clickedStyle)
      // remove clickedStyle from the previous block
      if (block.value)
        block.value.setStyle(defaultStyle)
      block.value = layer
      blockId.value = feature.properties.id
    })
  })(layer, feature.properties)
}

function handleZoom(zoom) {
  showPolygons.value = zoom < 17
}

export default {
  components: {
    LMap,
    LGeoJson,
    Sidebar,
    CContainer,
    CCardGroup,
    CCard,
    CCardTitle,
    CCardBody,
    CCardHeader,
    CCloseButton,
    CNavItem,
    CNav,
    CFormInput,
    CNavbar,
    CForm,
    CButton,

  },
  data() {
    return {
      geoJson,
      polygons,
      blockId,
      mapStyle: () => ({
        color: '#192841',
        weight: 1,
        opacity: 1,
        fillOpacity: 1,
      }),
      polygonStyle: () => defaultStyle,
      polygonOptions: { onEachFeature },
      onEachFeature,
      mapOptions: {
        pointToLayer(feature, latlng) {
          return L.marker(latlng, {
            icon: toiletIcon,
          })
        },
      },
      clearBlock,
      handleZoom,
      showPolygons,
    }
  },
}
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
          ref="map"
          :zoom="13.5"
          :center="[40.787030, -119.202740]"
          :max-bounds="[[40.787030 + .03, -119.202740 + .05], [40.787030 - .03, -119.202740 - .05]]"
          :max-zoom="17"
          :min-zoom="13"
          @update:zoom="handleZoom"
        >
          <LGeoJson :geojson="geoJson" :options-style="mapStyle" :options="mapOptions" layer-type="base" />
          <LGeoJson
            v-if="showPolygons"
            :geojson="polygons"
            :options-style="polygonStyle"
            :options="polygonOptions"
            :on-each-feature="onEachFeature"
            layer-type="overlay"
          />
        </LMap>
      </CCard>
      <CCard v-if="blockId" style="max-width: 400px;">
        <CCardHeader>
          <CNav class="justify-content-start">
            <CNavItem>
              <CCloseButton
                :onClick="clearBlock"
              />
            </CNavItem>
          </CNav>
        </CCardHeader>
        <CCardBody>
          <CCardTitle>{{ blockId }}</CCardTitle>
          <Sidebar />
        </CCardBody>
      </CCard>
    </CCardGroup>
  </CContainer>
</template>
