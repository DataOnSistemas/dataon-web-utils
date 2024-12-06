import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {Ripple} from "primeng/ripple";
import {SidebarModule} from "primeng/sidebar";

@Component({
  selector: 'app-buttons-header',
  standalone: true,
  imports: [
    ButtonModule,
    Ripple,
    SidebarModule
  ],
  templateUrl: './buttons-header.component.html',
  styleUrl: './buttons-header.component.scss'
})
export class ButtonsHeaderComponent {

  @Input() context: string = "";

  @Output() public _onSendMessage: EventEmitter<void> = new EventEmitter();
  @Output() public _onActionMarketing: EventEmitter<void> = new EventEmitter();
  @Output() public _onShowFilter: EventEmitter<void> = new EventEmitter();

  _showFilters: boolean = false;

  onSendMessage(){
    this._onSendMessage.emit();
  }


  onActionMarketing() {
    this._onActionMarketing.emit();
  }

  onShowFilter() {
    this._showFilters = !this._showFilters;
  }
}
