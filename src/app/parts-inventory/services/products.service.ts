import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, catchError, of } from 'rxjs';
import { Products } from 'src/app/shared/interface/Product';
import { BuildEnvironment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private baseurl = BuildEnvironment.GetEnvironmentUrl();

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Products> {
    return this.http.get<Products>(`${this.baseurl}/product`).pipe(
      catchError(this.handleError<Products>('getProducts', {} as Products)) // Return an empty object or default value
    );
  }

  getSelectedProduct(id: string | null): Observable<Products> {
    return this.http.get<Products>(`${this.baseurl}/product/` + id).pipe(
      catchError(this.handleError<Products>('getProducts', {} as Products)) // Return an empty object or default value
    );
  }

  registerNewProduct(product : Products): Observable<Products> {
    return this.http.post<Products>(`${this.baseurl}/product`, product).pipe(
      catchError(this.handleError<Products>('getProducts', {} as Products)) // Return an empty object or default value
    );
  }

  updateProduct(productId: string, partId: string, product : Products): Observable<Products> {
    return this.http.put<Products>(`${this.baseurl}/product/`+ productId + "/" + partId, product).pipe(
      catchError(this.handleError<Products>('getProducts', {} as Products)) // Return an empty object or default value
    );
  }

  deleteProduct(productId: string): Observable<Products> {
    return this.http.delete<Products>(`${this.baseurl}/product/`+ productId).pipe(
      catchError(this.handleError<Products>('getProducts', {} as Products)) // Return an empty object or default value
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(`${operation} failed: ${error.message}`); // Log the error
      return of(result as T); // Return the result as a fallback
    };
  }
}
