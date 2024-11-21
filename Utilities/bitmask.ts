import { Position, TileGrid, Tiles } from "../Models/mod.ts";

/**
 * Calculates the bitmask for a given tile in a tile grid,
 * based on the surrounding tiles and the tile type.
 * generally detects an adjacent tile and pushes a 1 to the corresponding bit direction.
 * @param grid - The tile grid.
 * @param coordinates - The coordinates of the tile being bitmasked.
 * @returns The bitmask value.
 */
export function calcBitmask(grid: TileGrid, coordinates: Position): number {
  let bitmask = 0;
  const tile = grid.get(coordinates);
  if (tile!.tileType === Tiles.Ground) {
    bitmask = calcGroundBitmask(grid, coordinates);
  }
  if (tile!.tileType === Tiles.Hole) {
    bitmask = calcHoleBitmask(grid, coordinates);
  }
  return bitmask;
}

function calcGroundBitmask(grid: TileGrid, coordinates: Position) {
  let bitmask = 0;
  const surroundingPositions = coordinates.surrounding;
  surroundingPositions.forEach((neighborPosition, index) => {
    if (grid.contains(neighborPosition)) {
      const neighboringTile = grid.get(neighborPosition);
      if (!neighboringTile!.collision) {
        bitmask |= 1 << index;
      }
    }
  });
  return bitmask;
}

function calcHoleBitmask(grid: TileGrid, coordinates: Position) {
  let bitmask = 16;
  if (grid.contains(coordinates.north)) {
    const northTile = grid.get(coordinates.north);
    /** Use Bitmask 17 if the hole tile has ground to its north */
    if (!northTile!.collision) {
      bitmask |= 1 << 0;
    }
  }
  return bitmask;
}

export function convertBitmaskToTileSetPosition(
  bitmask: number,
  tileSetRowLength: number,
): Position {
  const y = Math.floor(bitmask / tileSetRowLength);
  const x = bitmask % tileSetRowLength;
  return new Position(x, y);
}
