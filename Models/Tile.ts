export enum Tiles {
    Ground = 'Ground',
    Hole = 'Hole',
    Default = 'Default'
}

export class Tile {

    collision: boolean = false;
    bitmask = 0;
    tileType: Tiles =  Tiles.Default;
    constructor({collision = false, bitmask = 0, tileType = Tiles.Default}: {collision?: boolean, bitmask?: number, tileType?: Tiles} = {}) {
        this.collision = collision;
        this.bitmask = bitmask;
        this.tileType = tileType;
    }

    public toString(): string {
        return `[${this.tileType}, ${this.collision}, ${this.bitmask.toString(2).padStart(4, '0')}]`;
    }

}

export class HoleTile extends Tile {
    constructor() {
        super({collision: true, bitmask: 16, tileType: Tiles.Hole});
    }
}

export class GroundTile extends Tile {
    constructor() {
        super({collision: false, bitmask: 0, tileType: Tiles.Ground});
    }
}