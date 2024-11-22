import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'adressType'
})
export class AdressTypePipe implements PipeTransform {

  transform(adressType: string): string {
    const INVALID_TYPE = 
    adressType !== 'RESIDENTIAL' && 
    adressType !== 'WORK' && 
    adressType !== 'ALTERNATIVE';

    if(INVALID_TYPE) {
      return 'Tipo inválido';
    }

    if (adressType === 'RESIDENTIAL') {
      return 'Residencial';
    } else if (adressType === 'WORK') {
      return 'Trabalho';
    } else if (adressType === 'ALTERNATIVE') {
      return 'Alternativo';
    } else {
      return 'Tipo inválido';
    }
  }

}
