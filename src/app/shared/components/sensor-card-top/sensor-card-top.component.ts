import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sensor-card-top',
  templateUrl: './sensor-card-top.component.html',
  styleUrls: ['./sensor-card-top.component.scss'],
})
export class SensorCardTopComponent  implements OnInit {
  temperature: number = 0;
  humidity: number = 0;
  constructor() { }

  ngOnInit(): void {
      this.temperature = 25;
      this.humidity = 80;
  }
}
