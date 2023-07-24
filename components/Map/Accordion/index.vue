<script setup lang="ts">
import '@coreui/coreui/dist/css/coreui.min.css'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
} from '@coreui/vue'

const props = defineProps({
  block: String,
  camps: Array,
})

console.log('accordion props', props.camps)
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
