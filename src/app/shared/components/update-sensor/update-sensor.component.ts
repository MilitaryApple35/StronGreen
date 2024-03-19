import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Router } from '@angular/router';
import { Sensor } from 'src/app/models/sensor.model';


@Component({
  selector: 'app-update-sensor',
  templateUrl: './update-sensor.component.html',
  styleUrls: ['./update-sensor.component.scss'],
})
export class UpdateSensorComponent  implements OnInit {
  @Input() sensor: Sensor;
  user= {} as User;

  form = new FormGroup({
    id: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(3)]),
    description: new FormControl('', [Validators.required, Validators.minLength(3)]),
    img: new FormControl('', [Validators.required]),
  }); 

  constructor(private fireBaseService: FirebaseService, private utils: UtilsService, private router: Router) { }

  ngOnInit() {
    this.user = this.utils.getLocalStorage('user');
    if(this.sensor){
      this.form.setValue(this.sensor);
    }
  }
  async submit(){
    if(this.form.valid){
      if(this.sensor) this.updateSensor();
      else await this.createSensor();
    }
  }

  async updateSensor(){
    let path = `users/${this.user.uid}/sensors/${this.sensor.id}`
    const loading = await this.utils.loading();
    await loading.present();
    if(this.form.value.img !== this.sensor.img){
      let dataUrl = this.form.value.img;
      let imgPath =await this.fireBaseService.getFilePath(this.sensor.img);
      let imgUrl = await this.fireBaseService.updateImg(imgPath, dataUrl);
      this.form.controls.img.setValue(imgUrl);
    }
    delete this.form.value.id;
    this.fireBaseService.updateDocument(path, this.form.value)
    .then(async resp => {
      this.utils.dismissModal({success:true});
      this.utils.presentToast({message: `Sensor actualizado correctamente`, duration: 2000, color: "success", position: "bottom", icon: "checkmark-circle-outline"});
      this.router.navigate(['main/home']);
    })
    .catch(err => {
      console.log(err);
      this.utils.presentToast({message: "Error al actualizar el sensor", duration: 2000, color: "danger", position: "bottom", icon: "alert-circle-outline"});
    })
    .finally(() => {
      loading.dismiss();
    });
  }

  async takeImage(){
    const dataUrl = (await this.utils.takePicture('Selecciona una imagen')).dataUrl;
    this.form.controls.img.setValue(dataUrl);
  }
  async createSensor(){
    
    let dataUrl = this.form.value.img;
    let imgPath = `${this.user.uid}/${Date.now()}`;
    let imgUrl = await this.fireBaseService.updateImg(imgPath, dataUrl);
    
    this.form.controls.img.setValue(imgUrl);

    delete this.form.value.id;
    let path = `users/${this.user.uid}/sensors`
    const loading = await this.utils.loading();
    await loading.present();
    this.fireBaseService.addDocument(path, this.form.value)
    .then(async resp => {
      this.utils.dismissModal({success:true});
      this.utils.presentToast({message: `Sensor agregado correctamente`, duration: 2000, color: "success", position: "bottom", icon: "checkmark-circle-outline"});
      this.router.navigate(['main/home']);
    })
    .catch(err => {
      console.log(err);
      this.utils.presentToast({message: "Error al agregar el sensor", duration: 2000, color: "danger", position: "bottom", icon: "alert-circle-outline"});
    })
    .finally(() => {
      loading.dismiss();
    });
  }

}
