import { defineConfig } from "rollup";

import commonjs from "@rollup/plugin-commonjs";
import json from "@rollup/plugin-json";
import { nodeResolve } from "@rollup/plugin-node-resolve";

export default defineConfig({
  input: "index.js",
  output: { file: "dist/rollup/index.cjs", format: "cjs" },
  plugins: [
    commonjs(),
    json(),
    nodeResolve({ exportConditions: ["node"], preferBuiltins: true }),
  ],
});
