import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, Subject} from "rxjs";
import {CookiesService} from "../../shared/services/cookies/cookies.service";
import {EnumCookie} from "../../shared/services/cookies/cookie.enum";
import {RequestData} from "../../shared/components/inputs/request-data";
import {DatePipe} from "@angular/common";

@Injectable({
  providedIn: 'root'
})
export class AnalyticsService {

  consumptionPatterns   = new Subject<any>();

  constructor(
    private readonly http: HttpClient,
    private readonly coockieService: CookiesService
  ){}


  public lastSale(request: RequestData) : Observable<any> {
    return this.http.post(`analytics/lastSale?doID=${this.coockieService.get(EnumCookie.DOID)}`, request);
  }

  public saleServices(request: RequestData) : Observable<any> {
    return this.http.post(`analytics/saleServices?doID=${this.coockieService.get(EnumCookie.DOID)}`, request);
  }

  public onWebInvokeloadProdutosLotes(pDataFim: Date,pDataIni: Date, diasAntes: number,datePipe: DatePipe) : Observable<any> {
    return this.http.get(`suprimentos/ProdutosLotes/WebInvoke_loadProdutosLotes?doID=${this.coockieService.get(EnumCookie.DOID)}&pDiasAntes=${diasAntes}&pContexto=1&pDataFim=${datePipe.transform(pDataFim,'yyyy-MM-dd')}&pDataIni=${datePipe.transform(pDataIni,'yyyy-MM-dd')}`);
  }

  public getLastProducts(idpessoa: any) : Observable<any> {
    return this.http.post(`analytics/getLastProducts?doID=${this.coockieService.get(EnumCookie.DOID)}&idpessoa=${idpessoa}`, null);
  }

  public getAllConsumerByProduct(idproduto: any) : Observable<any> {
    return this.http.get(`analytics/getAllConsumerByProduct?doID=${this.coockieService.get(EnumCookie.DOID)}&idpessoa=${idproduto}`);
  }

  public getBirthdaysWeek() : Observable<any> {
    return this.http.get(`analytics/getBirthdaysWeek?doID=${this.coockieService.get(EnumCookie.DOID)}`);
  }




}
