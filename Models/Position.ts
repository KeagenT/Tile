interface PositionBase {
  /** Horizontal zero-indexed position in a 2D array grid */
  get x(): number;

  /** Vertical zero-indexed position in a 2D array grid */
  get y(): number;

  /** Position located one decreasing y value above the current position e.g.
   * ```ts
   * new Position(1, 1).north => Position(1, 0)
   * ```
   */
  get north(): Position;

  /** Position located one increasing x value to the right of the current position e.g.
   * ```ts
   * new Position(1, 1).east => Position(2, 1)
   * ```
   */
  get east(): Position;

  /** Position located one increasing y value below the current position e.g.
   * ```ts
   * new Position(1, 1).south => Position(1, 2)
   * ```
   */
  get south(): Position;

  /** Position located one decreasing x value to the left of the current position e.g.
   * ```ts
   * new Position(1, 1).north => Position(0, 1)
   * ```
   */
  get west(): Position;

  /**
   * An array of all the positions surrounding the current position. in North -> East -> South -> West order.
   * e.g.
   * ```ts
   * new Position(1, 1).surrounding => [Position(1, 0), Position(2, 1), Position(1, 2), Position(0, 1)]
   * ```
   */
  get surrounding(): Position[];

  /**
   * Adds the x and y values of another position to the current position and returns a new Position,
   * used for distance calculations or movement.
   * @param other Position to compare to
   */
  add(other: Position): Position;

  /**
   * Subtracts the x and y values of another position from the current position and returns a new Position,
   * used for distance calculations or movement.
   * @param other Position to compare to
   */
  subtract(other: Position): Position;

  /**
   * Compares the x and y values of another position to the current position and returns true if both are equal
   * @param other Position to compare to
   */
  equals(other: Position): boolean;
}

/**
 * Represents a position in a 2D grid, with x and y values,
 * and methods for calculating surrounding positions.
 * The origin Position of a grid (0, 0) is located in the top left corner of the screen,
 * with the x value increasing to the right and the y value increasing downwards.
 * e.g.
 * ```ts
 * // This is basically a grid with its corresponding positions
 * const grid =
 * [[(0, 0), (1, 0), (2, 0)],
 * [(0, 1), (1, 1), (2, 1)],
 * [(0, 2), (1, 2), (2, 2)]]
 */
export class Position implements PositionBase {
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
