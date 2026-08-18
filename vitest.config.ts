import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'node:path'
import { transformWithOxc } from 'vite'

const pagesJsAsJsx = {
  name: 'pages-js-as-jsx',
  enforce: 'pre' as const,
  transform(code: string, id: string) {
    if (!/\/pages\/.*\.js$/.test(id)) return null

    return transformWithOxc(code, id, {
      lang: 'jsx',
      jsx: { runtime: 'automatic' },
    })
  },
}

export default defineConfig({
  plugins: [pagesJsAsJsx, react()],
  oxc: {
    include: /.*\.[jt]sx?$/,
    jsx: {
      runtime: 'automatic',
    },
  },
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname),
      components: path.resolve(__dirname, 'components'),
    },
  },
})
