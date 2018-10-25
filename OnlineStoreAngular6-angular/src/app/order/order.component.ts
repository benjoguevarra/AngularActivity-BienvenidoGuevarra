import { Component, OnInit } from '@angular/core';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { Order } from '../../domain/order';
import { Customer } from '../../domain/customer';
import { Employee } from '../../domain/employee';
import { Shipper } from '../../domain/shipper';
import { CustomerService } from '../../services/customer.service';
import { EmployeeService } from '../../services/employee.service';
import { ShipperService } from '../../services/shipper.service';
import { OrderService } from '../../services/order.service';
import { OrderDetail } from '../../domain/orderdetail';
import { OrderDetailService } from '../../services/orderdetail.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css'],
  providers: [EmployeeService, CustomerService, OrderService, ShipperService, OrderDetailService]
})

export class OrderComponent implements OnInit {
  orderFormGroup: FormGroup;
  orderDetailFormGroup: FormGroup;
  selectOrder: Order;
  orderList: Order[];
  selectCustomer: Customer;
  customerList: Customer[];
  selectEmployee: Employee;
  employeeList: Employee[];
  selectShipper: Shipper;
  shipperList: Shipper[];
  isDeleteOrder: boolean;
  isAddOrder: boolean;
  indexOfOrder: number;
  selectOrderDetail: OrderDetail;

  constructor(private fb: FormBuilder, private customerService: CustomerService,
    private employeeService: EmployeeService, private shipperSevice: ShipperService,
    private orderService: OrderService, private orderDetailService: OrderDetailService) { }

  ngOnInit() {
    this.orderFormGroup = this.fb.group({
      customerName: ['', Validators.required],
      firstName: ['', Validators.required],
      orderDate: ['', Validators.required],
      requiredDate: ['', Validators.required],
      companyName: ['', Validators.required],
      shippedDate: ['', Validators.required],
      freight: ['', Validators.required],
      shipName: ['', Validators.required],
      shipAddress: ['', Validators.required],
      shipCity: ['', Validators.required],
      shipRegion: ['', Validators.required],
      shipPostalCode: ['', Validators.required],
      shipCountry: ['', Validators.required]
    });

    this.orderDetailFormGroup = this.fb.group({
      orderLineID: ['', Validators.required],
      productID: ['', Validators.required],
      unitPrice: ['', Validators.required],
      quantity: ['', Validators.required],
      discount: ['', Validators.required],

    });


    this.loadAllOrders();
  }

  loadAllOrders() {
    this.customerService.getCustomer().then(customers => {
      this.customerList = customers;

      this.employeeService.getEmployee().then(employees => {
        this.employeeList = employees;

        this.shipperSevice.getShipper().then(shippers => {
          this.shipperList = shippers;

          this.orderService.getOrder().then(orders => {
            this.orderList = orders;

            for (let i = 0; i < this.orderList.length; i++) {
              this.orderList[i].customerName = this.customerList
                .find(x => x.customerID == this.orderList[i].customerID).companyName;
              this.orderList[i].employeeName = this.employeeList
                .find(x => x.employeeID == this.orderList[i].employeeID).firstName;
              this.orderList[i].shipViaName = this.shipperList
                .find(x => x.shipperID == this.orderList[i].shipperID).companyName;
            }
          });
        });
      });
    });
  }

  addOrder() {
    this.orderFormGroup.enable();
    this.isAddOrder = true;
    this.isDeleteOrder = false;
    this.selectOrder = {} as Order;
    this.selectCustomer = {} as Customer;
    this.selectEmployee = {} as Employee;
    this.selectShipper = {} as Shipper;
    this.selectOrderDetail = {} as OrderDetail;
  }

  editOrder(Order) {
    this.orderFormGroup.enable();
    this.isAddOrder = false;
    this.isDeleteOrder = false;
    this.indexOfOrder = this.orderList.indexOf(Order);


    this.orderDetailService.getOrderDetailWithID(Order.orderID).then(result => {
      this.selectOrderDetail = result;
      this.selectOrder = Order;
      this.selectEmployee = this.selectOrder.employeeID;
      this.selectCustomer = this.selectOrder.customerID;
      this.selectShipper = this.selectOrder.shipperID;
      this.selectOrder = Object.assign({}, this.selectOrder);
    })
  }

