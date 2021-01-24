import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[], key: string, search: any): any {
    if (key && search) {
      const a = value && value.filter(t => t[key] === search);
      return a;
    }
    return value;
  }
}
