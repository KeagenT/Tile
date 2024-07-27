export class Position {

    constructor(private _x: number, private _y: number) {
        this._x = _x;
        this._y = _y;
    }
    
    get x(): number {
        return this._x;
    }

    get y(): number {
        return this._y;
    }

    get north(): Position {
        /**
        * You start from the top left (0, 0) in the Pixel Coordinate System, so 
        * moving "up" actually means decreasing Y.
        */
        return this.subtract(new Position(0, 1));
    }

    get east(): Position {
        return this.add(new Position(1, 0));
    }

    get south(): Position {
        return this.add(new Position(0, 1));
    }

    get west(): Position {
        return this.subtract(new Position(1, 0));
    }

    get surrounding(): Position[] {
        return [this.north, this.east, this.south, this.west];
    }

    add(other: Position): Position {
        return new Position(this.x + other.x, this.y + other.y);
    }

    subtract(other: Position): Position {
        return new Position(this.x - other.x, this.y - other.y);
    }

    equals(other: Position): boolean {
        return this.x === other.x && this.y === other.y;
    }

    public toString(): string {
        return `Position(${this.x}, ${this.y})`;
    }
}