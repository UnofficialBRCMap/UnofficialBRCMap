<script setup lang="ts">
import { useMutation } from 'vue-query'
import { useArts } from '~/composables/api/useArts'

const { artList = [] } = defineProps<{
  artList: Array<any>
}>()

const { addLocationByArtId } = useArts()

const submitted = ref(false)

function useCreateArt() {
  return useMutation((formSubmission: any) => addLocationByArtId(formSubmission.id, { string: formSubmission.id, hour: formSubmission.hour, minute: formSubmission.minute, distance: formSubmission.feet }),
    {
      onSuccess: (data: any, _, __) => {
        submitted.value = true
        window.console.log('data from api', data)
        // alertStore.setAlert('Successfully Added Location', 'green')
      },
    })
}

const { isLoading, isError, error, isSuccess, mutate } = useCreateArt()

const artForm = ref({
  id: '',
  hour: '',
  minute: '',
  feet: '',
})

function addArtLocation() {
  mutate(artForm.value)
}

// sortArtList sorts the artlist array by name
function sortArtList(artList: any[]) {
  artList.sort((a: any, b: any) => {
    const nameA = a.name.toUpperCase()
    const nameB = b.name.toUpperCase()
    if (nameA < nameB)
      return -1
    if (nameA > nameB)
      return 1
    return 0
  })
  return artList
}

const ART_OPTIONS = computed(() => {
  return sortArtList(artList).map((art: any) => {
    return {
      label: art.name,
      value: art.uid,
    }
  })
})
</script>

<template>
  <div class="w-80 text-left">
    <div v-if="!isLoading">
      <div v-if="!isSuccess">
        <FormKit type="form" @submit="addArtLocation">
          <FormKit v-model="artForm" type="group">
            <h2 class="my-4">
              It's coming! Use the form below to add your art's location!
            </h2>
            <div v-if="!isLoading">
              <FormKit
                type="select" placeholder="Select" name="id" label="Art Name" validation="required"
                :options="ART_OPTIONS"
              />
              <FormKit
                type="select" placeholder="Select" name="hour" label="Clock Hour" validation="required" :options="[
                  { label: '12:00', value: 12 },
                  { label: '01:00', value: 1 },
                  { label: '02:00', value: 2 },
                  { label: '03:00', value: 3 },
                  { label: '04:00', value: 4 },
                  { label: '05:00', value: 5 },
                  { label: '06:00', value: 6 },
                  { label: '07:00', value: 7 },
                  { label: '08:00', value: 8 },
                  { label: '09:00', value: 9 },
                  { label: '10:00', value: 10 },
                  { label: '11:00', value: 11 },
                ]"
              />
              <FormKit
                type="number" placeholder="Enter Clock Minute" name="minute" label="Clock Minute"
                validation="required|min:0|max:59" :min="0" :max="59"
              />
              <FormKit type="number" placeholder="Enter Feet from Man" name="feet" label="Feet" validation="required" />
            </div>
          </FormKit>
        </FormKit>
      </div>
      <div v-else-if="isSuccess" class="my-4">
        <h4>
          Thank you for your submission!!
        </h4>
      </div>

      <span>The map will be launching soon! Thank you for your patience while we build the next iteration of The
        Unofficial BRC Map</span>
      <br><br>
      <span>Don't see your art on the list? Don't worry! We will be adding a form to add your own art soon!</span>
    </div>
  </div>
  <span v-if="error">An error occurred: {{ error }}</span>
  <!-- <pre>artForm: {{ artForm }}</pre>
  <pre>ART_OPTIONS: {{ ART_OPTIONS }}</pre> -->
</template>
