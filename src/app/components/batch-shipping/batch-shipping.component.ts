import {Component, OnInit} from '@angular/core';
import {LoadingService} from "../../shared/services/loading/loading.service";
import {DynamicQueryService} from "../../services/dynamic-query/dynamic-query.service";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {DynamicQuery} from "../../services/dynamic-query/dynamic-query";
import {EnumCookie} from "../../shared/services/cookies/cookie.enum";
import {CookiesService} from "../../shared/services/cookies/cookies.service";
import {SharedCommonModule} from "../../shared/common/shared-common.module";
import {FormGroup} from "@angular/forms";
import {ActionMarketingConfig} from "../action-marketing/action-marketing.config";
import {BatchShippingConfig} from "./batch-shipping.config";
import {FieldsService} from "../../shared/services/fields/fields.service";
import {RequestService} from "../../services/request/request.service";
import {EditorModule} from "primeng/editor";


@Component({
  selector: 'app-batch-shipping',
  standalone: true,
  imports: [
    SharedCommonModule,
    EditorModule,
  ],
  providers: [
    DynamicQueryService,
    RequestService
  ],
  templateUrl: './batch-shipping.component.html',
  styleUrl: './batch-shipping.component.scss'
})
export class BatchShippingComponent implements OnInit {

  _allPerson: any[] = [];
  _selectedPerson: any[] = [];

  public formGroup: FormGroup;
  private configuration: BatchShippingConfig = new BatchShippingConfig();

  constructor(
    private readonly fieldsService: FieldsService,
    private readonly loadingService: LoadingService,
    private readonly ddynamicService: DynamicQueryService,
    public readonly ref: DynamicDialogRef,
    public readonly config: DynamicDialogConfig,
    private readonly cookiesService: CookiesService,
    private readonly requestService: RequestService,
  ) {
    this.formGroup = this.fieldsService.onCreateFormBuiderDynamic(this.configuration.fields);
  }


  ngOnInit(): void {
    this.onGetAllPersons("", "mnuCadastros_mnuClientes_mnuCadastro", 20);
    if(this.config.data){

    }
  }


  private onGetAllPersons(value: any, route: string, limit: number) {
    this.loadingService.showLoading.next(true);
    var requestData = this.onRequestData(value, route, limit);
    this.ddynamicService.onDynamicQueryByContext(requestData).subscribe({
      next: (res) => {
        if(res.RetWm === "success"){
          this._allPerson = res.paging.data;
        }
        this.loadingService.showLoading.next(false);
      },
      error: (err) => {
        this.loadingService.showLoading.next(false);
      }
    })
  }

  onRequestData(value: any, route: string, limit: number): DynamicQuery{
    let req = new DynamicQuery();
    req.limit = limit;
    req.page = 1;
    req.type = 0;
    req.route = route;
    req.doID = parseInt(this.cookiesService.get(EnumCookie.DOID));
    req.filter = ` `
    req.extraCritSQL = " AND (Pessoas_clientes.Inativo = 0) "
    return req;
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

  onCancel() {
    this.ref.close(null);
  }

  onSave() {
    if(this.formGroup.valid) {
      // this.loadingService.showLoading.next(true);
      // this.requestService.get(`dataOn/PessoaDataOn/GetData?doID=999&id=${this.cookiesService.get(EnumCookie.DOID)}`,null).subscribe({
      //   next: data => {
      //     var dto = this.configuration.convertToDTO(this.formGroup);
      //     dto.message = this.whatsappService.htmlToTextWhats(dto.message);
      //     this.whatsappService.sendMessage(dto.message, dto.number, data.obj).subscribe({
      //       next: data => {
      //         this.loadingService.showLoading.next(false);
      //         this.toastService.success({summary: "Mensagem", detail: "Enviado com sucesso"})
      //         this.ref.close(null);
      //       },
      //       error: err => {
      //         this.toastService.error({summary: "Mensagem", detail: err.message});
      //         this.loadingService.showLoading.next(false);
      //       }
      //     })
      //   }
      // });
    }else {
      this.fieldsService.verifyIsValid();
    }
  }
}
