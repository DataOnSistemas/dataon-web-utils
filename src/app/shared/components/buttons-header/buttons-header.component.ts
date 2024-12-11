import {Component, EventEmitter, Input, Output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {Ripple} from "primeng/ripple";
import { DrawerModule } from 'primeng/drawer';
import {CommonModule} from "@angular/common";
import {SidebarModule} from "primeng/sidebar";

@Component({
  selector: 'app-buttons-header',
  standalone: true,
  imports: [
    CommonModule,
    SidebarModule,
    ButtonModule,
    Ripple,
    DrawerModule
  ],
  templateUrl: './buttons-header.component.html',
  styleUrl: './buttons-header.component.scss'
})
export class ButtonsHeaderComponent {

  @Input() context: string = "";
  @Input() public sendMessage: boolean = true;
  @Input() public actionMarketing: boolean = true;

  @Output() public _onSendMessage: EventEmitter<void> = new EventEmitter();
  @Output() public _onActionMarketing: EventEmitter<void> = new EventEmitter();
  @Output() public _onShowFilter: EventEmitter<void> = new EventEmitter();
  @Output() public _onFilter: EventEmitter<void> = new EventEmitter();

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

  onFilter() {
    this._onFilter.emit();
  }
}
