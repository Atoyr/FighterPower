import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
const svgrPlugin = require('vite-plugin-svgr')
import * as path from "path"

// https://vitejs.dev/config/
export default defineConfig({
  root: './src',
  build: {
    outDir: '../public',
    emptyOutDir: true,
  },
  plugins: [
    react(),
    svgrPlugin({
      svgrOptions: {
        icon: true,
      }
    })

  ],
  resolve: {
    alias: {
      "assets": path.resolve(__dirname, "src/assets"),
      "components": path.resolve(__dirname, "src/components"),
      "context": path.resolve(__dirname, "src/context"),
      "data": path.resolve(__dirname, "src/data"),
      "hook": path.resolve(__dirname, "src/hook"),
      "lib": path.resolve(__dirname, "src/lib"),
      "pages": path.resolve(__dirname, "src/pages"),
    }
  }
})
