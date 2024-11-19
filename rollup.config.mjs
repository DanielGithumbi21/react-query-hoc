import { defineConfig } from "rollup";
import pkg from "./package.json" assert { type: "json" };
import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";

export default defineConfig({
  input: "src/index.ts",
  output: [
    {
      file: pkg.main,
      format: "cjs",
      sourcemap: true,
    },
    {
      file: pkg.module,
      format: "esm",
      sourcemap: true,
    },
  ],
  external: [
    ...Object.keys(pkg.peerDependencies || {}),
    ...Object.keys(pkg.dependencies || {}),
  ],
  plugins: [
    resolve(),
    typescript({
      tsconfig: "./tsconfig.json", // Keep this if you have a custom tsconfig.json
    }),
  ],
});
