import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0", // Esto hace que Vite escuche en todas las interfaces de red
    port: 5173, // Puerto de tu aplicación React (puede ser diferente)
    proxy: {
      "/api": {
        // Suponiendo que tus endpoints de la API de Django comienzan con /api/
        target: "https://consultaelecciones.onrender.com/", // IP y puerto de tu backend Django
        changeOrigin: true,
        secure: false,
        // rewrite: (path) => path.replace(/^\/api/, '') // Descomenta si tus endpoints de Django no tienen /api/
      },
      // Agrega más proxies si tienes otros endpoints de Django
    },
  },
});
