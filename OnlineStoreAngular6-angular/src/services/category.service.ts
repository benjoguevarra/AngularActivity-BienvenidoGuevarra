import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Category } from "../domain/category";
import { PaginationResult } from "../domain/paginationresult";

@Injectable()
export class CategoryService
{
    constructor(private http: HttpClient){}

    getCategorywithPagination(page: number, itemsPerPage: number, filter: string){
        return this.http.get("http://localhost:51964/api/Category/" + page + "/" + itemsPerPage + "?filter=" + filter)
        .toPromise()
        .then(data=>{return data as PaginationResult<Category>})
    
    }
 
    getCategory()
    {
        return this.http.get("http://localhost:51964/api/Category")
        .toPromise()
        .then(data => { return data as Category[] });
    }

    addCategory(objEntity: Category)
    {
        return this.http.post("http://localhost:51964/api/Category",objEntity)
        .toPromise()
        .then(data => { return data as Category }) 
    }

    editCategory(id, objEntity: Category)
    {
        return this.http.put("http://localhost:51964/api/Category/" +id ,objEntity)
        .toPromise()
        .then(data => { return data as Category }) 
    }

    deleteCategory(id)
    {
        return this.http.delete("http://localhost:51964/api/Category/" +id )
        .toPromise()
        .then(() => null);
    }

}