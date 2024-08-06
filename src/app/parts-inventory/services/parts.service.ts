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

  registerNewPart(part: Parts): Observable<Parts> {
    return this.http.post<Parts>(`${this.baseurl}/part`, part).pipe(
      catchError(this.handleError<Parts>('getParts', {} as Parts)) // Return an empty object or default value
    );
  }

  registerNewInHousePart(part: any): Observable<Parts> {
    const inHouse = {
      name: part.name,
      price: part.price,
      stock: part.stock,
      min: part.min,
      max: part.max,
      machineId: part.machineId,
    };
    return this.http.post<Parts>(`${this.baseurl}/part/inHouse`, inHouse).pipe(
      catchError(this.handleError<Parts>('getInHouseParts', {} as Parts)) // Return an empty object or default value
    );
  }
  registerAssociatedProduct(productId: any, partId: any): Observable<Parts> {
    return this.http
      .put<Parts>(`${this.baseurl}/product/` + productId + '/' + partId, {})
      .pipe(
        catchError(
          this.handleError<Parts>('registerAssociatedProduct', {} as Parts)
        ) // Return an empty object or default value
      );
  }
  registerNewOutsourcedPart(part: any): Observable<Parts> {
    const outsourced = {
      name: part.name,
      price: part.price,
      stock: part.stock,
      min: part.min,
      max: part.max,
      companyName: part.companyName,
    };
    return this.http
      .post<Parts>(`${this.baseurl}/part/outsourced`, outsourced)
      .pipe(
        catchError(this.handleError<Parts>('getOutsourcedParts', {} as Parts)) // Return an empty object or default value
      );
  }

  updatePart(partId: string, part: Parts): Observable<Parts> {
    return this.http.put<Parts>(`${this.baseurl}/part/` + partId, {}).pipe(
      catchError(this.handleError<Parts>('getParts', {} as Parts)) // Return an empty object or default value
    );
  }

  deletePart(partId: string): Observable<Parts> {
    return this.http.delete<Parts>(`${this.baseurl}/part/` + partId).pipe(
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
