import { Component, OnInit } from '@angular/core';
import { MegaMenuItem } from 'primeng/api';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  items: MegaMenuItem[] = [];

  ngOnInit() {
    this.items = [
      {
        label: 'Home',
        icon: 'pi pi-fw pi-home',
        routerLink: '/home'
      },
      {
        label: 'Carros',
        icon: 'pi pi-fw pi-car',
        routerLink: '/carros'
      },
      {
        label: 'Peças',
        icon: 'pi pi-fw pi-wrench',
        routerLink: '/pecas'
      }
    ];
  }
}
