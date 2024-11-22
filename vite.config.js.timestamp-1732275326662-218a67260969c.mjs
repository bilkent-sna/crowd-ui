// vite.config.js
import { defineConfig } from "file:///C:/Users/engs2761/Documents/misc/ui/node_modules/vite/dist/node/index.js";
import { sveltekit } from "file:///C:/Users/engs2761/Documents/misc/ui/node_modules/@sveltejs/kit/src/exports/vite/index.js";
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCJDOlxcXFxVc2Vyc1xcXFxlbmdzMjc2MVxcXFxEb2N1bWVudHNcXFxcbWlzY1xcXFx1aVwiO2NvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9maWxlbmFtZSA9IFwiQzpcXFxcVXNlcnNcXFxcZW5nczI3NjFcXFxcRG9jdW1lbnRzXFxcXG1pc2NcXFxcdWlcXFxcdml0ZS5jb25maWcuanNcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfaW1wb3J0X21ldGFfdXJsID0gXCJmaWxlOi8vL0M6L1VzZXJzL2VuZ3MyNzYxL0RvY3VtZW50cy9taXNjL3VpL3ZpdGUuY29uZmlnLmpzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XHJcbmltcG9ydCB7IHN2ZWx0ZWtpdCB9IGZyb20gJ0BzdmVsdGVqcy9raXQvdml0ZSc7XHJcbmltcG9ydCBwYXRoIGZyb20gJ3BhdGgnO1xyXG5cclxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cclxuZXhwb3J0IGRlZmF1bHQgZGVmaW5lQ29uZmlnKHtcclxuXHRwbHVnaW5zOiBbc3ZlbHRla2l0KCldLFxyXG5cdHJlc29sdmU6IHtcclxuXHRcdGFsaWFzOiB7XHJcblx0XHRcdCRjb21wb25lbnRzOiBwYXRoLnJlc29sdmUoJy4vc3JjL2NvbXBvbmVudHMnKSxcclxuXHRcdFx0JGRhdGE6IHBhdGgucmVzb2x2ZSgnLi9zcmMvZGF0YScpLFxyXG5cdFx0XHQkcm91dGVzOiBwYXRoLnJlc29sdmUoJy4vc3JjL3JvdXRlcycpLFxyXG5cdFx0XHQkbGliOiBwYXRoLnJlc29sdmUoJy4vc3JjL2xpYicpXHJcblx0XHR9XHJcblx0fSxcclxuXHRvcHRpbWl6ZURlcHM6IHtcclxuXHRcdGluY2x1ZGU6IFtcclxuXHRcdFx0J0Bjb2RlbWlycm9yL3N0YXRlJyxcclxuXHRcdFx0J0Bjb2RlbWlycm9yL3ZpZXcnLFxyXG5cdFx0XHQnQGNvZGVtaXJyb3IvYmFzaWMtc2V0dXAnLFxyXG5cdFx0XHQnQGNvZGVtaXJyb3IvY29tbWFuZHMnLFxyXG5cdFx0XHQnQGNvZGVtaXJyb3IvbGFuZy15YW1sJ1xyXG5cdFx0XVxyXG5cdH1cclxufSk7XHJcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBdVMsU0FBUyxvQkFBb0I7QUFDcFUsU0FBUyxpQkFBaUI7QUFDMUIsT0FBTyxVQUFVO0FBR2pCLElBQU8sc0JBQVEsYUFBYTtBQUFBLEVBQzNCLFNBQVMsQ0FBQyxVQUFVLENBQUM7QUFBQSxFQUNyQixTQUFTO0FBQUEsSUFDUixPQUFPO0FBQUEsTUFDTixhQUFhLEtBQUssUUFBUSxrQkFBa0I7QUFBQSxNQUM1QyxPQUFPLEtBQUssUUFBUSxZQUFZO0FBQUEsTUFDaEMsU0FBUyxLQUFLLFFBQVEsY0FBYztBQUFBLE1BQ3BDLE1BQU0sS0FBSyxRQUFRLFdBQVc7QUFBQSxJQUMvQjtBQUFBLEVBQ0Q7QUFBQSxFQUNBLGNBQWM7QUFBQSxJQUNiLFNBQVM7QUFBQSxNQUNSO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Q7QUFBQSxFQUNEO0FBQ0QsQ0FBQzsiLAogICJuYW1lcyI6IFtdCn0K
