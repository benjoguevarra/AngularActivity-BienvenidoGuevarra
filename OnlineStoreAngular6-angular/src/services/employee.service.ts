import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Employee } from "../domain/employee";

@Injectable()
export class EmployeeService
{
    constructor(private http: HttpClient){}

    getEmployee()
    {
        return this.http.get("http://localhost:51964/api/Employee")
        .toPromise()
        .then(data => { return data as Employee[] });
    }

    addEmployee(objEntity: Employee)
    {
        return this.http.post("http://localhost:51964/api/Employee",objEntity)
        .toPromise()
        .then(data => { return data as Employee }) 
    }

    editEmployee(id, objEntity: Employee)
    {
        return this.http.put("http://localhost:51964/api/Employee/" +id ,objEntity)
        .toPromise()
        .then(data => { return data as Employee }) 
    }

    deleteEmployee(id)
    {
        return this.http.delete("http://localhost:51964/api/Employee/" +id )
        .toPromise()
        .then(() => null);
    }

}