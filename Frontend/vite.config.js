import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'https://localhost:7091', // El backend local
        changeOrigin: true,
        secure: false, // Por si el certificado HTTPS local es autofirmado
      }
    }
  }
})
