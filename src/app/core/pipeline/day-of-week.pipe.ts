import {Pipe, PipeTransform} from '@angular/core';
import * as moment from 'moment-timezone';
import 'moment/locale/pt-br';

@Pipe({
  name: 'dayOfWeek',
  standalone: true
})
export class DayOfWeekPipe implements PipeTransform {


  transform(value: number): string {
    return moment.unix(value).tz('America/Sao_Paulo').locale('pt-br').format('ddd');
  }

}
