import {Component, OnInit} from '@angular/core';
import {DatatableComponent} from "../../shared/components/datatable/datatable/datatable.component";
import {BaseComponent} from "../../shared/components/inputs/base-component";

import {DataTable} from "../../shared/components/datatable/datatable/datatable";
import {SaleServicesConfig} from "./sale-services.config";
import {AnalyticsService} from "../../services/analytics/analytics.service";
import {LoadingService} from "../../shared/services/loading/loading.service";
import {RequestData} from "../../shared/components/inputs/request-data";
import {ButtonsHeaderComponent} from "../../shared/components/buttons-header/buttons-header.component";
import {ActionsService} from "../../services/actions/actions.service";
import {DrawerModule} from "primeng/drawer";
import {TableModule} from "primeng/table";

@Component({
  selector: 'app-sale-services',
  standalone: true,
  imports: [
    DatatableComponent,
    ButtonsHeaderComponent,
    DrawerModule,
    TableModule
  ],
  providers: [
    AnalyticsService,
    ActionsService
  ],
  templateUrl: './sale-services.component.html',
  styleUrl: './sale-services.component.scss'
})
export class SaleServicesComponent extends BaseComponent implements OnInit {

  configuration: SaleServicesConfig = new SaleServicesConfig();
  datatable: DataTable = new DataTable();
  openDetails: boolean = false;

  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly loadingService: LoadingService,
    private readonly actionsService: ActionsService
  ) {
    super();
    this.datatable.fields = this.configuration.datatatableConfig;
  }

  ngOnInit(): void {
    this.onLoadData(this.onSetFilters());
  }

  onSelectedData($event: any){
    console.log("d");
    this.openDetails = true;
  }

  onLoadData(requestData: any) {
    this.loadingService.showLoading.next(true);
    this.analyticsService.saleServices(requestData).subscribe({
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
    requestData.order = ""
    return requestData;
  }


  onActionMarketing() {
    this.actionsService.onActionMarketing(null);
  }

  onSendMessage() {
    this.actionsService.onSendMessage(null);
  }

  onLoadFilter(){

  }
}
