import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.page.html',
  styleUrls: ['./sign-up.page.scss'],
})
export class SignUpPage implements OnInit {

  form = new FormGroup({
    uid: new FormControl(''),
    name: new FormControl('', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]*$/)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).+$/)]),
    confirmPassword: new FormControl('', [Validators.required])
  });

  constructor(private fireBaseService: FirebaseService, private utils: UtilsService) { }

  ngOnInit() {
  }
  
  async submit(){
    if(this.form.valid && this.form.value.password === this.form.value.confirmPassword){
      const loading = await this.utils.loading();
      await loading.present();

      this.fireBaseService.signUp(this.form.value as User)
        .then(async res => {
          await this.fireBaseService.updateUser(this.form.value.name);
          let uid = res.user.uid;
          this.form.controls.uid.setValue(uid); 
          this.setUserInfo(uid);
        })
        .catch(err => {
          this.utils.presentToast({message: "Registro incorrecto", duration: 2000, color: "danger", position: "bottom", icon: "alert-circle-outline"});
        })
        .finally(() => {
          loading.dismiss();
        });
    }
    if(this.form.value.password !== this.form.value.confirmPassword){
      this.utils.presentToast({message: "Las contraseñas no coinciden", duration: 2000, color: "danger", position: "bottom", icon: "alert-circle-outline"});
    }
  }

  async setUserInfo(uid: string){
    if(this.form.valid && this.form.value.password === this.form.value.confirmPassword){
      const loading = await this.utils.loading();
      await loading.present();
      let path = `users/${uid}`;
      delete this.form.value.password;
      delete this.form.value.confirmPassword;
      this.fireBaseService.setDocument(path, this.form.value)
        .then(async res => { 
          this.utils.saveLocalStorage('user', this.form.value);
          this.utils.routerlink('auth');
          this.utils.presentToast({message: "Usuario registrado correctamente", duration: 2000, color: "success", position: "bottom", icon: "person-circle-outline"});
        })
        .catch(err => {
          this.utils.presentToast({message: "Registro incorrecto", duration: 2000, color: "danger", position: "bottom", icon: "alert-circle-outline"});
        })
        .finally(() => {
          loading.dismiss();
        });
    }
  }
}
