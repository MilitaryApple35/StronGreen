import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sensor-card-calendar',
  templateUrl: './sensor-card-calendar.component.html',
  styleUrls: ['./sensor-card-calendar.component.scss'],
})
export class SensorCardCalendarComponent  implements OnInit {
  constructor() { }
  eventSource = [];
  calendar = {
    mode: 'month',
    currentDate: new Date(),
    step: 30
  };

  ngOnInit() {
    this.eventSource = [];
  }
  onCurrentDateChanged(event: Date) {
    // Implementa tu lógica aquí
  }

  reloadSource(startTime: Date, endTime: Date) {
    // Implementa tu lógica aquí
  }

  onEventSelected(event: any) {
    // Implementa tu lógica aquí
  }

  onViewTitleChanged(title: string) {
    // Implementa tu lógica aquí
  }

  onTimeSelected(ev: any) {
    // Implementa tu lógica aquí
  }

}