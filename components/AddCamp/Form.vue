<script setup lang="ts">
import { CAMP_ADDRESS_OPTIONS } from '../../constants/index'

const camp = ref({
  campType: undefined,
})

// TODO: get from DB and cache
const CAMP_OPTIONS = [
  'Camp A',
  'Camp B',
  'Camp C',
]

// TODO: get from DB and cache
const ART_OPTIONS = [
  'Art A',
  'Art B',
  'Art C',
]

// TODO: Transform data to correct format for DB
// TODO: Put command to DB
function addCamp(fields: any) {
  console.log(fields)
}
</script>

<template>
  <div class="w-80 text-left">
    <FormKit
      v-model="camp"
      type="form"
      @submit="addCamp"
    >
      <p>
        Add your camp or art
      </p>
      <FormKit
        id="campType"
        type="select"
        placeholder="Select"
        name="campType"
        label="Type"
        validation="required"
        :options="{
          camp: 'Camp',
          art: 'Art',
        }"
      />
      <div v-if="camp.campType === 'camp'">
        <FormKit
          type="select"
          placeholder="Select"
          name="camp"
          label="Camp"
          validation="required"
          :options="CAMP_OPTIONS"
        />
        <FormKit
          type="select"
          placeholder="Select"
          name="address"
          label="Address: Order matters '2:00 & A' is a different from 'A & 2:00'"
          validation="required"
          :options="CAMP_ADDRESS_OPTIONS"
        />
      </div>
      <div v-if="camp.campType === 'art'">
        <FormKit
          type="select"
          placeholder="Select"
          name="art"
          label="Art"
          validation="required"
          :options="ART_OPTIONS"
        />
        <!-- check if art can be located in the city. If not add error if they try to place it within those coordinates -->
        <FormKit
          type="number"
          name="hour"
          label="Hour"
          step="1"
          min="0"
          max="12"
          validation="required"
          placeholder="Number 1-12"
        />
        <FormKit
          type="number"
          name="minute"
          label="Minute"
          step="1"
          min="0"
          max="59"
          validation="required"
          placeholder="Number 0-59"
        />
        <FormKit
          type="number"
          label="Distance"
          name="distance"
          step="1"
          suffix="'"
          min="0"
          max="10000"
          validation="required"
        />
      </div>
    </FormKit>
  </div>
  <span v-if="isError">An error occurred: {{ error }}</span>
  <span v-else-if="isSuccess">Submitted!</span>
</template>
