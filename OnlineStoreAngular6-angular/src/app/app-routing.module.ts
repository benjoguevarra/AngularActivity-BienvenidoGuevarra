import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CategoryComponent } from './category/category.component';
import { CustomerComponent } from './customer/customer.component';
import { SampleComponent } from './sample/sample.component';
import { ShipperComponent } from './shipper/shipper.component';
import { EmployeeComponent } from './employee/employee.component';
import { BookComponent } from './book/book.component';
import { AuthorComponent } from './author/author.component';
import { AirportComponent } from './airport/airport.component';
import { SupplierComponent } from './supplier/supplier.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { PersonComponent } from './person/person.component';
import { MonsterComponent } from './monster/monster.component';

const routes: Routes = [
  { path: '', redirectTo: '/monster', pathMatch: 'full' },
  { path: 'category', component: CategoryComponent },
  { path: 'customer', component: CustomerComponent },
  { path: 'shipper', component: ShipperComponent },
  { path: 'employee', component: EmployeeComponent },
  { path: 'author', component: AuthorComponent },
  { path: 'book', component: BookComponent },
  { path: 'sample', component: SampleComponent },
  { path: 'airport', component: AirportComponent },
  { path: 'supplier', component: SupplierComponent },
  { path: 'product', component: ProductComponent },
  { path: 'order', component: OrderComponent },
  { path: 'person', component: PersonComponent },
  { path: 'monster', component: MonsterComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }