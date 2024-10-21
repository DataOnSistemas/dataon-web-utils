import { AfterViewInit, Component, Input, ViewChild } from '@angular/core';
import { BarcodeScannerLivestreamComponent, BarcodeScannerLivestreamModule } from 'ngx-barcode-scanner';
import { LoadProductService } from '../../services/loader-product/load-product.service';

@Component({
  selector: 'app-read-barcode',
  standalone: true,
  imports: [
    BarcodeScannerLivestreamModule
  ],
  templateUrl: './read-barcode.component.html',
  styleUrl: './read-barcode.component.scss'
})
export class ReadBarcodeComponent implements AfterViewInit {
  @ViewChild(BarcodeScannerLivestreamComponent)
  barcodeScanner: BarcodeScannerLivestreamComponent | undefined;

  barcodeValue: any;

  @Input() doID: any;

  constructor(private readonly loadProduct: LoadProductService){}

  ngAfterViewInit() {
    this.barcodeScanner?.start();
  }

  onValueChanges(result: any) {
    this.barcodeValue = result.codeResult.code;
  }

  onStarted(started: any) {
    console.log(started);
  }

  onLoadProduct(cb: any){
    this.loadProduct.onLoadProduct(this.doID, cb).subscribe({
      next: (response) => {
        if(response.RetWm === 'success'){
          response.obj;
        }
      },
      error: (error) => {
        console.log(error);
      }
    })
  }
}
