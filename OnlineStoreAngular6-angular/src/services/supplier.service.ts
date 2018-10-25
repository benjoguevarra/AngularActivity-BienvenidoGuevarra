import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Supplier } from "../domain/supplier";

@Injectable()
export class SupplierService
{
    constructor(private http: HttpClient){}

    getSupplier()
    {
        return this.http.get("http://localhost:51964/api/Supplier")
        .toPromise()
        .then(data => { return data as Supplier[] });
    }

    addSupplier(objEntity: Supplier)
    {
        return this.http.post("http://localhost:51964/api/Supplier",objEntity)
        .toPromise()
        .then(data => { return data as Supplier }) 
    }

    editSupplier(id, objEntity: Supplier)
    {
        return this.http.put("http://localhost:51964/api/Supplier/" +id ,objEntity)
        .toPromise()
        .then(data => { return data as Supplier }) 
    }

    deleteSupplier(id)
    {
        return this.http.delete("http://localhost:51964/api/Supplier/" +id )
        .toPromise()
        .then(() => null);
    }

}