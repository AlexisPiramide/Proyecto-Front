import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
        "theme_color": "#003da8",
        "background_color": "#003da8",
        "icons": [
          {
            "purpose": "maskable",
            "sizes": "512x512",
            "src": "icon512_maskable.png",
            "type": "image/png"
          },
          {
            "purpose": "any",
            "sizes": "512x512",
            "src": "icon512_rounded.png",
            "type": "image/png"
          }
        ],
        "orientation": "any",
        "display": "standalone",
        "dir": "auto",
        "lang": "es-ES",
        "name": "El camino del Paquete",
        "short_name": "Paqueteria Camino",
        "start_url": "/",
        "scope": "/",
        "id": "/",
        "description": "Proyecto DAW II Alexis Torres"
      }),
  ],
  build: {
    chunkSizeWarningLimit: 1600,
  },
})
