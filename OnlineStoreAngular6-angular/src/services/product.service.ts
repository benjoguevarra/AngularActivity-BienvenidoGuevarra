import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Product } from "../domain/product";

@Injectable()
export class ProductService
{
    constructor(private http: HttpClient){}

    getProduct()
    {
        return this.http.get("http://localhost:51964/api/Product/")
        .toPromise()
        .then(data => { return data as Product[] });
    }

    addProduct(objEntity: Product)
    {
        return this.http.post("http://localhost:51964/api/Product/",objEntity)
        .toPromise()
        .then(data => { return data as Product }) 
    }

    editProduct(id, objEntity: Product)
    {
        return this.http.put("http://localhost:51964/api/Product/" +id ,objEntity)
        .toPromise()
        .then(data => { return data as Product }) 
    }

    deleteProduct(id)
    {
        return this.http.delete("http://localhost:51964/api/Product/" +id )
        .toPromise()
        .then(() => null);
    }

}