<script setup lang="ts">
import '@coreui/coreui/dist/css/coreui.min.css'

import type { LocationDictionary } from 'types/camp'

const props = defineProps<{
  block: string
  camps: LocationDictionary[]
}>()

console.log('what have we got', props.camps)
</script>

<template>
  <div>
    <CAccordion flush>
      <CAccordionItem v-for="(item, key) in props.camps">
        <CAccordionHeader>
          {{ key }}
          {{ console.log("the fuck is item", item) }}
        </CAccordionHeader>
        <template v-for="campArray in item">
          {{ console.log('what is campArray here', campArray) }}
          <CAccordionHeader>
            {{ campArray.name }}
          </CAccordionHeader>
        </template>
      </CAccordionItem>
    </CAccordion>
  </div>
</template>
