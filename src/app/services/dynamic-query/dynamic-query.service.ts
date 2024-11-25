import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DynamicQuery } from './dynamic-query';

@Injectable({
  providedIn: 'root'
})
export class DynamicQueryService {

  constructor(private readonly http: HttpClient) { }

  public onDynamicQueryByContext(dynamicQuery: DynamicQuery) : Observable<any> {
    return this.http.get(`dataOn/doExplorer/DynamicQuery?doID=${dynamicQuery.doID}&doIDUser=${dynamicQuery.doIDUser}&context=${dynamicQuery.context}&route=${dynamicQuery.route}&sorters=${dynamicQuery.sorters}&system=0&type=1&filter=${dynamicQuery.filter}&page=${dynamicQuery.page}&start=${dynamicQuery.start}&limit=${dynamicQuery.limit}`);
  }
}
