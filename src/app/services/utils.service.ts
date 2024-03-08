import { Injectable, inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoadingController, ToastController, ToastOptions } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class UtilsService {
  toastCtrl = inject(ToastController);
  loadingCtrl = inject(LoadingController);
  constructor(private router: Router) { }

  routerlink(path: string){
    this.router.navigate([path]);
  }
  async presentToast(opts?: ToastOptions){
    const toast = await this.toastCtrl.create(opts);
    toast.present();
  }
  loading(){
    return this.loadingCtrl.create({spinner: "crescent", message: "Cargando..."});
  }
  saveLocalStorage(key: string, value: any){
    return localStorage.setItem(key, JSON.stringify(value));
  }
}
