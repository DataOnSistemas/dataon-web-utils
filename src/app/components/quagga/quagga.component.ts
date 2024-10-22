import { AfterViewInit, Component, OnDestroy } from '@angular/core';
import Quagga from '@ericblade/quagga2';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-quagga',
  standalone: true,
  imports: [],
  templateUrl: './quagga.component.html',
  styleUrl: './quagga.component.scss'
})
export class QuaggaComponent implements AfterViewInit, OnDestroy {

  constructor(
    public readonly ref: DynamicDialogRef,
    public readonly config: DynamicDialogConfig
  ){}

  ngAfterViewInit(): void {
    const scannerContainer = document.querySelector('#scanner-container');
    if(scannerContainer){
      Quagga.init({
        inputStream: {
          type: 'LiveStream',
          target: scannerContainer,
          constraints: {
            width: scannerContainer.getBoundingClientRect().width,
            height: 300,
            facingMode: 'environment'
          }
        },
  
        decoder: {
          readers: ['ean_reader', 'code_128_reader'],
          multiple: false
        }
      }, (err) => {
        if(err) {
          console.error('Erro ao inicializar o QuaggaJS:', err);
          return;
        }
        Quagga.start();
      });

      Quagga.onDetected((data) => {
        this.ref.close(data.codeResult.code);
        console.log('Código de barras detectado:', data.codeResult.code);
      });
    }
    

    
  }

  ngOnDestroy(): void {
    Quagga.stop();
  }
}
