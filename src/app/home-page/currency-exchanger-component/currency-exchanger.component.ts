import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { AppConstants } from '../../shared/constants/app-constants';
import { HomeService } from '../../core/services/home.service';
import { CountryCodes } from 'src/app/shared/enums/country-code';
@Component({
  selector: 'app-currency-exchanger',
  templateUrl: './currency-exchanger.component.html',
  styleUrls: ['./currency-exchanger.component.scss']
})
export class CurrencyExchangerComponent implements OnInit {

  public header: string = AppConstants.EXCHANGER_HEADER;
  public cntryCd: typeof CountryCodes;

  rates: { [key: string]: number }  ;
  conversionRate: number;
  amount: number;
  formValid: boolean;
  from: string;

  constructor(
    private fb: FormBuilder,
    private homeService: HomeService
  ) {
    this.cntryCd = CountryCodes;
    this.rates = {};
    this.amount = 0.00;
    this.conversionRate = 0.00;
    this.formValid = false;
    this.from = '';
  }

  ngOnInit(): void {
    this.homeService.exchangerFormSubmit.subscribe(res=> {
      this.rates = res.rates;
      this.amount = res.amount;
      this.formValid = res.valid;
      this.from = res.from
    })
  }
}
