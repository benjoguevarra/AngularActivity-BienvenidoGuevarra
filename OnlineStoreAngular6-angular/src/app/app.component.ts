import { Component } from '@angular/core';
import {MenuItem} from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  menuItems: MenuItem[];
  title = 'OnlineStoreAngular6';


  //<button mat-mini-fab (click)="addMonster(Monster)"><mat-icon>add</mat-icon></button> 
  
  ngOnInit(): void {
    this.menuItems = [
      // {label: "Book", icon: "fa fa-book", routerLink: ['/book']},
      // {label: "Author", icon: "fa fa-user", routerLink: ['/author']},
      // {label: "Airport", icon: "fa fa-plane", routerLink: ['/airport']},
      // {label: "Shipper", icon: "fa fa-ship", routerLink: ['/shipper']},
      // {label: "Supplier", icon: "fa fa-truck", routerLink: ['/supplier']},
      // {label: "Employee", icon: "fa fa-black-tie", routerLink: ['/employee']},
      // {label: "Customer", icon: "fa fa-credit-card", routerLink: ['/customer']},
      // {label: "Category", icon: "fa fa-bars", routerLink: ['/category']},
      // {label: "Product", icon: "fa fa-user", routerLink: ['/product']},
      // {label: "Order", icon: "fa fa-clipboard", routerLink: ['/order']},
      // {label: "Person", icon: "fa fa-child", routerLink: ['/person']},
      {label: "Monster", icon: "fa fa-bug", routerLink: ['/monster']}
    ]
  }
}