  deleteOrder(Order) {
    this.orderFormGroup.disable();
    this.orderDetailFormGroup.enable();
    this.isDeleteOrder = true;
    this.indexOfOrder = this.orderList.indexOf(Order);
    this.selectOrder = Order;

    this.orderDetailService.getOrderDetailWithID(Order.orderID).then(result => {
      this.selectOrderDetail = result;
      this.selectOrder = Order;
      this.selectEmployee = this.selectOrder.employeeID;
      this.selectCustomer = this.selectOrder.customerID;
      this.selectShipper = this.selectOrder.shipperID;
      this.selectOrder = Object.assign({}, this.selectOrder);
    })
  }

  okDelete() {
    let tmpOrderList = [...this.orderList];
    this.orderDetailService.deleteOrderDetail(this.selectOrderDetail.orderDetailID)
    .then(() => {
    this.orderService.deleteOrder(this.selectOrder.orderID)
      .then(() => {
        tmpOrderList.splice(this.indexOfOrder, 1);
        this.orderList = tmpOrderList;
        this.selectOrder = null;
      });
    });
  }

  saveOrder() {
    this.selectOrder.employeeID = this.orderFormGroup.value.firstName;
    this.selectOrder.customerID = this.orderFormGroup.value.customerName;
    this.selectOrder.shipperID = this.orderFormGroup.value.companyName;
    let tmpOrderList = [...this.orderList];
    if (this.isAddOrder == true) {
      this.orderService.addOrder(this.selectOrder).then(result => {
        result.customerName = this.customerList
          .find(x => x.customerID == result.customerID).companyName;
        result.employeeName = this.employeeList
          .find(x => x.employeeID == result.employeeID).firstName;
        result.shipViaName = this.shipperList
          .find(x => x.shipperID == result.shipperID).companyName;

        tmpOrderList.push(result);
        this.orderList = tmpOrderList;

        this.selectOrderDetail.orderID = result.orderID;
        this.selectOrderDetail.discount = this.orderDetailFormGroup.value.discount;
        this.selectOrderDetail.productID = this.orderDetailFormGroup.value.productID;
        this.selectOrderDetail.orderLineID = this.orderDetailFormGroup.value.orderLineID;
        this.selectOrderDetail.quantity = this.orderDetailFormGroup.value.quantity;
        this.selectOrderDetail.unitPrice = this.orderDetailFormGroup.value.unitPrice;

        this.orderDetailService.addOrderDetail(this.selectOrderDetail).then(resultOD => {
          this.selectOrder = null;
        });
      });
    }
    else {
      this.orderService.editOrder(this.selectOrder.orderID,
        this.selectOrder).then(result => {

          result.customerName = this.customerList
            .find(x => x.customerID == result.customerID).companyName;
          result.employeeName = this.employeeList
            .find(x => x.employeeID == result.employeeID).firstName;
          result.shipViaName = this.shipperList
            .find(x => x.shipperID == result.shipperID).companyName;

          tmpOrderList[this.indexOfOrder] = result;
          this.orderList = tmpOrderList;

          this.selectOrderDetail.orderID = result.orderID;
          this.selectOrderDetail.discount = this.orderDetailFormGroup.value.discount;
          this.selectOrderDetail.productID = this.orderDetailFormGroup.value.productID;
          this.selectOrderDetail.orderLineID = this.orderDetailFormGroup.value.orderLineID;
          this.selectOrderDetail.quantity = this.orderDetailFormGroup.value.quantity;
          this.selectOrderDetail.unitPrice = this.orderDetailFormGroup.value.unitPrice;

          this.orderDetailService.editOrderDetail(this.selectOrderDetail.orderDetailID,
            this.selectOrderDetail).then(resultOD => {
              this.selectOrder = null;
            });
        });
    }
  }

  cancelOrder() {
    this.selectOrder = null;
  }
}