import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  });

  constructor(private fireBaseService: FirebaseService, private utils: UtilsService) { }

  ngOnInit() {
    this.fireBaseService.signOut();
  }

  async submit(){
    if(this.form.valid){
      const loading = await this.utils.loading();
      await loading.present();

      this.fireBaseService.signIn(this.form.value as User)
        .then(res => {
          this.getUserInfo(res.user.uid);
        })
        .catch(err => {
          this.fireBaseService.signOut();
          console.log(err);
          this.utils.presentToast({message: "Inicio de sesión incorrecto", duration: 2000, color: "danger", position: "bottom", icon: "alert-circle-outline"});
        })
        .finally(() => {
          loading.dismiss();
        });
    }
  }

  async getUserInfo(uid: string){
    if(this.form.valid){
      const loading = await this.utils.loading();
      await loading.present();
      let path = `users/${uid}`;
      this.fireBaseService.getDocument(path)
        .then((user: User) => { 
          this.utils.saveLocalStorage('user', user);
          this.utils.routerlink('main/home');
          this.utils.presentToast({message: `Bienvenido(a) ${user?.name}`, duration: 2000, color: "success", position: "bottom", icon: "person-circle-outline"});
        })
        .catch(err => {
          this.fireBaseService.signOut();
          this.utils.presentToast({message: "Inicio de sesión incorrecto", duration: 2000, color: "danger", position: "bottom", icon: "alert-circle-outline"});
        })
        .finally(() => {
          loading.dismiss();
        });
    }
  }
}

