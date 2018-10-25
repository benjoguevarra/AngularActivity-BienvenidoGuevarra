import { Component, OnInit } from '@angular/core';
import { Product } from '../../domain/product';
import { ProductService } from '../../services/product.service';
import { Validators, FormControl, FormGroup, FormBuilder } from '@angular/forms';
import { CategoryService } from '../../services/category.service';
import { SupplierService } from '../../services/supplier.service';
import { Supplier } from '../../domain/supplier';
import { Category } from '../../domain/category';

@Component({ //product //Product
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  providers: [ProductService,CategoryService,SupplierService]
})
export class ProductComponent implements OnInit {
  productList: Product[];
  selectProduct: Product;
  productForm: FormGroup;
  isAddProduct: Boolean;
  indexOfProduct: number = 0;
  isDeleteProduct: boolean;
  totalRecords: number = 0;
  supplierList : Supplier[];
  selectSupplier: Supplier;
  categoryList: Category[];
  selectCategory: Category;


  constructor(private productService: ProductService, private fb: FormBuilder,
     private SupplierService: SupplierService, private CategoryService: CategoryService) { }

  ngOnInit() {
    this.loadAllProducts();

    this.productForm = this.fb.group({
      'productName': new FormControl(''),
      'supplier': new FormControl(''),
      'category': new FormControl(''),
      'unitPrice': new FormControl(''),
      'unitsInStock': new FormControl(''),
      'unitsOnOrder': new FormControl(''),
      'reorderLevel': new FormControl(''),
      'discontinued': new FormControl(''),
      
    });
  }

  loadAllProducts() {
    this.CategoryService.getCategory().then(categories => {
      this.categoryList = categories;
      this.SupplierService.getSupplier().then(suppliers => {
        this.supplierList = suppliers;
        this.productService.getProduct().then(result => {
          this.totalRecords = result.length;
          this.productList = result;

          for(var i=0; i < this.productList.length; i++) {
            this.productList[i].supplierName = this.supplierList .find(x => x.supplierID ==
            this.productList[i].supplierID).companyName;

            this.productList[i].categoryName =  this.categoryList.find(x => x.categoryID ==
            this.productList[i].categoryID).categoryName;
       
          }
         

        })
      });

 
    });
    
  }

  editProduct(Product) {
    this.isDeleteProduct = false;
    this.isAddProduct = false;
    this.selectProduct = Product;
    this.indexOfProduct = this.productList.indexOf(Product);


    this.selectCategory = this.categoryList.find( x => x.categoryID == this.selectProduct.categoryID);
    this.selectSupplier = this.supplierList.find( x => x.supplierID == this.selectProduct.supplierID);
    this.selectProduct = Object.assign({}, this.selectProduct);
  }

  addProduct() {
    this.isDeleteProduct = false;
    this.isAddProduct = true;
    this.selectProduct = {} as Product;
    this.selectCategory = {} as Category;
    this.selectSupplier = {} as Supplier;
  }

  saveProduct() {
    let tmpProductList = [...this.productList];
    this.selectProduct.supplierID = this.selectSupplier.supplierID;
    this.selectProduct.categoryID = this.selectCategory.categoryID;
    if (this.isAddProduct == true) {
      this.productService.addProduct(this.selectProduct).then(result => {
        tmpProductList.push(result);
        this.productList = tmpProductList;

        for(var i=0; i < this.productList.length; i++) {
          this.productList[i].supplierName = this.supplierList .find(x => x.supplierID ==
          this.productList[i].supplierID).companyName;
          this.productList[i].categoryName =  this.categoryList.find(x => x.categoryID ==
          this.productList[i].categoryID).categoryName;
         
        }

        this.selectProduct = null;
      })
    }
    else {
      this.productService.editProduct(this.selectProduct.productID, this.selectProduct)
        .then(result => {
          tmpProductList[this.indexOfProduct] = result;
          this.productList = tmpProductList;

          for(var i=0; i < this.productList.length; i++) {
            this.productList[i].supplierName = this.supplierList .find(x => x.supplierID ==
            this.productList[i].supplierID).companyName;
            this.productList[i].categoryName =  this.categoryList.find(x => x.categoryID ==
            this.productList[i].categoryID).categoryName;
          }

          this.selectProduct = null;
        })
    }

  }


  cancelProduct() {
    this.selectProduct = null;
  }

  deleteProduct(Product) {
    this.isDeleteProduct = true;
    this.indexOfProduct = this.productList.indexOf(Product);
    this.selectProduct = Product;
    
    this.selectCategory = this.categoryList.find( x => x.categoryID == this.selectProduct.categoryID);
    this.selectSupplier = this.supplierList.find( x => x.supplierID == this.selectProduct.supplierID);

    this.selectProduct = Object.assign({}, this.selectProduct);
  }

  okDelete() {
    let tmpProductList = [...this.productList];
    this.productService.deleteProduct(this.selectProduct.productID)
      .then(() => {
        tmpProductList.splice(this.indexOfProduct, 1);
        this.productList = tmpProductList;
        this.selectProduct = null;
      })
  }
}
