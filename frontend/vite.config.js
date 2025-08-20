import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    allowedHosts: [
      '60d48e5f-3695-416b-ba93-ee978e889583-00-1d75aq796m227.janeway.replit.dev',
    ],
  },
})