import { Component, h } from '@stencil/core';
@Component({
  tag: 'advent-day5',
  styleUrl: 'advent-day5.css',
  shadow: true,
})
export class MyComponent {
  template: number[][] = [];
  async fetchFile(): Promise<any[]> {
    const contentFile = await this.readTextFile(`/assets/day5.txt`);
    return contentFile.split(/\r?\n/);
  }

  async readTextFile(file): Promise<string>
  {
    return await fetch(file).then(response => response.text())
    .then(text => text)
  }

  async componentDidLoad() {
    let result = await this.fetchFile();
    let array: string[][] = result.filter(ele => ele.length > 0).map(r => this.getValueDepartAndDest(r));
    let arrayConcated = array.reduce((a, b) => a.concat(b));
    let pointArray = arrayConcated.map(r => {
      return r.split(',').filter(ele => ele != undefined);});
    let maxX = pointArray.map(point => parseInt(point[0])).reduce((a, b) => Math.max(a, b));
    let maxY = pointArray.map(point => parseInt(point[1])).reduce((a, b) => Math.max(a, b));

    for (let i = 0; i < maxY+1; i++) {
      this.template[i] = [];
      for (let j = 0; j < maxX+1; j++) {
        this.template[i].push(0);
      }
    }
    array.map(arrayTwoPoints => {
      // console.log('arrayTwoPoints', arrayTwoPoints);
      let twoPoints: number[][] = arrayTwoPoints.map(point => {
        let newPoint: any[] = point.split(',');
        newPoint = newPoint.map(value => parseInt(value));
        // console.log('point', newPoint);
        return newPoint;
      });
      // console.log('two points', twoPoints);
      this.addInLine(twoPoints);
    });

    // for test use
    // let test = [
    //   [6, 2],
    //   [4, 0]
    // ];
    // this.addInLine(test);

    console.log('template updated: ', this.template);
    let res = this.searchValuesPlusTwoInTemplate();
    console.log('searchValuesPlusTwoInTemplate: ', res);
  }

  getValueDepartAndDest(str: string): string[] {
    const words = str.split(' ');
    return [words[0], words[2]];
  }

  addInLine(twoPoint: number[][]){
    let point1 = twoPoint[0];
    let point2 = twoPoint[1];
    if(point1[0] === point2[0]){
      // vertical
      let departY = 0;
      let destinationY = 0;
      if (point1[1] < point2[1]){
        departY = point1[1];
        destinationY = point2[1];
      } else {
        departY = point2[1];
        destinationY = point1[1]
      }
      for(let i = departY;i <= destinationY; i++){
        this.template[i][twoPoint[0][0]]++;
      }
    } else if (point1[1] === point2[1]) {
      // horizontal
      let departX = 0;
      let destinationX = 0;
      if (point1[0] < point2[0]){
        departX = point1[0];
        destinationX =point2[0];
      } else {
        departX = point2[0];
        destinationX = point1[0]
      }
      for(let i = departX;i <= destinationX; i++){
        this.template[twoPoint[0][1]][i]++;
      }
    }
    // part 2
    else if(Math.abs(point1[0] - point2[0]) === Math.abs(point2[1] - point1[1])) {
      // diagnoal
      // point1 is on left
      let decart = Math.abs(point1[0] - point2[0]);
      if(point1[0] < point2[0]){
        if (point1[1]<point2[1]){
          for (let i = 0;i <= decart;i++){
            ++this.template[point1[1]+i][point1[0]+i];
          }
        } else {
          for (let i = 0;i <= decart;i++){
            ++this.template[point1[1]-i][point1[0]+i];
          }
        }
      }
      else {
        if (point1[1]<point2[1]){
          for (let i = 0;i <= decart;i++) {
          ++this.template[point1[1]+i][point1[0]-i];
          }
        } else {
          for (let i = 0;i <= decart;i++){
            ++this.template[point1[1]-i][point1[0]-i];
          }
        }
      }
    }
  }

  searchValuesPlusTwoInTemplate(){
    let count = 0;
    this.template.map(row => {
      row.forEach(point => {
        if (point > 1){
          count++;
        }
      })
    });
    return count;
  }

  render() {
    return <div>Hello, World! I'm {this.searchValuesPlusTwoInTemplate()}</div>;
  }
}
