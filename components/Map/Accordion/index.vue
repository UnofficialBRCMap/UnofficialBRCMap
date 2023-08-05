<script setup lang="ts">
import '@coreui/coreui/dist/css/coreui.min.css'

import { NCollapse, NCollapseItem } from 'naive-ui'

const props = defineProps<{
  camps: Object | undefined
}>()

console.log('what have we got', props.camps)
</script>

<template>
  <div v-for="(item, key) in props.camps" :key="key" class="my-4">
    {{ key }}
    <NCollapse v-for="(campArray, index) in item" :key="index" accordion class="my-1 border py-4">
      <div>
        <NCollapseItem :title="campArray.name" name="1">
          <div class="p-2 text-left">
            <h5>Camp Description</h5>
            <p>{{ campArray.description }}</p>
            <h5>Hometown</h5>
            <p>{{ campArray.hometown }}</p>
            <h5>Contact Email</h5>
            <p>{{ campArray.contact_email }}</p>
          </div>
        </NCollapseItem>
      </div>
    </NCollapse>
    <!-- <CAccordion>
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
            </CAccordionHeader>
          </CAccordionItem>
        </template>
        <NCollapse v-for="(campArray, index) in item" :key="index" default-expanded-names="1" accordion>
          <NCollapseItem title="right" name="1">
            <div>good</div>
          </NCollapseItem>
        </NCollapse>
      </CAccordionItem>
    </CAccordion> -->
  </div>
</template>
