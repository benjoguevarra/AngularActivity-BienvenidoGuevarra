import { Component, OnInit, Input } from '@angular/core';
import { OrderDetail } from '../../../domain/orderdetail';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Product } from '../../../domain/product';
import { ProductService } from '../../../services/product.service';
import { OrderDetailService } from '../../../services/orderdetail.service';

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css'],
  providers: [ProductService, OrderDetailService]
})
export class OrderDetailsComponent implements OnInit {
  selectOrderDetail: OrderDetail = {} as OrderDetail;
  selectProduct : Product;
  productList: Product[];

  constructor(private fb: FormBuilder, private productService: ProductService ,
              private orderDetailService: OrderDetailService) { }

  @Input() orderDetailFormGroup : FormGroup;
  @Input() orderID: String;
  
  ngOnInit() {
    this.loadAllProducts();
    if(this.orderID) {
      this.orderDetailService.getOrderDetailWithID(this.orderID).then(result => {
        this.selectOrderDetail = result;
        this.selectProduct = this.selectOrderDetail.productID;
      })
    }
  }

  loadAllProducts() {
    this.productService.getProduct().then(products => {
      this.productList = products;
    })   
  }
}
