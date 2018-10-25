import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Monster } from "../domain/monster";
import { PaginationResult } from "src/domain/paginationresult";

@Injectable()
export class MonsterService {

    constructor(private http: HttpClient) {  
    }

    getMonsterWithPagination(page: number, itemsPerPage: number, filterVal: string) {
        return this.http.get("http://localhost:51964/api/Monster/"+ page + "/" + itemsPerPage + "?filter=" + filterVal)
        .toPromise()
        .then(data => {return data as PaginationResult<Monster> });   
    }

    getMonster() {
        return this.http.get("http://localhost:51964/api/Monster/")
            .toPromise()
            .then(data => {return data as Monster[] });   
    }

    addMonster(objEntity: Monster) {
        return this.http.post("http://localhost:51964/api/Monster/", objEntity)
        .toPromise()
        .then(data => {return data as Monster });
    }

    editMonster(id, objEntity: Monster) {
        return this.http.put("http://localhost:51964/api/Monster/" + id, objEntity)
        .toPromise()
        .then(data => {return data as Monster });
    }

    deleteMonster(id) {
        return this.http.delete("http://localhost:51964/api/Monster/" + id)
        .toPromise()
        .then(() => null);
    }
}
 