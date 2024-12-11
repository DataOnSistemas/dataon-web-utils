import { Injectable } from '@angular/core';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {ActionMarketingComponent} from "../../components/action-marketing/action-marketing.component";
import {BatchShippingComponent} from "../../components/batch-shipping/batch-shipping.component";

@Injectable({
  providedIn: 'root'
})
export class ActionsService {

  ref: DynamicDialogRef | undefined;
  originalClose: any;

  constructor(
    private readonly config: DynamicDialogConfig,
    private readonly dialogService: DialogService
  ){}


  onSendMessage(data: any){
    this.ref = this.dialogService.open(ActionMarketingComponent,
      {
        header: "Efetuar ação de marketing",
        width: '80vw',
        modal:true,
        closable: true,
        draggable: true,
        maximizable: false,
        data: data,
        baseZIndex: 999999,
        appendTo: "body"
      });


    this.originalClose = this.ref.close.bind(this.ref);
    this.ref.close = (result: any) => {
      if (result) {
        this.originalClose(null);
      } else {
        this.originalClose(null);
      }
    };
  }

  onActionMarketing(data: any){
    this.ref = this.dialogService.open(BatchShippingComponent,
      {
        header: "Envio em lote",
        width: '80vw',
        modal:true,
        closable: true,
        draggable: true,
        maximizable: false,
        data: data,
        baseZIndex: 999999,
        appendTo: "body"
      });


    this.originalClose = this.ref.close.bind(this.ref);
    this.ref.close = (result: any) => {
      if (result) {
        this.originalClose(null);
      } else {
        this.originalClose(null);
      }
    };
  }

}
