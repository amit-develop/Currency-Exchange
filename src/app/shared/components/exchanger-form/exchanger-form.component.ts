import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Observable } from 'rxjs';
import { HomeService } from 'src/app/core/services/home.service';
import { AppConstants } from 'src/app/shared/constants/app-constants';
import { currencyList } from 'src/app/shared/constants/countries-data';
import { CountriesModel } from 'src/app/shared/model/countries.model';
import { CurrencyExchangeResponseModel } from 'src/app/shared/model/currency-exchange-response.model';
import { ExchangerFormEmitterModel } from 'src/app/shared/model/exchanger-form-emitter.model';
import { ExchangerFormRequestModel } from '../../model/exchanger-form-request.model';
enum FormStatus {
  INVALID = "INVALID",
  Valid = "VALID",
}
@Component({
  selector: 'app-exchanger-form',
  templateUrl: './exchanger-form.component.html',
  styleUrls: ['./exchanger-form.component.scss']
})
export class ExchangerFormComponent implements OnInit, OnChanges {

  public amount: string = AppConstants.AMOUNT;
  public convert: string = AppConstants.CONVERT;
  public moreDetails: string = AppConstants.MORE_DETAILS;
  public amountErr: string = AppConstants.AMOUNT_EMPTY_ERR;

  isSubmit: boolean = false;
  countries: CountriesModel[] = currencyList;
  exchangerForm!: FormGroup;
  rates: { [key: string]: number };
  conversionRate: number;
  conversionFromRate: number;
  conversionToRate: number;
  result: typeof this.rates;
  formStatusRef: typeof FormStatus;
  emitterObject: ExchangerFormEmitterModel;
  eurUsdBtnClicked: boolean;
  exchangeCurrency: string;
  disableMore: boolean;
  toFromArr: string[];
  observableArr: Observable<CurrencyExchangeResponseModel>[]
  exchangerFormData: ExchangerFormRequestModel;
  @Input() formData!: ExchangerFormRequestModel;

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService,
    private router: Router,
    private messageService: MessageService) {

    this.buildForm();
    this.rates = {};
    this.result = {};
    this.formStatusRef = FormStatus;
    this.emitterObject = {} as ExchangerFormEmitterModel;
    this.exchangerFormData = {} as ExchangerFormRequestModel;
    this.conversionRate = 0.00;
    this.conversionToRate = 0.00;
    this.conversionFromRate = 0.00;
    this.eurUsdBtnClicked = false;
    this.exchangeCurrency = '';
    this.disableMore = true;
    this.observableArr = [];
    this.toFromArr = [];
  }

  buildForm() {
    this.exchangerForm = this.fb.group({
      amount: ['', Validators.required],
      fromCountry: ['EUR', Validators.required],
      toCountry: ['USD', Validators.required],
      conversionRate: [{ value: '', disabled: true }],
      convertedValue: [{ value: '', disabled: true }]
    })
  }
  ngOnChanges(changes: SimpleChanges) {
    if (Object.keys(this.formData).length > 0) {
      this.exchangerForm.controls['amount'].setValue(this.formData?.amount);
      this.exchangerForm.controls['fromCountry'].setValue(this.formData ? this.formData.fromCountry : 'EUR');
      this.exchangerForm.controls['toCountry'].setValue(this.formData ? this.formData.toCountry : 'USD');
      this.exchangerForm.controls['conversionRate'].setValue(this.formData?.conversionRate);
      this.exchangerForm.controls['convertedValue'].setValue(this.formData?.convertedValue);
    }
  }

  ngOnInit(): void {
    this.homeService.usdEurBtn.subscribe(res => {
      this.exchangeCurrency = res;
      this.exchangerForm.controls['fromCountry'].setValue('EUR')
      this.exchangerForm.controls['toCountry'].setValue(res);
    })
    this.homeService.usdEurGBP.subscribe(res => {
      this.exchangeCurrency = res;
      this.exchangerForm.controls['fromCountry'].setValue('EUR')
      this.exchangerForm.controls['toCountry'].setValue(res);
    })
    if (this.router.url.includes('details')) {
      this.disableMore = true;
    } else {
      this.disableMore = false
    }
    this.setDisplayVlaues()
  }
  setDisplayVlaues() {
    if (this.homeService.convertToUSD) {
      this.exchangerForm.controls['fromCountry'].setValue('EUR')
      this.exchangerForm.controls['toCountry'].setValue("USD");
    }
    if (this.homeService.convertToGBP) {
      this.exchangerForm.controls['fromCountry'].setValue('EUR')
      this.exchangerForm.controls['toCountry'].setValue("GBP");
    }
  }
  onSubmit() {
    this.isSubmit = true;
    if (this.exchangerForm.status === FormStatus.INVALID) {
      return;
    }
    this.callExchangeApi(this.exchangerForm.value.toCountry);
  }

  callExchangeApi(toCountry:string) {
    this.homeService.getConversionRates(
      'EUR',
      toCountry,
      this.exchangerForm.value.amount, "latest"
    ).subscribe((next: CurrencyExchangeResponseModel) => {
      if (!next.success){
        this.exchangerForm.controls['conversionRate'].setValue('');
        this.exchangerForm.controls['convertedValue'].setValue('');
        this.messageService.add({ severity: 'error', summary: 'Error', detail: "Restricted Service"});
        return;
      }
      this.rates = Object.assign({}, next.rates);
      this.conversionFromRate = this.rates[this.exchangerForm.value.fromCountry];
      this.conversionToRate = this.rates[this.exchangerForm.value.toCountry];
      this.conversionRate = this.conversionToRate/this.conversionFromRate;
      this.exchangerForm.controls['conversionRate'].setValue("1.00 " + this.exchangerForm.value.fromCountry + " = " + this.conversionRate.toFixed(2) + " " + this.exchangerForm.value.toCountry);
      this.exchangerForm.controls['convertedValue'].setValue((this.conversionRate * this.exchangerForm.value.amount).toFixed(2) + " " + this.exchangerForm.value.toCountry);
      this.emitterObject.rates = next.rates
      this.emitterObject.valid = true;
      this.emitterObject.amount = this.exchangerForm.value.amount;
      this.emitterObject.from = this.exchangerForm.value.fromCountry;
      this.exchangerFormData = this.createUpdateFormObject();
      this.homeService.updateFormValue(this.exchangerFormData);
      this.homeService.updateExchangerFormSubmit(this.emitterObject);
      this.homeService.converterListener(this.exchangerFormData);
    })
  }

  createUpdateFormObject(): ExchangerFormRequestModel {
    this.exchangerFormData.amount = this.exchangerForm.controls['amount'].value;
    this.exchangerFormData.fromCountry = this.exchangerForm.controls['fromCountry'].value;
    this.exchangerFormData.toCountry = this.exchangerForm.controls['toCountry'].value;
    this.exchangerFormData.conversionRate = this.exchangerForm.controls['conversionRate'].value;
    this.exchangerFormData.convertedValue = this.exchangerForm.controls['convertedValue'].value;
    return this.exchangerFormData;
  }
  onMoreDetails() {
    this.router.navigate(['/details'])

  }
}
