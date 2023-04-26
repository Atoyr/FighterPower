import { defineConfig } from 'vite'
import { resolve } from "path";
import react from '@vitejs/plugin-react-swc';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig(({command, mode}) => {
  return { 
    plugins: [react(), svgr()],
    publicDir : "public", 
    build: {
      outDir: mode == 'prod' ? '../dist' : `../dist_${mode}`,
      emptyOutDir: true,
    },
    resolve: {
      alias: {
        "@": resolve(__dirname, "./src"),
      }
    }
  }
})
