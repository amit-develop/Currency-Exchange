import { Injectable } from "@angular/core";
import { HttpClient, HttpErrorResponse, HttpHandler } from "@angular/common/http";
import { catchError, map, Observable, Subject, throwError } from "rxjs";
import { environment } from "src/environments/environment";
import { CurrencyExchangeResponseModel } from "src/app/shared/model/currency-exchange-response.model";
import { ExchangerFormEmitterModel } from "src/app/shared/model/exchanger-form-emitter.model";
import { ExchangerFormRequestModel } from "src/app/shared/model/exchanger-form-request.model";
import { MessageService } from "primeng/api";

@Injectable({
    providedIn: "root"
})
export class HomeService {
    exchangerForm: ExchangerFormRequestModel;
    exchangerSubject: Subject<ExchangerFormRequestModel> = new Subject<ExchangerFormRequestModel>();
    exchangerFormSubmit: Subject<ExchangerFormEmitterModel> = new Subject<ExchangerFormEmitterModel>();
    usdEurBtn: Subject<string> = new Subject<string>();
    usdEurGBP: Subject<string> = new Subject<string>();
    convertToUSD: boolean;
    convertToGBP: boolean;
    constructor(
        private http: HttpClient,
        private messageService: MessageService) { 
        
        this.exchangerForm = {} as ExchangerFormRequestModel;
        this.convertToUSD = false;
        this.convertToGBP = false;
    }
    handleError(error: HttpErrorResponse) {
        let errorMessage = 'Unknown error!';
        if (error.error instanceof ErrorEvent) {
          errorMessage = `Error: ${error.error.message}`;
        } else {
            errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
        }
        this.messageService.add({severity: 'err', summary: 'Error', detail: error.message})
        window.alert(errorMessage);
        return throwError(errorMessage);
      }
    getConversionRates(fromCountry: string, toCountry: string, amt: number, param: string): Observable<CurrencyExchangeResponseModel> {
        return this.http.get<CurrencyExchangeResponseModel>(
            environment.urls.exchangerUrl + param +
            '?access_key=' + environment.keys.accessKey +
            '&base=' + fromCountry +
            '&to=' + toCountry )
            .pipe(
                map((data: CurrencyExchangeResponseModel) => {
                    return data;
                }),
                catchError(this.handleError)
            )
    }

    updateFormValue(updateVal: ExchangerFormRequestModel){
        this.exchangerForm = updateVal
    }
    converterListener(updateVal: ExchangerFormRequestModel){
        this.exchangerSubject.next(updateVal);
    }
    getFormData(){
        return this.exchangerForm;
    }
    updateExchangerFormSubmit(updateValue: ExchangerFormEmitterModel){
        this.exchangerFormSubmit.next(updateValue);
    }

    updateEurUsd(updateValue: string){
        this.usdEurBtn.next(updateValue);
        this.convertToUSD = true;
    }
    updateEurGBP(updateValue: string){
        this.usdEurGBP.next(updateValue);
        this.convertToGBP = true;
    }
}