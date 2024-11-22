import { IAddressList } from "./adress-list.interface";
import { IDependentsList } from "./dependents-list.interface";
import { IPhoneList } from "./phone-list.interface";

export interface IUserResponse {
    name: string;
    email: string;
    country: string;
    state: string;
    maritalStatus: string;
    monthlyIncome: number;
    birthDate: string;
    phoneList: IPhoneList[];
    addressList: IAddressList[];
    dependentsList: IDependentsList[];
    id: string;
}