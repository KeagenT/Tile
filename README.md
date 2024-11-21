# Readme

tilelib-2d is a quick and dirty collection of utility classes and models I used
to make this [Auto Tiling Component](https://www.keagentcreative.com/blog/auto-tiling-1).
Feel free to use it however you'd like, you'll find it most useful though in 2D
Tile Based Map contexts.

## Contents

The Package is organized in three groups `Models`, `Commands`, and `Utilities`.

### Commands

Commands contains the extendable `Command` base class used to implement the
namesake "command" pattern, which is really just a fancy way of making a
function call into an object with a generic `.execute()` call to run, and a
generic `.undo()`, to undo said command. Why use a command?
[Read this](https://gameprogrammingpatterns.com/command.html). They're very
useful when you want something done on an input, you want to customize the input
source regardless of platform, and you want to possibly take it back in the
future.

```ts
export abstract class Command {
  // ...some fields to store previous state to undo into.
  execute(): void {}
  undo(): void {}
}
```

There are a few predefined commands concerning setting tile types on a 2d grid,
updating their bitmask based on surrounding tile-types, and a bundled command
called "draw" which executes these sub-commands on a user interaction with the
tile grid.

### Models

Models contain essential classes needed for basic 2D tile grids including the
generic 2D array `Grid` class, `TileGrid` class, `Position` class, and of course
the `Tile` class.

their interfaces best describe their usage.

```ts
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
   */
  contains(p: Position): boolean;
}
```

```ts
interface TileBase {
  /**
   * Whether the tile exists on the ground layer or not.
   * A hole or wall tile would have collision set to true,
   * while a ground tile would have collision set to false.
   * Used to determine whether this tile is considered "adjacent"
   * to another tile while calculating the bitmask.
   */
  collision: boolean;

  /**
   * Binary number representing whether the four surrounding tiles are traversable or not.
   */
  bitmask: number;

  /**
   * The type of tile, currently: `Ground`, `Hole`, `Default`
   */
  tileType: Tiles;
}
```

```ts
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
```

### Utilities

Contains the `clone` utility to generically duplicate a copy of an object, the
`calcBitmask` utility to generate a 4-bit binary bitmask indicating what sides a tile has another non-colliding tile next to it,
and `calculateEventPosition` which converts a mouse coordinate to a grid coordinate `Position`.
