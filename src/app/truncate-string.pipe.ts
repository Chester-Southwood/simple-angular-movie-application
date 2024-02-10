import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateString'
})
export class TruncateStringPipe implements PipeTransform {

  transform(value: string, maxLength: number): string {
    return value.substring(0, maxLength);
  }

}
