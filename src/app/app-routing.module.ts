import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailsPageComponent } from './details-page/details-page.component';
import { HomeComponent } from './home-page/home.component';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  {
    path: 'home', component: HomeComponent,
    children: [{
      loadChildren: () => import("./home-page/home.module")
      .then(res => res.HomeModule),
      path: '',
      component: HomeComponent,
    }]
  },
  {
    path: 'details', component: DetailsPageComponent,
    children: [{
      loadChildren: () => import("./details-page/details-page.module")
      .then(res => res.DetailsPageModule),
      path: '',
      component: DetailsPageComponent,
    }]
  },
  { path: '**', redirectTo: '/home', pathMatch: 'full' },
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

