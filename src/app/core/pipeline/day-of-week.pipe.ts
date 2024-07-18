import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment';
import 'moment/locale/pt-br';

@Pipe({
  name: 'dayOfWeek',
  standalone: true
})
export class DayOfWeekPipe implements PipeTransform {


  transform(value: number): string {
    return moment.unix(value).locale('pt-br').format('ddd');
  }

}
