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
  <nav class="w-full bg-white dark:bg-gray-900">
    <div class="mx-auto w-full flex flex-wrap items-center justify-between p-4">
      <a href="/" class="flex items-center text-black no-underline">
        <img src="~/assets/img/logo.png" class="mr-3 h-8" alt="Google Maps Pin">
        <span class="self-center whitespace-nowrap text-2xl font-thin dark:text-white">Unofficial BRC Map</span>
      </a>
      <button data-collapse-toggle="navbar-default" type="button" class="h-10 w-10 inline-flex items-center justify-center rounded-lg p-2 text-sm text-gray-500 md:hidden hover:bg-gray-100 dark:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:hover:bg-gray-700 dark:focus:ring-gray-600" aria-controls="navbar-default" aria-expanded="false">
        <span class="sr-only">Open main menu</span>
        <svg class="h-5 w-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M1 1h15M1 7h15M1 13h15" />
        </svg>
      </button>
      <div id="navbar-default" class="hidden w-full md:block md:w-auto">
        <ul class="mt-4 flex flex-col border border-gray-100 rounded-lg bg-gray-50 p-4 font-medium md:mt-0 md:flex-row md:border-0 dark:border-gray-700 dark:bg-gray-800 md:bg-white md:p-0 md:space-x-8 md:dark:bg-gray-900">
          <NuxtLink to="/">
            <li>
              <a href="#" class="block rounded bg-blue-700 py-2 pl-3 pr-4 text-white md:bg-transparent md:p-0 dark:text-white md:text-blue-700 md:dark:text-blue-500" aria-current="page">Home</a>
            </li>
          </NuxtLink>
          <NuxtLink to="/addyourcamp">
            <li>
              <a href="#" class="block rounded py-2 pl-3 pr-4 text-gray-900 md:border-0 hover:bg-gray-100 md:p-0 dark:text-white dark:hover:bg-gray-700 md:hover:bg-transparent dark:hover:text-white md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">Add Your Camp</a>
            </li>
          </NuxtLink>
          <NuxtLink to="/addyourart">
            <li>
              <a href="#" class="block rounded py-2 pl-3 pr-4 text-gray-900 md:border-0 hover:bg-gray-100 md:p-0 dark:text-white dark:hover:bg-gray-700 md:hover:bg-transparent dark:hover:text-white md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">Add Your Art</a>
            </li>
          </NuxtLink>
          <NuxtLink to="/about">
            <li>
              <a href="#" class="block rounded py-2 pl-3 pr-4 text-gray-900 md:border-0 hover:bg-gray-100 md:p-0 dark:text-white dark:hover:bg-gray-700 md:hover:bg-transparent dark:hover:text-white md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">About</a>
            </li>
          </NuxtLink>
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
        </ul>
      </div>
    </div>
  </nav>
</template>
