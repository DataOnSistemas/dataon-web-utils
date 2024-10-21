import { Component } from '@angular/core';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ReadBarcodeComponent } from '../../components/read-barcode/read-barcode.component';

@Component({
  selector: 'app-check-price',
  standalone: true,
  imports: [],
  templateUrl: './check-price.component.html',
  styleUrl: './check-price.component.scss',
  providers: [DialogService]
})
export class CheckPriceComponent {

  ref: DynamicDialogRef | undefined;

  constructor(public dialogService: DialogService) {}

  onOpenReadCodeBar(){
    this.ref = this.dialogService.open(
      ReadBarcodeComponent, 
      { header: 'Ler codigo Barra',
        width: '80vw',
          modal:true,
      }
    );
  }
}
