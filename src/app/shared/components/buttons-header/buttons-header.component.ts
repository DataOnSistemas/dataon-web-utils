import {ChangeDetectorRef, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ButtonModule} from "primeng/button";
import {Ripple} from "primeng/ripple";
import { DrawerModule } from 'primeng/drawer';
import {CommonModule, NgFor} from "@angular/common";
import {WhatsappService} from "../../../services/whatsapp/whatsapp.service";
import {LoadingService} from "../../services/loading/loading.service";
import {TableModule} from "primeng/table";

@Component({
  selector: 'app-buttons-header',
  standalone: true,
  imports: [
    CommonModule,
    ButtonModule,
    Ripple,
    DrawerModule,
    TableModule
  ],
  providers: [

  ],
  templateUrl: './buttons-header.component.html',
  styleUrl: './buttons-header.component.scss'
})
export class ButtonsHeaderComponent implements OnInit {

  @Input() context: string = "";
  @Input() public sendMessage: boolean = true;
  @Input() public actionMarketing: boolean = true;
  @Input() public filter: boolean = true;

  @Output() public _onSendMessage: EventEmitter<void> = new EventEmitter();
  @Output() public _onActionMarketing: EventEmitter<void> = new EventEmitter();
  @Output() public _onShowFilter: EventEmitter<void> = new EventEmitter();
  @Output() public _onFilter: EventEmitter<void> = new EventEmitter();

  _showFilters: boolean = false;
  _showLogs: boolean = false;
  _procesing: boolean = false;
  public _logs: any[] = [];


  constructor(
    private readonly whatsAppService: WhatsappService,
    private readonly changeDetectorRef: ChangeDetectorRef,
    private readonly loadingService: LoadingService,
  ) {}




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

  showLogs() {
    this._logs = JSON.parse(<string>sessionStorage.getItem("logs"));
    this._showLogs = !this._showLogs;
  }

  ngOnInit(): void {
    this.loadingService.processing.subscribe({
      next: data => {
        this._procesing = data;
        this.changeDetectorRef.detectChanges();
      }
    })
  }
}
