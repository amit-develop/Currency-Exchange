import { RatesModel } from "./rates.model";

export interface CurrencyExchangeResponseModel {
    success: boolean;
    timestamp: number;
    base: string;
    date: Date;
    rates: { [key: string]: number };

}