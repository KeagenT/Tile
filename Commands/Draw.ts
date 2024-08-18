import { Tile, Position, TileGrid } from "../Models/mod.ts";
import { Command } from "./Command.ts";
import { SetTileCommand } from "./SetTile.ts";
import { UpdateTileBitmasksCommand } from "./Bitmask.ts";

export class DrawCommand extends Command {

    private coordinates: Position;
    private grid: TileGrid;
    tile: Tile;
    private SetTileCommand: SetTileCommand | undefined = undefined;
    private UpdateTileBitmasksCommand: UpdateTileBitmasksCommand | undefined = undefined;

    constructor({ coordinates, grid, tile }: { coordinates: Position, grid: TileGrid, tile: Tile }) {
        super();
        this.coordinates = coordinates;
        this.grid = grid;
        this.tile = tile;
    }

    override execute(): void {
        this.SetTileCommand = new SetTileCommand({ coordinates: this.coordinates, tile: this.tile, grid: this.grid });
        this.SetTileCommand.execute();
        this.UpdateTileBitmasksCommand = new UpdateTileBitmasksCommand({ coordinates: this.coordinates, grid: this.grid });
        this.UpdateTileBitmasksCommand.execute();
    }

    override undo(): void {
        if (this.SetTileCommand) {
            this.SetTileCommand.undo();
        }
        if (this.UpdateTileBitmasksCommand) {
            this.UpdateTileBitmasksCommand.undo();
        }
    }

    equals(command: DrawCommand): boolean {
        return this.coordinates.equals(command.coordinates) && this.tile.tileType === command.tile.tileType;
    }
    

}