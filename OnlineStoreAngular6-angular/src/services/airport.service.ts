import { Injectable } from "@angular/core"
import { HttpClient, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Airport } from "../domain/airport";
import { throwError, Observable } from "rxjs";
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class AirportService {

    private airportUrl = "https://iatacodes.org/api/v6/airports?api_key=be7340e7-d66d-40d3-b45c-77630eaa2699";
    private numOfTry = 3;

    constructor(private http: HttpClient) { }

    getAirports(): Observable<Airport[]> {
        return this.http.get<Airport[]>(this.airportUrl)
            .pipe(
                retry(this.numOfTry), // retry a failed request up to 3 times 
                catchError(this.handleError) // then handle the error 
            );
    }

    getAirportResponse(): Observable<HttpResponse<Airport[]>> {
        return this.http.get<Airport[]>(
            this.airportUrl, { observe: 'response' });
    }

    private handleError(error: HttpErrorResponse) {

        if (error.error instanceof ErrorEvent) {

            // A client-side or network error occured. Handle it accordingly.
            console.error('An error occurred:', error.error.message);

        } else {

            // The backend returned an unsuccessful response code.
            // The response body may contain clues as to what went wrong.
            console.error(
                `Backend returned code ${error.status}, ` +
                `body was: ${error.error}`
            );
        }

        return throwError('Something bad happened... Please try again later.');
    }
}