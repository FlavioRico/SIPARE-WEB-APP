import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'longitud'
})
export class LongitudPipe implements PipeTransform {

  transform(value: number): unknown {
    let stringValue = value.toString();
    return (stringValue.length);
  }

}
