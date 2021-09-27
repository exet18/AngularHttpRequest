import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'celsius'
})
export class CelsiusPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): number {
    const degrees = Number(value);
    if (isNaN(degrees)) {
      return 0;
    }
    return parseInt(value, 10) - 273;
  }
}
