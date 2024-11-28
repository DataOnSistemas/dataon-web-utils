import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Button} from "primeng/button";

@Component({
  selector: 'app-buttons-header',
  standalone: true,
    imports: [
        Button
    ],
  templateUrl: './buttons-header.component.html',
  styleUrl: './buttons-header.component.scss'
})
export class ButtonsHeaderComponent {

  @Input() context: string = "";

  @Output() public _onOpenActionMarketing: EventEmitter<void> = new EventEmitter();
  @Output() public _onBachShipping: EventEmitter<void> = new EventEmitter();
  @Output() public _onShowFilter: EventEmitter<void> = new EventEmitter();


  onOpenActionMarketing(){
    this._onOpenActionMarketing.emit();
  }


  onBachShipping() {
    this._onBachShipping.emit();
  }

  onShowFilter() {
    this._onShowFilter.emit();
  }
}
