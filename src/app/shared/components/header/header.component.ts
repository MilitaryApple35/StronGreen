import { Component, Input, OnInit } from '@angular/core';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent  implements OnInit {
  @Input() title!: string;
  @Input() showMenu! : boolean;
  @Input() backButton!: string;
  @Input() isModal!: boolean;
  
  constructor(private utils: UtilsService) { }

  ngOnInit() {}

  dismissModal(){
    this.utils.dismissModal();
  }
}
