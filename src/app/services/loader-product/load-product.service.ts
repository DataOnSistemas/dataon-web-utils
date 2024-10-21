import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoadProductService {

  constructor(private readonly http: HttpClient) { }

  public onLoadProduct(doID: number, pCB: any) : Observable<any> {
    return this.http.get(`cadastros/Produto/LoabByCBAnonymous?doID=${doID}&pCB=${pCB}`);
  }
}
