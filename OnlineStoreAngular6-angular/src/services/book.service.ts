import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Book } from "../domain/book";
import { PaginationResult } from "src/domain/paginationresult";

@Injectable()
export class BookService {

    constructor(private http: HttpClient) {  
    }

    getBookWithPagination(page: number, itemsPerPage: number, filterVal: string) {
        return this.http.get("http://localhost:51964/api/Book/"+ page + "/" + itemsPerPage + "?filter=" + filterVal)
        .toPromise()
        .then(data => {return data as PaginationResult<Book> });   
    }

    getBook() {
        return this.http.get("http://localhost:51964/api/Book/")
            .toPromise()
            .then(data => {return data as Book[] });   
    }

    addBook(objEntity: Book) {
        return this.http.post("http://localhost:51964/api/Book/", objEntity)
        .toPromise()
        .then(data => {return data as Book });
    }

    editBook(id, objEntity: Book) {
        return this.http.put("http://localhost:51964/api/Book/" + id, objEntity)
        .toPromise()
        .then(data => {return data as Book });
    }

    deleteBook(id) {
        return this.http.delete("http://localhost:51964/api/Book/" + id)
        .toPromise()
        .then(() => null);
    }
}
 