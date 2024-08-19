import { Position } from "../Models/mod.ts";

export function calculateEventPosition(tileSize: number, eventX: number, eventY: number): Position {
    const x = Math.floor(eventX / tileSize);
    const y = Math.floor(eventY / tileSize);
    return new Position(x, y);
}