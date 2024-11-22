import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'phoneType'
})
export class PhoneTypePipe implements PipeTransform {

  transform(phoneType: string): string {
    const INVALID_TYPE =
    phoneType !== 'RESIDENTIAL' && 
    phoneType !== 'MOBILE' && 
    phoneType !== 'EMERGENCY';

    if(INVALID_TYPE) {
      return 'Tipo inválido'
    }

    if(phoneType === 'RESIDENTIAL') {
      return 'Residencial';
    } else if (phoneType === 'MOBILE') {
      return 'Telefone';
    } else if (phoneType === 'EMERGENCY') {
      return 'Emergencial';
    } else {
      return 'Tipo inválido';
    }
  }

}
