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
    let modal = await this.utils.getModal({
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

  async deleteSensor(sensor: Sensor){
    let path = `users/${this.user().uid}/sensors/${sensor.id}`
    const loading = await this.utils.loading();
    await loading.present();
    let imgPath =await this.firebaseService.getFilePath(sensor.img);
    await this.firebaseService.deleteFile(imgPath);

    this.firebaseService.deleteDocument(path)
    .then(async resp => {
      //Actualizar la lista de sensores
      this.sensors = this.sensors.filter(s => s.id !== sensor.id);
      this.utils.dismissModal({success:true});
      this.utils.presentToast({message: `Sensor eliminado correctamente`, duration: 2000, color: "success", position: "bottom", icon: "trash-circle-outline"});
    })
    .catch(err => {
      console.log(err);
      this.utils.presentToast({message: "Error al eliminar el sensor", duration: 2000, color: "danger", position: "bottom", icon: "alert-circle-outline"});
    })
    .finally(() => {
      loading.dismiss();
    });
  }

  confirmDeleteSensor(sensor: Sensor){
    this.utils.presentAlert({
      header: "Eliminar sensor",
      message: `¿Está seguro de eliminar el sensor ${sensor.name}?`,
      buttons: [
        {
          text: "Cancelar",
          role: "cancel",
          cssClass: "secondary",
          handler: () => {}
        },
        {
          text: "Eliminar",
          handler: () => {
            this.deleteSensor(sensor);
          }
        }
      ]
    });
  }
  
}
