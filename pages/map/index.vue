<script setup lang="ts">
import { NModal } from 'naive-ui'

const showModal = ref(true)

const bodyStyle = {
  width: '600px',
}
const segmented = {
  content: 'soft',
  footer: 'soft',
}
</script>

<template>
  <div class="justify-left flex">
    <Map />
    <NModal
      v-model:show="showModal"
      class="custom-card"
      preset="card"
      :style="bodyStyle"
      title="Important Notice"
      :bordered="false"
      size="huge"
      :segmented="segmented"
    >
      <template #header-extra>
        Close
      </template>
      We are excited to share our work with you. We know you have been waiting patiently
      <br><br>
      But please! Keep in mind this is a work in progress. This is NOT the final product. We still have many bugs and areas to build. This include:
      <br>
      <br>
      <ul class="ml-4 list-disc">
        <li>Search (It's almost ready!)</li>
        <li>Center Camp mapping</li>
        <li>Updating Porto Locations</li>
        <li>Placing Key Points of Interests</li>
        <li>Submit Art Form and Art Placements</li>
      </ul>
      <template #footer>
        <small>We know that Unofficial BRC Map has been an important planning tool for everyone and we want everyone to have access as soon as we possibly can manage. Please remember that this is not finished and has taken a lot of long nights by dedicated people donating their time and efforts. This map, as always, is unofficial.
          <br>
          <br>
          Thank you,
          <br>
          <span class="ml-2">The Unofficial BRC Map Team</span>
        </small>
        <div class="w-full flex justify-end">
          <button @click="showModal = false">
            I Understand!
          </button>
        </div>
      </template>
    </NModal>
  </div>
</template>
