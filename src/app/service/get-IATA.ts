import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class IataService {
  constructor(private http: HttpClient) {}

  getIata(city: string): Observable<any> {
    const encodedCity = encodeURIComponent(city);
    const apiUrl = `https://suggests.rasp.yandex.net/all_suggests?format=old&part=${encodedCity}`;

    return this.http.get<any>(apiUrl).pipe(
      // tap(response => {
      //   // Log the full response to the console
      //   console.log('Response:', JSON.stringify(response));
      // }),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred.
      console.error('A client-side or network error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${JSON.stringify(error.error)}`);
    }
    return throwError('Something went wrong; please try again later.');
  }
}
