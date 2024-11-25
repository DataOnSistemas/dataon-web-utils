import {Component, EventEmitter, input, OnInit, Output} from '@angular/core';
import {DatatableComponent} from "../../shared/components/datatable/datatable/datatable.component";
import {LastPurchaseConfig} from "./last-purchase.config";
import {DataTable} from "../../shared/components/datatable/datatable/datatable";
import {AnalyticsService} from "../../services/analytics/analytics.service";
import {RequestData} from "../../shared/components/inputs/request-data";
import {SharedCommonModule} from "../../shared/common/shared-common.module";
import {BaseComponent} from "../../shared/components/inputs/base-component";

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
    private readonly analyticsService: AnalyticsService
  ) {
    super();
    this.datatable.fields = this.configuration.datatatableConfig;
  }

  onLoadLastPurchase(requestData: RequestData): void {
    this.onShowLoading();
    this.analyticsService.lastSale(requestData).subscribe({
      next: data => {
        this.datatable.values = data.contents;
        this.datatable.totalRecords = data.total;
        this.datatable.size = data.size;
        this.datatable.page = data.offset;
        this.onShowLoading();
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
