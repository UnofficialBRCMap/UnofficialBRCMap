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

console.log('what have we got', props.camps)
</script>

<template>
  <div>
    <CAccordion>
      <CAccordionItem v-for="(item, key) in props.camps">
        {{ key }}
        <template v-for="campArray in item">
          {{ console.log('what is campArray here', campArray) }}
          <CAccordionItem>
            <CAccordionHeader>
              {{ campArray.name }}
              <CAccordionBody>
                {{ campArray.description }}
              </CAccordionBody>
            </caccordionheader>
          </CAccordionItem>
        </template>
      </CAccordionItem>
    </CAccordion>
  </div>
</template>
