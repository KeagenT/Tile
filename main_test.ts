import { assertEquals } from "jsr:@std/assert";
import { TileGrid, Position, GroundTile, TileBrush } from "./Models/mod.ts";
import { Tiles } from "./mod.ts";
Deno.test(function bitmaskTest() {
  const map = new TileGrid(3, 3);
  const raw_brush = new TileBrush({ grid: map, currentTile: new GroundTile() });

  raw_brush.draw(new Position(0, 0));
  assertEquals(map.get(new Position(0, 0))?.tileType, Tiles.Ground);
  assertEquals(map.get(new Position(0, 0))?.bitmask, 0);

  assertEquals(map.get(new Position(1, 0))?.tileType, Tiles.Hole);
  assertEquals(map.get(new Position(1, 0))?.bitmask, 16);

  assertEquals(map.get(new Position(0, 1))?.tileType, Tiles.Hole);
  assertEquals(map.get(new Position(0, 1))?.bitmask, 17);

  console.log(map.toString());

});
