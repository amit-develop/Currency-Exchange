import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HomeService } from 'src/app/core/services/home.service';
import { AppConstants } from 'src/app/shared/constants/app-constants';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {

  public eurUSDLabel = AppConstants.EURO_USD_DETAILS;
  public eurGBPLabel = AppConstants.EURO_GBP_DETAILS;
  constructor(
    private router: Router,
    private homeService: HomeService) { }

  ngOnInit(): void {
  }
  gotToDetails(str: string){
    if(str === AppConstants.USD) {
      this.homeService.updateEurUsd(AppConstants.USD);
    }
    if(str === AppConstants.GBP) {
      this.homeService.updateEurGBP(AppConstants.GBP);
    }
    this.router.navigate(['/details']);
  }
}
