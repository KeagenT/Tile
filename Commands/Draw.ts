import { Tile, Position, TileGrid } from "../Models/mod.ts";
import { Command, SetTileCommand, UpdateTileBitmaskCommand } from "./mod.ts";

export class DrawCommand extends Command {

    private coordinates: Position;
    private grid: TileGrid;
    private tile: Tile;
    private SetTileCommand: SetTileCommand | undefined = undefined;
    private UpdateTileBitmaskCommand: UpdateTileBitmaskCommand | undefined = undefined;

    constructor({ coordinates, grid, tile }: { coordinates: Position, grid: TileGrid, tile: Tile }) {
        super();
        this.coordinates = coordinates;
        this.grid = grid;
        this.tile = tile;
    }

    override execute(): void {
        this.SetTileCommand = new SetTileCommand({ coordinates: this.coordinates, tile: this.tile, grid: this.grid });
        this.SetTileCommand.execute();
        this.UpdateTileBitmaskCommand = new UpdateTileBitmaskCommand({ coordinates: this.coordinates, grid: this.grid });
        this.UpdateTileBitmaskCommand.execute();
    }

    override undo(): void {
        if (this.SetTileCommand) {
            this.SetTileCommand.undo();
        }
        if (this.UpdateTileBitmaskCommand) {
            this.UpdateTileBitmaskCommand.undo();
        }
    }

    equals(command: DrawCommand): boolean {
        return this.coordinates.equals(command.coordinates) && this.tile.tileType === command.tile.tileType;
    }
    

}