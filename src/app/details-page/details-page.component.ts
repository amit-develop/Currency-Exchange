import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { HomeService } from '../core/services/home.service';
import { AppConstants } from '../shared/constants/app-constants';
import { CurrencyExchangeResponseModel } from '../shared/model/currency-exchange-response.model';
import { ExchangerFormRequestModel } from '../shared/model/exchanger-form-request.model';

enum Months {
  JAN = "January",
  FEB = "Februry",
  MAR = "March",
  APR = "April",
  MAY = "May",
  JUN = "June",
  JUL = "July",
  AUG = "Augus",
  SEP = "September",
  OCT = "October",
  NOV = "November",
  DEC = "December"

}
@Component({
  selector: 'app-details-page',
  templateUrl: './details-page.component.html',
  styleUrls: ['./details-page.component.scss']
})
export class DetailsPageComponent implements OnInit {

  formData: ExchangerFormRequestModel;
  backToHome: string;
  chartHeader: string;
  basicData: any;
  basicOptions: any;
  labels: string[];
  detailsHeader: string;
  dataSetToCountry: number[];
  observableArr: Observable<CurrencyExchangeResponseModel>[];
  fullSetData: CurrencyExchangeResponseModel[];
  listening: boolean;
  constructor(
    private homeService: HomeService,
    private router: Router) {

    this.formData = {} as ExchangerFormRequestModel;
    this.formData.fromCountry = 'EUR'
    this.formData.toCountry = 'USD'
    this.formData.amount = 1;
    this.backToHome = AppConstants.BACK;
    this.chartHeader = AppConstants.HISTORICAL_CHART;
    this.labels = [];
    this.dataSetToCountry = [];
    this.observableArr = [];
    this.fullSetData = [];
    this.detailsHeader = 'USD'
    this.listening = false;
  }

  ngOnInit(): void {
    if(!this.listening){

      this.formData = this.homeService.getFormData();
      if (Object.keys(this.formData).length === 0) {
        this.formData.fromCountry = 'EUR'
        this.formData.toCountry = 'USD'
        this.formData.amount = 1;
      }
      const monthArr = Object.values(Months)
      this.makeObservableArr(monthArr);
      this.forkObservables();
    }
    this.homeService.exchangerSubject.subscribe(res => {
        this.listening = true
        this.formData.amount = res.amount;
        this.formData.fromCountry = res.fromCountry;
        this.formData.toCountry = res.toCountry;
        this.forkObservables();
      })
    
    this.createChartOptions();
  }

  createChartOptions(){
    this.basicOptions = {
      plugins: {
        legend: {
          labels: {
            color: '#495057'
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        },
        y: {
          ticks: {
            color: '#495057'
          },
          grid: {
            color: '#ebedef'
          }
        }
      }
    };
  }
  makeObservableArr(monthArr: string[]) {
    this.observableArr = monthArr.map((eachMonth: string, index: number) => {
      return this.homeService.getConversionRates(
        this.formData.fromCountry,
        this.formData.toCountry,
        this.formData.amount,
        index < 9 ?
          "2021-0" + (index + 1) + "-01" : "2021-" + (index + 1) + "-01"
      )
    });
  }
  forkObservables() {
    this.dataSetToCountry = []
    forkJoin(this.observableArr)
      .subscribe(res => {
        this.fullSetData = Object.assign([], res);
        this.detailsHeader = this.formData.toCountry;
        res.map(eachObservable => {
          this.dataSetToCountry.push((eachObservable.rates[this.formData.toCountry]));
        })
        this.basicData = {
          labels: [Months.JAN, Months.FEB, Months.MAR, Months.APR, Months.MAY,
          Months.JUN, Months.JUL, Months.AUG, Months.SEP, Months.OCT, Months.NOV, Months.DEC],
          datasets: [
            {
              label: this.formData.toCountry,
              data: this.dataSetToCountry,
              fill: false,
              borderColor: '#FFA726',
              tension: .4
            }
          ]
        }
      })
  }
  back() {
    this.router.navigate(['/home'])
  }
}
