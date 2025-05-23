import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      "name": "El camino del Paquete",
      "short_name": "Paqueteria",
      "start_url": "/",
      "scope": "/",
      "display": "standalone",
      "background_color": "#003da8",
      "theme_color": "#003da8",
      "icons": [
        {
          "src": "/icons/icon512_maskable.png",
          "type": "image/png",
          "sizes": "512x512",
          "purpose": "maskable"
        },
        {
          "src": "/icons/icon512_rounded.png",
          "type": "image/png",
          "sizes": "512x512",
          "purpose": "any"
        }
      ]
    }
    ),
  ],
  build: {
    chunkSizeWarningLimit: 1600,
  },
})
