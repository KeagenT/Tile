import { calcBitmask } from "../Utilities/mod.ts";

import { Position, TileGrid, Tile } from "../Models/mod.ts";
import { Command } from "./mod.ts";

export class UpdateTileBitmaskCommand extends Command {
    private coordinates: Position;
    private grid: TileGrid;
    private previousBitmask: number | undefined = undefined;

    constructor({ coordinates, grid }: { coordinates: Position, grid: TileGrid }) {
        super();
        this.coordinates = coordinates;
        this.grid = grid;
    };

    override execute(): void {
        const tile: Tile = this.grid.get(this.coordinates)!;
        this.previousBitmask = tile.bitmask;
        tile.bitmask = calcBitmask(this.grid, this.coordinates);
        this.grid.set(this.coordinates, tile);
    }

    override undo(): void {
        if(this.previousBitmask) {
            const tile: Tile = this.grid.get(this.coordinates)!;
            tile.bitmask = this.previousBitmask!;
            this.grid.set(this.coordinates, tile);
        }
    }
}