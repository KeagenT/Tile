export abstract class Command {
  execute(): void {}
  undo(): void {}
}

export class CommandManager<T extends Command> {
  private commands: T[] = [];

  execute(command: T): void {
    command.execute();
    this.commands.push(command);
  }

  undo(): void {
    const command = this.commands.pop();
    if (command) {
      command.undo();
    }
  }

  /**
   * Returns the last command in the command stack, useful for preventing duplicate commands.
   * @returns
   */
  peek(): T | undefined {
    return this.commands.at(-1);
  }
}
