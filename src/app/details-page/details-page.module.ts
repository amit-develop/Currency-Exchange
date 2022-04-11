import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetailsPageComponent } from './details-page.component';
import { ExchangerFormComponent } from '../shared/components/exchanger-form/exchanger-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import {ChartModule } from 'primeng/chart';
import { ExchangerFormModule } from '../shared/components/exchanger-form/exchanger-form.module';



@NgModule({
  declarations: [DetailsPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    HttpClientModule,
    ButtonModule,
    RippleModule,
    InputTextModule,
    DropdownModule,
    CardModule,
    ExchangerFormModule,
    ChartModule
    
  ]
})
export class DetailsPageModule { }
