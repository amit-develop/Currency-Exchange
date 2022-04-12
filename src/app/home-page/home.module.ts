import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyExchangerComponent } from './currency-exchanger-component/currency-exchanger.component';
import { ConversionsComponent } from './currency-exchanger-component/conversions/conversions.component';
import { HomeService } from '../core/services/home.service';
import { HomeComponent } from './home.component';
import { CardModule } from 'primeng/card';
import { MessageService } from 'primeng/api';
import { ExchangerFormModule } from '../shared/components/exchanger-form/exchanger-form.module';



@NgModule({
  declarations: [
    HomeComponent,
    CurrencyExchangerComponent, 
    ConversionsComponent
  ],
  imports: [
    CommonModule,
    CardModule,
    ExchangerFormModule
  ],
  providers: [HomeService, MessageService],
  bootstrap: [
    HomeComponent, 
    CurrencyExchangerComponent,  
    ConversionsComponent
  ]
})
export class HomeModule { }
