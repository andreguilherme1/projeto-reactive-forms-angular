import { Component, OnInit } from '@angular/core';
import { UsersService } from './services/users.service';
import { IUserResponse } from './interfaces/users/user.interface';
import {
  AbstractControl,
  FormArray,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CountriesService } from './services/countries.service';
import { StatesService } from './services/states.service';
import { IPhoneList } from './interfaces/users/phone-list.interface';
import { IAddressList } from './interfaces/users/adress-list.interface';
import { ICountries } from './interfaces/countries/countries.interface';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  userForm!: FormGroup;
  usersList: IUserResponse[] = [];
  dependentsList!: any;
  countries: any = [];
  states: any = [];
  userSelected: any = {};
  countrySelected: any;
  payloadProp: any;
  isEditable: boolean = false;
  hasUserSelected: boolean = false;
  selectedIndex: number = -1;

  constructor(
    private readonly _usersService: UsersService,
    private readonly _countriesService: CountriesService,
    private readonly _statesService: StatesService,
    private readonly _fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.userForm = this._fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/),],],
      country: ['', Validators.required],
      state: ['', Validators.required],
      maritalStatus: ['', Validators.required],
      monthlyIncome: ['', Validators.required],
      birthDate: ['', Validators.required],

      typeNumber: ['', Validators.required],
      areaCode: ['', Validators.required],
      internationalCode: [''],
      residentialNumber: [''],
      number: ['', Validators.required],
      emergencyNumber: [''],

      typeAdress1: ['Residencial'],
      typeAdress2: ['Trabalho'],
      typeAdress3: ['Alternativo'],
      street1: ['', Validators.required],
      complement1: ['', Validators.required],
      countryAdress1: ['', Validators.required],
      stateAdress1: ['', Validators.required],
      city1: ['', Validators.required],
      street2: [''],
      street3: [''],
      complement2: [''],
      complement3: [''],
      countryAdress2: [''],
      countryAdress3: [''],
      stateAdress2: [''],
      stateAdress3: [''],
      city2: [''],
      city3: [''],

      dependentsList: this._fb.array([]),
    });
    this.dependentsList = this.userForm.get('dependentsList') as FormArray;
    this.getUsers();
    this.verifyForm();
    this.getAllCountries();
    this.userForm.get('typeAdress1')?.disable();
    this.userForm.get('typeAdress2')?.disable();
    this.userForm.get('typeAdress3')?.disable();
  }

  getUsers() {
    return this._usersService.getUsers().subscribe((usersResponse) => {
      this.usersList = usersResponse;
    });
  }

  getUserSelected(index: number) {
    this._usersService.getUserById(index).subscribe((user) => {
      this.userSelected = user;
      this.selectedIndex = index;
      this.hasUserSelected = true;
      this.populateForm();
    });
  }

  selectColor(index: number): string {
    return this.selectedIndex === index ? 'cardSelected' : 'card';
  }

  verifyForm() {
    return this.userForm.valueChanges.subscribe((response) => {
      this.countrySelected = response.country;
    });
  }

  getAllCountries() {
    return this._countriesService.getCountries().subscribe((response) => {
      const FILTRED_COUNTRIES = response.data.map((data: any) => ({
        nome: data.name,
      }));
      this.countries = FILTRED_COUNTRIES;
    });
  }

  getStates(country: any) {
    return this._statesService.getStates(country).subscribe((response) => {
      this.states = response;
    });
  }

  addDependentsGroup() {
    const dependentsForm = this._fb.group({
      name: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(1)]],
      document: ['', Validators.required],
    });
    this.dependentsList.push(dependentsForm);
  }

  deleteDependent(dependentsListIndex: number) {
    this.dependentsList.removeAt(dependentsListIndex);
  }

  get dependentsGroup() {
    return this.userForm.controls['dependentsList'] as FormArray;
  }

  getPayload() {
    const payload = {
      name: this.userForm.get('name')?.value,
      email: this.userForm.get('email')?.value,
      country: this.userForm.get('country')?.value,
      state: this.userForm.get('state')?.value,
      maritalStatus: this.userForm.get('maritalStatus')?.value,
      monthlyIncome: this.userForm.get('monthlyIncome')?.value,
      birthDate: this.userForm.get('birthDate')?.value,

      phoneList: [ 
      {
        type: 'RESIDENTIAL',
        areaCode: this.userForm.get('residentialNumber')?.value.slice(3, 5),
        internationalCode: this.userForm.get('residentialNumber')?.value.slice(0, 3),
        number: this.userForm.get('residentialNumber')?.value.slice(5, 15)
      },
      {
        type: 'MOBILE',
        areaCode: this.userForm.get('number')?.value.slice(3, 5),
        internationalCode: this.userForm.get('number')?.value.slice(0, 3),
        number: this.userForm.get('number')?.value.slice(5, 15)
      },
      {
        type: 'EMERGENCY',
        areaCode: this.userForm.get('emergencyNumber')?.value.slice(3, 5),
        internationalCode: this.userForm.get('emergencyNumber')?.value.slice(0, 3),
        number: this.userForm.get('emergencyNumber')?.value.slice(5, 15)
      }
      ],

      addressList: [
        {
          type: "RESIDENTIAL",
          street: this.userForm.get('street1')?.value === undefined ? '': this.userForm.get('street1')?.value,
          complement: this.userForm.get('complement1')?.value === undefined ? '': this.userForm.get('complement1')?.value,
          country: this.userForm.get('countryAdress1')?.value === undefined ? '': this.userForm.get('countryAdress1')?.value,
          state: this.userForm.get('stateAdress1')?.value === undefined ? '': this.userForm.get('stateAdress1')?.value,
          city: this.userForm.get('city1')?.value === undefined ? '': this.userForm.get('city1')?.value
        },
        {
          type: "WORK",
          street: this.userForm.get('street2')?.value === undefined ? '': this.userForm.get('street2')?.value,
          complement: this.userForm.get('complement2')?.value === undefined ? '': this.userForm.get('complement2')?.value,
          country: this.userForm.get('countryAdress2')?.value === undefined ? '': this.userForm.get('countryAdress2')?.value,
          state: this.userForm.get('stateAdress2')?.value === undefined ? '': this.userForm.get('stateAdress2')?.value,
          city: this.userForm.get('city2')?.value === undefined ? '': this.userForm.get('city2')?.value
        },
        {
          type: "ALTERNATIVE",
          street: this.userForm.get('street3')?.value === undefined ? '': this.userForm.get('street3')?.value,
          complement: this.userForm.get('complement3')?.value === undefined ? '': this.userForm.get('complement3')?.value,
          country: this.userForm.get('countryAdress3')?.value === undefined ? '': this.userForm.get('countryAdress3')?.value,
          state: this.userForm.get('stateAdress3')?.value === undefined ? '': this.userForm.get('stateAdress3')?.value,
          city: this.userForm.get('city3')?.value === undefined ? '': this.userForm.get('city3')?.value
        },
      ],

      dependentsList: this.dependentsList.value
    }

    return payload;
  }

  populateForm() {
    this.dependentsList.clear();
    this.userForm.patchValue({
      name: this.userSelected.name,
      email: this.userSelected.email,
      country: this.userSelected.country,
      state: this.userSelected.state,
      maritalStatus: this.userSelected.maritalStatus,
      monthlyIncome: this.userSelected.monthlyIncome,
      birthDate: this.userSelected.birthDate,

      residentialNumber: this.getPhoneNumber(this.userSelected.phoneList,'RESIDENTIAL'),
      number: this.getPhoneNumber(this.userSelected.phoneList,'MOBILE'),
      emergencyNumber: this.getPhoneNumber(this.userSelected.phoneList,'EMERGENCY'),
      street1: this.getAdress(this.userSelected.addressList, 'RESIDENTIAL').street,
      street2: this.getAdress(this.userSelected.addressList, 'WORK').street,
      street3: this.getAdress(this.userSelected.addressList, 'ALTERNATIVE').street,
      complement1: this.getAdress(this.userSelected.addressList, 'RESIDENTIAL').complement,
      complement2: this.getAdress(this.userSelected.addressList, 'WORK').complement,
      complement3: this.getAdress(this.userSelected.addressList, 'ALTERNATIVE').complement,
      countryAdress1: this.getAdress(this.userSelected.addressList, 'RESIDENTIAL').country,
      countryAdress2: this.getAdress(this.userSelected.addressList, 'WORK').country,
      countryAdress3: this.getAdress(this.userSelected.addressList, 'ALTERNATIVE').country,
      stateAdress1: this.getAdress(this.userSelected.addressList, 'RESIDENTIAL').state,
      stateAdress2: this.getAdress(this.userSelected.addressList, 'WORK').state,
      stateAdress3: this.getAdress(this.userSelected.addressList, 'ALTERNATIVE').state,
      city1: this.getAdress(this.userSelected.addressList, 'RESIDENTIAL').city,
      city2: this.getAdress(this.userSelected.addressList, 'WORK').city,
      city3: this.getAdress(this.userSelected.addressList, 'ALTERNATIVE').city,

      dependentsList: this.userSelected.dependentsList
    });
    
    this.userSelected.dependentsList.forEach((dependent: { [key: string]: any; }) => {
      this.addDependentsGroup();
  
      const dependentsFormGroup = this.dependentsList.at(this.dependentsList.length - 1) as FormGroup;
      dependentsFormGroup.patchValue(dependent);
    });

    setTimeout(() => {
      this.getStates(this.countrySelected)
    }, 500);
  }

  getPhoneNumber(phoneList: IPhoneList, type: string) {
    if (!Array.isArray(phoneList)) {
      return '';
    }
    const phone = phoneList.find((phone: IPhoneList) => phone.type === type);
    if (!phone) {
      return '';
    }
    return phone.internationalCode + phone.areaCode + phone.number;
  }

  getAdress(adressList: IAddressList, type: string) {
    if (!Array.isArray(adressList)) {
      return '';
    }
    const adress = adressList.find((adress: IAddressList) => adress.type === type);
    if (!adress) {
      return '';
    }
    return adress;
  }

  editUserByIndex(index: number, params: any) {
    this._usersService.editUserByIndex(index, params).subscribe(() => {
      this.getUsers();
    });
  }

  public formatDateToNumber(date: string): string {
    const regex = /^(\d{2})\/(\d{2})\/(\d{4})$/;
    const match = date.match(regex);

    if (!match) {
      throw new Error('Data inválida. Use o formato DD/MM/YYYY.');
    }

    const [, day, month, year] = match;
    return `${day}${month}${year}`;
  }

  public dateEvent(event: any): void {
    this.userForm
      .get('birthDate')
      ?.setValue(this.formatDateToDDMMYYYY(event.target.value));
  }

  public formatDateToDDMMYYYY(date: Date): string {
    if (!(date instanceof Date) || isNaN(date.getTime())) {
      throw new Error(
        'Data inválida. Certifique-se de que é um objeto Date válido.'
      );
    }

    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }
}
