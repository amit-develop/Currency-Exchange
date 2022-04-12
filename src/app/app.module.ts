import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './home-page/nav-bar/nav-bar.component';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from "primeng/ripple";
import { ToastModule } from "primeng/toast";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeModule } from './home-page/home.module';
import { DetailsPageModule } from './details-page/details-page.module';
import { ExchangerFormModule } from './shared/components/exchanger-form/exchanger-form.module';
import { MessageService } from 'primeng/api';



@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    HomeModule,
    DetailsPageModule,
    ButtonModule,
    RippleModule,
    ExchangerFormModule,
    ToastModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
