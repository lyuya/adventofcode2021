import { Component, Host, h } from '@stencil/core';
import {Command, TotalAndDepth} from "../../model/command";

@Component({
  tag: 'advent-day2',
  styleUrl: 'advent-day2.css',
  shadow: true,
})
export class AdventDay2 {
  async readTextFile(): Promise<string[]>
  {
    let content = await fetch(`/assets/day2.txt`).then(response => response.text())
      .then(text => text);
    return content.split(/\r?\n/)
  }
  async componentDidLoad() {
    let result = await this.readTextFile();
    const commands = this.getListCommands(result);
    console.log('commands', commands);
    let totalAndDepth: TotalAndDepth = {
      total: 0,
      depth: 0,
      aim: 0
    };
    commands.forEach(cmd => {
      this.treatCommand(cmd, totalAndDepth);
    });
    console.log('totalAndDepth', totalAndDepth);
    let totalAndDepth2: TotalAndDepth = {
      total: 0,
      depth: 0,
      aim: 0
    };
    commands.forEach(cmd => {
      this.treatCommand2(cmd, totalAndDepth2);
    });
    console.log('totalAndDepth2', totalAndDepth2);
  }

  getListCommands(rows: string[]): Command[]{
    let commands:Command[] = [];
    rows.forEach(row => {
      let str = row.split(' ');
      let cmd: Command = {
        name: str[0],
        value: parseInt(str[1])
      };
      commands.push(cmd);
    });
    return commands;
  }

  treatCommand(cmd:Command, totalAndDepth: TotalAndDepth){
    switch (cmd.name) {
      case 'forward':
        totalAndDepth.total = totalAndDepth.total + cmd.value;
        break;
      case 'up':
        totalAndDepth.depth = totalAndDepth.depth - cmd.value;
        break;
      case 'down':
        totalAndDepth.depth = totalAndDepth.depth + cmd.value;
        break;
    }
  }

  treatCommand2(cmd:Command, totalAndDepth: TotalAndDepth){
    switch (cmd.name) {
      case 'forward':
        totalAndDepth.total = totalAndDepth.total + cmd.value;
        totalAndDepth.depth = totalAndDepth.aim * cmd.value + totalAndDepth.depth;
        break;
      case 'up':
        totalAndDepth.aim = totalAndDepth.aim - cmd.value;
        break;
      case 'down':
        totalAndDepth.aim = totalAndDepth.aim + cmd.value;
        break;
    }
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
