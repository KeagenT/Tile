import { calcBitmask } from "../Utilities/mod.ts";
import { Position, TileGrid, Tile } from "../Models/mod.ts";
import { Command, CommandManager } from "./Command.ts";

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

export class UpdateTileBitmasksCommand extends Command {
    private coordinates: Position;
    private grid: TileGrid;
    private tileBitmaskCommands: Array<UpdateTileBitmaskCommand> = [];

    constructor({ coordinates, grid }: { coordinates: Position, grid: TileGrid }) {
        super();
        this.coordinates = coordinates;
        this.grid = grid;
    };

    execute(): void {
        this.tileBitmaskCommands.push(new UpdateTileBitmaskCommand({ coordinates: this.coordinates, grid: this.grid }));
        this.coordinates.surrounding.forEach((position) => {
            if(this.grid.contains(position)) {
                this.tileBitmaskCommands.push(new UpdateTileBitmaskCommand({ coordinates: position, grid: this.grid }));
            }
        });
        this.tileBitmaskCommands.forEach((command) => {
            command.execute();
        });
    }

    undo(): void {
        this.tileBitmaskCommands.forEach((command) => {
            command.undo();
        });
    }
}