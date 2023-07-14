<template>
  <nav class="border-gray-200 bg-white dark:bg-gray-900">
    <div class="mx-auto max-w-screen-xl flex flex-wrap items-center justify-between p-4">
      <a href="https://flowbite.com/" class="flex items-center">
        <img src="~/assets/img/logo.png" class="mr-3 h-8" alt="Flowbite Logo">
        <span class="self-center whitespace-nowrap font-thin dark:text-white">Unofficial BRC Map</span>
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
          <NuxtLink to="/">
            <li>
              <a href="#" class="block rounded py-2 pl-3 pr-4 text-gray-900 md:border-0 hover:bg-gray-100 md:p-0 dark:text-white dark:hover:bg-gray-700 md:hover:bg-transparent dark:hover:text-white md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">Add Your Art</a>
            </li>
          </NuxtLink>
          <NuxtLink to="/">
            <li>
              <a href="#" class="block rounded py-2 pl-3 pr-4 text-gray-900 md:border-0 hover:bg-gray-100 md:p-0 dark:text-white dark:hover:bg-gray-700 md:hover:bg-transparent dark:hover:text-white md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">Archives</a>
            </li>
          </NuxtLink>
          <NuxtLink to="/">
            <li>
              <a href="#" class="block rounded py-2 pl-3 pr-4 text-gray-900 md:border-0 hover:bg-gray-100 md:p-0 dark:text-white dark:hover:bg-gray-700 md:hover:bg-transparent dark:hover:text-white md:hover:text-blue-700 md:dark:hover:bg-transparent md:dark:hover:text-blue-500">About</a>
            </li>
          </NuxtLink>
        </ul>
      </div>
    </div>
  </nav>
</template>
