import { Component, OnInit } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ReadBarcodeComponent } from '../../components/read-barcode/read-barcode.component';
import { ActivatedRoute } from '@angular/router';
import { LoadProductService } from '../../services/loader-product/load-product.service';

@Component({
  selector: 'app-check-price',
  standalone: true,
  imports: [],
  templateUrl: './check-price.component.html',
  styleUrl: './check-price.component.scss',
  providers: [DialogService, LoadProductService]
})
export class CheckPriceComponent implements OnInit{

  ref: DynamicDialogRef | undefined;

  doID: any;

  product: any = "";
  price: any = 0;

  constructor(public readonly dialogService: DialogService,
    private readonly route: ActivatedRoute,
    private readonly loadProduct: LoadProductService,
  ) {}


  ngOnInit(): void {
    this.doID = this.route.snapshot.paramMap.get("id?")!;
  }

  onOpenReadCodeBar(){
    this.ref = this.dialogService.open(
      ReadBarcodeComponent, 
      { 
        width: '80vw',
        modal:true,
        data: this.doID
      }
    );

    this.ref.onClose.subscribe((product: any) => {
      if (product) {
          this.onLoadProduct(product);
      }
      this.ref = undefined;
    });
  }

  onLoadProduct(codeBar: any){
    this.loadProduct.onLoadProduct(this.doID,codeBar).subscribe({
      next: (response) => {
        if(response.RetWm === 'success' && response.obj.ID > 0){
          this.product = response.obj.Descricao;
          this.price = "R$ " + parseFloat(response.obj.ValorVendaVista).toFixed(2);
        }
      },
      error: (error) => {
        console.log(error)
      }
    })
  }
}
