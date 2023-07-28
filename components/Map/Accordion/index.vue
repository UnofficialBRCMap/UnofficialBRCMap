<script setup lang="ts">
import '@coreui/coreui/dist/css/coreui.min.css'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
} from '@coreui/vue'
import type { LocationDictionary } from 'types/camp'

const props = defineProps<{
  block: string
  camps: LocationDictionary[]
}>()
</script>

<template>
  <div>{{ props.block }}</div>
  <div>
    <CAccordion flush>
      <CAccordionItem v-for="camp in props.camps" :key="camp.uid">
        <CAccordionHeader>
          {{ camp.name }}
        </CAccordionHeader>
        <CAccordionBody>{{ camp.description }}</CAccordionBody>
      </CAccordionItem>
    </CAccordion>
  </div>
</template>
