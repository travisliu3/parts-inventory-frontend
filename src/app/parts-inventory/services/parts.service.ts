import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, throwError } from 'rxjs';
import { Parts } from 'src/app/shared/interface/Parts';
import { BuildEnvironment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class PartsService {
  private baseurl = BuildEnvironment.GetEnvironmentUrl();

  constructor(private http: HttpClient) {}

  getParts(): Observable<Parts> {
    return this.http.get<Parts>(`${this.baseurl}/part`).pipe(
      catchError(this.handleError<Parts>('getParts', {} as Parts)) // Return an empty object or default value
    );
  }

  getSelectedPart(id: string | null): Observable<Parts> {
    return this.http.get<Parts>(`${this.baseurl}/part/` + id).pipe(
      catchError(this.handleError<Parts>('getParts', {} as Parts)) // Return an empty object or default value
    );
  }

  registerNewPart(part : Parts): Observable<Parts> {
    return this.http.post<Parts>(`${this.baseurl}/part`, part).pipe(
      catchError(this.handleError<Parts>('getParts', {} as Parts)) // Return an empty object or default value
    );
  }

  registerNewInHousePart(part : Parts): Observable<Parts> {
    return this.http.post<Parts>(`${this.baseurl}/part/inHouse`, part).pipe(
      catchError(this.handleError<Parts>('getInHouseParts', {} as Parts)) // Return an empty object or default value
    );
  }

  registerNewOutsourcedPart(part : Parts): Observable<Parts> {
    return this.http.post<Parts>(`${this.baseurl}/part/outsourced`, part).pipe(
      catchError(this.handleError<Parts>('getOutsourcedParts', {} as Parts)) // Return an empty object or default value
    );
  }

  updatePart(partId: string, part : Parts): Observable<Parts> {
    return this.http.put<Parts>(`${this.baseurl}/part/` + partId, {}).pipe(
      catchError(this.handleError<Parts>('getParts', {} as Parts)) // Return an empty object or default value
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Log the error
      return of(result as T); // Return the result as a fallback
    };
  }
}
