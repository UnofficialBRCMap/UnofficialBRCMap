<script>
import '@coreui/coreui/dist/css/coreui.min.css'
import {
  CAccordion,
  CAccordionBody,
  CAccordionHeader,
  CAccordionItem,
} from '@coreui/vue'

export default {
  components: {
    CAccordion,
    CAccordionBody,
    CAccordionHeader,
    CAccordionItem,
  },
  props: {
    block: String,
  },
  data() {
    return {
    }
  },
}
</script>

<template>
  <div>{{ block }}</div>
  <div>
    <CAccordion flush>
      <CAccordionItem :item-key="1">
        <CAccordionHeader>
          Accordion Item #1
        </CAccordionHeader>
        <CAccordionBody>
          dfasdfasdfasdfadfa
        </CAccordionBody>
      </CAccordionItem>
      <CAccordionItem :item-key="2">
        <CAccordionHeader>
          Accordion Item #2
        </CAccordionHeader>
        <CAccordionBody>
          dfadfasdfa
        </CAccordionBody>
      </CAccordionItem>
      <CAccordionItem :item-key="3">
        <CAccordionHeader>
          Accordion Item #3
        </CAccordionHeader>
        <CAccordionBody>
          adfasdfasdf
        </CAccordionBody>
      </CAccordionItem>
    </CAccordion>
  </div>
</template>
