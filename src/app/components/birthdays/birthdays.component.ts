import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../shared/components/inputs/base-component";
import {DataTable} from "../../shared/components/datatable/datatable/datatable";
import {AnalyticsService} from "../../services/analytics/analytics.service";
import {LoadingService} from "../../shared/services/loading/loading.service";

import {DatatableComponent} from "../../shared/components/datatable/datatable/datatable.component";
import {RequestData} from "../../shared/components/inputs/request-data";
import {BirthdaysConfig} from "./birthdays.config";

@Component({
  selector: 'app-birthdays',
  standalone: true,
  imports: [
    DatatableComponent
  ],
  providers: [
    AnalyticsService
  ],
  templateUrl: './birthdays.component.html',
  styleUrl: './birthdays.component.scss'
})
export class BirthdaysComponent extends BaseComponent implements OnInit {

  datatable: DataTable = new DataTable();
  configuration: BirthdaysConfig = new BirthdaysConfig();

  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly loadingService: LoadingService,
  ) {
    super();
    this.datatable.fields = this.configuration.datatatableConfig;
  }


  ngOnInit(): void {
    this.onLoadData(this.onSetFilters());
  }

  onSelectedData($event: any){

  }

  onLoadData(requestData: any) {
    this.loadingService.showLoading.next(true);
    this.analyticsService.getBirthdaysWeek().subscribe({
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

}
