import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";

export default defineConfig({
    plugins: [react(), svgr()],
    server: {
        proxy: {
            "/auth": {
                target: "http://localhost:3001",
                changeOrigin: true,
            },
            "/api": {
                target: "http://localhost:3001",
                changeOrigin: true,
            },
        },
    },
});
