import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ExchangerFormComponent } from './exchanger-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { HomeService } from 'src/app/core/services/home.service';



@NgModule({
  declarations: [ExchangerFormComponent],
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
  ],
  providers: [HomeService],
  bootstrap: [ExchangerFormComponent],
  exports: [ExchangerFormComponent]
})
export class ExchangerFormModule { }
