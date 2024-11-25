import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CookiesService} from "../../shared/services/cookies/cookies.service";

import {Observable} from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class RequestService {

  constructor(
    private readonly http: HttpClient,
    private readonly coockieService: CookiesService
  ) { }

  public post(route: string, body: any, header: any) : Observable<any> {
    return this.http.post(`${route}`, body);
  }

  public get(route: string, header: any) : Observable<any> {
    return this.http.get(`${route}`);
  }
}
