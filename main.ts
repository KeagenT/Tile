import { build, emptyDir } from "jsr:@deno/dnt";

await emptyDir("./dist");

await build({
  entryPoints: [
    "mod.ts",
    { name: "./Models", path: "Models/mod.ts" },
    { name: "./Commands", path: "Commands/mod.ts" },
    { name: "./Utilities", path: "Utilities/mod.ts" },
  ],
  outDir: "./dist",
  test: false,
  shims: {
    deno: true,
  },
  package: {
    name: "tilelib-2d",
    version: "0.2.1",
    description: "Lightweight 2D Tile Manipulation Library, useful for map building, maze generation, dungeon crafting etc.",
  },
});

await Deno.copyFile("README.md", "./dist/README.md");


