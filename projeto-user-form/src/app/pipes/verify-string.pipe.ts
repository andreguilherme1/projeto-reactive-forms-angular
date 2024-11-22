import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'verifyString'
})
export class VerifyStringPipe implements PipeTransform {

  transform(string: string): string {
    const INVALID_RESPONSE = !string;

    if(INVALID_RESPONSE) {
      return '';
    } else {
      return string;
    }

  }

}
