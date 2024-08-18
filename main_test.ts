import { assertEquals } from "jsr:@std/assert";
import { TileGrid, TileBrushManager, Position, GroundTile, TileBrush, HoleTile } from "./Models/mod.ts";
import { Tiles } from "./mod.ts";
Deno.test(function bitmaskTest() {
  const map = new TileGrid(5, 5);
  const raw_brush = new TileBrush({ grid: map, currentTile: new GroundTile() });
  const hole_brush = new TileBrush({ grid: map, currentTile: new HoleTile() });

  raw_brush.draw(new Position(0, 0));
  raw_brush.draw(new Position(1, 0));
  raw_brush.draw(new Position(0, 1));
  // raw_brush.draw(new Position(1, 1));
  hole_brush.draw(new Position(2, 0));

  // TODO: fix bitmasks command
  
  console.log(map.toString());
  console.log(map.get(new Position(0, 0))?.tileType);

  assertEquals(map.get(new Position(0, 0))?.tileType, Tiles.Ground);

});
