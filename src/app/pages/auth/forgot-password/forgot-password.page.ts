import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.page.html',
  styleUrls: ['./forgot-password.page.scss'],
})
export class ForgotPasswordPage implements OnInit {

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
  });
  constructor(private fireBaseService: FirebaseService, private utils: UtilsService) { }

  ngOnInit() {
  }

  async submit(){
    if(this.form.valid){
      const loading = await this.utils.loading();
      await loading.present();

      this.fireBaseService.sendRecorveryEmail(this.form.value.email)
        .then(res => {
          this.utils.routerlink('auth');
          this.form.reset();
          this.utils.presentToast({message: "Se ha enviado el correo de recuperación", duration: 3000, color: "secondary", position: "bottom", icon: "mail-outline"});
        })
        .catch(err => {
          this.utils.presentToast({message: "Ha ocurrido un error", duration: 2000, color: "danger", position: "bottom", icon: "alert-circle-outline"});
        })
        .finally(() => {
          loading.dismiss();
        });
    }
  }

}
