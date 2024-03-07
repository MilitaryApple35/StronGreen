import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SensorDetailsPageRoutingModule } from './sensor-details-routing.module';

import { SensorDetailsPage } from './sensor-details.page';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SensorDetailsPageRoutingModule,
    SharedModule,
  ],
  declarations: [SensorDetailsPage]
})
export class SensorDetailsPageModule {}
