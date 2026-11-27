import react from '@vitejs/plugin-react'
import { defineConfig } from 'vitest/config'

function pagesBase() {
  const configured = process.env.VITE_BASE_PATH
  if (!configured) return '/'
  return configured.endsWith('/') ? configured : `${configured}/`
}

export default defineConfig({
  base: pagesBase(),
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
  },
})
