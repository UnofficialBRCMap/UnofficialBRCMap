<script setup lang="ts">
const online = useOnline()
const router = useRouter()
</script>

<template>
  <div class="w-full flex justify-center">
    <div class="justify-left mt-4 max-w-[1400px] flex flex-col items-start p-6 text-left">
      <h2 class="my-2 text-2xl font-semibold text-[#226e93]">
        IT HAS STARTED! Good news for map lovers:
      </h2>
      <p class="py-4 text-lg">
        The Unofficial Map has moved to the next level!
        <br><br>
        Use the new <a href="/addyourcamp">form</a> for collecting theme camp addresses and (soon!) art locations.
        <br><br>
        Also, if you'd like to help contribute to the Unofficial Map project click <a href="/about">here</a> to learn more about our project! More to come as soon as possible!
        <br><br>
        <small><b>DISCLAIMER:</b> This unofficial map of Black Rock City is intended to provide an APPROXIMATE idea of where theme camps and art installations will be located at Burning Man. Pins DO NOT equal reserved space. These are approximate locations for registered theme camps and art installations who have volunteered to share their location. Remember, only the official Burning Man Placement Team determines the location for Theme Camps and only the ARTery (Artist Services) determines the location for Art. If your camp has been placed, you must ask the gate to let your placer know you've arrived so they can place you. If you are not in an officially placed camp, be careful not to set up inside the blue flags of placed camps. If you are unsure, find and ask Placement to help you! For placed Art, please visit the ARTery during their open hours once you're on playa and you will be led to your exact placement.</small>
      </p>
    </div>
  </div>
</template>
