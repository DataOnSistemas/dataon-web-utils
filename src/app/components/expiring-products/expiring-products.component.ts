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
import {ButtonsHeaderComponent} from "../../shared/components/buttons-header/buttons-header.component";
import {ActionsService} from "../../services/actions/actions.service";
import {BatchShipping} from "../../interfaces/batch-shipping";
import {BatchShippingConfig} from "../batch-shipping/batch-shipping.config";
import {ConverterService} from "../../services/converter/converter.service";

@Component({
  selector: 'app-expiring-products',
  standalone: true,
  imports: [
    SharedCommonModule,
    DatatableComponent,
    ButtonsHeaderComponent,
  ],
  providers: [
    AnalyticsService,
    ActionsService,
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
    private readonly actionsService: ActionsService,
    private readonly converterService: ConverterService,
  ) {
    super();
    this.datatable.fields = this.configuration.datatatableConfig;
  }

  ngOnInit(): void {
    this.onLoadLastPurchase(this.onSetFilters());
  }

  onSelectedData($event: any){
    console.log("fd")
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

  onActionMarketing() {
    this.actionsService.onActionMarketing(null);
  }

  onSendMessage() {
    this.actionsService.onSendMessage(null);
  }

  onLoadFilter(){

  }

  onCampaign() {
    let product: Partial<BatchShipping> = {
      products: this.converterService.onConvertBatchShippingProduct(this.datatable.values),
      enableSearClients: true
    }
    this.actionsService.onActionMarketing(product);
  }
}
