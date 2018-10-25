import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Customer } from "../domain/customer";

@Injectable()
export class CustomerService
{
    constructor(private http: HttpClient){}

    getCustomer()
    {
        return this.http.get("http://localhost:51964/api/Customer")
        .toPromise()
        .then(data => { return data as Customer[] });
    }

    addCustomer(objEntity: Customer)
    {
        return this.http.post("http://localhost:51964/api/Customer",objEntity)
        .toPromise()
        .then(data => { return data as Customer }) 
    }

    editCustomer(id, objEntity: Customer)
    {
        return this.http.put("http://localhost:51964/api/Customer/" +id ,objEntity)
        .toPromise()
        .then(data => { return data as Customer }) 
    }

    deleteCustomer(id)
    {
        return this.http.delete("http://localhost:51964/api/Customer/" +id )
        .toPromise()
        .then(() => null);
    }

}