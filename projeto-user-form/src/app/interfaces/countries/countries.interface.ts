import { IData } from "./data.interface";

export interface ICountries {
    error: boolean;
    msg: string;
    data: IData[];
}