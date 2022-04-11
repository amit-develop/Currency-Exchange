import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppConstants } from '../../shared/constants/app-constants';
import { HomeService } from '../../core/services/home.service';

enum CountryCodes {
  US = "USD",
  GB = "GBP",
  IN = "INR",
  CH = "CNY",
  AU = "AUD",
  HK = "HKD",
  JP = "JPY",
  PK = "PKR",
  SG = "SGD"
}

@Component({
  selector: 'app-currency-exchanger',
  templateUrl: './currency-exchanger.component.html',
  styleUrls: ['./currency-exchanger.component.scss']
})
export class CurrencyExchangerComponent implements OnInit {

  public header: string = AppConstants.EXCHANGER_HEADER;
  
  
 
  public cntryCd: typeof CountryCodes;
  rates: { [key: string]: number } ;
  conversionRate: number;
  result: typeof this.rates;
  amount: number;
  formValid: boolean;

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService
  ) {
    this.cntryCd = CountryCodes;
    this.rates = {};
    this.result = {};
    this.amount = 0.00;
    this.conversionRate = 0.00;
    this.formValid = false;
  }

  ngOnInit(): void {
    this.homeService.exchangerFormSubmit.subscribe(res=> {
      this.rates = res.rates;
      this.amount = res.amount;
      this.formValid = res.valid;
    })
  }
}