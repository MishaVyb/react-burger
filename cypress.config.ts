import { defineConfig } from 'cypress'

export default defineConfig({
  viewportWidth: 1900,
  viewportHeight: 1600,
  e2e: {
    baseUrl: 'http://localhost:3000',
  },
})
