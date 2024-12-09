import {Component, EventEmitter, input, OnInit, Output} from '@angular/core';
import {DatatableComponent} from "../../shared/components/datatable/datatable/datatable.component";
import {LastPurchaseConfig} from "./last-purchase.config";
import {DataTable} from "../../shared/components/datatable/datatable/datatable";
import {AnalyticsService} from "../../services/analytics/analytics.service";
import {RequestData} from "../../shared/components/inputs/request-data";
import {SharedCommonModule} from "../../shared/common/shared-common.module";
import {BaseComponent} from "../../shared/components/inputs/base-component";
import {LoadingService} from "../../shared/services/loading/loading.service";
import {ButtonsHeaderComponent} from "../../shared/components/buttons-header/buttons-header.component";
import {LastPurchaseProductsComponent} from "../last-purchase-products/last-purchase-products.component";
import {ActionsService} from "../../services/actions/actions.service";

@Component({
  selector: 'app-last-purchase',
  standalone: true,
  imports: [
    DatatableComponent,
    SharedCommonModule,
    ButtonsHeaderComponent,
    LastPurchaseProductsComponent
  ],
  providers: [
    AnalyticsService,
    ActionsService
  ],
  templateUrl: './last-purchase.component.html',
  styleUrl: './last-purchase.component.scss'
})
export class LastPurchaseComponent extends BaseComponent implements OnInit {

  @Output() selectedPurchase: EventEmitter<any> = new EventEmitter<void>();

  configuration: LastPurchaseConfig = new LastPurchaseConfig();
  datatable: DataTable = new DataTable();
  _onSelectedItem: any;

  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly loadingService: LoadingService,
    private readonly actionsService: ActionsService
  ) {
    super();
    this.datatable.fields = this.configuration.datatatableConfig;
  }

  onLoadLastPurchase(requestData: RequestData): void {
    this.onSetFilters(requestData);
    this.loadingService.showLoading.next(true);
    this.analyticsService.lastSale(requestData).subscribe({
      next: data => {
        this.datatable.values = data.contents;
        this.datatable.totalRecords = data.total;
        this.datatable.size = data.size;
        this.datatable.page = data.offset;
        this.loadingService.showLoading.next(false);
      }
    })
  }

  ngOnInit(): void {
    this.onLoadLastPurchase(new RequestData());
  }

  onSelectedData(item: any){
    this._onSelectedItem = item;
    this.analyticsService.consumptionPatterns.next(item);
  }

  private onSetFilters(requestData: RequestData) {
    requestData.filter = ` and nome like '%${requestData.inputFilter}%' `;
  }

  onActionMarketing() {
    this.actionsService.onActionMarketing(this._onSelectedItem);
  }

  onSendMessage() {
    this.actionsService.onSendMessage(this._onSelectedItem);
  }

  onLoadFilter(){
    console.log('dsd');
  }

}
