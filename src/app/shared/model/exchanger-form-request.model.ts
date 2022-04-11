export interface ExchangerFormRequestModel{
    amount: number,
    fromCountry: string;
    toCountry: string;
    conversionRate: number;
    convertedValue: number;
}