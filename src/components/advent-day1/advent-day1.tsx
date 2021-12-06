import { Component, Host, h } from '@stencil/core';

@Component({
  tag: 'advent-day1',
  styleUrl: 'advent-day1.css',
  shadow: true,
})
export class AdventDay1 {
  async readTextFile(): Promise<string[]>
  {
    let content = await fetch(`/assets/day1.txt`).then(response => response.text())
      .then(text => text);
    return content.split(/\r?\n/)
  }

  async componentDidLoad() {
    let result = await this.readTextFile();
    let arrayNumber = result.filter(ele => ele.length > 0).map(ele => parseInt(ele));
    let mesurement = new Array(arrayNumber.length).fill(0);
    let mesurement2 = new Array(arrayNumber.length).fill(0);
    mesurement = this.getMesurementArray(arrayNumber, mesurement);
    let total = this.calculateMesurement(mesurement);
    let newArray = this.toTripleAdditionArray(arrayNumber);
    console.log('newArray', newArray);
    mesurement2 = this.getMesurementArray(newArray, mesurement2);
    let total2 = this.calculateMesurement(mesurement2);
    console.log('part 1 --- total: ', total);
    console.log('---------------------------');
    console.log('part 2 --- total: ', total2)
  }

  getMesurementArray(arrayNumber, mesurement){
    arrayNumber.forEach((ele, index) => {
      if (index>0 && ele > arrayNumber[index-1]){
        mesurement[index] = 1;
      }
    });
    return mesurement;
  }

  calculateMesurement(mesurement: number[]){
    return mesurement.reduce((a, b) => a+b);
  }

  toTripleAdditionArray(old :number[]) : number[] {
    let newArray: number[] = [];
    old.forEach((ele, index) => {
      if (index < old.length - 2){
        newArray.push(ele + old[index+1]+old[index+2]);
      }
    });
    return newArray;
  }

  render() {
    return (
      <Host>
        <slot></slot>
      </Host>
    );
  }

}
