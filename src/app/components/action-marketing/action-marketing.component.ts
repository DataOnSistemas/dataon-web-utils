import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../shared/components/inputs/base-component";
import {FormGroup} from "@angular/forms";
import {ActionMarketingConfig} from "./action-marketing.config";
import {FieldsService} from "../../shared/services/fields/fields.service";
import {SharedCommonModule} from "../../shared/common/shared-common.module";
import {DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";

@Component({
  selector: 'app-action-marketing',
  standalone: true,
  imports: [
    SharedCommonModule
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
  ) {
    super();
    this.formGroup = this.fieldsService.onCreateFormBuiderDynamic(this.configuration.fields);
  }

  ngOnInit(): void {
  }

  onSave() {
    if(this.formGroup.valid) {
      if(this.config.data.id) {
        //this.ref.close(this.configuration.convertToDTO(this.formGroup, this.config.data.status));
      } else {
        //this.ref.close(this.configuration.convertToDTO(this.formGroup, 'CLOSE_CASH'));
      }

    }else {
      //this.toastService.warn({summary: this.translateService.translate("common_message"), detail: this.translateService.translate("common_message_invalid_fields")});
      this.fieldsService.verifyIsValid();
    }
  }

  onCancel() {
    this.ref.close(null);
  }

}
