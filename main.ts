import { build, emptyDir } from '@deno/dnt';

await emptyDir('./dist');

await build({
  entryPoints: [
    "mod.ts",
    { name: "./Models", path: "Models/mod.ts" },
    { name: "./Commands", path: "Commands/mod.ts" },
    { name: "./Utilities", path: "Utilities/mod.ts" }
  ],
  outDir: "./dist",
  test: false,
  shims: {
    deno: true,
  },
  package: {
    name: "tilelib-2d",
    version: "0.1.0",
    description: "2D tile manipulation library",
  },
});
