<script setup lang="ts">
import { NDrawer } from 'naive-ui'
import '@coreui/coreui/dist/css/coreui.min.css'

const show = ref(false)
</script>

<template>
  <nav class="mt-2 w-full bg-white dark:bg-gray-900">
    <div class="mx-autow-full flex flex items-center justify-between px-4">
      <a href="/" class="flex items-center text-black no-underline">
        <img src="~/assets/img/logo.png" class="mr-3 h-8" alt="Google Maps Pin">
        <span class="self-center whitespace-nowrap text-2xl font-thin dark:text-white">Unofficial BRC Map</span>
      </a>
      <button type="button" class="h-10 w-10 inline-flex items-center justify-center rounded-lg p-2 text-sm text-gray-500 md:hidden hover:bg-gray-100 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false" @click="show = true">
        <span class="sr-only">Open main menu</span>
        <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <div id="navbar-default" class="hidden w-auto md:block md:w-full">
        <ul class="mt-4 flex flex-col rounded-lg bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:border-0 dark:border-gray-700 dark:bg-gray-800 md:bg-white md:p-0 md:space-x-8 md:dark:bg-gray-900">
          <NuxtLink class="no-underline" to="/">
            <li>
              <a class="block rounded bg-blue-700 py-2 pl-3 pr-4 md:bg-transparent md:p-0 dark:text-white md:text-blue-700 md:dark:text-blue-500" aria-current="page">Home</a>
            </li>
          </NuxtLink>
          <NuxtLink class="no-underline" to="/addyourcamp">
            <li>
              <a class="block rounded py-2 pl-3 pr-4 text-gray-900 no-underline md:border-0 hover:bg-gray-100 md:p-0 dark:text-white dark:hover:bg-gray-700 md:hover:bg-transparent dark:hover:text-white md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">Add Your Camp</a>
            </li>
          </NuxtLink>
          <NuxtLink class="no-underline" to="/addyourart">
            <li>
              <a class="block rounded py-2 pl-3 pr-4 text-gray-900 no-underline md:border-0 hover:bg-gray-100 md:p-0 dark:text-white dark:hover:bg-gray-700 md:hover:bg-transparent dark:hover:text-white md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">Add Your Art</a>
            </li>
          </NuxtLink>
          <NuxtLink class="no-underline" to="/about">
            <li>
              <a class="block rounded py-2 pl-3 pr-4 text-gray-900 no-underline md:border-0 hover:bg-gray-100 md:p-0 dark:text-white dark:hover:bg-gray-700 md:hover:bg-transparent dark:hover:text-white md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">About</a>
            </li>
          </NuxtLink>
          <AppDropdown />
        </ul>
      </div>
    </div>
  </nav>
  <NDrawer v-model:show="show" closable class="max-w-[90vw]">
    <n-drawer-content title="Stoner" closable>
      <div class="my-2 flex justify-between p-2">
        <a href="/" class="flex items-center text-black no-underline">
          <img src="~/assets/img/logo.png" class="mr-3 h-6" alt="Google Maps Pin">
          <span class="self-center whitespace-nowrap text-xl font-thin dark:text-white">Unofficial BRC Map</span>
        </a>
        <span class="mr-4" @click="show = false">x</span>
      </div>
      <div id="navbar-default" class="my-4 w-auto p-2 md:hidden md:w-full">
        <h2>Navigation</h2>
        <ul class="flex flex-col rounded-lg bg-gray-50 p-2 font-medium md:mt-0 dark:border-gray-700 dark:bg-gray-800 md:bg-white md:p-0 md:space-x-8 md:dark:bg-gray-900">
          <NuxtLink class="no-underline" to="/" @click="show = false">
            <li>
              <a class="pr-4md:bg-transparent block rounded py-2 pl-3 md:p-0 dark:text-white md:text-blue-700 md:dark:text-blue-500" aria-current="page">Home</a>
            </li>
          </NuxtLink>
          <NuxtLink class="no-underline" to="/addyourcamp" @click="show = false">
            <li>
              <a class="block rounded py-2 pl-3 pr-4 text-gray-900 no-underline md:border-0 hover:bg-gray-100 md:p-0 dark:text-white dark:hover:bg-gray-700 md:hover:bg-transparent dark:hover:text-white md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">Add Your Camp</a>
            </li>
          </NuxtLink>
          <NuxtLink class="no-underline" to="/addyourart" @click="show = false">
            <li>
              <a class="block rounded py-2 pl-3 pr-4 text-gray-900 no-underline md:border-0 hover:bg-gray-100 md:p-0 dark:text-white dark:hover:bg-gray-700 md:hover:bg-transparent dark:hover:text-white md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">Add Your Art</a>
            </li>
          </NuxtLink>
          <NuxtLink class="no-underline" to="/about" @click="show = false">
            <li>
              <a class="block rounded py-2 pl-3 pr-4 text-gray-900 no-underline md:border-0 hover:bg-gray-100 md:p-0 dark:text-white dark:hover:bg-gray-700 md:hover:bg-transparent dark:hover:text-white md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">About</a>
            </li>
          </NuxtLink>
          <br><br><br><br>
          <AppDropdown />
        </ul>
      </div>
    </n-drawer-content>
  </NDrawer>
</template>
