import { build, emptyDir } from '@deno/dnt';

await emptyDir('./dist');

await build({
  entryPoints: ["./mod.ts"],
  outDir: "./dist",
  test: false,
  shims: {
    deno: true,
  },
  package: {
    name: "2Dtilelib",
    version: "0.1.0",
    description: "2D tile manipulation library",
  },
});
