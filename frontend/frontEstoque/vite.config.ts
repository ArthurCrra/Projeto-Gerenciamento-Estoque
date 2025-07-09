import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Permite acesso externo ao contêiner
    port: 5173,     
    watch: {
      // Necessário para o HMR (Hot Module Replacement) funcionar corretamente no Docker
      usePolling: true,
    },
  },
})
