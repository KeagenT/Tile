import { Position, Tile, TileGrid } from "../Models/mod.ts";
import { Command } from "./mod.ts";

export class SetTileCommand extends Command {
    private coordinates: Position;
    private tile: Tile;
    private grid: TileGrid;
    private previousTile: Tile | undefined = undefined;
    constructor({ coordinates, tile, grid }: { coordinates: Position, tile: Tile, grid: TileGrid }) {
        super();
        this.coordinates = coordinates;
        this.grid = grid;
        this.tile = tile;
    }

    override execute(): void {
        this.previousTile = this.grid.get(this.coordinates);
        this.grid.set(this.coordinates, this.tile);
    }

    override undo(): void {
        if (this.previousTile) {
            this.grid.set(this.coordinates, this.previousTile);
        }
    }
}