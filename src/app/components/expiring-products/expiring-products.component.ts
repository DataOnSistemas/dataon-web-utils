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
import {FormGroup} from "@angular/forms";
import {FieldsService} from "../../shared/services/fields/fields.service";
import {DatePipe} from "@angular/common";

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
    DatePipe
  ],
  templateUrl: './expiring-products.component.html',
  styleUrl: './expiring-products.component.scss'
})
export class ExpiringProductsComponent extends BaseComponent implements OnInit {

  datatable: DataTable = new DataTable();
  configuration: ExpiringProductsConfig = new ExpiringProductsConfig();
  public readonly filterFormGroup: FormGroup;


  constructor(
    private readonly fieldsService: FieldsService,
    private readonly analyticsService: AnalyticsService,
    private readonly loadingService: LoadingService,
    private readonly actionsService: ActionsService,
    private readonly converterService: ConverterService,
    private readonly datePipe: DatePipe
  ) {
    super();
    this.datatable.fields = this.configuration.datatatableConfig;
    this.filterFormGroup = this.fieldsService.onCreateFormBuiderDynamic(this.configuration.filterFields);
  }

  ngOnInit(): void {

    let date = new Date();
    this.filterFormGroup.patchValue({
      de: new Date(),
      ate: new Date(date.setDate(date.getDate() + 60)),
    })
    this.onGetAll()
  }

  onSelectedData($event: any){
    console.log("fd")
  }


  onGetAll() {
    this.loadingService.showLoading.next(true);
    let dataIni = this.filterFormGroup.get("de")?.value;
    let dataFIm = this.filterFormGroup.get("ate")?.value;
    this.analyticsService.onWebInvokeloadProdutosLotes(dataFIm,dataIni,60,this.datePipe).subscribe({
      next: data => {
        this.datatable.values = data;
        this.datatable.totalRecords = data.length;
        this.datatable.size = data.length;
        this.datatable.page = 1;
        this.loadingService.showLoading.next(false);
      },
      error: err => {
        this.loadingService.showLoading.next(false);
      }
    })
  }

  onPage($event: any) {
    this.onGetAll();
  }

  onLoadFilter(){
    this.onGetAll();
  }

  onCampaign() {
    let product: Partial<BatchShipping> = {
      products: this.converterService.onConvertBatchShippingProduct(this.datatable.values),
      enableSearClients: true
    }
    this.actionsService.onActionMarketing(product);
  }
}
