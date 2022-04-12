import { RatesModel } from "./rates.model";

export interface ExchangerFormEmitterModel{
    valid: boolean,
    rates: { [key: string]: number },
    amount: number;
    from: string;
}