import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CurrencyExchangerComponent } from './currency-exchanger-component/currency-exchanger.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { ConversionsComponent } from './currency-exchanger-component/conversions/conversions.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { HomeService } from '../core/services/home.service';
import { HomeComponent } from './home.component';
import { CardModule } from 'primeng/card';
import { ExchangerFormComponent } from '../shared/components/exchanger-form/exchanger-form.component';
import { MessageService } from 'primeng/api';
import { RouterModule } from '@angular/router';
import { ExchangerFormModule } from '../shared/components/exchanger-form/exchanger-form.module';



@NgModule({
  declarations: [
    HomeComponent,
    CurrencyExchangerComponent, 
    // ExchangerFormComponent,
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
