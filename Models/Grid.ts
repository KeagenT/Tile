import { HoleTile, Tile } from "./Tile.ts";
import { Position } from "./Position.ts";

export class Grid<T> {
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

    public toString(): string {
        return this.grid().map(row => row.map(tile => tile.toString()).join('')).join('\n');
    }
}