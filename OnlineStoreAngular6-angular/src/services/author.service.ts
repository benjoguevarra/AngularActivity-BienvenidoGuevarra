import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Author } from "../domain/author";
import { PaginationResult } from "src/domain/paginationresult";

@Injectable()
export class AuthorService {

    constructor(private http: HttpClient) {  
    }

    getAuthorWithPagination(page: number, itemsPerPage: number, filterVal: string) {
        return this.http.get("http://localhost:51964/api/Author/"+ page + "/" + itemsPerPage + "?filter=" + filterVal)
        .toPromise()
        .then(data => {return data as PaginationResult<Author> });   
    }

    getAuthor() {
        return this.http.get("http://localhost:51964/api/Author/")
            .toPromise()
            .then(data => {return data as Author[] });   
    }

    addAuthor(objEntity: Author) {
        return this.http.post("http://localhost:51964/api/Author/", objEntity)
        .toPromise()
        .then(data => {return data as Author });
    }

    editAuthor(id, objEntity: Author) {
        return this.http.put("http://localhost:51964/api/Author/" + id, objEntity)
        .toPromise()
        .then(data => {return data as Author });
    }

    deleteAuthor(id) {
        return this.http.delete("http://localhost:51964/api/Author/" + id)
        .toPromise()
        .then(() => null);
    }
}
 