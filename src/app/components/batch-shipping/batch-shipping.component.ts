import {Component, OnInit} from '@angular/core';
import {LoadingService} from "../../shared/services/loading/loading.service";
import {DynamicQueryService} from "../../services/dynamic-query/dynamic-query.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {DynamicQuery} from "../../services/dynamic-query/dynamic-query";
import {EnumCookie} from "../../shared/services/cookies/cookie.enum";
import {CookiesService} from "../../shared/services/cookies/cookies.service";
import {SharedCommonModule} from "../../shared/common/shared-common.module";


@Component({
  selector: 'app-batch-shipping',
  standalone: true,
  imports: [
    SharedCommonModule,
  ],
  providers: [
    DynamicQueryService,
  ],
  templateUrl: './batch-shipping.component.html',
  styleUrl: './batch-shipping.component.scss'
})
export class BatchShippingComponent implements OnInit {

  _allPerson: any[] = [];
  _selectedPerson: any[] = []

  constructor(
    private readonly loadingService: LoadingService,
    private readonly ddynamicService: DynamicQueryService,
    public readonly ref: DynamicDialogRef,
    public readonly config: DynamicDialogConfig,
    private readonly cookiesService: CookiesService,
  ) {
  }


  ngOnInit(): void {
    this.onGetAllPersons("", "mnuCadastros_mnuClientes_mnuCadastro", 10000);
    if(this.config.data){

    }
  }


  private onGetAllPersons(value: any, route: string, limit: number) {
    this.loadingService.showLoading.next(true);
    var requestData = this.onRequestData(value, route, limit);
    this.ddynamicService.onDynamicQueryByContext(requestData).subscribe({
      next: (res) => {
        this.loadingService.showLoading.next(false);
      },
      error: (err) => {
        this.loadingService.showLoading.next(false);
      }
    })
  }

  onRequestData(value: any, route: string, limit: number): DynamicQuery{
    let req = new DynamicQuery();
    req.limit = limit;
    req.page = 1;
    req.route = route;
    req.doID = parseInt(this.cookiesService.get(EnumCookie.DOID));
    req.filter = ` 1 = 1  and (NOME like '%${value.query}%' or ID like '%${value.query}%' ) `
    return req;
  }
}
