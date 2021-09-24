import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'celsius'
})
export class CelsiusPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): number{
    if(0 / Number(value) !== 0){
      return 0
    }else{
      return parseInt(value,10) - 273
    }
  }
}
