import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/bw-design-system/',
  server: {
    port: Number(process.env.PORT) || 5173,
  },
})
