import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SensorDetailsPage } from './sensor-details.page';

describe('SensorDetailsPage', () => {
  let component: SensorDetailsPage;
  let fixture: ComponentFixture<SensorDetailsPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(SensorDetailsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
