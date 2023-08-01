<script setup lang="ts">
import { useMutation } from 'vue-query'
import { CAMP_ADDRESS_OPTIONS, CENTER_CAMP_ADDRESS_OPTIONS } from '~/constants/index'
import { useAlertStore } from '~/stores/alert'
import { useCamps } from '~/composables/api/useCamps'

const { campList = [] } = defineProps<{
  campList: Array<any>
}>()

const alertStore = useAlertStore()
const { addLocationByCampId } = useCamps()

const submitted = ref(false)

function useCreateCamp() {
  return useMutation((formSubmission: any) => addLocationByCampId(formSubmission.id, { string: formSubmission.address }),
    {
      onSuccess: (data: any, _, __) => {
        submitted.value = true
        window.console.log('data from api', data)
        // alertStore.setAlert('Successfully Added Location', 'green')
      },
    })
}

const { isLoading, isError, error, isSuccess, mutate } = useCreateCamp()

const campForm = ref({
  id: '',
  address: '',
  addressType: '',
})

function addCampLocation() {
  mutate(campForm.value)
}

// sortCampList sorts the camplist array by name
function sortCampList(campList: any[]) {
  const list = campList.sort((a: any, b: any) => {
    return a.toLowerCase().localeCompare(b.toLowerCase())
  })
  return list
}

const CAMP_OPTIONS = computed(() => {
  return sortCampList(campList).map((camp: any) => {
    return {
      label: camp.name,
      value: camp.uid,
    }
  })
})

const addressSelection = computed(() => {
  if (campForm.value.addressType === 'Letter') {
    return CAMP_ADDRESS_OPTIONS.filter((address) => {
      return address.charAt(0).match(/[a-z]/i)
    })
  }

  if (campForm.value.addressType === 'Number') {
    return CAMP_ADDRESS_OPTIONS.filter((address) => {
      return address.charAt(0).match(/[0-9]/i)
    })
  }

  if (campForm.value.addressType === 'Center Camp Plaza')
    return CENTER_CAMP_ADDRESS_OPTIONS

  if (campForm.value.addressType === '')
    return []
})
</script>

<template>
  <div class="w-80 text-left">
    <div v-if="!isLoading">
      <div v-if="!isSuccess">
        <FormKit
          type="form"
          @submit="addCampLocation"
        >
          <FormKit v-model="campForm" type="group">
            <h2 class="my-4">
              It's coming! Use the form below to add your camp's location!
            </h2>
            <div v-if="!isLoading">
              <FormKit
                type="select"
                placeholder="Select"
                name="id"
                label="Camp Name"
                validation="required"
                :options="CAMP_OPTIONS"
              />
              <FormKit
                type="select"
                placeholder="Select"
                name="addressType"
                label="Address Type"
                help="The specific order your address was provided by Placement will list your frontage first. Is your camp located on a letter or a number street, or within Center Camp Plaza/Rod's Ring Road?"
                validation="required"
                :options="[
                  { label: 'Letter', value: 'Letter' },
                  { label: 'Number', value: 'Number' },
                  { label: 'Center Camp/Rods Ring Road', value: 'Center Camp Plaza' },
                ]"
              />-
              <FormKit
                type="select"
                placeholder="Select"
                name="address"
                label="Address"
                validation="required"
                :options="addressSelection"
              />
            </div>
          </FormKit>
        </FormKit>
      </div>
      <div v-else-if="isSuccess" class="my-4">
        <h4>
          Thank you for your submission!!
        </h4>
      </div>

      <span>The map will be launching soon! Thank you for your patience while we build the next iteration of The Unofficial BRC Map</span>
      <br><br>
      <span>Don't see your camp on the list? Don't worry! We will be adding a form to add your own camp's soon!</span>
    </div>
  </div>
  <span v-if="error">An error occurred: {{ error }}</span>
  <!-- <pre>campForm: {{ campForm }}</pre>
  <pre>CAMP_OPTIONS: {{ CAMP_OPTIONS }}</pre> -->
</template>
