import { Component, OnInit } from '@angular/core';
import { Customer } from '../../domain/customer';
import { CustomerService } from '../../services/customer.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  providers: [CustomerService]
})
export class CustomerComponent implements OnInit {
  customerList: Customer[];
  selectCustomer: Customer;
  customerForm: FormGroup;
  isAddCustomer: Boolean;
  indexOfCustomer: number = 0;
  isDeleteCustomer: boolean;

  constructor(private customerService: CustomerService, private fb: FormBuilder) { }

  ngOnInit() {
    this.loadAllCustomers();
    this.customerForm = this.fb.group({
      'companyName': new FormControl('', Validators.required),
      'contactName': new FormControl('', Validators.required),
      'contactTitle': new FormControl('', Validators.required),
      'address': new FormControl('', Validators.required),
      'city': new FormControl('', Validators.required),
      'region': new FormControl('', Validators.required),
      'postalCode': new FormControl('', Validators.required),
      'country': new FormControl('', Validators.required),
      'phone': new FormControl('', Validators.required),
      'fax': new FormControl('', Validators.required),

    });
  }

  loadAllCustomers() {
    this.customerService.getCustomer().then(result => {
      this.customerList = result;
    });
  }

  editCustomer(Customer) {
    this.isDeleteCustomer = false;
    this.isAddCustomer = false;
    this.selectCustomer = Customer;
    this.indexOfCustomer = this.customerList.indexOf(Customer);
    this.selectCustomer = Object.assign({}, this.selectCustomer);
  }

  addCustomer() {
    this.isDeleteCustomer = false;
    this.isAddCustomer = true;
    this.selectCustomer= {} as Customer;
  }

  saveCustomer() {
    let tmpCustomerList = [...this.customerList];
    if (this.isAddCustomer == true) {
      this.customerService.addCustomer(this.selectCustomer).then(result => {
        tmpCustomerList.push(result);
        this.customerList = tmpCustomerList;
        this.selectCustomer = null;
      })
    }
    else {
      this.customerService.editCustomer(this.selectCustomer.customerID, this.selectCustomer)
        .then(result => {
          tmpCustomerList[this.indexOfCustomer] = result;
          this.customerList = tmpCustomerList;
          this.selectCustomer = null;
        })
    }
  }


  cancelCustomer()
  {
    this.selectCustomer = null;
  }

  deleteCustomer(Customer)
  {
    this.isDeleteCustomer = true;
    this.indexOfCustomer = this.customerList.indexOf(Customer);
    this.selectCustomer = Customer; 
    this.selectCustomer = Object.assign({}, this.selectCustomer);
  }

  okDelete()
  {
    let tmpCustomerList = [...this.customerList];
    this.customerService.deleteCustomer(this.selectCustomer.customerID)
    .then( () => {
     tmpCustomerList.splice(this.indexOfCustomer,1) ;
      this.customerList = tmpCustomerList;
      this.selectCustomer =null;
    })
  }
}
