import {Component, EventEmitter, input, OnInit, Output} from '@angular/core';
import {DatatableComponent} from "../../shared/components/datatable/datatable/datatable.component";
import {LastPurchaseConfig} from "./last-purchase.config";
import {DataTable} from "../../shared/components/datatable/datatable/datatable";
import {AnalyticsService} from "../../services/analytics/analytics.service";
import {RequestData} from "../../shared/components/inputs/request-data";
import {SharedCommonModule} from "../../shared/common/shared-common.module";
import {BaseComponent} from "../../shared/components/inputs/base-component";
import {LoadingService} from "../../shared/services/loading/loading.service";

@Component({
  selector: 'app-last-purchase',
  standalone: true,
  imports: [
    DatatableComponent,
    SharedCommonModule
  ],
  providers: [
    AnalyticsService
  ],
  templateUrl: './last-purchase.component.html',
  styleUrl: './last-purchase.component.scss'
})
export class LastPurchaseComponent extends BaseComponent implements OnInit {

  @Output() selectedPurchase: EventEmitter<any> = new EventEmitter<void>();

  configuration: LastPurchaseConfig = new LastPurchaseConfig();
  datatable: DataTable = new DataTable();

  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly loadingService: LoadingService,
  ) {
    super();
    this.datatable.fields = this.configuration.datatatableConfig;
  }

  onLoadLastPurchase(requestData: RequestData): void {
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
    this.selectedPurchase.emit(item);
  }

}
