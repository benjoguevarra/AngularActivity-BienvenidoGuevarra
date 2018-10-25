import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import {InputTextModule} from 'primeng/inputtext';
import {InputTextareaModule} from 'primeng/inputtextarea';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {CalendarModule} from 'primeng/calendar';
import {CommonModule} from '@angular/common';
import {RadioButtonModule} from 'primeng/radiobutton';
import {DropdownModule} from 'primeng/dropdown';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SampleComponent } from './sample/sample.component';
import { CategoryComponent } from './category/category.component';
import {DialogModule} from 'primeng/dialog';
import {MenuModule} from 'primeng/menu';

import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {DataTableModule} from 'primeng/primeng';

import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { CustomerComponent } from './customer/customer.component';
import { ShipperComponent } from './shipper/shipper.component';
import { EmployeeComponent } from './employee/employee.component';
import { BookComponent } from './book/book.component';
import { AuthorComponent } from './author/author.component';
import { AirportComponent } from './airport/airport.component';
//import { MatInputModule, MatPaginatorModule, MatTableModule } from '@angular/material';
import { SupplierComponent } from './supplier/supplier.component';
import { ProductComponent } from './product/product.component';
import { OrderComponent } from './order/order.component';
import { OrderDetailsComponent } from './order/order-details/order-details.component';
import {NgxMaskModule} from 'ngx-mask';


import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  MatNativeDateModule,
  
} from '@angular/material';
import { PersonComponent } from './person/person.component';
import { MonsterComponent } from './monster/monster.component';

@NgModule({
  declarations: [
    AppComponent,
    SampleComponent,
    CategoryComponent,
    CustomerComponent,
    ShipperComponent,
    EmployeeComponent,
    BookComponent,
    AuthorComponent,
    AirportComponent,
    SupplierComponent,
    ProductComponent,
    OrderComponent,
    OrderDetailsComponent,
    PersonComponent,
    MonsterComponent,


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    TableModule,
    DataTableModule,
    HttpClientModule ,
    HttpModule,
    ReactiveFormsModule,
    FormsModule,
    InputTextareaModule,
    InputTextModule,
    DialogModule,
    BrowserAnimationsModule,
    CalendarModule,
    MenuModule,
    CommonModule,
    RadioButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatInputModule,
    DropdownModule,

    MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatExpansionModule,
  MatFormFieldModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
  MatStepperModule,
  MatNativeDateModule,
  NgxMaskModule.forRoot()
 
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
