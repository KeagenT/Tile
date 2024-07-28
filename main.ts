import { TileGrid } from "./Models/Grid.ts";

export function add(a: number, b: number): number {
  return a + b;
}

// Learn more at https://docs.deno.com/runtime/manual/examples/module_metadata#concepts
if (import.meta.main) {
  const map = new TileGrid(5, 5);
  console.log(map.toString());

}
