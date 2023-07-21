<script setup lang="ts">
import { useMutation } from 'vue-query'
import { CAMP_ADDRESS_OPTIONS } from '~/constants/index'
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
      onSuccess: (data: any, variables, context) => {
        submitted.value = true
        window.console.log('data from api', data)
        alertStore.setAlert('Successfully Added Location', 'green')
      },
    })
}

const { isLoading, isError, error, isSuccess, mutate } = useCreateCamp()

const campForm = ref({
  id: '',
  address: '',
})

function addCampLocation() {
  mutate(campForm.value)
}

const CAMP_OPTIONS = campList.map((camp: any) => {
  return {
    label: camp.name,
    value: camp.uid,
  }
})
</script>

<template>
  <div class="w-80 text-left">
    <div v-if="!isLoading">
      <FormKit
        type="form"
        @submit="addCampLocation"
      >
        <FormKit v-model="campForm" type="group">
          <h2 class="my-4">
            Use the form below to add your camp!
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
              name="address"
              label="Address"
              help="Order matters '2:00 & A' is a different from 'A & 2:00'"
              validation="required"
              :options="CAMP_ADDRESS_OPTIONS"
            />
          </div>
        </FormKit>
      </FormKit>
    </div>
  </div>
  <span v-if="error">An error occurred: {{ error }}</span>
  <span v-else-if="isSuccess">Thank you for your submission!!</span>
  <!-- <pre>campForm: {{ campForm }}</pre>
  <pre>CAMP_OPTIONS: {{ CAMP_OPTIONS }}</pre> -->
</template>