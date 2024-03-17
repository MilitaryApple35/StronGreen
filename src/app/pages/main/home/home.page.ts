import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs';
import { Sensor } from 'src/app/models/sensor.model';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { UpdateSensorComponent } from 'src/app/shared/components/update-sensor/update-sensor.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {

  constructor(private utils: UtilsService, private firebaseService: FirebaseService) { }

  loading: boolean = true;
  sensors: Sensor[] = [];

  ionViewWillEnter(){
    this.loading = true;
    this.sensors = [];
    this.getSensors();
  }

  async addUpdate(sensor?: Sensor){
    await this.utils.getModal({
      component: UpdateSensorComponent,
      cssClass: "add-update-modal",
      componentProps: { sensor },
    });
  }

  user() : User{
    return this.utils.getLocalStorage('user');
  }

  getSensors(){
    let path = `users/${this.user().uid}/sensors`
    this.loading = true;
    try {
      let sub = this.firebaseService.getCollectionData(path)
      .snapshotChanges().pipe(
        map(changes => changes.map(c => ({
          id: c.payload.doc.id,
          ...c.payload.doc.data()
        })))).subscribe({
          next: (data: any)=>{
            this.sensors = data;
            this.loading = false;
            sub.unsubscribe();
          },
          error: (error: any) => {
            console.error('Error al cargar los sensores:', error);
            this.loading = false;
          }
        });
      } catch (error) {
        this.sensors = [];
        console.error('Error al cargar los sensores:', error);
        this.loading = false;
      }
  }

  doRefresh(event: any){
    setTimeout(() => {
      this.getSensors();
      event.target.complete();
    }, 1000);
  }
}
