import {Component, OnInit} from '@angular/core';
import {DatatableComponent} from "../../shared/components/datatable/datatable/datatable.component";
import {SharedCommonModule} from "../../shared/common/shared-common.module";
import {DataTable} from "../../shared/components/datatable/datatable/datatable";
import {LastPurchaseConfig} from "../last-purchase/last-purchase.config";
import {AnalyticsService} from "../../services/analytics/analytics.service";
import {LoadingService} from "../../shared/services/loading/loading.service";
import {ExpiringProductsConfig} from "./expiring-products.config";
import {BaseComponent} from "../../shared/components/inputs/base-component";
import {RequestData} from "../../shared/components/inputs/request-data";

@Component({
  selector: 'app-expiring-products',
  standalone: true,
  imports: [
    SharedCommonModule,
    DatatableComponent
  ],
  providers: [
    AnalyticsService
  ],
  templateUrl: './expiring-products.component.html',
  styleUrl: './expiring-products.component.scss'
})
export class ExpiringProductsComponent extends BaseComponent implements OnInit {

  datatable: DataTable = new DataTable();
  configuration: ExpiringProductsConfig = new ExpiringProductsConfig();


  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly loadingService: LoadingService,
  ) {
    super();
    this.datatable.fields = this.configuration.datatatableConfig;
  }

  ngOnInit(): void {
    this.onLoadLastPurchase(this.onSetFilters());
  }

  onSelectedData($event: any){

  }

  onLoadLastPurchase(requestData: any) {
    this.loadingService.showLoading.next(true);
    this.analyticsService.getExpiringProducts(requestData).subscribe({
      next: data => {
        this.datatable.values = data.contents;
        this.datatable.totalRecords = data.total;
        this.datatable.size = data.size;
        this.datatable.page = data.offset;
        this.loadingService.showLoading.next(false);
      },
      error: err => {
        this.loadingService.showLoading.next(false);
      }
    })
  }

  onSetFilters(): RequestData {
    var requestData = new RequestData();
    requestData.order = " order by Validade asc"
    return requestData;
  }

  onPage($event: any) {
    $event.order = " order by Validade asc "
    this.onLoadLastPurchase($event);
  }
}
