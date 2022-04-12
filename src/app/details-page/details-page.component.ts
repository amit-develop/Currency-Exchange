import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { forkJoin, Observable } from 'rxjs';
import { HomeService } from '../core/services/home.service';
import { AppConstants } from '../shared/constants/app-constants';
import { CurrencyExchangeResponseModel } from '../shared/model/currency-exchange-response.model';
import { ExchangerFormRequestModel } from '../shared/model/exchanger-form-request.model';
import { Months } from '../shared/enums/months';

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
  monthLabels: string[];
  monthRefArr: typeof Months
  constructor(
    private homeService: HomeService,
    private router: Router) {

    this.formData = {} as ExchangerFormRequestModel;
    this.formData.fromCountry = AppConstants.EUR
    this.formData.toCountry = AppConstants.USD
    this.formData.amount = 1;
    this.backToHome = AppConstants.BACK;
    this.chartHeader = AppConstants.HISTORICAL_CHART;
    this.labels = [];
    this.dataSetToCountry = [];
    this.observableArr = [];
    this.fullSetData = [];
    this.detailsHeader = AppConstants.USD
    this.listening = false;
    this.monthLabels = [];
    this.monthRefArr = Months;
  }

  ngOnInit(): void {
    const monthArr = Object.values(Months)
    if (!this.listening) {

      this.formData = this.homeService.getFormData();
      if (Object.keys(this.formData).length === 0) {
        this.formData.fromCountry = AppConstants.EUR
        this.formData.toCountry = AppConstants.USD
        this.formData.amount = 1;
      }
      this.makeObservableArr(monthArr);
      this.forkObservables();
    }
    this.homeService.exchangerSubject.subscribe(res => {
      this.listening = true
      this.formData.amount = res.amount;
      this.formData.fromCountry = res.fromCountry;
      this.formData.toCountry = res.toCountry;
      this.makeObservableArr(monthArr);
      this.forkObservables();
    })

    this.createChartOptions();
  }

  createChartOptions() {
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
    this.monthLabels = [];
    this.observableArr = monthArr.map((eachMonth: string, index: number) => {
      let labelDates = new Date(new Date().getFullYear(), new Date().getMonth() - index, 1);
      this.monthLabels.push(monthArr[labelDates.getMonth()]);
      
      return this.homeService.getConversionRates(
        AppConstants.EUR,
        this.formData.toCountry,
        this.formData.amount,
        labelDates.toISOString().split('T')[0]
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
          const convertFromRate = eachObservable.rates[this.formData.fromCountry]
          const convertToRate = eachObservable.rates[this.formData.toCountry]
          const directConversionRate = convertToRate / convertFromRate;
          this.dataSetToCountry.push(directConversionRate);
        })
        this.basicData = {
          labels: this.monthLabels.reverse(),
          datasets: [
            {
              label: this.formData.toCountry,
              data: this.dataSetToCountry.reverse(),
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
