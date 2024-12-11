import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../shared/components/inputs/base-component";
import {DataTable} from "../../shared/components/datatable/datatable/datatable";
import {AnalyticsService} from "../../services/analytics/analytics.service";
import {LoadingService} from "../../shared/services/loading/loading.service";

import {DatatableComponent} from "../../shared/components/datatable/datatable/datatable.component";
import {RequestData} from "../../shared/components/inputs/request-data";
import {BirthdaysConfig} from "./birthdays.config";
import {ButtonsHeaderComponent} from "../../shared/components/buttons-header/buttons-header.component";
import {ActionsService} from "../../services/actions/actions.service";
import {Toast, ToastService} from "../../shared/services/toast/toast.service";
import {Button} from "primeng/button";
import {BatchShipping} from "../../interfaces/batch-shipping";


@Component({
  selector: 'app-birthdays',
  standalone: true,
  imports: [
    DatatableComponent,
    ButtonsHeaderComponent,
    Button
  ],
  providers: [
    AnalyticsService,
    ActionsService,
    ToastService
  ],
  templateUrl: './birthdays.component.html',
  styleUrl: './birthdays.component.scss'
})
export class BirthdaysComponent extends BaseComponent implements OnInit {

  datatable: DataTable = new DataTable();
  configuration: BirthdaysConfig = new BirthdaysConfig();
  _currentID: any = "";
  toast: Toast = {
    summary: "Mensagem",
    detail: ""
  }

  constructor(
    private readonly analyticsService: AnalyticsService,
    private readonly loadingService: LoadingService,
    private readonly actionsService: ActionsService,
    private readonly toastService: ToastService
  ) {
    super();
    this.datatable.fields = this.configuration.datatatableConfig;
  }


  ngOnInit(): void {
    this.onLoadData(this.onSetFilters());
  }

  onSelectedData($event: any){
    this._currentID = $event.ID;
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
    });
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
    if(this._currentID){
      this.actionsService.onSendMessage({IDPessoa: this._currentID});
    } else {
      this.toast.detail = "Selecione um registro"
      this.toastService.warn(this.toast)
    }
  }

  onLoadFilter(){

  }

  onPage($event: any) {
    this.onLoadData(this.onSetFilters());
  }

  onSendMessagesBatch() {
    let person: Partial<BatchShipping> = {
      person: this.datatable.values,
      enableSearClients: false
    }
    this.actionsService.onActionMarketing(person)
  }
}
