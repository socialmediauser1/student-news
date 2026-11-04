import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Deliberate break for HW10 Task 2.1: Object.groupBy exists from Node 21,
// so the config loads on Node 22 and throws a TypeError on Node 20.
const pluginsByKind = Object.groupBy([react()].flat(), (p) => (p.enforce ? "ordered" : "normal"));

export default defineConfig({
  plugins: [...(pluginsByKind.ordered ?? []), ...(pluginsByKind.normal ?? [])]
});
