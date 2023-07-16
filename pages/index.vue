<script setup lang="ts">
const online = useOnline()
const router = useRouter()
</script>

<template>
  <div>
    <div class="justify-left flex flex-col items-start p-12 text-left">
      <h2 class="my-2 text-xl font-semibold">
        Good news for map lovers:
      </h2>
      <p>
        We have assembled a new team of developers who will be taking the Unofficial Map to the next level!
        <br><br>
        Stay tuned for updates when we'll share our new form for collecting theme camp addresses and art locations.
        <br><br>
        Also, we plan on making the new Unofficial Map open-source so others can contribute to the development and improvements. More to come as soon as possible!
        <br><br>
        <small><b>DISCLAIMER:</b> This unofficial map of Black Rock City is intended to provide an APPROXIMATE idea of where theme camps and art installations will be located at Burning Man. Pins DO NOT equal reserved space. These are approximate locations for registered theme camps and art installations who have volunteered to share their location. Remember, only the official Burning Man Placement Team determines the location for Theme Camps and only the ARTery (Artist Services) determines the location for Art. If your camp has been placed, you must ask the gate to let your placer know you've arrived so they can place you. If you are not in an officially placed camp, be careful not to set up inside the blue flags of placed camps. If you are unsure, find and ask Placement to help you! For placed Art, please visit the ARTery during their open hours once you're on playa and you will be led to your exact placement.</small>
      </p>
    </div>
  </div>
</template>
