<script setup lang="ts">
import '@coreui/coreui/dist/css/coreui.min.css'
import {
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from '@coreui/vue'
</script>

<template>
  <CDropdown toggler-text="Dropdown button">
    <CDropdownToggle component="a">
      Archives
    </CDropdownToggle>
    <CDropdownMenu>
      <NuxtLink to="/archives/2022">
        <CDropdownItem>
          2022
        </CDropdownItem>
      </NuxtLink>
      <NuxtLink to="/archives/2021">
        <CDropdownItem>
          2021
        </CDropdownItem>
      </NuxtLink>
      <NuxtLink to="/archives/2020">
        <CDropdownItem>
          2020
        </CDropdownItem>
      </NuxtLink>
      <NuxtLink to="/archives/2019">
        <CDropdownItem>
          2019
        </CDropdownItem>
      </NuxtLink>
      <NuxtLink to="/archives/2018">
        <CDropdownItem>
          2018
        </CDropdownItem>
      </NuxtLink>
      <NuxtLink to="/archives/2017">
        <CDropdownItem>
          2017
        </CDropdownItem>
      </NuxtLink>
      <NuxtLink to="/archives/2016">
        <CDropdownItem>
          2016
        </CDropdownItem>
      </NuxtLink>
      <NuxtLink to="/archives/2015">
        <CDropdownItem>
          2015
        </CDropdownItem>
      </NuxtLink>
      <NuxtLink to="/archives/2014">
        <CDropdownItem>
          2014
        </CDropdownItem>
      </NuxtLink>
    </CDropdownMenu>
  </CDropdown>
</template>
