import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      /**
       * Proxy Configuration (Development Only)
       * How it works: When the frontend makes a request to '/api/...', 
       * Vite intercepts it and forwards it to the target backend server.
       * 
       * changeOrigin: Changes the origin of the host header to the target URL.
       * secure: Set to false to allow self-signed SSL certificates.
       * 
       * IMPORTANT: This proxy ONLY works during 'npm run dev'. 
       * In production, you must handle CORS on the backend or use 
       * a real proxy like Nginx.
       */
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
