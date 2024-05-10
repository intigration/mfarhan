import { defineConfig } from 'unocss'

import config from '@unocss/nuxt'

export default defineConfig({
  ...config,
  configDeps: [
    './packages/devtools-ui-kit/src/unocss.ts',
    './packages/devtools/client/unocss.config.ts',
  ],
})