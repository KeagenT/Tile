import { HoleTile, type Tile } from "./Tile.ts";
import type { Position } from "./Position.ts";

interface GridBase<T> {
    /** Gets the object located at the (X,Y) position of the grid. 
     * e.g. 
     * ```ts
     * TileGrid.get(new Position(0, 0)) => HoleTile(...)
     * ```
    */
    get(p: Position): T | undefined;
    /** Sets the (X,Y) position of the grid to a specified object 
    * e.g. 
    * ```ts
    * TileGrid.set(new Position(0, 0), new GroundTile(...));
    * TileGrid.get(new Position(0, 0)) => GroundTile(...);
    * ```
    */
    set(p: Position, value: T): void;
    /** The actual grid which is a 2D array of specified generic type */
    grid(): T[][];
    /** The horizontal length of the grid, including empty spots */
    get width(): number;
    /** The horizontal length of the grid, including empty spots */
    get height(): number;
    /** 
     * Determines if the provided (X, Y) position is valid and within the grid. Used for boundary detection 
     * e.g.
     * ```ts
     * Grid.width() => 3;
     * Grid.height() => 3;
     * Grid.contains(new Position(5, 5)) => false;
     * Grid.contains(new Position(2, 2)) => true;
     * ```
     * */
    contains(p: Position): boolean;

}

/**
 * A generic grid of X width and Y height,
 * with utility methods to get and set objects at a position,
 * and determine if a position is contained within the grid.
 * *note* The grid is 0-indexed and the Y axis "starts" from the top of the screen.
 */
export class Grid<T>  implements GridBase<T> {
    private _grid: T[][];
    private _width: number;
    private _height: number;

    constructor(width: number, height: number, fillObj: () => T) {
        this._width = width;
        this._height = height;
        this._grid = Array.from({ length: height }, () => 
            Array.from({ length: width }, () => fillObj())
        );
    }

    get width(): number {
        return this._width;
    }

    get height(): number {
        return this._height;
    }

    get(p: Position): T | undefined {
        return this._grid[p.y][p.x];
    }

    set(p: Position, value: T): void {
        this._grid[p.y][p.x] = value;
    }
    
    grid(): T[][] {
        return this._grid;
    }
    
    contains(p: Position): boolean {
        if(p.x < 0 || p.x >= this.width) {
            return false;
        }
        if(p.y < 0 || p.y >= this.height) {
            return false;
        }
        return true
    }
}


/**
 * Represents a grid of tiles of X width and Y height.
 * An empty grid is initialized with empty HoleTile objects,
 * with each cell being a unique instance.
 */
export class TileGrid extends Grid<Tile> {
    constructor(width: number, height: number) {
        super(width, height, () => new HoleTile());
    }

    public override toString(): string {
        return this.grid().map(row => row.map(tile => tile.toString()).join('')).join('\n');
    }
}