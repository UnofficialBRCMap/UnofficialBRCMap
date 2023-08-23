<script setup lang="ts">
import { NModal } from 'naive-ui'
import { useCampStore } from '../stores/camps'

const online = useOnline()
const router = useRouter()

const campStore = useCampStore()

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
  <div class="hidden w-full flex justify-center md:block">
    <div class="justify-left mt-4 max-w-[1400px] flex flex-col items-start p-6 text-left">
      <h2 class="my-2 text-2xl font-semibold text-[#226e93]">
        IT HAS STARTED! Good news for map lovers:
      </h2>
      <p class="py-4 text-lg">
        The Unofficial Map has moved to the next level!
        <br><br>
        Use the new <a href="/add-your-camp">form</a> for collecting theme camp addresses and (soon!) art locations.
        <br><br>
        Also, if you'd like to help contribute to the Unofficial Map project click <a href="/about">here</a> to learn more about our project! More to come as soon as possible!
        <br><br>
        <small><b>DISCLAIMER:</b> This unofficial map of Black Rock City is intended to provide an APPROXIMATE idea of where theme camps and art installations will be located at Burning Man. Pins DO NOT equal reserved space. These are approximate locations for registered theme camps and art installations who have volunteered to share their location. Remember, only the official Burning Man Placement Team determines the location for Theme Camps and only the ARTery (Artist Services) determines the location for Art. If your camp has been placed, you must ask the gate to let your placer know you've arrived so they can place you. If you are not in an officially placed camp, be careful not to set up inside the blue flags of placed camps. If you are unsure, find and ask Placement to help you! For placed Art, please visit the ARTery during their open hours once you're on playa and you will be led to your exact placement.</small>
      </p>
    </div>
  </div>
  <div class="px-4">
    <h2>This is an interactive map, click a block to see camps at that location</h2>
    <p>Coordinates of camps will be placed on the map soon! Search is coming!</p>
  </div>
  <div v-if="campStore.mapDictionary">
    <FormKit
      type="autocomplete"
      name="country"
      label="Search for a country"
      placeholder="Example: United States"
      :options="campStore.campList"
      multiple
    />
  </div>
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
