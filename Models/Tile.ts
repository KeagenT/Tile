export enum Tiles {
  Ground = "Ground",
  Hole = "Hole",
  Default = "Default",
}

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

export class Tile implements TileBase {
  collision: boolean = false;
  bitmask = 0;
  tileType: Tiles = Tiles.Default;
  constructor(
    { collision = false, bitmask = 0, tileType = Tiles.Default }: {
      collision?: boolean;
      bitmask?: number;
      tileType?: Tiles;
    } = {},
  ) {
    this.collision = collision;
    this.bitmask = bitmask;
    this.tileType = tileType;
  }

  public toString(): string {
    return `[${this.tileType}, ${this.collision}, ${
      this.bitmask.toString(2).padStart(4, "0")
    }]`;
  }
}

export class HoleTile extends Tile {
  constructor() {
    super({ collision: true, bitmask: 16, tileType: Tiles.Hole });
  }
}

export class GroundTile extends Tile {
  constructor() {
    super({ collision: false, bitmask: 0, tileType: Tiles.Ground });
  }
}
