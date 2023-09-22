import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [react(), { name: "@vitejs/plugin-react" }],
	build: {
		rollupOptions: {
			external: ["react", "react-dom", "react-router-dom", "react-router"],
		},
	},
});
