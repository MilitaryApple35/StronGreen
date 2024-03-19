import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.page.html',
  styleUrls: ['./main.page.scss'],
})
export class MainPage implements OnInit {

  router= inject(Router);
  currentPath = '';

  pages = [
    {title: 'Inicio', url: '/main/home', icon: 'home-outline'},
  ]
  constructor(private fireBaseService: FirebaseService, private utils: UtilsService) { }

  ngOnInit() {
    this.router.events.subscribe((event : any) => {
        if(event?.url){
          this.currentPath = event.url;
        }
      }
    );
  }
  signOut(){
    this.fireBaseService.signOut();
  }
  
  user() : User{
    return this.utils.getLocalStorage('user');
  }

  confirmSignOut(){
    this.utils.presentAlert({
      header: 'Cerrar sesión',
      message: '¿Estás seguro que deseas cerrar sesión?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {}
        }, {
          text: 'Aceptar',
          handler: () => {
            this.signOut();
          }
        }
      ]
    });
  }
  
}
