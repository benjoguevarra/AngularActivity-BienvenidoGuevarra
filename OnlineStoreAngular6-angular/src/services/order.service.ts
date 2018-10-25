import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Order } from "../domain/order";

@Injectable()
export class OrderService
{
    constructor(private http: HttpClient){}

    getOrder()
    {
        return this.http.get("http://localhost:51964/api/Order/")
        .toPromise()
        .then(data => { return data as Order[] });
    }

    getOrderWithID(id)
    {
        return this.http.get("http://localhost:51964/api/Order/")
        .toPromise()
        .then(data => { return data as Order[] });
    }

    addOrder(objEntity: Order)
    {
        return this.http.post("http://localhost:51964/api/Order/",objEntity)
        .toPromise()
        .then(data => { return data as Order }) 
    }

    editOrder(id, objEntity: Order)
    {
        return this.http.put("http://localhost:51964/api/Order/" +id ,objEntity)
        .toPromise()
        .then(data => { return data as Order }) 
    }

    deleteOrder(id)
    {
        return this.http.delete("http://localhost:51964/api/Order/" +id )
        .toPromise()
        .then(() => null);
    }

}