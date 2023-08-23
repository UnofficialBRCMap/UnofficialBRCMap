import '@formkit/themes/genesis'
import '@formkit/pro/genesis'
import { generateClasses } from '@formkit/themes'
import { genesisIcons } from '@formkit/icons'
import { createProPlugin, inputs } from '@formkit/pro'

const pro = createProPlugin('FORMKIT_KEY_HERE', inputs)

function defaultToEmptyString(node: any) {
  if (node.value === undefined)
    node.input('', false)
}

export default {
  plugins: [defaultToEmptyString, pro],
  icons: {
    ...genesisIcons,
  },
  config: {
    classes: generateClasses({
      text: {
        outer: 'mb-5',
        label: 'block mb-1 font-bold text-sm',
        inner: 'max-w-md border border-gray-400 rounded-lg mb-1 overflow-hidden focus-within:border-blue-500',
        input: 'w-full h-10 px-3 border-none text-base text-gray-700 placeholder-gray-400',
        help: 'text-xs text-gray-500',
        messages: 'list-none p-0 mt-1 mb-0',
        message: 'text-red-500 mb-1 text-xs',
      },
    }),
  },
  formkit: {
    configFile: './formkit.config.ts',
  },
}
