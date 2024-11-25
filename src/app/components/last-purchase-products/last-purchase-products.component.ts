import {Component, OnInit} from '@angular/core';
import {DatatableComponent} from "../../shared/components/datatable/datatable/datatable.component";
import {LoadingComponent} from "../../shared/components/loading/loading.component";
import {LastPurchaseConfig} from "../last-purchase/last-purchase.config";
import {DataTable} from "../../shared/components/datatable/datatable/datatable";
import {AnalyticsService} from "../../services/analytics/analytics.service";
import {BaseComponent} from "../../shared/components/inputs/base-component";
import {LastPurchaseProducts} from "./last-purchase-products.config";

@Component({
  selector: 'app-last-purchase-products',
  standalone: true,
    imports: [
        DatatableComponent,
        LoadingComponent
    ],
  templateUrl: './last-purchase-products.component.html',
  styleUrl: './last-purchase-products.component.scss'
})
export class LastPurchaseProductsComponent extends BaseComponent implements OnInit {
  configuration: LastPurchaseProducts = new LastPurchaseProducts();
  datatable: DataTable = new DataTable();

  constructor(
    private readonly analyticsService: AnalyticsService
  ) {
    super();
    this.datatable.fields = this.configuration.datatatableConfig;
  }

  ngOnInit(): void {
    this.analyticsService.consumptionPatterns.subscribe({
      next: data => {
        this.onSelectedPurchase(data)
      }
    })
  }

  onSelectedPurchase(item:any){
    this.onShowLoading();
    this.analyticsService.getLastProducts(item.IDPessoa).subscribe({
      next: data => {
        this.datatable.values = data.contents;
        this.datatable.totalRecords = data.total;
        this.datatable.size = data.size;
        this.datatable.page = data.offset;
        this.onShowLoading();
      },
      error: err => {
        this.onShowLoading();
      }
    });
  }

}
