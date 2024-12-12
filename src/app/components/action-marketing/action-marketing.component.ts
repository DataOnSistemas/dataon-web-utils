import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {BaseComponent} from "../../shared/components/inputs/base-component";
import {FormGroup} from "@angular/forms";
import {ActionMarketingConfig} from "./action-marketing.config";
import {FieldsService} from "../../shared/services/fields/fields.service";
import {SharedCommonModule} from "../../shared/common/shared-common.module";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {RequestService} from "../../services/request/request.service";
import {CookiesService} from "../../shared/services/cookies/cookies.service";
import {EnumCookie} from "../../shared/services/cookies/cookie.enum";
import {EditorModule} from 'primeng/editor';
import {WhatsappService} from "../../services/whatsapp/whatsapp.service";
import {LoadingService} from "../../shared/services/loading/loading.service";
import {ToastService} from "../../shared/services/toast/toast.service";

@Component({
  selector: 'app-action-marketing',
  standalone: true,
  imports: [
    SharedCommonModule,
    EditorModule
  ],
  providers: [
    RequestService,
    WhatsappService,
    ToastService
  ],
  templateUrl: './action-marketing.component.html',
  styleUrl: './action-marketing.component.scss'
})
export class ActionMarketingComponent extends BaseComponent implements OnInit {


  public formGroup: FormGroup;
  private configuration: ActionMarketingConfig = new ActionMarketingConfig();




  constructor(
    private readonly fieldsService: FieldsService,
    public readonly ref: DynamicDialogRef,
    public readonly config: DynamicDialogConfig,
    private readonly requestService: RequestService,
    private readonly cookiesService: CookiesService,
    private readonly whatsappService: WhatsappService,
    private readonly loadingService: LoadingService,
    private readonly toastService: ToastService,
  ) {
    super();
    this.formGroup = this.fieldsService.onCreateFormBuiderDynamic(this.configuration.fields);
  }

  ngOnInit(): void {
    if(this.config.data){
      this.onGetPerson(this.config.data.IDPessoa);
    }
  }

  onSave() {
    if(this.formGroup.valid) {
      this.loadingService.showLoading.next(true);
      this.requestService.get(`dataOn/PessoaDataOn/GetData?doID=999&id=${this.cookiesService.get(EnumCookie.DOID)}`,null).subscribe({
        next: data => {
          var dto = this.configuration.convertToDTO(this.formGroup);
          dto.message = this.whatsappService.htmlToTextWhats(dto.message);
          this.whatsappService.sendMessage(dto.message, dto.number, data.obj).subscribe({
            next: data => {
              this.loadingService.showLoading.next(false);
              this.toastService.success({summary: "Mensagem", detail: "Enviado com sucesso"})
              this.ref.close(null);
            },
            error: err => {
              this.toastService.error({summary: "Mensagem", detail: err.message});
              this.loadingService.showLoading.next(false);
            }
          })
        }
      });
    }else {
      this.fieldsService.verifyIsValid();
    }
  }

  onCancel() {
    this.ref.close(null);

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

  onGetPerson(idpessoa: any){
    this.loadingService.showLoading.next(true);
    this.requestService.get(`cadastros/Pessoa/GetData?doID=${this.cookiesService.get(EnumCookie.DOID)}&ID=${idpessoa}`,null).subscribe({
      next: (data) => {
        this.loadingService.showLoading.next(false);
        this.formGroup.patchValue(
          {
            name: data.obj.Nome,
            number: data.obj.FoneCelular.Fone
          }
        );
      },
      error: error => {
        this.loadingService.showLoading.next(false);
      }
    });
  }

}
