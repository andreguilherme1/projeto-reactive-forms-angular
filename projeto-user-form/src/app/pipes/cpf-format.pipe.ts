import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'cpfFormat'
})
export class CpfFormatPipe implements PipeTransform {

  transform(value: number): string {
    if (!value) {
      return '';
    }

    const cpf = value.toString().padStart(11, '0');
    if (cpf.length !== 11 || !/^\d{11}$/.test(cpf)) {
      return value.toString();
    }

    return `${cpf.substring(0, 3)}.${cpf.substring(3, 6)}.${cpf.substring(6, 9)}-${cpf.substring(9, 11)}`;
  }

}
