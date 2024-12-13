// vite.config.js
import { defineConfig } from "file:///C:/Users/SERIF/Desktop/nese/dyn%20and%20soc%20netw/simulation%20tool/ui/node_modules/vite/dist/node/index.js";
import { sveltekit } from "file:///C:/Users/SERIF/Desktop/nese/dyn%20and%20soc%20netw/simulation%20tool/ui/node_modules/@sveltejs/kit/src/exports/vite/index.js";
import path from "path";
var vite_config_default = defineConfig({
  plugins: [sveltekit()],
  resolve: {
    alias: {
      $components: path.resolve("./src/components"),
      $data: path.resolve("./src/data"),
      $routes: path.resolve("./src/routes"),
      $lib: path.resolve("./src/lib")
    }
  },
  optimizeDeps: {
    include: [
      "@codemirror/state",
      "@codemirror/view",
      "@codemirror/basic-setup",
      "@codemirror/commands",
      "@codemirror/lang-yaml"
    ]
  }
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxTRVJJRlxcXFxEZXNrdG9wXFxcXG5lc2VcXFxcZHluIGFuZCBzb2MgbmV0d1xcXFxzaW11bGF0aW9uIHRvb2xcXFxcdWlcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIkM6XFxcXFVzZXJzXFxcXFNFUklGXFxcXERlc2t0b3BcXFxcbmVzZVxcXFxkeW4gYW5kIHNvYyBuZXR3XFxcXHNpbXVsYXRpb24gdG9vbFxcXFx1aVxcXFx2aXRlLmNvbmZpZy5qc1wiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9pbXBvcnRfbWV0YV91cmwgPSBcImZpbGU6Ly8vQzovVXNlcnMvU0VSSUYvRGVza3RvcC9uZXNlL2R5biUyMGFuZCUyMHNvYyUyMG5ldHcvc2ltdWxhdGlvbiUyMHRvb2wvdWkvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tICd2aXRlJztcbmltcG9ydCB7IHN2ZWx0ZWtpdCB9IGZyb20gJ0BzdmVsdGVqcy9raXQvdml0ZSc7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZyh7XG5cdHBsdWdpbnM6IFtzdmVsdGVraXQoKV0sXG5cdHJlc29sdmU6IHtcblx0XHRhbGlhczoge1xuXHRcdFx0JGNvbXBvbmVudHM6IHBhdGgucmVzb2x2ZSgnLi9zcmMvY29tcG9uZW50cycpLFxuXHRcdFx0JGRhdGE6IHBhdGgucmVzb2x2ZSgnLi9zcmMvZGF0YScpLFxuXHRcdFx0JHJvdXRlczogcGF0aC5yZXNvbHZlKCcuL3NyYy9yb3V0ZXMnKSxcblx0XHRcdCRsaWI6IHBhdGgucmVzb2x2ZSgnLi9zcmMvbGliJylcblx0XHR9XG5cdH0sXG5cdG9wdGltaXplRGVwczoge1xuXHRcdGluY2x1ZGU6IFtcblx0XHRcdCdAY29kZW1pcnJvci9zdGF0ZScsXG5cdFx0XHQnQGNvZGVtaXJyb3IvdmlldycsXG5cdFx0XHQnQGNvZGVtaXJyb3IvYmFzaWMtc2V0dXAnLFxuXHRcdFx0J0Bjb2RlbWlycm9yL2NvbW1hbmRzJyxcblx0XHRcdCdAY29kZW1pcnJvci9sYW5nLXlhbWwnXG5cdFx0XVxuXHR9XG59KTtcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVksU0FBUyxvQkFBb0I7QUFDcGEsU0FBUyxpQkFBaUI7QUFDMUIsT0FBTyxVQUFVO0FBR2pCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzNCLFNBQVMsQ0FBQyxVQUFVLENBQUM7QUFBQSxFQUNyQixTQUFTO0FBQUEsSUFDUixPQUFPO0FBQUEsTUFDTixhQUFhLEtBQUssUUFBUSxrQkFBa0I7QUFBQSxNQUM1QyxPQUFPLEtBQUssUUFBUSxZQUFZO0FBQUEsTUFDaEMsU0FBUyxLQUFLLFFBQVEsY0FBYztBQUFBLE1BQ3BDLE1BQU0sS0FBSyxRQUFRLFdBQVc7QUFBQSxJQUMvQjtBQUFBLEVBQ0Q7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNiLFNBQVM7QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
