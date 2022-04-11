import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './home-page/nav-bar/nav-bar.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from "primeng/ripple";
import { CurrencyExchangerComponent } from './home-page/currency-exchanger-component/currency-exchanger.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeService } from './core/services/home.service';
import { HttpClientModule } from '@angular/common/http';
import { HomeModule } from './home-page/home.module';
import { DetailsPageModule } from './details-page/details-page.module';
import { ExchangerFormComponent } from './shared/components/exchanger-form/exchanger-form.component';
import { ExchangerFormModule } from './shared/components/exchanger-form/exchanger-form.module';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    // ExchangerFormComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    DetailsPageModule,
    ButtonModule,
    RippleModule,
    ExchangerFormModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
