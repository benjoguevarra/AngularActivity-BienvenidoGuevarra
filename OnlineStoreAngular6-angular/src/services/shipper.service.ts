import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Shipper } from "../domain/shipper";

@Injectable()
export class ShipperService
{
    constructor(private http: HttpClient){}

    getShipper()
    {
        return this.http.get("http://localhost:51964/api/Shipper")
        .toPromise()
        .then(data => { return data as Shipper[] });
    }

    addShipper(objEntity: Shipper)
    {
        return this.http.post("http://localhost:51964/api/Shipper",objEntity)
        .toPromise()
        .then(data => { return data as Shipper }) 
    }

    editShipper(id, objEntity: Shipper)
    {
        return this.http.put("http://localhost:51964/api/Shipper/" +id ,objEntity)
        .toPromise()
        .then(data => { return data as Shipper }) 
    }

    deleteShipper(id)
    {
        return this.http.delete("http://localhost:51964/api/Shipper/" +id )
        .toPromise()
        .then(() => null);
    }

}