import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginInputComponent } from './components/login-input/login-input.component';
import { UpdateSensorComponent } from './components/update-sensor/update-sensor.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { LogoComponent } from './components/logo/logo.component';
import { HeaderComponent } from './components/header/header.component';
import { SensorCardTopComponent } from './components/sensor-card-top/sensor-card-top.component';
import { SensorCardMainComponent } from './components/sensor-card-main/sensor-card-main.component';
import { SensorCardCalendarComponent } from './components/sensor-card-calendar/sensor-card-calendar.component';


@NgModule({
  declarations: [
    LoginInputComponent,
    UpdateSensorComponent,
    LogoComponent,
    HeaderComponent,
    SensorCardTopComponent,
    SensorCardMainComponent,
    SensorCardCalendarComponent,
  ],
  exports: [
    HeaderComponent,
    LogoComponent,
    LoginInputComponent,
    UpdateSensorComponent,
    FormsModule,
    ReactiveFormsModule,
    SensorCardTopComponent,
    SensorCardMainComponent,
    SensorCardCalendarComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule
  ]
})
export class SharedModule { }
