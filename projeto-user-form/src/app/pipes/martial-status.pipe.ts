import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'martialStatus'
})
export class MartialStatusPipe implements PipeTransform {

  transform(martialStatus: string): string {
    const INVALID_STATUS = 
    martialStatus !== 'DIVORCED' && 
    martialStatus !== 'MARRIED' && 
    martialStatus !== 'SINGLE';

    if (INVALID_STATUS) {
      return 'Indefinido'
    }

    if (martialStatus === 'DIVORCED') {
      return 'Divorciado(a)';
    } else if (martialStatus === 'MARRIED') {
      return 'Casado(a)';
    } else if (martialStatus === 'SINGLE') {
      return 'Solteiro(a)';
    } else {
      return 'Indefinido';
    }
  }

}
