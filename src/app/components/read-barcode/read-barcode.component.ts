import { AfterViewInit, Component, Input, OnInit, ViewChild } from '@angular/core';
import { BarcodeScannerLivestreamComponent, BarcodeScannerLivestreamModule } from 'ngx-barcode-scanner';
import { LoadProductService } from '../../services/loader-product/load-product.service';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-read-barcode',
  standalone: true,
  imports: [
    BarcodeScannerLivestreamModule
  ],
  templateUrl: './read-barcode.component.html',
  styleUrl: './read-barcode.component.scss'
})
export class ReadBarcodeComponent implements AfterViewInit, OnInit {
  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner: BarcodeScannerLivestreamComponent | undefined;

  barcodeValue: any;

  doID: any;

  constructor(
    private readonly loadProduct: LoadProductService,
    public readonly ref: DynamicDialogRef,
    public readonly config: DynamicDialogConfig
  ){}

  ngOnInit(): void {
    if(this.config.data){
      this.doID = this.config.data;
    }
  }

  ngAfterViewInit() {
    this.barcodeScanner?.start();
  }

  onValueChanges(result: any) {
    this.barcodeValue = result.codeResult.code;
    this.onLoadProduct(result.codeResult.code);
  }

  onStarted(started: any) {
    console.log(started);
  }

  onLoadProduct(cb: any){
    this.loadProduct.onLoadProduct(this.doID, cb).subscribe({
      next: (response) => {
        if(response.RetWm === 'success' && response.obj.ID > 0){
          this.ref.close(response.obj);
        }
        this.ref.close("Falha ao consultar produto: " + response);
      },
      error: (error) => {
        this.ref.close("Falha ao consultar produto: " + error);
      }
    })
  }
}
