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
import {WhatsappService} from "../../services/whatsapp.service";

@Component({
  selector: 'app-action-marketing',
  standalone: true,
  imports: [
    SharedCommonModule,
    EditorModule
  ],
  providers: [
    RequestService,
    WhatsappService
  ],
  templateUrl: './action-marketing.component.html',
  styleUrl: './action-marketing.component.scss'
})
export class ActionMarketingComponent extends BaseComponent implements OnInit {


  public formGroup: FormGroup;
  private configuration: ActionMarketingConfig = new ActionMarketingConfig();

  @Output() loading: EventEmitter<void> = new EventEmitter();


  constructor(
    private readonly fieldsService: FieldsService,
    public readonly ref: DynamicDialogRef,
    public readonly config: DynamicDialogConfig,
    private readonly requestService: RequestService,
    private readonly cookiesService: CookiesService,
    private readonly whatsappService: WhatsappService,
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
      this.requestService.get(`dataOn/PessoaDataOn/GetData?doID=999&id=${this.cookiesService.get(EnumCookie.DOID)}`,null).subscribe({
        next: data => {
          var dto = this.configuration.convertToDTO(this.formGroup);
          dto.message = this.whatsappService.htmlToTextWhats(dto.message);
          this.whatsappService.sendMessage(dto.message, dto.number, data.obj).subscribe({
            next: data => {
              console.log(data);
            },
            error: err => {
              console.log(err);
            }
          })
        }
      });
    }else {
      //this.toastService.warn({summary: this.translateService.translate("common_message"), detail: this.translateService.translate("common_message_invalid_fields")});
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

    this.requestService.get(`cadastros/Pessoa/GetData?doID=${this.cookiesService.get(EnumCookie.DOID)}&ID=${idpessoa}`,null).subscribe({
      next: (data) => {
        this.formGroup.patchValue(
          {
            name: data.obj.Nome,
            number: data.obj.FoneCelular.Fone
          }
        );
      },
      error: error => {
      }
    });
  }

}
