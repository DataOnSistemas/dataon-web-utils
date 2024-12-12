import {AfterViewInit, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {LoadingService} from "../../shared/services/loading/loading.service";
import {DynamicQueryService} from "../../services/dynamic-query/dynamic-query.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {DynamicQuery} from "../../services/dynamic-query/dynamic-query";
import {EnumCookie} from "../../shared/services/cookies/cookie.enum";
import {CookiesService} from "../../shared/services/cookies/cookies.service";
import {SharedCommonModule} from "../../shared/common/shared-common.module";
import {FormGroup} from "@angular/forms";
import {BatchShippingConfig} from "./batch-shipping.config";
import {FieldsService} from "../../shared/services/fields/fields.service";
import {RequestService} from "../../services/request/request.service";
import {EditorModule} from "primeng/editor";
import {Paginator, PaginatorState} from "primeng/paginator";
import {DataTable} from "../../shared/components/datatable/datatable/datatable";
import {Drawer} from "primeng/drawer";
import {clientsinvoicing, clientsNotSale, clientsWhat, yesNo} from "../../shared/common/constants";
import {PickListSourceFilterEvent} from "primeng/picklist";
import {IBathMessages, WhatsappService} from "../../services/whatsapp/whatsapp.service";
import {ToastService} from "../../shared/services/toast/toast.service";
import {generateUUIDv4} from "../../shared/common/functions-utils";



@Component({
  selector: 'app-batch-shipping',
  standalone: true,
  imports: [
    SharedCommonModule,
    EditorModule,
    Paginator,
    Drawer,
  ],
  providers: [
    DynamicQueryService,
    RequestService,
    WhatsappService,
    ToastService
  ],
  templateUrl: './batch-shipping.component.html',
  styleUrl: './batch-shipping.component.scss'
})
export class BatchShippingComponent implements OnInit {

  protected readonly _uesNo = yesNo;
  protected readonly _clientsNotSale = clientsNotSale;
  protected readonly _clientsWhat = clientsWhat;
  protected readonly _clientsinvoicing = clientsinvoicing;

  private readonly configuration: BatchShippingConfig = new BatchShippingConfig(this.cookiesService);

  public readonly formGroup: FormGroup;
  public readonly filterFormGroup: FormGroup;



  public _allPerson: any[] = [];
  public _selectedPerson: any[] = [];
  public _showFilters: boolean = false;
  public _activeTab: string = "0";
  public _showTabClients: boolean = true;
  public table: DataTable = new DataTable();



  constructor(
    private readonly fieldsService: FieldsService,
    private readonly loadingService: LoadingService,
    private readonly ddynamicService: DynamicQueryService,
    public readonly ref: DynamicDialogRef,
    public readonly config: DynamicDialogConfig,
    private readonly cookiesService: CookiesService,
    private readonly requestService: RequestService,
    private readonly whatsappService: WhatsappService,
    private readonly toastService: ToastService,
    private readonly changeDetector: ChangeDetectorRef,
  ) {
    this.formGroup = this.fieldsService.onCreateFormBuiderDynamic(this.configuration.fields);
    this.filterFormGroup = this.fieldsService.onCreateFormBuiderDynamic(this.configuration.filterFields);
  }


  ngOnInit(): void {
    let bathConfig = this.config.data;
    if(bathConfig){
      if(!bathConfig.enableSearClients){
        this._activeTab = "1";
        this._showTabClients = false;
        this._selectedPerson = bathConfig?.person;
      }
      this.changeDetector.detectChanges();
    }

    this.onGetAllPersons(this.configuration.dynamicQuery);
    this.setDefaultFilters();
  }


  private onGetAllPersons(requestData: DynamicQuery) {
    this.loadingService.showLoading.next(true);
    this.ddynamicService.onDynamicQueryByContext(requestData).subscribe({
      next: (res) => {
        if(res.RetWm === "success"){
          this._allPerson = res.paging.data;
          this.table.totalRecords = res.paging.totalRecords;
          this.table.size = this.configuration.dynamicQuery.limit;
          this.table.page = this.configuration.dynamicQuery.page;
        }
        this.loadingService.showLoading.next(false);
      },
      error: (err) => {
        this.loadingService.showLoading.next(false);
      }
    })
  }

  onBatchSend(){
    if(this.formGroup.valid){
      // carrego os planos da empresa
      this.requestService.get(`dataOn/PessoaDataOn/GetData?doID=999&id=${this.cookiesService.get(EnumCookie.DOID)}`,null).subscribe({
        next: (res) => {
          this.toastService.info({summary: "DataOn", detail: "Enviando mensagens..."})
          this._selectedPerson.forEach(item => {
            this.whatsappService.updateVariable({
              fone: (item["FONE_CELULAR"] ? item["FONE_CELULAR"] : item["FONE"]),
              message: this.configuration.onReplaceVariable(this.whatsappService.htmlToTextWhats(this.formGroup.get("message")?.value),item),
              name: item["NOME"],
              id: generateUUIDv4(),
              origin: this.formGroup.get("messageModel")?.value["NOME"]
            });
          });
          this.whatsappService.batch(generateUUIDv4(), true, res.obj);
          this.onCancel();
        }
      });
    }
  }

  onSelectMessage(item: any){
    let value = this.formGroup.get("messageModel")?.value;
    this.requestService.get(`documentos/DocumentosModelos/GetData?doID=${this.cookiesService.get(EnumCookie.DOID)}&ID=${value.ID}`,null).subscribe({
      next: (data) => {
        this.formGroup.patchValue({message: data.obj.Documento});
      },
      error: error => {
      }
    });
  }

  async onCancel() {
    this.ref.close(null);
  }

  pageChange($event: PaginatorState) {
    this.configuration.dynamicQuery.page = $event.page ? $event.page + 1 : 1;
    this.configuration.dynamicQuery.start = this.configuration.dynamicQuery.page > 1 ? this.configuration.dynamicQuery.page * 20 : 0;
    this.onGetAllPersons(this.configuration.dynamicQuery);
  }

  onShowFIlters(){
    this._showFilters = !this._showFilters;
  }


  onFilter() {
    this.configuration.dynamicQuery.extraCritSQL = this.configuration.onLoadFilter(this.filterFormGroup);
    this.onGetAllPersons(this.configuration.dynamicQuery);
    this.onShowFIlters()
  }


  onFilterSource($event: PickListSourceFilterEvent) {
  }

  private setDefaultFilters() {
    this.filterFormGroup.patchValue({
      ativo: this._uesNo.find(e => e.key === 0),
      animaisinativos: this._uesNo.find(e => e.key === 1),
      vendasperiodo: this._clientsNotSale.find(e => e.key === 0),
      clientesque: this._clientsWhat.find(e => e.key === 0),
      comfaturamento: this._clientsinvoicing.find(e => e.key === 0),
    })
  }

}
