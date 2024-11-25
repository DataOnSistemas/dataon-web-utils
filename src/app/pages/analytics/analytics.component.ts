import {Component, OnInit} from '@angular/core';
import {BaseComponent} from "../../shared/components/inputs/base-component";
import {SharedCommonModule} from "../../shared/common/shared-common.module";
import {ActivatedRoute} from "@angular/router";
import {TabViewModule} from 'primeng/tabview';
import {DialogService, DynamicDialogConfig, DynamicDialogRef} from "primeng/dynamicdialog";
import {CookiesService} from "../../shared/services/cookies/cookies.service";
import {EnumCookie} from "../../shared/services/cookies/cookie.enum";
import {AnalyticsService} from "../../services/analytics/analytics.service";
import {LastPurchaseComponent} from "../../components/last-purchase/last-purchase.component";
import {LastPurchaseProductsComponent} from "../../components/last-purchase-products/last-purchase-products.component";
import {ActionMarketingComponent} from "../../components/action-marketing/action-marketing.component";

@Component({
  selector: 'app-analytics',
  standalone: true,
  imports: [
    SharedCommonModule,
    TabViewModule,
    LastPurchaseComponent,
    LastPurchaseProductsComponent
  ],
  providers: [
    AnalyticsService,
    DynamicDialogConfig,
    DialogService
  ],
  templateUrl: './analytics.component.html',
  styleUrl: './analytics.component.scss'
})
export class AnalyticsComponent extends  BaseComponent implements OnInit {

  doToken: string = "";
  doID: string = "";
  ref: DynamicDialogRef | undefined;
  originalClose: any;
  _person: any;

  constructor(
    private readonly route: ActivatedRoute,
    private readonly config: DynamicDialogConfig,
    private readonly dialogService: DialogService,
    private readonly cookiesService: CookiesService,
    private readonly analyticsService: AnalyticsService,
  ) {
    super();
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.doToken = params['doToken'];
      this.doID = params['doID'];
      this.cookiesService.set(EnumCookie.DOTOKEN, this.doToken);
      this.cookiesService.set(EnumCookie.DOID, this.doID);
    });
  }

  onSelectedPurchase(item:any){
    this._person = item;
    this.analyticsService.consumptionPatterns.next(item);
  }

  onOpenActionMarketing(){
    this.ref = this.dialogService.open(ActionMarketingComponent,
      {
        header: "Efetuar ação de marketing",
        width: '80vw',
        modal:true,
        draggable: true,
        maximizable: false,
        data: this._person,
        baseZIndex: 999999,
        appendTo: "body"
      });


    this.originalClose = this.ref.close.bind(this.ref);
    this.ref.close = (result: any) => {
      if (result) {
        if(!result.id){
          //this.onOpenCash(result);
        } else {
          //this.onCloseCash(result);
        }
      } else {
        this.originalClose(null);
      }
    };
  }
}
