import { dirname, resolve } from 'node:path'
import { fileURLToPath } from 'node:url'
import { defineConfig } from 'vite'

const __dirname = dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        sub: resolve(__dirname, 'animal.html'),
        sub2: resolve(__dirname, 'natural-habitat.html'),
        sub3: resolve(__dirname, 'animal/dire_wolf.html'),
        sub4: resolve(__dirname, 'animal/dodo_bird.html'),
        sub5: resolve(__dirname, 'animal/species_info/species_dire_wolf.html'),
        sub6: resolve(__dirname, 'animal/species_info/species_dodo_bird.html'),
        sub7: resolve(__dirname, 'natural_habitat/island_tropical_enclosure.html'), 
        sub8: resolve(__dirname, 'natural_habitat/pleistocene_plains.html'),
        sub9: resolve(__dirname, 'login.html')
      },
    },
  },
})