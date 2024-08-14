import { TileGrid } from "../Models/Grid.ts";
import { Position } from "../Models/Position.ts";
import { Tiles } from "../Models/Tile.ts";

export function calcBitmask(grid: TileGrid, coordinates: Position): number {
    let bitmask = 0;
    let tile = grid.get(coordinates);
    if(tile!.tileType === Tiles.Ground) {
        bitmask = calcGroundBitmask(grid, coordinates);
    }
    if(tile!.tileType === Tiles.Hole) {
        bitmask = calcHoleBitmask(grid, coordinates);
    }
    return bitmask;
}

function calcGroundBitmask(grid: TileGrid,  coordinates: Position) {
    let bitmask = 0;
    const surroundingPositions = coordinates.surrounding;
    surroundingPositions.forEach((neighborPosition, index) => {
        if(grid.contains(neighborPosition)) {
            const neighboringTile = grid.get(neighborPosition);
            if(!neighboringTile!.collision) {
                bitmask |= 1 << index;
            }

        }
    });
    return bitmask;
}

function calcHoleBitmask(grid: TileGrid, coordinates: Position) {
    let bitmask = 0;
    if (grid.contains(coordinates.north)) {
        const northTile = grid.get(coordinates.north);
        if (northTile!.collision) {
            bitmask |= 1 << 0;
        }
    }
    return bitmask;
}


export function convertBitmaskToTileSetPosition(bitmask: number, tileSetRowLength: number): Position {
    const y = Math.floor(bitmask / tileSetRowLength);
    const x = bitmask % tileSetRowLength;
    return new Position(x, y);
}

