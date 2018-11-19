import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PassengerDashboardComponent } from './containers/passenger-dashbord/passenger-dashbord.component';

@NgModule({
  declarations: [
    PassengerDashboardComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    PassengerDashboardComponent
  ]
})
export class PassengerDashboardModule {}