import { Product } from './models/Product';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError,of } from 'rxjs';
import { map,catchError } from 'rxjs/operators';

const endpoint = 'https://flapotest.blob.core.windows.net/test/ProductData.json';
@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private http: HttpClient) { }

  /**
   * function to handle the error
   */
  
  private handleError(error: HttpErrorResponse): any {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    return throwError(
      'Something bad happened; please try again later.');
  }

  /*
  * non-typed-response
  */
  private extractData(res: Response): any {
    const body = res;
    return body || { };
  }

  getProducts(): Observable<any> {
    return this.http.get<Product>(endpoint);
    
  }
  
  //  getProduct(id: string): Observable<any> {
  //   return this.http.get(endpoint + 'products/' + id);
    
  //  }
  // addProduct(product): Observable<any> {
  //   return this.http.post<any>(endpoint + 'products/' + JSON.stringify(product));
    
  // }
}
