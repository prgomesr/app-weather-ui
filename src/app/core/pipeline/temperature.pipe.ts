import {Pipe, PipeTransform} from '@angular/core';

@Pipe({
  name: 'temperature',
  standalone: true
})
export class TemperaturePipe implements PipeTransform {

  transform(value: number): string {
    const roundedValue = Math.round(value);
    return `${roundedValue}º`;
  }

}
