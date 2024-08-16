import { assertEquals } from "@std/assert";
import { TileGrid, Position, GroundTile } from "./Models/mod.ts";
import { calcBitmask } from "./Utilities/mod.ts";

Deno.test(function bitmaskTest() {
  const map = new TileGrid(5, 5);
  map.set(new Position(2, 2), new GroundTile());
  map.set(new Position(2, 3), new GroundTile());
  map.set(new Position(3, 3), new GroundTile());
  assertEquals(calcBitmask(map, new Position(2, 2)), 4);
  assertEquals(calcBitmask(map, new Position(2, 3)), 3);
  assertEquals(calcBitmask(map, new Position(3, 3)), 8);
});
