# Unofficial Black Rock City Map

First of all, the Unofficial BRC Map would not be possible without YOUR PARTICIPATION. We're merely the shell for all your shiny pearls of information! Thank you to all of our gracious contributors!

This is a passion project by a small group of people who love Black Rock City and also maps! We collect placement information voluntarily from camps and artists who wish to share their approximate location in advance of arriving to the playa. Of course, our pin placements are only good guesses and may not reflect reality for those lucky enough to travel to the playa in person. Our map should give you a decent idea of what you might find in your neighborhood, but you'll certainly find even more and better attractions once you're there!

The live site is here:

https://www.unofficialbrcmap.com/

## Cloning and running locally

To run locally so you can contribute, you'll need to:

1. Sign up for an Angolia account (free is fine), and retrieve your "Application ID" and "Search API Key". These will need to be set in your environment variables. For example, with `zsh`:

```shell
export ALGOLIA_APPLICATION_ID=myappid
export ALGOLIA_SEARCH_API_KEY=mykey
```

1. Install `pnpm` if you don't have it already

```shell
npm install -g pnpm
```

1. Clone the repository

```shell
git clone https://github.com/UnofficialBRCMap/UnofficialBRCMap.git
```

1. Install dependencies from that cloned folder

```shell
pnpm i
```

1. Run Vite locally

```shell
pnpm run dev
```

## Features

This project is based on a Nuxt template with the following built-in features and modules:

- 💚 [Nuxt 3](https://nuxt.com/) - SSR, ESR, File-based routing, components auto importing, modules, etc.
- ⚡️ Vite - Instant HMR.
- 🎨 [UnoCSS](https://github.com/unocss/unocss) - The instant on-demand atomic CSS engine.
- 😃 Use icons from any icon sets in Pure CSS, powered by [UnoCSS](https://github.com/unocss/unocss).
- 🔥 The `<script setup>` syntax.
- 🍍 [State Management via Pinia](https://github.com/vuejs/pinia), see [./composables/user.ts](./composables/user.ts).
- 📑 [Layout system](./layouts).
- 📥 APIs auto importing - for Composition API, VueUse and custom composables.
- 🏎 Zero-config cloud functions and deploy.
- 🦾 TypeScript, of course.
- 📲 [PWA](https://github.com/vite-pwa/nuxt) with offline support and auto update behavior.

### Nuxt Modules

- [VueUse](https://github.com/vueuse/vueuse) - collection of useful composition APIs.
- [ColorMode](https://github.com/nuxt-modules/color-mode) - dark and Light mode with auto detection made easy with Nuxt.
- [UnoCSS](https://github.com/unocss/unocss) - the instant on-demand atomic CSS engine.
- [Pinia](https://github.com/vuejs/pinia) - intuitive, type safe, light and flexible Store for Vue.
- [VitePWA](https://github.com/vite-pwa/nuxt) - zero-config PWA Plugin for Nuxt 3.
- [DevTools](https://github.com/nuxt/devtools) - unleash Nuxt Developer Experience.
