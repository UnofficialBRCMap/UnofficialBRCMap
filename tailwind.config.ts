// tailwind.config.js
const FormKitVariants = require('@formkit/themes/tailwindcss')

module.exports = {
  content: [
    './src/**/*.{html,js,vue}',
    './node_modules/@formkit/themes/dist/tailwindcss/genesis/index.cjs',
    './node_modules/flowbite/**/*.{js,ts}',
  ],
  plugins: [FormKitVariants, require('flowbite/plugin')],
}
