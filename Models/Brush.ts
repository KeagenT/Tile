import type { Position, Tile, TileGrid } from "./mod.ts";
import { CommandManager, DrawCommand } from "../Commands/mod.ts";
import { clone } from "../Utilities/mod.ts";

export abstract class Brush<T> {
  draw(position: Position): void {}
  updatePaint(paint: T): void {}
}

export class TileBrush extends Brush<Tile> {
  /** The tile the brush should draw onto the grid */
  private currentTile: Tile | undefined = undefined;

  /** The grid this brush is drawing onto */
  grid: TileGrid;

  private drawCommands: CommandManager<DrawCommand> = new CommandManager();

  constructor({ grid, currentTile }: { grid: TileGrid; currentTile: Tile }) {
    super();
    this.grid = grid;
    this.currentTile = currentTile;
  }

  override draw(position: Position): void {
    const drawCommand: DrawCommand = new DrawCommand({
      coordinates: position,
      grid: this.grid,
      tile: this.currentTile!,
    });
    const lastCommandExecuted: DrawCommand | undefined = this.drawCommands
      .peek();

    /** Prevents executing the same command multiple times */
    const isDifferentDrawCommand: boolean = !lastCommandExecuted?.equals(
      drawCommand,
    );
    if (isDifferentDrawCommand) {
      /** We need to clone the object instance, so all the tiles drawn aren't referencing this one brush's tile.
       * Otherwise bitmask updates would apply to all tiles drawn with this brush.
       */
      drawCommand.tile = clone(this.currentTile!);
      this.drawCommands.execute(drawCommand);
    }
  }

  undo(): void {
    this.drawCommands.undo();
  }

  override updatePaint(paint: Tile): void {
    this.currentTile = paint;
  }
}

/**
 * Manages the drawing state of a tile brush, depending on input events and valid positions
 * as well as the current tile paint.
 */
export class TileBrushManager {
  private brush: TileBrush;
  drawing: boolean = false;
  constructor({ brush }: { brush: TileBrush }) {
    this.brush = brush;
  }

  draw(position: Position): void {
    if (!this.brush.grid.contains(position)) {
      this.drawing = false;
    }
    if (this.drawing) {
      this.brush.draw(position);
    }
  }

  undo(): void {
    this.brush.undo();
  }

  updatePaint(paint: Tile): void {
    this.brush.updatePaint(paint);
  }
}
