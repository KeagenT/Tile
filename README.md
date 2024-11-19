# Readme

tilelib-2d is a quick and dirty collection of utility classes and models I used to make this [Auto Tiling Component](keagentcreative.com/blog/auto-tiling-1). Feel free to use it however you'd like, you'll find it most useful though in 2D Tile Based Map making.

## Contents

The Package is organized in three groups `Models`, `Commands`, and `Utilities`. 

### Commands

Commands contains the extendable `Command` base class used to implement the command pattern, which is really just a fancy way of making a function call into an object with a generic `.execute()` call to run, and a generic `.undo()`, to undo said command. Why use a command? [Read this](https://gameprogrammingpatterns.com/command.html). They're very useful when you want something done on an input, you want to customize the input source regardless of platform, and you want to possibly take it back in the future.

```ts
 export abstract class Command {
    execute(): void {};
    undo(): void {};
}
```

There are a few predefined commands concerning setting tile types on a 2d grid, updating their bitmask based on surrounding tile-types, and a bundled command called "draw" which executes these sub-commands on a user interaction with the tile grid. Feel free to make anything you'd like.

### Models

Models contain essential classes needed for basic 2D tile grids including the generic 2D array `Grid` class, `TileGrid` class, `Position` class,
and of course the `Tile` class. 
