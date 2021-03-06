import { map, catchError } from 'rxjs/operators';
import { Product } from './product.model';
import { Injectable } from '@angular/core';

import { MatSnackBar } from '@angular/material/snack-bar';
import { HttpClient } from '@angular/common/http';
import { Observable, EMPTY } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = "http://localhost:3001/products"

  constructor(
    private snackbar: MatSnackBar,
    private http: HttpClient
  ) { }


  read(): Observable<Product[]> {
    return this.http.get<Product[]>(this.baseUrl).pipe(map(obj => obj), catchError(e => this.errorHandler(e)));
  }

  readById(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.get<Product>(url).pipe(map(obj => obj), catchError(e => this.errorHandler(e)));
  }

  update(product: Product): Observable<Product> {
    const url = `${this.baseUrl}/${product.id}`;
    return this.http.put<Product>(url, product).pipe(map(obj => obj), catchError(e => this.errorHandler(e)));
  }

  create(product: Product): Observable<Product> {
    return this.http.post<Product>(this.baseUrl, product).pipe(map(obj => obj),
      catchError(e => this.errorHandler(e)));
  }

  delete(id: number): Observable<Product> {
    const url = `${this.baseUrl}/${id}`;
    return this.http.delete<Product>(url).pipe(map(obj => obj), catchError(e => this.errorHandler(e)));
  }

  showMenssage(msg: string, isError: boolean = false) {
    this.snackbar.open(msg, 'X', {
      duration: 3000,
      horizontalPosition: "right",
      verticalPosition: "top",
      panelClass: isError ? ['msg-error'] : ['msg-success']
    });
  }


  errorHandler(e: any): Observable<any> {
    console.log(e);
    this.showMenssage('Ocorreu um erro!', true);
    return EMPTY;
  }
}
