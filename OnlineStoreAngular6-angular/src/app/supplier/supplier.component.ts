import { Component, OnInit } from '@angular/core';
import { Supplier } from '../../domain/supplier';
import { SupplierService } from '../../services/supplier.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({ //supplier //Supplier
  selector: 'app-supplier',
  templateUrl: './supplier.component.html',
  styleUrls: ['./supplier.component.css'],
  providers: [SupplierService]
})
export class SupplierComponent implements OnInit {
  supplierList: Supplier[];
  selectSupplier: Supplier;
  supplierForm: FormGroup;
  isAddSupplier: Boolean;
  indexOfSupplier: number = 0;
  isDeleteSupplier: boolean;

  constructor(private supplierService: SupplierService, private fb: FormBuilder) { }

  ngOnInit() {
    this.loadAllSuppliers();
    this.supplierForm = this.fb.group({
      'companyName': new FormControl(''),
      'contactName': new FormControl(''),
      'contactTitle': new FormControl(''),
      'address': new FormControl(''),
      'city': new FormControl(''),
      'region': new FormControl(''),
      'postalCode': new FormControl(''),
      'country': new FormControl(''),
      'phone': new FormControl(''),
      'fax': new FormControl(''),
      'homePage': new FormControl(''),
    });
  }

  loadAllSuppliers() {
    this.supplierService.getSupplier().then(result => {
      this.supplierList = result;
    });
  }

  editSupplier(Supplier) {
    this.isDeleteSupplier = false;
    this.isAddSupplier = false;
    this.selectSupplier = Supplier;
    this.indexOfSupplier = this.supplierList.indexOf(Supplier);
    this.selectSupplier = Object.assign({}, this.selectSupplier);
  }

   addSupplier() {
    this.isDeleteSupplier = false;
    this.isAddSupplier = true;
    this.selectSupplier = {} as Supplier;
  }

  saveSupplier() {
    let tmpSupplierList = [...this.supplierList];
    if (this.isAddSupplier == true) {
      this.supplierService.addSupplier(this.selectSupplier).then(result => {
        tmpSupplierList.push(result);
        this.supplierList = tmpSupplierList;
        this.selectSupplier = null;
      })
    }
    else {
      this.supplierService.editSupplier(this.selectSupplier.supplierID, this.selectSupplier)
        .then(result => {
          tmpSupplierList[this.indexOfSupplier] = result;
          this.supplierList = tmpSupplierList;
          this.selectSupplier = null;
        })
    }
  }


  cancelSupplier()
  {
    this.selectSupplier = null;
  }

  deleteSupplier(Supplier)
  {
    this.isDeleteSupplier = true;
    this.indexOfSupplier = this.supplierList.indexOf(Supplier);
    this.selectSupplier = Supplier; 
    this.selectSupplier = Object.assign({}, this.selectSupplier);
  }

  okDelete()
  {
    let tmpSupplierList = [...this.supplierList];
    this.supplierService.deleteSupplier(this.selectSupplier.supplierID)
    .then( () => {
     tmpSupplierList.splice(this.indexOfSupplier,1) ;
      this.supplierList = tmpSupplierList;
      this.selectSupplier =null;
    })
  }
}
